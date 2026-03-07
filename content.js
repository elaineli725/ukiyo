const seen = new Set();

bootstrap();

function bootstrap() {
  collectMessages();

  const observer = new MutationObserver(() => {
    collectMessages();
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

function getConversationId() {
  const match = location.pathname.match(/\/c\/([^/]+)/);
  return match?.[1] ?? `fallback-${location.pathname}`;
}

function getConversationTitle() {
  return document.title?.replace(/\s*\|\s*ChatGPT\s*$/i, '').trim() || '未命名会话';
}

function collectMessages() {
  const nodes = document.querySelectorAll('[data-message-author-role]');
  if (!nodes.length) return;

  const conversationId = getConversationId();
  const conversationTitle = getConversationTitle();

  nodes.forEach((node, idx) => {
    const role = node.getAttribute('data-message-author-role');
    const rawText = node.textContent?.trim() ?? '';
    if (!rawText) return;

    const fingerprint = `${conversationId}:${role}:${rawText.slice(0, 120)}:${idx}`;
    if (seen.has(fingerprint)) return;
    seen.add(fingerprint);

    const id = `${conversationId}-${Date.now()}-${idx}-${Math.random().toString(36).slice(2, 8)}`;

    chrome.runtime.sendMessage({
      type: 'MESSAGE_CAPTURED',
      payload: {
        id,
        conversationId,
        conversationTitle,
        turnId: `${conversationId}-turn-${idx}`,
        role,
        rawText,
        tags: [],
        createdAt: Date.now(),
        domAnchor: `[data-message-author-role]:nth-of-type(${idx + 1})`
      }
    });
  });
}
