# ukiyo

## ChatGPT 提问与回答细分目录插件设计（草案）

本设计面向一个浏览器插件（Chrome/Edge 优先），目标是在你使用 ChatGPT 网页版时，自动整理：
- 你的提问记录（按主题/时间/项目等维度）
- ChatGPT 的回答（可与提问一一映射）
- 可视化的“细分目录”（类似知识库目录树）

---

## 1. 目标与非目标

### 1.1 目标
1. 在不改变 ChatGPT 主要使用流程的前提下，提供“会话目录导航”。
2. 自动提取每轮问答，并支持手动打标签。
3. 生成可折叠目录树：
   - 时间维度（今天/本周/本月）
   - 主题维度（开发、写作、学习等）
   - 项目维度（你自定义项目）
4. 支持快速检索与跳转到对应消息。
5. 数据本地存储优先，保护隐私。

### 1.2 非目标
1. 不破解/绕过平台权限或付费机制。
2. 不自动调用未授权的 ChatGPT 私有接口。
3. 首版不做跨设备实时同步（可作为后续版本）。

---

## 2. 用户故事

1. 作为用户，我希望打开侧栏就能看到“今天问了什么、AI答了什么”。
2. 作为用户，我希望给某次提问打上“项目A/论文/代码重构”等标签。
3. 作为用户，我希望输入关键词后，直接跳到对应问答位置。
4. 作为用户，我希望导出某个目录下的问答为 Markdown。

---

## 3. 功能模块

### 3.1 目录侧栏（核心）
- 显示结构：会话 > 轮次 > 消息片段。
- 轮次节点包含：
  - 提问摘要
  - 回答摘要
  - 时间戳
  - 标签
- 点击节点可定位到页面对应消息 DOM。

### 3.2 自动归类（MVP 规则版）
- 规则分类：
  - 关键词词典（如“bug/coding -> 开发”）
  - 时间桶（今天、本周）
- 可选增强：本地小模型/云端分类（需用户显式同意）。

### 3.3 搜索与过滤
- 搜索范围：提问、回答、标签。
- 过滤器：时间范围、会话、分类、是否收藏。

### 3.4 导出与备份
- 导出 Markdown / JSON。
- 本地备份与恢复。

### 3.5 隐私控制
- 默认仅本地存储（IndexedDB）。
- 提供“一键清空数据”。
- 明示权限与数据流向。

---

## 4. 技术架构（浏览器插件）

### 4.1 组成
1. **Content Script**：
   - 注入 ChatGPT 页面
   - 监听消息 DOM 变化
   - 提取问答内容与元信息
2. **Background Service Worker**：
   - 统一事件调度
   - 与存储层交互
3. **Side Panel / Popup UI**：
   - 展示目录树、搜索、过滤
4. **Storage 层**：
   - IndexedDB（主存）
   - chrome.storage（轻量配置）

### 4.2 数据流
1. 页面新增问答 -> Content Script 捕获。
2. 生成 message 对象并关联 conversationId / turnId。
3. 存储层更新索引（时间、标签、关键词）。
4. 侧栏实时渲染目录。

---

## 5. 数据模型（建议）

```ts
type Role = 'user' | 'assistant';

interface MessageRecord {
  id: string;
  conversationId: string;
  turnId: string;
  role: Role;
  rawText: string;
  summary: string;
  tags: string[];
  createdAt: number;
  domAnchor?: string; // 用于定位页面节点
}

interface ConversationRecord {
  id: string;
  title: string;
  createdAt: number;
  updatedAt: number;
  categories: string[];
}
```

索引建议：
- `message.createdAt`
- `message.conversationId`
- `message.tags`
- `message.summary`（可做前缀/全文检索）

---

## 6. MVP 开发里程碑

### M1（1~2 周）
- 基础数据采集（问答抓取）
- 目录侧栏展示
- 点击跳转定位

### M2（1 周）
- 搜索与过滤
- 手动标签
- 导出 Markdown

### M3（1 周）
- 自动分类规则
- 备份恢复
- 性能优化（大于 2000 条消息）

---

## 7. 风险与应对

1. **页面 DOM 结构变动**
   - 应对：抽象多套选择器策略 + 版本监控。
2. **性能问题（长会话）**
   - 应对：增量采集、虚拟列表、延迟摘要。
3. **隐私顾虑**
   - 应对：默认离线、本地处理、透明权限说明。

---

## 8. 下一步（如果你要我继续）

我可以继续给你：
1. `manifest.json`（MV3）模板；
2. 目录侧栏 UI 线框；
3. Content Script 抓取逻辑样例；
4. IndexedDB 表结构与初始化代码；
5. 一个可直接运行的最小插件骨架。

