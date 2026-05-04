/**
 * NyayaVedika — AI Drafting Panel
 * Drop-in UI component for AI-powered document generation
 * 7 tabs matching Supreme Today AI feature set
 * Mounts into any container via mountDraftingPanel(containerId)
 */

import {
  draftDocument, suggestGrounds, summarizeDocument, explainClause,
  askQuestion, analyzeCase, findCaseLaws, writeSubmission,
  abortActiveRequest, getLatestNews
} from '../services/aiService.js';
import {
  getDraftHistory, saveDraftToHistory, deleteDraftFromHistory,
  getSnippets, saveSnippet, deleteSnippet,
  getFavorites, toggleFavorite,
  getChatHistory, saveChatMessage, clearChatHistory,
} from '../services/storage.js';
import { exportDocument } from '../services/docxExport.js';

// HTML escape utility to prevent XSS
function escapeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/* ── Inject drafting panel styles ── */
function injectStyles() {
  if (document.getElementById('nv-drafting-styles')) return;
  const style = document.createElement('style');
  style.id = 'nv-drafting-styles';
  style.textContent = `
    .drafting-layout {
      display: grid;
      grid-template-columns: 1fr 320px;
      gap: 24px;
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 24px;
      align-items: start;
    }
    .drafting-main { min-width: 0; }

    /* News ticker */
    .scrolling-ticker-wrap {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-full);
      padding: 8px 16px;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      gap: 12px;
      overflow: hidden;
    }
    .ticker-badge {
      background: var(--color-accent);
      color: #000;
      padding: 3px 10px;
      border-radius: var(--radius-sm);
      font-size: 0.7rem;
      font-weight: 700;
      white-space: nowrap;
      flex-shrink: 0;
    }
    .scrolling-ticker { overflow: hidden; flex: 1; }
    .ticker-track { white-space: nowrap; animation: ticker-scroll 30s linear infinite; font-size: 0.85rem; color: var(--color-text-muted); }
    @keyframes ticker-scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

    /* AI Panel */
    .ai-panel {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      overflow: hidden;
      box-shadow: var(--shadow-lg);
    }
    .ai-panel-header {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 20px 24px;
      border-bottom: 1px solid var(--color-border);
      background: var(--color-surface-raised);
    }
    .ai-panel-icon {
      font-size: 1.6rem;
      color: var(--color-accent);
    }
    .ai-panel-title {
      font-family: var(--font-heading);
      font-size: 1.2rem;
      color: var(--color-text);
      margin: 0;
    }
    .ai-panel-sub {
      font-size: 0.8rem;
      color: var(--color-text-muted);
      margin: 2px 0 0;
    }
    .ai-status {
      margin-left: auto;
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.8rem;
      color: var(--color-text-muted);
    }
    .status-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #22c55e;
      display: inline-block;
    }
    .status-loading .status-dot { background: #f59e0b; animation: pulse-dot 1s infinite; }
    .status-error .status-dot { background: #ef4444; }
    @keyframes pulse-dot { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }

    /* Tabs */
    .ai-tabs {
      display: flex;
      gap: 2px;
      padding: 12px 16px;
      border-bottom: 1px solid var(--color-border);
      overflow-x: auto;
      background: var(--color-bg);
    }
    .ai-tab {
      padding: 8px 16px;
      border-radius: var(--radius-md);
      font-size: 0.82rem;
      font-weight: 500;
      color: var(--color-text-muted);
      background: transparent;
      border: none;
      cursor: pointer;
      white-space: nowrap;
      transition: all var(--duration-fast);
    }
    .ai-tab:hover { color: var(--color-text); background: var(--color-accent-soft); }
    .ai-tab.active { background: var(--color-accent); color: #000; }

    /* Tab content */
    .ai-tab-content { display: none; padding: 24px; }
    .ai-tab-content.active { display: block; }
    .ask-ai-intro {
      margin-bottom: 20px;
      padding: 14px 18px;
      background: var(--color-accent-soft);
      border-radius: var(--radius-md);
      border-left: 3px solid var(--color-accent);
    }
    .ask-ai-intro p { font-size: 0.88rem; color: var(--color-text-muted); margin: 0; line-height: 1.6; }

    /* Form elements */
    .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .form-group { margin-bottom: 0; }
    .form-label {
      display: block;
      font-size: 0.82rem;
      font-weight: 600;
      color: var(--color-text-secondary);
      margin-bottom: 6px;
    }
    .form-input, .form-select, .form-textarea {
      width: 100%;
      background: var(--color-bg);
      border: 1px solid var(--color-border);
      color: var(--color-text);
      border-radius: var(--radius-md);
      padding: 12px 16px;
      font-size: 0.9rem;
      font-family: var(--font-body);
      transition: border-color var(--duration-fast);
    }
    .form-textarea { resize: vertical; min-height: 100px; line-height: 1.6; }
    .form-input:focus, .form-select:focus, .form-textarea:focus { border-color: var(--color-accent); outline: none; }
    .form-select { cursor: pointer; }
    .form-input::placeholder, .form-textarea::placeholder { color: var(--color-text-muted); }
    .mt-16 { margin-top: 16px; }
    .mt-20 { margin-top: 20px; }
    .btn-block { width: 100%; }

    /* Chat */
    .chat-container {
      display: flex;
      flex-direction: column;
      height: 420px;
    }
    .chat-messages {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .chat-msg { display: flex; gap: 10px; align-items: flex-start; }
    .chat-msg.user { flex-direction: row-reverse; }
    .chat-avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: var(--color-surface-raised);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.9rem;
      flex-shrink: 0;
      color: var(--color-accent);
    }
    .user-avatar { background: var(--color-accent-soft); color: var(--color-text); }
    .chat-bubble {
      background: var(--color-surface-raised);
      padding: 12px 16px;
      border-radius: var(--radius-md);
      font-size: 0.9rem;
      line-height: 1.6;
      max-width: 80%;
      color: var(--color-text);
    }
    .user-bubble {
      background: var(--color-accent);
      color: #000;
    }
    .chat-hint { font-size: 0.8rem; color: var(--color-text-muted); margin-top: 8px; border-top: 1px solid var(--color-border); padding-top: 8px; }
    .chat-input-area {
      padding: 16px;
      border-top: 1px solid var(--color-border);
      background: var(--color-bg);
    }
    .chat-input {
      width: 100%;
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      color: var(--color-text);
      border-radius: var(--radius-md);
      padding: 12px 16px;
      font-size: 0.9rem;
      font-family: var(--font-body);
      resize: none;
      margin-bottom: 10px;
    }
    .chat-input:focus { border-color: var(--color-accent); outline: none; }
    .chat-actions { display: flex; justify-content: flex-end; gap: 8px; }

    /* Output */
    .ai-output {
      margin: 24px;
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      overflow: hidden;
    }
    .output-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 18px;
      background: var(--color-surface-raised);
      border-bottom: 1px solid var(--color-border);
      flex-wrap: wrap;
      gap: 8px;
    }
    .output-title { font-size: 0.82rem; font-weight: 600; color: var(--color-accent); }
    .output-actions { display: flex; gap: 6px; flex-wrap: wrap; }
    .output-body {
      padding: 20px 24px;
      max-height: 480px;
      overflow-y: auto;
      font-size: 0.9rem;
      line-height: 1.8;
      white-space: pre-wrap;
      font-family: var(--font-body);
      color: var(--color-text);
    }

    /* Loading / Error */
    .ai-loading {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      padding: 40px 24px;
      margin: 24px;
      background: var(--color-surface-raised);
      border-radius: var(--radius-md);
      border: 1px solid var(--color-border);
    }
    .loading-spinner {
      width: 36px;
      height: 36px;
      border: 3px solid var(--color-border);
      border-top-color: var(--color-accent);
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    .loading-text { font-size: 0.9rem; color: var(--color-text-muted); }

    .ai-error {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px 20px;
      margin: 24px;
      background: rgba(239, 68, 68, 0.08);
      border: 1px solid rgba(239, 68, 68, 0.25);
      border-radius: var(--radius-md);
      color: #ef4444;
      font-size: 0.9rem;
    }

    /* Sidebar */
    .live-widget-sidebar {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      overflow: hidden;
      position: sticky;
      top: 84px;
    }
    .widget-header {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 18px 20px;
      border-bottom: 1px solid var(--color-border);
    }
    .widget-header h3 {
      font-family: var(--font-heading);
      font-size: 1rem;
      color: var(--color-text);
      margin: 0;
    }
    .live-pulse {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: var(--color-accent);
      animation: pulse-dot 1.5s infinite;
      margin-left: auto;
    }
    .widget-tabs {
      display: flex;
      gap: 2px;
      padding: 8px;
      border-bottom: 1px solid var(--color-border);
      background: var(--color-bg);
    }
    .widget-tab {
      flex: 1;
      padding: 8px;
      font-size: 0.72rem;
      font-weight: 600;
      color: var(--color-text-muted);
      background: transparent;
      border: none;
      border-radius: var(--radius-sm);
      cursor: pointer;
      white-space: nowrap;
    }
    .widget-tab.active { background: var(--color-accent); color: #000; }
    .widget-content { padding: 16px; }
    .widget-loading {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      padding: 24px;
    }
    .widget-feed {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .widget-feed .news-card {
      background: var(--color-bg);
      padding: 14px;
      border-radius: var(--radius-md);
      border: 1px solid var(--color-border-subtle);
    }
    .widget-feed .news-card h4 {
      font-size: 0.85rem;
      color: var(--color-text);
      margin-bottom: 6px;
      line-height: 1.4;
    }
    .widget-feed .news-card p {
      font-size: 0.78rem;
      color: var(--color-text-muted);
      line-height: 1.5;
    }

    /* Favorites bar */
    .favorites-bar {
      padding: 10px 24px;
      border-bottom: 1px solid var(--color-border);
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
      background: var(--color-accent-soft);
    }
    .favorites-label { font-size: 0.75rem; font-weight: 600; color: var(--color-accent); white-space: nowrap; }
    .favorites-list { display: flex; gap: 6px; flex-wrap: wrap; }
    .fav-chip {
      padding: 4px 10px;
      font-size: 0.72rem;
      border-radius: var(--radius-full);
      background: var(--color-bg);
      color: var(--color-text-muted);
      border: 1px solid var(--color-border);
      cursor: pointer;
      transition: all var(--duration-fast);
    }
    .fav-chip:hover { border-color: var(--color-accent); color: var(--color-accent); }

    /* History & Snippets panels */
    .history-panel, .snippets-panel {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      padding: 20px;
      max-height: 420px;
      overflow-y: auto;
    }
    .history-header, .snippets-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
      padding-bottom: 12px;
      border-bottom: 1px solid var(--color-border);
    }
    .history-header h3, .snippets-header h3 {
      font-family: var(--font-heading);
      font-size: 1rem;
      color: var(--color-text);
      margin: 0;
    }
    .history-item, .snippet-item {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      padding: 12px 0;
      border-bottom: 1px solid var(--color-border-subtle);
      gap: 12px;
    }
    .history-item-info, .snippet-item-info { flex: 1; min-width: 0; }
    .history-item-info strong, .snippet-item-info strong { display: block; font-size: 0.88rem; color: var(--color-text); margin-bottom: 4px; }
    .history-meta, .snippet-category { font-size: 0.75rem; color: var(--color-accent); }
    .history-date, .snippet-preview { font-size: 0.75rem; color: var(--color-text-muted); display: block; margin-top: 2px; }
    .history-item-actions, .snippet-item-actions { display: flex; gap: 4px; flex-shrink: 0; }
    .history-empty, .snippets-empty { font-size: 0.88rem; color: var(--color-text-muted); text-align: center; padding: 24px; }

    /* Side actions */
    .panel-side-actions {
      display: flex;
      gap: 8px;
      padding: 12px 0;
    }

    /* Responsive */
    @media (max-width: 900px) {
      .drafting-layout { grid-template-columns: 1fr; }
      .live-widget-sidebar { position: static; }
      .form-grid { grid-template-columns: 1fr; }
      .chat-container { height: 360px; }
    }
  `;
  document.head.appendChild(style);
}

const DOC_TYPES = [
  'Bail Application',
  'Anticipatory Bail Application',
  'NDPS Bail Application (Section 37)',
  'Default Bail Application (Section 187 BNSS / 167 CrPC)',
  'Writ Petition (Article 226)',
  'Writ Petition (Article 32)',
  'Special Leave Petition (SLP)',
  'Revenue Appeal',
  'Civil Suit',
  'Criminal Revision Petition',
  'Quashing Petition (Section 528 BNSS / 482 CrPC)',
  'Execution Petition',
  'Mutation Application',
  'Interlocutory Application (IA)',
  'Contempt Petition',
  'Legal Notice (Demand / Eviction / Breach)',
  'Reply to Legal Notice',
  'Written Submission / Written Arguments',
  'PIL (Public Interest Litigation)',
  'Habeas Corpus Petition',
  'Consumer Complaint',
  'Cheque Bounce Complaint (NI Act 138)',
  'Divorce Petition',
  'DV Act Application',
  'Rent Control Application',
];

const COURTS = [
  // Supreme Court
  'Supreme Court of India',
  // High Courts — all 25
  'High Court of Andhra Pradesh',
  'High Court of Telangana',
  'Allahabad High Court',
  'Bombay High Court',
  'Calcutta High Court',
  'Chhattisgarh High Court',
  'Delhi High Court',
  'Gauhati High Court',
  'Gujarat High Court',
  'Himachal Pradesh High Court',
  'Jammu & Kashmir High Court',
  'Jharkhand High Court',
  'Karnataka High Court',
  'Kerala High Court',
  'Madhya Pradesh High Court',
  'Madras High Court',
  'Manipur High Court',
  'Meghalaya High Court',
  'Nagpur Bench (Bombay HC)',
  'Orissa High Court',
  'Patna High Court',
  'Punjab & Haryana High Court',
  'Rajasthan High Court',
  'Sikkim High Court',
  'Tripura High Court',
  'Uttarakhand High Court',
  // District Courts
  'District & Sessions Court',
  'Civil Judge (Senior Division)',
  'First Class Judicial Magistrate',
  'Metropolitan Magistrate Court',
  // Revenue Authorities
  'Revenue Divisional Officer (RDO)',
  'Tahsildar Office',
  'Joint Collector',
  // Tribunals
  'National Consumer Disputes Redressal Commission (NCDRC)',
  'State Consumer Disputes Redressal Commission',
  'District Consumer Forum',
  'National Company Law Tribunal (NCLT)',
  'National Company Law Appellate Tribunal (NCLAT)',
  'Income Tax Appellate Tribunal (ITAT)',
  'Central Administrative Tribunal (CAT)',
  'National Green Tribunal (NGT)',
  'Real Estate Regulatory Authority (RERA)',
  'Debt Recovery Tribunal (DRT)',
  'SEBI - Securities Appellate Tribunal (SAT)',
  'Customs Excise & Service Tax Appellate Tribunal (CESTAT)',
];

export function mountDraftingPanel(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  injectStyles();
  container.innerHTML = getPanelHTML();
  attachPanelEvents(container);
}

function getPanelHTML() {
  return `
<div class="drafting-layout">
  <div class="drafting-main">
    <div class="scrolling-ticker-wrap">
      <span class="ticker-badge">🔴 LIVE BREAKING</span>
      <div class="scrolling-ticker" id="news-ticker"><div class="ticker-track">Fetching latest legal updates and breaking court news...</div></div>
    </div>

    <div class="ai-panel" id="ai-drafting-panel">
      <div class="ai-panel-header">
        <span class="ai-panel-icon">◈</span>
        <div>
          <h2 class="ai-panel-title">NyayaVedika AI</h2>
          <p class="ai-panel-sub">AI-powered legal drafting, research & analysis</p>
        </div>
        <span class="ai-status" id="ai-status-indicator">
          <span class="status-dot"></span> Ready
        </span>
      </div>

  <div class="ai-tabs" role="tablist" aria-label="AI tools" id="ai-tabs">
    <button class="ai-tab active" data-tab="ask" role="tab" aria-selected="true" aria-controls="tab-ask" id="tab-btn-ask">💬 Ask AI</button>
    <button class="ai-tab" data-tab="draft" role="tab" aria-selected="false" aria-controls="tab-draft" id="tab-btn-draft">📄 Draft</button>
    <button class="ai-tab" data-tab="caselaws" role="tab" aria-selected="false" aria-controls="tab-caselaws" id="tab-btn-caselaws">🔍 Case Laws</button>
    <button class="ai-tab" data-tab="analyze" role="tab" aria-selected="false" aria-controls="tab-analyze" id="tab-btn-analyze">📋 Analyze</button>
    <button class="ai-tab" data-tab="grounds" role="tab" aria-selected="false" aria-controls="tab-grounds" id="tab-btn-grounds">⚖️ Grounds</button>
    <button class="ai-tab" data-tab="summarize" role="tab" aria-selected="false" aria-controls="tab-summarize" id="tab-btn-summarize">📑 Summarize</button>
    <button class="ai-tab" data-tab="explain" role="tab" aria-selected="false" aria-controls="tab-explain" id="tab-btn-explain">💡 Explain</button>
  </div>

  <!-- Favorites Quick-Access Bar -->
  <div class="favorites-bar" id="favorites-bar" style="display:none">
    <span class="favorites-label">⭐ Quick Access:</span>
    <div class="favorites-list" id="favorites-list"></div>
  </div>

  <!-- TAB: Ask AI (Chat-style) -->
  <div class="ai-tab-content active" id="tab-ask" role="tabpanel" aria-labelledby="tab-btn-ask">
    <div class="chat-container" id="chat-container">
      <div class="chat-messages" id="chat-messages">
        <div class="chat-msg assistant">
          <div class="chat-avatar">◈</div>
          <div class="chat-bubble">
            <p>Welcome to NyayaVedika AI. Ask me any legal question — I'll provide detailed answers with relevant statutes, case law, and practical guidance under Indian law.</p>
            <p class="chat-hint">Try: <em>"What are the twin conditions for bail under Section 37 NDPS Act?"</em> or <em>"Explain Article 226 vs 227"</em></p>
          </div>
        </div>
      </div>
      <div class="chat-input-area">
        <textarea class="chat-input" id="chat-input" rows="2" placeholder="Ask a legal question..." aria-label="Type your legal question"></textarea>
        <div class="chat-actions">
          <button class="btn btn-outline btn-sm" id="btn-chat-clear" title="Clear chat">Clear</button>
          <button class="btn btn-primary btn-sm" id="btn-chat-send">
            <span class="btn-icon">💬</span> Send <small>(Ctrl+Enter)</small>
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- TAB: Draft Document -->
  <div class="ai-tab-content" id="tab-draft" role="tabpanel" aria-labelledby="tab-btn-draft">
    <div class="form-grid">
      <div class="form-group">
        <label class="form-label">Document Type</label>
        <select class="form-select" id="doc-type">
          <option value="">— Select —</option>
          ${DOC_TYPES.map(d => `<option value="${d}">${d}</option>`).join('')}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Court / Authority</label>
        <select class="form-select" id="court-name">
          <option value="">— Select —</option>
          ${COURTS.map(c => `<option value="${c}">${c}</option>`).join('')}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Petitioner / Applicant</label>
        <input class="form-input" id="petitioner" placeholder="Full name, age, address" />
      </div>
      <div class="form-group">
        <label class="form-label">Respondent / Opposite Party</label>
        <input class="form-input" id="respondent" placeholder="Name, designation or authority" />
      </div>
    </div>
    <div class="form-group mt-16">
      <label class="form-label">Facts of the Case</label>
      <textarea class="form-textarea" id="facts" rows="5" placeholder="Describe the background facts, incident, dates, and relevant details..."></textarea>
    </div>
    <div class="form-group mt-16">
      <label class="form-label">Relief Sought</label>
      <textarea class="form-textarea" id="relief" rows="3" placeholder="What relief or order do you want the court to pass?"></textarea>
    </div>
    <button class="btn btn-primary btn-block mt-20" id="btn-draft">
      <span class="btn-icon">⚡</span> Generate Draft
    </button>
  </div>

  <!-- TAB: Find Case Laws -->
  <div class="ai-tab-content" id="tab-caselaws" role="tabpanel" aria-labelledby="tab-btn-caselaws">
    <div class="ask-ai-intro">
      <p>Enter a legal topic or issue — AI will find and explain the most relevant Supreme Court & High Court precedents.</p>
    </div>
    <div class="form-group">
      <label class="form-label">Legal Topic / Issue</label>
      <input class="form-input" id="caselaws-topic" placeholder="e.g. Section 37 NDPS Act twin conditions for bail" />
    </div>
    <div class="form-group mt-16">
      <label class="form-label">Case Facts (optional)</label>
      <textarea class="form-textarea" id="caselaws-facts" rows="4" placeholder="Add your specific case facts for more relevant results..."></textarea>
    </div>
    <button class="btn btn-primary btn-block mt-20" id="btn-caselaws">
      <span class="btn-icon">🔍</span> Find Relevant Case Laws
    </button>
  </div>

  <!-- TAB: Analyze Case -->
  <div class="ai-tab-content" id="tab-analyze" role="tabpanel" aria-labelledby="tab-btn-analyze">
    <div class="ask-ai-intro">
      <p>Paste any case material — chargesheet, judgment, FIR, order — and get a comprehensive AI analysis with parties, issues, applicable law, and strategy.</p>
    </div>
    <div class="form-group">
      <label class="form-label">Paste Case Material</label>
      <textarea class="form-textarea" id="analyze-text" rows="10" placeholder="Paste the full text of an FIR, chargesheet, judgment, court order, or any case document..."></textarea>
    </div>
    <button class="btn btn-primary btn-block mt-20" id="btn-analyze">
      <span class="btn-icon">📋</span> Analyze Case
    </button>
  </div>

  <!-- TAB: Suggest Grounds -->
  <div class="ai-tab-content" id="tab-grounds" role="tabpanel" aria-labelledby="tab-btn-grounds">
    <div class="form-group">
      <label class="form-label">Document Type</label>
      <select class="form-select" id="grounds-doc-type">
        <option value="">— Select —</option>
        ${DOC_TYPES.map(d => `<option value="${d}">${d}</option>`).join('')}
      </select>
    </div>
    <div class="form-group mt-16">
      <label class="form-label">Facts of the Case</label>
      <textarea class="form-textarea" id="grounds-facts" rows="6" placeholder="Describe your client's situation and relevant background..."></textarea>
    </div>
    <button class="btn btn-primary btn-block mt-20" id="btn-grounds">
      <span class="btn-icon">⚖️</span> Suggest Legal Grounds
    </button>
  </div>

  <!-- TAB: Summarize -->
  <div class="ai-tab-content" id="tab-summarize" role="tabpanel" aria-labelledby="tab-btn-summarize">
    <div class="form-group">
      <label class="form-label">Paste Document Text</label>
      <textarea class="form-textarea" id="summary-text" rows="10" placeholder="Paste the text of a judgment, order, deed, or any legal document..."></textarea>
    </div>
    <button class="btn btn-primary btn-block mt-20" id="btn-summarize">
      <span class="btn-icon">📑</span> Summarize Document
    </button>
  </div>

  <!-- TAB: Explain Clause -->
  <div class="ai-tab-content" id="tab-explain" role="tabpanel" aria-labelledby="tab-btn-explain">
    <div class="form-group">
      <label class="form-label">Paste Clause or Legal Text</label>
      <textarea class="form-textarea" id="clause-text" rows="6" placeholder="Paste a specific clause, section, or legal provision to get a plain-English explanation..."></textarea>
    </div>
    <button class="btn btn-primary btn-block mt-20" id="btn-explain">
      <span class="btn-icon">💡</span> Explain This Clause
    </button>
  </div>

  <!-- OUTPUT AREA -->
  <div class="ai-output" id="ai-output" style="display:none">
    <div class="output-header">
      <span class="output-title">Generated Output</span>
      <div class="output-actions">
        <button class="btn btn-outline btn-sm" id="btn-copy">Copy</button>
        <button class="btn btn-outline btn-sm" id="btn-download-txt">Save .txt</button>
        <button class="btn btn-outline btn-sm" id="btn-download-doc">Save .doc</button>
        <button class="btn btn-outline btn-sm" id="btn-download-docx">Save .docx</button>
        <button class="btn btn-outline btn-sm" id="btn-save-snippet" title="Save as snippet">☆ Save</button>
        <button class="btn btn-outline btn-sm" id="btn-clear">Clear</button>
      </div>
    </div>
    <div class="output-body" id="output-body"></div>
  </div>

  <!-- ERROR STATE -->
  <div class="ai-error" id="ai-error" style="display:none" role="alert">
    <span class="error-icon">&#x26A0;&#xFE0F;</span>
    <p class="error-text" id="error-text"></p>
  </div>

  <!-- LOADING STATE -->
  <div class="ai-loading" id="ai-loading" style="display:none" role="status" aria-live="polite">
    <div class="loading-spinner" aria-hidden="true"></div>
    <p class="loading-text" id="loading-text">Generating draft...</p>
    <button class="btn btn-outline btn-sm" id="btn-cancel">Cancel</button>
  </div>

  <!-- SNIPPETS MODAL -->
  <div class="snippets-panel" id="snippets-panel" style="display:none">
    <div class="snippets-header">
      <h3>📋 Saved Snippets</h3>
      <button class="btn btn-outline btn-sm" id="btn-snippets-close">✕</button>
    </div>
    <div class="snippets-list" id="snippets-list">
      <p class="snippets-empty">No snippets saved yet. Save generated outputs or frequently used text as snippets for quick reuse.</p>
    </div>
  </div>

  <!-- HISTORY PANEL -->
  <div class="history-panel" id="history-panel" style="display:none">
    <div class="history-header">
      <h3>📜 Draft History</h3>
      <button class="btn btn-outline btn-sm" id="btn-history-close">✕</button>
    </div>
    <div class="history-list" id="history-list">
      <p class="history-empty">No drafts generated yet. Your generated documents will appear here.</p>
    </div>
  </div>

  </div>
    </div> <!-- end ai-panel -->
    <div class="panel-side-actions">
      <button class="btn btn-outline btn-sm" id="btn-show-history" title="Draft History">📜 History</button>
      <button class="btn btn-outline btn-sm" id="btn-show-snippets" title="Saved Snippets">📋 Snippets</button>
    </div>
  </div> <!-- end drafting-main -->

  <div class="live-widget-sidebar">
    <div class="widget-header">
      <h3>Latest Judgments</h3>
      <span class="live-pulse"></span>
    </div>
    <div class="widget-tabs" id="widget-tabs">
      <button class="widget-tab active" data-wtab="Supreme Court">SC News</button>
      <button class="widget-tab" data-wtab="High Court">HC News</button>
      <button class="widget-tab" data-wtab="Tribunals">Tribunals</button>
    </div>
    <div class="widget-content" id="widget-news-content">
      <div class="widget-loading" id="widget-loading">
        <div class="loading-spinner"></div>
        <p>Fetching live feed...</p>
      </div>
      <div class="widget-feed" id="widget-feed" style="display:none;"></div>
      <div class="widget-error" id="widget-error" style="display:none; color: #f59e0b; font-size: 0.85rem; padding: 10px;"></div>
    </div>
  </div> <!-- end sidebar -->
</div> <!-- end drafting-layout -->`;
}

function attachPanelEvents(container) {
  // Tab switching
  container.querySelectorAll('.ai-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      container.querySelectorAll('.ai-tab').forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      container.querySelectorAll('.ai-tab-content').forEach(c => c.classList.remove('active'));
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      const tabId = `tab-${tab.dataset.tab}`;
      document.getElementById(tabId)?.classList.add('active');
      hideOutput();
      hideError();
    });
  });

  // Chat-style Ask AI
  function addChatMessage(role, content) {
    const msgs = document.getElementById('chat-messages');
    if (!msgs) return;
    const isUser = role === 'user';
    const div = document.createElement('div');
    div.className = `chat-msg ${role}`;
    div.innerHTML = isUser
      ? `<div class="chat-bubble user-bubble">${escapeHTML(content)}</div><div class="chat-avatar user-avatar">👤</div>`
      : `<div class="chat-avatar">◈</div><div class="chat-bubble">${content.replace(/\n/g, '<br>')}</div>`;
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function loadChatHistory() {
    const msgs = document.getElementById('chat-messages');
    if (!msgs) return;
    const history = getChatHistory();
    msgs.innerHTML = '';
    if (history.length === 0) {
      msgs.innerHTML = `<div class="chat-msg assistant">
        <div class="chat-avatar">◈</div>
        <div class="chat-bubble">
          <p>Welcome to NyayaVedika AI. Ask me any legal question — I'll provide detailed answers with relevant statutes, case law, and practical guidance under Indian law.</p>
          <p class="chat-hint">Try: <em>"What are the twin conditions for bail under Section 37 NDPS Act?"</em> or <em>"Explain Article 226 vs 227"</em></p>
        </div>
      </div>`;
      return;
    }
    history.forEach(h => addChatMessage(h.role, h.content));
  }

  async function sendChatMessage() {
    const input = document.getElementById('chat-input');
    const question = input?.value?.trim();
    if (!question) return;
    input.value = '';
    addChatMessage('user', question);
    saveChatMessage('user', question);

    hideError();
    showLoading('Analyzing...');
    try {
      const result = await askQuestion(question);
      hideLoading();
      addChatMessage('assistant', result);
      saveChatMessage('assistant', result);
    } catch (err) {
      hideLoading();
      showError(err.message);
    }
  }

  document.getElementById('btn-chat-send')?.addEventListener('click', sendChatMessage);

  document.getElementById('btn-chat-clear')?.addEventListener('click', () => {
    clearChatHistory();
    loadChatHistory();
  });

  // Load chat history on init
  loadChatHistory();

  // Draft Document
  document.getElementById('btn-draft')?.addEventListener('click', async () => {
    const params = {
      docType: document.getElementById('doc-type')?.value,
      court: document.getElementById('court-name')?.value,
      petitioner: document.getElementById('petitioner')?.value,
      respondent: document.getElementById('respondent')?.value,
      facts: document.getElementById('facts')?.value,
      reliefSought: document.getElementById('relief')?.value,
    };
    if (!params.docType || !params.court || !params.petitioner || !params.facts) {
      showError('Please fill in Document Type, Court, Petitioner, and Facts.');
      return;
    }
    await runAI('Generating draft petition...', () => draftDocument(params), {
      title: `${params.docType} — ${params.petitioner}`,
      type: params.docType,
      court: params.court,
    });
  });

  // Find Case Laws
  document.getElementById('btn-caselaws')?.addEventListener('click', async () => {
    const topic = document.getElementById('caselaws-topic')?.value;
    const facts = document.getElementById('caselaws-facts')?.value;
    if (!topic) { showError('Please enter a legal topic or issue.'); return; }
    await runAI('Searching for relevant case laws...', () => findCaseLaws(topic, facts));
  });

  // Analyze Case
  document.getElementById('btn-analyze')?.addEventListener('click', async () => {
    const text = document.getElementById('analyze-text')?.value;
    if (!text) { showError('Please paste case material to analyze.'); return; }
    await runAI('Analyzing case material...', () => analyzeCase(text));
  });

  // Suggest Grounds
  document.getElementById('btn-grounds')?.addEventListener('click', async () => {
    const docType = document.getElementById('grounds-doc-type')?.value;
    const facts = document.getElementById('grounds-facts')?.value;
    if (!docType || !facts) { showError('Please select document type and enter facts.'); return; }
    await runAI('Analyzing facts and identifying grounds...', () => suggestGrounds(docType, facts));
  });

  // Summarize
  document.getElementById('btn-summarize')?.addEventListener('click', async () => {
    const text = document.getElementById('summary-text')?.value;
    if (!text) { showError('Please paste document text to summarize.'); return; }
    await runAI('Summarizing document...', () => summarizeDocument(text));
  });

  // Explain Clause
  document.getElementById('btn-explain')?.addEventListener('click', async () => {
    const clause = document.getElementById('clause-text')?.value;
    if (!clause) { showError('Please paste a clause to explain.'); return; }
    await runAI('Analyzing clause...', () => explainClause(clause));
  });

  // Shared output reference
  let lastGeneratedContent = '';
  let lastGeneratedTitle = '';

  // Output actions
  function getOutputContent() {
    return document.getElementById('output-body')?.innerText || '';
  }

  document.getElementById('btn-copy')?.addEventListener('click', () => {
    const text = getOutputContent();
    navigator.clipboard.writeText(text).then(() => {
      const btn = document.getElementById('btn-copy');
      btn.textContent = 'Copied!';
      setTimeout(() => { btn.textContent = 'Copy'; }, 2000);
    });
  });

  document.getElementById('btn-download-txt')?.addEventListener('click', () => {
    exportDocument(getOutputContent(), 'txt', `nyayavedika-draft-${Date.now()}`);
  });

  document.getElementById('btn-download-doc')?.addEventListener('click', () => {
    exportDocument(getOutputContent(), 'doc', `nyayavedika-draft-${Date.now()}`);
  });

  document.getElementById('btn-download-docx')?.addEventListener('click', () => {
    exportDocument(getOutputContent(), 'docx', `nyayavedika-draft-${Date.now()}`);
  });

  document.getElementById('btn-save-snippet')?.addEventListener('click', () => {
    const content = getOutputContent();
    if (!content) return;
    const title = prompt('Snippet title:', lastGeneratedTitle || 'My Snippet');
    if (!title) return;
    saveSnippet({ title, content, category: 'Generated' });
    const btn = document.getElementById('btn-save-snippet');
    btn.textContent = '✓ Saved';
    setTimeout(() => { btn.textContent = '☆ Save'; }, 2000);
  });

  document.getElementById('btn-clear')?.addEventListener('click', hideOutput);

  // Cancel in-flight request
  document.getElementById('btn-cancel')?.addEventListener('click', () => {
    abortActiveRequest();
    hideLoading();
    showError('Request cancelled.');
  });

  // ─── History Panel ───
  function renderHistory() {
    const list = document.getElementById('history-list');
    if (!list) return;
    const history = getDraftHistory();
    if (history.length === 0) {
      list.innerHTML = '<p class="history-empty">No drafts generated yet. Your generated documents will appear here.</p>';
      return;
    }
    list.innerHTML = history.map(d => `
      <div class="history-item">
        <div class="history-item-info">
          <strong>${escapeHTML(d.title)}</strong>
          <span class="history-meta">${escapeHTML(d.type || 'Draft')} ${d.court ? '· ' + escapeHTML(d.court) : ''}</span>
          <span class="history-date">${new Date(d.timestamp).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
        </div>
        <div class="history-item-actions">
          <button class="btn btn-outline btn-sm history-load" data-id="${d.id}">Load</button>
          <button class="btn btn-outline btn-sm history-delete" data-id="${d.id}" style="color:#ef4444;border-color:rgba(239,68,68,0.2)">✕</button>
        </div>
      </div>
    `).join('');

    // Attach load/delete handlers
    list.querySelectorAll('.history-load').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.dataset.id);
        const draft = getDraftHistory().find(d => d.id === id);
        if (draft) {
          lastGeneratedContent = draft.content;
          lastGeneratedTitle = draft.title;
          showOutput(draft.content);
          document.getElementById('history-panel').style.display = 'none';
        }
      });
    });
    list.querySelectorAll('.history-delete').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.dataset.id);
        deleteDraftFromHistory(id);
        renderHistory();
      });
    });
  }

  document.getElementById('btn-show-history')?.addEventListener('click', () => {
    const panel = document.getElementById('history-panel');
    const isVisible = panel?.style.display === 'block';
    if (panel) panel.style.display = isVisible ? 'none' : 'block';
    if (!isVisible) renderHistory();
    // Hide snippets if open
    const sp = document.getElementById('snippets-panel');
    if (sp) sp.style.display = 'none';
  });

  document.getElementById('btn-history-close')?.addEventListener('click', () => {
    const panel = document.getElementById('history-panel');
    if (panel) panel.style.display = 'none';
  });

  // ─── Snippets Panel ───
  function renderSnippets() {
    const list = document.getElementById('snippets-list');
    if (!list) return;
    const snippets = getSnippets();
    if (snippets.length === 0) {
      list.innerHTML = '<p class="snippets-empty">No snippets saved yet. Save generated outputs or frequently used text as snippets for quick reuse.</p>';
      return;
    }
    list.innerHTML = snippets.map(s => `
      <div class="snippet-item">
        <div class="snippet-item-info">
          <strong>${escapeHTML(s.title)}</strong>
          <span class="snippet-category">${escapeHTML(s.category)}</span>
          <span class="snippet-preview">${escapeHTML(s.content.substring(0, 120))}...</span>
        </div>
        <div class="snippet-item-actions">
          <button class="btn btn-outline btn-sm snippet-insert" data-id="${s.id}" title="Insert into current draft tab">Use</button>
          <button class="btn btn-outline btn-sm snippet-delete" data-id="${s.id}" style="color:#ef4444;border-color:rgba(239,68,68,0.2)">✕</button>
        </div>
      </div>
    `).join('');

    list.querySelectorAll('.snippet-insert').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.dataset.id);
        const snippet = getSnippets().find(s => s.id === id);
        if (snippet) {
          lastGeneratedContent = snippet.content;
          lastGeneratedTitle = snippet.title;
          showOutput(snippet.content);
          document.getElementById('snippets-panel').style.display = 'none';
        }
      });
    });
    list.querySelectorAll('.snippet-delete').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.dataset.id);
        deleteSnippet(id);
        renderSnippets();
      });
    });
  }

  document.getElementById('btn-show-snippets')?.addEventListener('click', () => {
    const panel = document.getElementById('snippets-panel');
    const isVisible = panel?.style.display === 'block';
    if (panel) panel.style.display = isVisible ? 'none' : 'block';
    if (!isVisible) renderSnippets();
    // Hide history if open
    const hp = document.getElementById('history-panel');
    if (hp) hp.style.display = 'none';
  });

  document.getElementById('btn-snippets-close')?.addEventListener('click', () => {
    const panel = document.getElementById('snippets-panel');
    if (panel) panel.style.display = 'none';
  });

  // ─── Favorites Bar ───
  function renderFavorites() {
    const bar = document.getElementById('favorites-bar');
    const list = document.getElementById('favorites-list');
    if (!bar || !list) return;
    const favs = getFavorites();
    if (favs.length === 0) {
      bar.style.display = 'none';
      return;
    }
    bar.style.display = 'flex';
    list.innerHTML = favs.map(f => `
      <button class="fav-chip" data-doctype="${escapeHTML(f)}">⭐ ${escapeHTML(f)}</button>
    `).join('');

    list.querySelectorAll('.fav-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('.ai-tab').forEach(t => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        document.querySelectorAll('.ai-tab-content').forEach(c => c.classList.remove('active'));
        const draftTab = document.getElementById('tab-btn-draft');
        if (draftTab) {
          draftTab.classList.add('active');
          draftTab.setAttribute('aria-selected', 'true');
        }
        const tabContent = document.getElementById('tab-draft');
        if (tabContent) tabContent.classList.add('active');
        const docTypeSelect = document.getElementById('doc-type');
        if (docTypeSelect) docTypeSelect.value = chip.dataset.doctype;
      });
    });
  }

  renderFavorites();

  // Add star buttons to doc type options for favoriting
  function addFavToggleToDocTypes() {
    const draftTab = document.getElementById('tab-draft');
    if (!draftTab) return;
    // Add a "☆ Favorite this" hint next to the doc type select
    const docTypeSelect = document.getElementById('doc-type');
    if (!docTypeSelect) return;

    docTypeSelect.addEventListener('change', () => {
      const val = docTypeSelect.value;
      if (!val) return;
      const favs = getFavorites();
      const btn = document.getElementById('btn-fav-toggle');
      if (btn) {
        btn.textContent = favs.includes(val) ? '★ Unfavorite' : '☆ Favorite';
      }
    });

    // Add favorite toggle button
    const formGrid = draftTab.querySelector('.form-grid');
    if (formGrid && !document.getElementById('btn-fav-toggle')) {
      const favBtn = document.createElement('button');
      favBtn.id = 'btn-fav-toggle';
      favBtn.className = 'btn btn-outline btn-sm';
      favBtn.style.cssText = 'margin-top:24px;';
      favBtn.textContent = '☆ Favorite this type';
      favBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const val = document.getElementById('doc-type')?.value;
        if (!val) return;
        const favs = toggleFavorite(val);
        favBtn.textContent = favs.includes(val) ? '★ Unfavorite' : '☆ Favorite';
        renderFavorites();
      });
      formGrid.after(favBtn);
    }
  }

  setTimeout(addFavToggleToDocTypes, 100);

  // ─── Keyboard Shortcuts ───
  document.addEventListener('keydown', (e) => {
    // Ctrl+Enter: Send chat message / Submit active tab
    if (e.ctrlKey && e.key === 'Enter') {
      const activeTab = document.querySelector('.ai-tab.active');
      if (activeTab?.dataset.tab === 'ask') {
        sendChatMessage();
      } else if (activeTab?.dataset.tab === 'draft') {
        document.getElementById('btn-draft')?.click();
      } else if (activeTab?.dataset.tab === 'caselaws') {
        document.getElementById('btn-caselaws')?.click();
      } else if (activeTab?.dataset.tab === 'analyze') {
        document.getElementById('btn-analyze')?.click();
      } else if (activeTab?.dataset.tab === 'grounds') {
        document.getElementById('btn-grounds')?.click();
      } else if (activeTab?.dataset.tab === 'summarize') {
        document.getElementById('btn-summarize')?.click();
      } else if (activeTab?.dataset.tab === 'explain') {
        document.getElementById('btn-explain')?.click();
      }
    }

    // Ctrl+H: Open history
    if (e.ctrlKey && e.key === 'h') {
      e.preventDefault();
      document.getElementById('btn-show-history')?.click();
    }

    // Ctrl+S: Save snippet from output
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault();
      document.getElementById('btn-save-snippet')?.click();
    }

    // Escape: Close panels
    if (e.key === 'Escape') {
      const hp = document.getElementById('history-panel');
      const sp = document.getElementById('snippets-panel');
      if (hp?.style.display === 'block') hp.style.display = 'none';
      if (sp?.style.display === 'block') sp.style.display = 'none';
    }
  });

  // Widget Events
  const widgetTabs = container.querySelectorAll('.widget-tab');
  if (widgetTabs.length > 0) {
    widgetTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        widgetTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        fetchWidgetNews(tab.dataset.wtab);
      });
    });
    // Load initial feed
    fetchWidgetNews('Supreme Court');
  }
}

let widgetController = null;

// Static fallback content when API is unavailable
const STATIC_FEEDS = {
  'Supreme Court': [
    { title: 'Bail Under NDPS Act — Twin Conditions Reiterated', summary: 'The Supreme Court reiterated that under Section 37 of NDPS Act, both twin conditions must be mandatorily satisfied before granting bail. The court emphasized that the bar under Section 37 is in addition to limitations under CrPC/BNSS.' },
    { title: 'Article 21 — Right to Speedy Trial', summary: 'In a landmark ruling, the Supreme Court held that prolonged incarceration without trial violates Article 21 of the Constitution. The court directed all High Courts to review undertrial prisoners who have served more than half the maximum sentence.' },
    { title: 'Section 436A BNSS — Default Bail Guidelines', summary: 'The Supreme Court issued comprehensive guidelines on default bail under Section 187 BNSS (formerly Section 167 CrPC), clarifying that the right to default bail is an indefeasible right that cannot be taken away even if the chargesheet is filed belatedly.' },
    { title: 'Arbitration — Party Autonomy in Appointment', summary: 'The Court upheld the principle of party autonomy in arbitration, ruling that courts should adopt a hands-off approach in the appointment of arbitrators when parties have agreed to an institutional mechanism.' },
    { title: 'Consumer Protection — E-Commerce Liability', summary: 'The Supreme Court clarified the liability of e-commerce platforms under the Consumer Protection Act, 2019, holding that platforms that exercise significant control over transactions cannot claim mere intermediary status.' }
  ],
  'High Court': [
    { title: 'Quashing Under Section 528 BNSS — Scope Clarified', summary: 'The High Court reiterated that inherent powers under Section 528 BNSS (formerly Section 482 CrPC) should be exercised sparingly and only when the charge is manifestly absurd or the proceedings are clearly vexatious.' },
    { title: 'Writ Petition — Alternative Remedy Not a Bar', summary: 'The High Court held that the availability of an alternative remedy does not bar a writ petition under Article 226 when fundamental rights are directly involved or when the impugned order is patently illegal.' },
    { title: 'Land Revenue — Mutation Not Conferring Title', summary: 'The High Court clarified that mutation entries in revenue records do not confer title and are merely fiscal in nature. Disputes regarding ownership must be resolved through civil proceedings.' },
    { title: 'Anticipatory Bail — Custodial Interrogation Not Always Necessary', summary: 'The High Court granted anticipatory bail holding that custodial interrogation is not necessary in every case, especially when the accused has cooperated with the investigation and there is no flight risk.' },
    { title: 'Domestic Violence Act — Right of Residence', summary: 'The High Court upheld the right of residence under Section 17 of the DV Act, ruling that a woman in a domestic relationship cannot be evicted from the shared household without due process of law.' }
  ],
  'Tribunals': [
    { title: 'NCLT — CIRP Timeline Extension', summary: 'The NCLT addressed the issue of CIRP timeline extensions under IBC, reiterating that the 330-day deadline is mandatory and extensions can only be granted in exceptional circumstances with valid reasons documented.' },
    { title: 'ITAT — Capital Gains Exemption Under Section 54', summary: 'The ITAT held that the exemption under Section 54 of the Income Tax Act for capital gains on sale of residential property is available even when the new property is purchased in the name of the spouse, subject to certain conditions.' },
    { title: 'NGT — Environmental Clearance Compliance', summary: 'The National Green Tribunal imposed heavy penalties on industries operating without proper environmental clearances, directing immediate cessation of operations until compliance is demonstrated.' },
    { title: 'CAT — Compassionate Appointment Guidelines', summary: 'The Central Administrative Tribunal reiterated that compassionate appointment is not a vested right but should be considered sympathetically when the family is in dire financial distress following the death of a government servant.' },
    { title: 'NCDRC — Medical Negligence Standards', summary: 'The NCDRC held that for establishing medical negligence, the complainant must prove that the doctor did not exercise the standard of care expected from a reasonably competent practitioner in that field.' }
  ]
};

async function fetchWidgetNews(category) {
  const loading = document.getElementById('widget-loading');
  const feed = document.getElementById('widget-feed');
  const errEl = document.getElementById('widget-error');
  if (!loading || !feed) return;

  if (widgetController) {
    widgetController.abort();
  }
  widgetController = new AbortController();

  loading.style.display = 'flex';
  feed.style.display = 'none';
  errEl.style.display = 'none';

  function renderFeed(items) {
    feed.innerHTML = items.map(item => `
      <div class="news-card">
        <h4>${escapeHTML(item.title)}</h4>
        <p>${escapeHTML(item.summary)}</p>
      </div>
    `).join('');
    loading.style.display = 'none';
    feed.style.display = 'flex';
  }

  try {
    const rawFeed = await getLatestNews(category);
    const items = rawFeed.split('|||').map(s => s.trim()).filter(Boolean).map(item => {
      const parts = item.split('\n');
      return { title: parts[0] || 'Legal Update', summary: parts.slice(1).join(' ').trim() || '' };
    });
    if (items.length > 0) {
      renderFeed(items);
    } else {
      renderFeed(STATIC_FEEDS[category] || STATIC_FEEDS['Supreme Court']);
    }
  } catch (err) {
    if (err.name !== 'AbortError') {
      // Gracefully fall back to static content instead of showing error
      renderFeed(STATIC_FEEDS[category] || STATIC_FEEDS['Supreme Court']);
    }
  }
}

async function runAI(loadingMessage, apiFn, draftMeta = null) {
  hideError();
  hideOutput();
  showLoading(loadingMessage);
  try {
    const result = await apiFn();
    hideLoading();
    showOutput(result);
    lastGeneratedContent = result;
    lastGeneratedTitle = draftMeta?.title || 'Generated Draft';
    // Save to history
    if (result) {
      saveDraftToHistory({
        title: draftMeta?.title || 'AI Generated Draft',
        type: draftMeta?.type || '',
        court: draftMeta?.court || '',
        content: result,
      });
    }
  } catch (err) {
    hideLoading();
    showError(err.message);
  }
}

function showLoading(msg) {
  const el = document.getElementById('ai-loading');
  const txt = document.getElementById('loading-text');
  if (el) el.style.display = 'flex';
  if (txt) txt.textContent = msg;
  setStatus('loading', 'Generating...');
}

function hideLoading() {
  const el = document.getElementById('ai-loading');
  if (el) el.style.display = 'none';
  setStatus('ready', 'Ready');
}

function showOutput(text) {
  const container = document.getElementById('ai-output');
  const body = document.getElementById('output-body');
  if (!container || !body) return;
  body.textContent = text;
  container.style.display = 'block';
}

function hideOutput() {
  const el = document.getElementById('ai-output');
  if (el) el.style.display = 'none';
}

function showError(msg) {
  const el = document.getElementById('ai-error');
  const txt = document.getElementById('error-text');
  if (el) el.style.display = 'flex';
  if (txt) txt.textContent = msg;
  setStatus('error', 'Error');
}

function hideError() {
  const el = document.getElementById('ai-error');
  if (el) el.style.display = 'none';
}

function setStatus(type, label) {
  const el = document.getElementById('ai-status-indicator');
  if (!el) return;
  const safeType = type.replace(/[^a-z]/g, '');
  el.className = `ai-status status-${safeType}`;
  el.textContent = '';
  const dot = document.createElement('span');
  dot.className = 'status-dot';
  el.appendChild(dot);
  el.appendChild(document.createTextNode(` ${label}`));
}
