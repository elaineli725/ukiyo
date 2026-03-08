const STORE_KEY = 'catalogStoreV1';

const CATEGORY_RULES = [
  { category: '开发', keywords: ['bug', 'debug', '代码', 'coding', 'api', '脚本', '函数'] },
  { category: '写作', keywords: ['文章', '写作', '润色', '标题', '摘要'] },
  { category: '学习', keywords: ['学习', '解释', '教程', '概念', '入门'] }
];

chrome.runtime.onInstalled.addListener(async () => {
  const existing = await readStore();
  if (!existing) {
    await writeStore({
      messages: [],
      conversations: {},
      index: { byConversation: {} }
    });
  }
});

chrome.action.onClicked.addListener(async (tab) => {
  if (!tab?.windowId) return;
  await chrome.sidePanel.open({ windowId: tab.windowId });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  void (async () => {
    switch (message?.type) {
      case 'MESSAGE_CAPTURED': {
        const saved = await upsertMessage(message.payload);
        sendResponse({ ok: true, saved });
        break;
      }
      case 'GET_CATALOG': {
        const store = await readStore();
        sendResponse({ ok: true, store: store ?? emptyStore() });
        break;
      }
      case 'UPDATE_TAGS': {
        const updated = await updateTags(message.id, message.tags);
        sendResponse({ ok: true, updated });
        break;
      }
      case 'EXPORT_CATALOG': {
        const store = await readStore();
        sendResponse({ ok: true, data: store ?? emptyStore() });
        break;
      }
      default:
        sendResponse({ ok: false, error: 'Unknown message type' });
    }
  })();

  return true;
});

function emptyStore() {
  return { messages: [], conversations: {}, index: { byConversation: {} } };
}

async function readStore() {
  const result = await chrome.storage.local.get(STORE_KEY);
  return result[STORE_KEY];
}

async function writeStore(store) {
  await chrome.storage.local.set({ [STORE_KEY]: store });
}

function inferCategory(text) {
  const t = text.toLowerCase();
  for (const rule of CATEGORY_RULES) {
    if (rule.keywords.some((k) => t.includes(k))) return rule.category;
  }
  return '未分类';
}

function makeSummary(text) {
  const clean = text.replace(/\s+/g, ' ').trim();
  return clean.length > 80 ? `${clean.slice(0, 80)}…` : clean;
}

async function upsertMessage(payload) {
  if (!payload?.id || !payload?.conversationId) return false;

  const store = (await readStore()) ?? emptyStore();
  const index = store.messages.findIndex((m) => m.id === payload.id);
  if (index >= 0) return false;

  const record = {
    ...payload,
    summary: makeSummary(payload.rawText || ''),
    tags: payload.tags ?? [],
    category: inferCategory(payload.rawText || ''),
    createdAt: payload.createdAt || Date.now()
  };

  store.messages.push(record);

  const conv = store.conversations[payload.conversationId] ?? {
    id: payload.conversationId,
    title: payload.conversationTitle || '未命名会话',
    createdAt: record.createdAt,
    updatedAt: record.createdAt,
    categories: []
  };

  conv.updatedAt = record.createdAt;
  if (!conv.categories.includes(record.category)) conv.categories.push(record.category);
  store.conversations[payload.conversationId] = conv;

  const list = store.index.byConversation[payload.conversationId] ?? [];
  list.push(record.id);
  store.index.byConversation[payload.conversationId] = list;

  await writeStore(store);
  return true;
}

async function updateTags(id, tags) {
  const store = (await readStore()) ?? emptyStore();
  const target = store.messages.find((m) => m.id === id);
  if (!target) return false;

  target.tags = tags;
  await writeStore(store);
  return true;
}
