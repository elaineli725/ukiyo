const catalogEl = document.querySelector('#catalog');
const template = document.querySelector('#messageTemplate');
const searchInput = document.querySelector('#searchInput');

document.querySelector('#refreshBtn').addEventListener('click', load);
document.querySelector('#exportBtn').addEventListener('click', exportCatalog);
searchInput.addEventListener('input', load);

load();

async function load() {
  const res = await chrome.runtime.sendMessage({ type: 'GET_CATALOG' });
  if (!res?.ok) return;

  const q = searchInput.value.trim().toLowerCase();
  render(res.store, q);
}

function render(store, query) {
  catalogEl.innerHTML = '';

  const byConversation = new Map();
  for (const msg of store.messages) {
    if (!matches(msg, query)) continue;
    const list = byConversation.get(msg.conversationId) ?? [];
    list.push(msg);
    byConversation.set(msg.conversationId, list);
  }

  const sortedGroups = [...byConversation.entries()].sort((a, b) => {
    const aLatest = Math.max(...a[1].map((m) => m.createdAt));
    const bLatest = Math.max(...b[1].map((m) => m.createdAt));
    return bLatest - aLatest;
  });

  if (!sortedGroups.length) {
    catalogEl.innerHTML = '<p>暂无匹配记录，先去 ChatGPT 页面问点问题吧。</p>';
    return;
  }

  for (const [conversationId, messages] of sortedGroups) {
    const wrap = document.createElement('section');
    wrap.className = 'group';

    const title = document.createElement('h2');
    const conv = store.conversations[conversationId];
    title.textContent = conv?.title || '未命名会话';
    wrap.appendChild(title);

    messages
      .sort((a, b) => b.createdAt - a.createdAt)
      .forEach((message) => wrap.appendChild(renderMessage(message)));

    catalogEl.appendChild(wrap);
  }
}

function renderMessage(message) {
  const fragment = template.content.cloneNode(true);
  fragment.querySelector('.role').textContent = message.role === 'user' ? '提问' : '回答';
  fragment.querySelector('.time').textContent = new Date(message.createdAt).toLocaleString();
  fragment.querySelector('.category').textContent = `#${message.category || '未分类'}`;
  fragment.querySelector('.summary').textContent = message.summary || '(空)';

  const tagsEl = fragment.querySelector('.tags');
  if ((message.tags || []).length === 0) {
    tagsEl.innerHTML = '<span class="tag">无标签</span>';
  } else {
    for (const tag of message.tags) {
      const span = document.createElement('span');
      span.className = 'tag';
      span.textContent = tag;
      tagsEl.appendChild(span);
    }
  }

  return fragment;
}

function matches(msg, query) {
  if (!query) return true;
  return [msg.rawText, msg.summary, ...(msg.tags || [])]
    .join(' ')
    .toLowerCase()
    .includes(query);
}

async function exportCatalog() {
  const res = await chrome.runtime.sendMessage({ type: 'EXPORT_CATALOG' });
  if (!res?.ok) return;

  const blob = new Blob([JSON.stringify(res.data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  await chrome.downloads.download({
    url,
    filename: `chatgpt-catalog-${Date.now()}.json`,
    saveAs: true
  });
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}
