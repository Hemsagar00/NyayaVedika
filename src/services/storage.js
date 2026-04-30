/**
 * NyayaVedika — Local Storage Service
 * Draft history, snippets/templates, favorites
 */

const KEYS = {
  history: 'nv_draft_history',
  snippets: 'nv_snippets',
  favorites: 'nv_favorites',
  theme: 'nv_theme',
  chatHistory: 'nv_chat_history',
};

// ─── Draft History ───
export function getDraftHistory() {
  try {
    return JSON.parse(localStorage.getItem(KEYS.history)) || [];
  } catch { return []; }
}

export function saveDraftToHistory(draft) {
  const history = getDraftHistory();
  history.unshift({
    id: Date.now(),
    title: draft.title || 'Untitled Draft',
    type: draft.type || '',
    court: draft.court || '',
    content: draft.content || '',
    timestamp: new Date().toISOString(),
  });
  // Keep last 50 drafts
  if (history.length > 50) history.length = 50;
  localStorage.setItem(KEYS.history, JSON.stringify(history));
  return history;
}

export function deleteDraftFromHistory(id) {
  const history = getDraftHistory().filter(d => d.id !== id);
  localStorage.setItem(KEYS.history, JSON.stringify(history));
  return history;
}

export function clearDraftHistory() {
  localStorage.removeItem(KEYS.history);
}

// ─── Snippets / Templates ───
export function getSnippets() {
  try {
    return JSON.parse(localStorage.getItem(KEYS.snippets)) || [];
  } catch { return []; }
}

export function saveSnippet(snippet) {
  const snippets = getSnippets();
  snippets.unshift({
    id: Date.now(),
    title: snippet.title || 'Untitled Snippet',
    content: snippet.content || '',
    category: snippet.category || 'General',
    timestamp: new Date().toISOString(),
  });
  localStorage.setItem(KEYS.snippets, JSON.stringify(snippets));
  return snippets;
}

export function deleteSnippet(id) {
  const snippets = getSnippets().filter(s => s.id !== id);
  localStorage.setItem(KEYS.snippets, JSON.stringify(snippets));
  return snippets;
}

// ─── Favorites (Quick-Access Document Types) ───
export function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem(KEYS.favorites)) || [];
  } catch { return []; }
}

export function toggleFavorite(docType) {
  let favs = getFavorites();
  const idx = favs.indexOf(docType);
  if (idx >= 0) {
    favs.splice(idx, 1);
  } else {
    favs.push(docType);
    if (favs.length > 8) favs.shift();
  }
  localStorage.setItem(KEYS.favorites, JSON.stringify(favs));
  return favs;
}

// ─── Theme ───
export function getTheme() {
  return localStorage.getItem(KEYS.theme) || 'dark';
}

export function setTheme(theme) {
  localStorage.setItem(KEYS.theme, theme);
  document.documentElement.setAttribute('data-theme', theme);
}

export function toggleTheme() {
  const current = getTheme();
  const next = current === 'dark' ? 'light' : 'dark';
  setTheme(next);
  return next;
}

// ─── Chat History ───
export function getChatHistory() {
  try {
    return JSON.parse(localStorage.getItem(KEYS.chatHistory)) || [];
  } catch { return []; }
}

export function saveChatMessage(role, content) {
  const chat = getChatHistory();
  chat.push({ role, content, timestamp: Date.now() });
  if (chat.length > 100) chat.splice(0, chat.length - 100);
  localStorage.setItem(KEYS.chatHistory, JSON.stringify(chat));
  return chat;
}

export function clearChatHistory() {
  localStorage.removeItem(KEYS.chatHistory);
}
