# ukiyo

一个可运行的 **ChatGPT 提问/回答目录插件（MV3 最小版）**。

## 已实现能力

- 自动采集 ChatGPT 页面里的提问与回答（基于 `data-message-author-role`）。
- 按会话分组显示目录，支持搜索。
- 自动分类（开发/写作/学习/未分类）。
- 支持导出 JSON 备份。
- 本地存储（`chrome.storage.local`）。

## 目录结构

- `manifest.json`：插件清单（MV3）
- `background.js`：数据存储、分类、消息路由
- `content.js`：页面采集脚本
- `sidepanel.html` / `sidepanel.css` / `sidepanel.js`：侧栏目录 UI

## 本地运行

1. 打开 Chrome/Edge：`扩展程序` -> `开发者模式`。
2. 选择 `加载已解压的扩展程序`。
3. 选择当前仓库目录。
4. 打开 `https://chatgpt.com/`。
5. 点击插件图标打开侧栏，即可看到目录。

## 数据模型（当前实现）

```ts
interface MessageRecord {
  id: string;
  conversationId: string;
  turnId: string;
  role: 'user' | 'assistant';
  rawText: string;
  summary: string;
  tags: string[];
  category: string;
  createdAt: number;
  domAnchor?: string;
}
```

## 后续建议

- 存储迁移到 IndexedDB（便于海量记录与索引）。
- 侧栏支持手动标签编辑与点击跳转定位。
- 增加 Markdown 导出与按时间目录树展示（今天/本周/本月）。
