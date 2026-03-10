# AGENTS.md

## Project intent
- This repo is a front-end demo for a "浮世绘（Ukiyo-e）" digital exhibition style website.
- Preferred tone: restrained, elegant, editorial (catalog/book-like), not commercial landing-page style.

## Implementation guardrails
- Mobile-first layout first, then enhance for larger breakpoints.
- Avoid heavy dependencies; keep to semantic HTML + vanilla JS + CSS.
- Keep components and section responsibilities clear and small.
- Keep mock content in `data/mockData.js`.

## Workflow expectations
- After each meaningful change, run at least one quick self-check (syntax or local preview command).
- If visual UI changed, capture at least one screenshot for review when tooling is available.
- Preserve multi-page templates: `index.html`, `overview.html`, `artist.html`, `artwork.html`, `topic.html`.
