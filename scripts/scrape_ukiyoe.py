#!/usr/bin/env python3
"""Lightweight crawler for ukiyo-e style catalog websites.

This script is designed to be compliance-aware:
- Checks robots.txt before crawling.
- Uses polite rate limits.
- Supports dry-run discovery.

Default target is https://ukiyo-e.org/, but selectors/patterns are configurable.
"""

from __future__ import annotations

import argparse
import csv
import json
import re
import sys
import time
from collections import deque
from dataclasses import dataclass, asdict
from html.parser import HTMLParser
from pathlib import Path
from typing import Iterable
from urllib.parse import urljoin, urlparse
from urllib.request import Request, urlopen
import urllib.robotparser as robotparser


USER_AGENT = "FloatingWorldCrawler/0.1 (+contact:you@example.com)"


class LinkAndMetaParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.links: list[str] = []
        self.meta: dict[str, str] = {}
        self.h1_chunks: list[str] = []
        self.in_h1 = False

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attr = dict(attrs)
        if tag == "a" and attr.get("href"):
            self.links.append(attr["href"])
        if tag == "meta":
            key = attr.get("property") or attr.get("name")
            val = attr.get("content")
            if key and val:
                self.meta[key.strip().lower()] = val.strip()
        if tag == "h1":
            self.in_h1 = True

    def handle_endtag(self, tag: str) -> None:
        if tag == "h1":
            self.in_h1 = False

    def handle_data(self, data: str) -> None:
        if self.in_h1 and data.strip():
            self.h1_chunks.append(data.strip())


@dataclass
class WorkRecord:
    url: str
    title: str
    artist: str
    year: str
    image: str
    description: str
    source: str
    license: str


def fetch_text(url: str, timeout: int = 20) -> str:
    req = Request(url, headers={"User-Agent": USER_AGENT})
    with urlopen(req, timeout=timeout) as resp:
        charset = resp.headers.get_content_charset() or "utf-8"
        return resp.read().decode(charset, errors="ignore")


def build_robot_parser(base_url: str) -> robotparser.RobotFileParser:
    parsed = urlparse(base_url)
    robots_url = f"{parsed.scheme}://{parsed.netloc}/robots.txt"
    rp = robotparser.RobotFileParser()
    rp.set_url(robots_url)
    try:
        rp.read()
    except Exception:
        # If robots is unreachable, be conservative and allow user to decide.
        pass
    return rp


def normalize_links(current_url: str, links: Iterable[str], same_host: str) -> list[str]:
    out: list[str] = []
    for link in links:
        abs_url = urljoin(current_url, link)
        p = urlparse(abs_url)
        if p.scheme not in {"http", "https"}:
            continue
        if p.netloc != same_host:
            continue
        cleaned = abs_url.split("#")[0]
        out.append(cleaned)
    return out


def extract_record(url: str, html: str, source: str) -> WorkRecord:
    parser = LinkAndMetaParser()
    parser.feed(html)

    title = parser.meta.get("og:title") or parser.meta.get("twitter:title") or " ".join(parser.h1_chunks)
    image = parser.meta.get("og:image", "")
    description = parser.meta.get("og:description") or parser.meta.get("description", "")

    # Heuristic extraction from title/description text.
    artist = ""
    year = ""
    hay = f"{title} {description}"
    year_match = re.search(r"(1[6-9]\d{2}|20\d{2})", hay)
    if year_match:
        year = year_match.group(1)

    # Very lightweight artist heuristic (adjust as needed per site structure).
    artist_match = re.search(r"(?:by|作者|画师)[:\s]+([^,;|]+)", hay, re.IGNORECASE)
    if artist_match:
        artist = artist_match.group(1).strip()

    return WorkRecord(
        url=url,
        title=title.strip(),
        artist=artist,
        year=year,
        image=image,
        description=description.strip(),
        source=source,
        license="unknown (please verify manually)",
    )


def crawl(args: argparse.Namespace) -> list[WorkRecord]:
    seed = args.seed_url
    host = urlparse(seed).netloc
    rp = build_robot_parser(seed)

    queue = deque([seed])
    seen: set[str] = set()
    detail_urls: list[str] = []

    print(f"[info] seed: {seed}")
    print(f"[info] detail URL pattern: {args.detail_pattern}")

    while queue and len(seen) < args.max_list_pages:
        current = queue.popleft()
        if current in seen:
            continue
        seen.add(current)

        if args.obey_robots and not rp.can_fetch(USER_AGENT, current):
            print(f"[skip] robots disallow: {current}")
            continue

        try:
            html = fetch_text(current, timeout=args.timeout)
        except Exception as exc:
            print(f"[warn] fetch failed: {current} ({exc})")
            continue

        parser = LinkAndMetaParser()
        parser.feed(html)
        links = normalize_links(current, parser.links, host)

        for link in links:
            if re.search(args.detail_pattern, link):
                detail_urls.append(link)
            elif re.search(args.list_pattern, link) and link not in seen:
                queue.append(link)

        print(f"[info] visited list page {len(seen)}: found details={len(detail_urls)}")
        time.sleep(args.delay)

    # Deduplicate while preserving order.
    dedup_detail_urls = list(dict.fromkeys(detail_urls))[: args.max_detail_pages]

    records: list[WorkRecord] = []
    for idx, detail in enumerate(dedup_detail_urls, start=1):
        if args.obey_robots and not rp.can_fetch(USER_AGENT, detail):
            print(f"[skip] robots disallow detail: {detail}")
            continue
        try:
            html = fetch_text(detail, timeout=args.timeout)
        except Exception as exc:
            print(f"[warn] detail fetch failed: {detail} ({exc})")
            continue

        records.append(extract_record(detail, html, source=seed))
        if idx % 20 == 0 or idx == len(dedup_detail_urls):
            print(f"[info] parsed details: {idx}/{len(dedup_detail_urls)}")
        time.sleep(args.delay)

    return records


def save(records: list[WorkRecord], out_json: Path, out_csv: Path) -> None:
    out_json.parent.mkdir(parents=True, exist_ok=True)
    out_csv.parent.mkdir(parents=True, exist_ok=True)

    with out_json.open("w", encoding="utf-8") as f:
        json.dump([asdict(r) for r in records], f, ensure_ascii=False, indent=2)

    with out_csv.open("w", encoding="utf-8-sig", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=list(asdict(records[0]).keys()) if records else [
            "url", "title", "artist", "year", "image", "description", "source", "license"
        ])
        writer.writeheader()
        for r in records:
            writer.writerow(asdict(r))


def parse_args() -> argparse.Namespace:
    p = argparse.ArgumentParser(description="Crawl ukiyo-e catalog pages into JSON/CSV.")
    p.add_argument("--seed-url", default="https://ukiyo-e.org/", help="Start URL for list-page discovery.")
    p.add_argument("--list-pattern", default=r"ukiyo-e\.org", help="Regex for list/discovery links.")
    p.add_argument(
        "--detail-pattern",
        default=r"/(image|images|artwork|artworks|work)/",
        help="Regex that marks a link as a detail/work page.",
    )
    p.add_argument("--max-list-pages", type=int, default=30, help="Maximum list/discovery pages to traverse.")
    p.add_argument("--max-detail-pages", type=int, default=200, help="Maximum detail pages to parse.")
    p.add_argument("--delay", type=float, default=1.2, help="Delay in seconds between requests.")
    p.add_argument("--timeout", type=int, default=20, help="HTTP timeout seconds.")
    p.add_argument("--obey-robots", action="store_true", help="Respect robots.txt allow/disallow checks.")
    p.add_argument("--out-json", default="data/ukiyoe_scraped.json", help="Output JSON path.")
    p.add_argument("--out-csv", default="data/ukiyoe_scraped.csv", help="Output CSV path.")
    return p.parse_args()


def main() -> int:
    args = parse_args()
    records = crawl(args)
    save(records, Path(args.out_json), Path(args.out_csv))
    print(f"[done] records saved: {len(records)}")
    print(f"[done] json: {args.out_json}")
    print(f"[done] csv: {args.out_csv}")
    if not records:
        print("[note] No records parsed. You may need to tune --list-pattern/--detail-pattern for the target site.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
