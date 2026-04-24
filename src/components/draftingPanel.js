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

  container.innerHTML = getPanelHTML();
  attachPanelEvents(container);
}

function getPanelHTML() {
  return `
<div class="drafting-layout">
  <div class="drafting-main">
    <div class="scrolling-ticker-wrap">
      <span class="ticker-badge">🔴 LIVE BREAKING</span>
      <marquee class="scrolling-ticker" id="news-ticker" scrollamount="5">Fetching latest legal updates and breaking court news...</marquee>
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

  <!-- TAB: Ask AI -->
  <div class="ai-tab-content active" id="tab-ask" role="tabpanel" aria-labelledby="tab-btn-ask">
    <div class="ask-ai-intro">
      <p>Ask any legal question — get detailed answers with relevant statutes, case law, and practical guidance.</p>
    </div>
    <div class="form-group">
      <label class="form-label">Your Legal Question</label>
      <textarea class="form-textarea" id="ask-question" rows="5" placeholder="e.g. What are the twin conditions for bail under Section 37 of NDPS Act? How does Article 21 apply to bail cases?"></textarea>
    </div>
    <button class="btn btn-primary btn-block mt-20" id="btn-ask">
      <span class="btn-icon">💬</span> Ask NyayaVedika AI
    </button>
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
        <button class="btn btn-outline btn-sm" id="btn-download">Download .txt</button>
        <button class="btn btn-outline btn-sm" id="btn-clear">Clear</button>
      </div>
    </div>
    <div class="output-body" id="output-body"></div>
  </div>

  <!-- LOADING STATE -->
  <div class="ai-loading" id="ai-loading" style="display:none" role="status" aria-live="polite">
    <div class="loading-spinner" aria-hidden="true"></div>
    <p class="loading-text" id="loading-text">Generating draft...</p>
    <button class="btn btn-outline btn-sm" id="btn-cancel">Cancel</button>
  </div>

  </div>
    </div> <!-- end ai-panel -->
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
      <div class="widget-error" id="widget-error" style="display:none; color: var(--amber); font-size: 0.85rem; padding: 10px;"></div>
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

  // Ask AI
  document.getElementById('btn-ask')?.addEventListener('click', async () => {
    const question = document.getElementById('ask-question')?.value;
    if (!question) { showError('Please enter a legal question.'); return; }
    await runAI('Analyzing your question...', () => askQuestion(question));
  });

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
    await runAI('Generating draft petition...', () => draftDocument(params));
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

  // Output actions
  document.getElementById('btn-copy')?.addEventListener('click', () => {
    const text = document.getElementById('output-body')?.innerText;
    navigator.clipboard.writeText(text).then(() => {
      const btn = document.getElementById('btn-copy');
      btn.textContent = 'Copied!';
      setTimeout(() => { btn.textContent = 'Copy'; }, 2000);
    });
  });

  document.getElementById('btn-download')?.addEventListener('click', () => {
    const text = document.getElementById('output-body')?.innerText;
    const blob = new Blob([text], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `nyayavedika-draft-${Date.now()}.txt`;
    a.click();
  });

  document.getElementById('btn-clear')?.addEventListener('click', hideOutput);

  // Cancel in-flight request
  document.getElementById('btn-cancel')?.addEventListener('click', () => {
    abortActiveRequest();
    hideLoading();
    showError('Request cancelled.');
  });

  // Widget Events
  const widgetTabs = document.querySelectorAll('.widget-tab');
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

  try {
    const rawFeed = await getLatestNews(category);
    const items = rawFeed.split('|||').map(s => s.trim()).filter(Boolean);
    
    feed.innerHTML = items.map(item => {
      const parts = item.split('\n');
      const title = parts[0] || 'Legal Update';
      const summary = parts.slice(1).join('\n') || '';
      return `
        <div class="news-card">
          <h4>${title}</h4>
          <p>${summary}</p>
        </div>
      `;
    }).join('');
    
    loading.style.display = 'none';
    feed.style.display = 'flex';
  } catch (err) {
    if (err.name !== 'AbortError') {
      loading.style.display = 'none';
      errEl.textContent = 'Failed to fetch live feed. Please try again.';
      errEl.style.display = 'block';
    }
  }
}

async function runAI(loadingMessage, apiFn) {
  hideError();
  hideOutput();
  showLoading(loadingMessage);
  try {
    const result = await apiFn();
    hideLoading();
    showOutput(result);
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
  el.className = `ai-status status-${type}`;
  el.innerHTML = `<span class="status-dot"></span> ${label}`;
}
