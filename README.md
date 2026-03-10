# ukiyo
all things

## Floating World / 江户绮梦
这是一个移动端优先的浮世绘前端 demo，采用「数据驱动 + 多页面模板」结构。

### 页面
- `index.html` 首页
- `overview.html` 往事·历史
- `artist.html` 美人·才子·英雄
- `topic.html` 神话·妖鬼
- `artwork.html` 浮世·风景
- `creators.html` 代表画家
- `about.html` 关于

### 内容从哪里改
统一在 `data/mockData.js` 里修改：
- 第一屏背景图：`home.hero.backgroundImage`
- 第二屏入口：`home.portals.items`
- 各栏目页面：`pages.xxx`

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


### 首页背景图（你给的图片）
默认读取：`assets/images/hero-yugao-user.jpg`。
- 你只需要把你提供的那张图放到这个路径即可生效。
- 若本地文件缺失，会自动回退到 `data/mockData.js` 里配置的外部同款图地址。
