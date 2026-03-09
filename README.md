# ukiyo
all things

## 爬取 ukiyo-e.org（合规版）

仓库内提供了一个轻量脚本：`scripts/scrape_ukiyoe.py`。

### 使用前请先确认
- 目标网站 `robots.txt` 与使用条款允许相应抓取行为。
- 公版作品图像不等于网站整理内容可无限制复制；请保留来源和许可字段。

### 快速开始
```bash
python3 scripts/scrape_ukiyoe.py \
  --seed-url "https://ukiyo-e.org/" \
  --obey-robots \
  --max-list-pages 20 \
  --max-detail-pages 80
```

输出：
- `data/ukiyoe_scraped.json`
- `data/ukiyoe_scraped.csv`

### 常用参数
- `--detail-pattern`：定义哪些链接被视为作品详情页（正则）。
- `--list-pattern`：定义哪些链接继续用于发现更多页面（正则）。
- `--delay`：请求间隔秒数（建议 >= 1.0）。
- `--obey-robots`：启用 robots.txt 检查（建议开启）。

### 说明
因为不同站点结构差异大，首次运行后可能需要微调 `--detail-pattern` 和 `--list-pattern`。
