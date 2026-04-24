/**
 * NyayaVedika — AI Drafting Panel
 * Drop-in UI component for AI-powered document generation
 * Mounts into any container via mountDraftingPanel(containerId)
 */

import { draftDocument, suggestGrounds, summarizeDocument, explainClause, abortActiveRequest } from '../services/aiService.js';

const DOC_TYPES = [
  'Bail Application',
  'Writ Petition (Article 226)',
  'Special Leave Petition (SLP)',
  'Revenue Appeal',
  'Civil Suit',
  'Anticipatory Bail Application',
  'Quashing Petition',
  'Execution Petition',
  'Mutation Application',
  'Rent Control Petition',
];

const COURTS = [
  'High Court of Andhra Pradesh',
  'Supreme Court of India',
  'District & Sessions Court',
  'Civil Judge (Senior Division)',
  'Revenue Divisional Officer (RDO)',
  'Tahsildar Office',
  'First Class Judicial Magistrate',
  'Metropolitan Magistrate Court',
];

export function mountDraftingPanel(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = getPanelHTML();
  attachPanelEvents(container);
}

function getPanelHTML() {
  return `
<div class="ai-panel" id="ai-drafting-panel">
  <div class="ai-panel-header">
    <span class="ai-panel-icon">◈</span>
    <div>
      <h2 class="ai-panel-title">AI Drafting Assistant</h2>
      <p class="ai-panel-sub">Generate court-ready documents in minutes</p>
    </div>
    <span class="ai-status" id="ai-status-indicator">
      <span class="status-dot"></span> Ready
    </span>
  </div>

  <div class="ai-tabs" role="tablist" aria-label="AI tools" id="ai-tabs">
    <button class="ai-tab active" data-tab="draft" role="tab" aria-selected="true" aria-controls="tab-draft" id="tab-btn-draft">Draft Document</button>
    <button class="ai-tab" data-tab="grounds" role="tab" aria-selected="false" aria-controls="tab-grounds" id="tab-btn-grounds">Suggest Grounds</button>
    <button class="ai-tab" data-tab="summarize" role="tab" aria-selected="false" aria-controls="tab-summarize" id="tab-btn-summarize">Summarize Doc</button>
    <button class="ai-tab" data-tab="explain" role="tab" aria-selected="false" aria-controls="tab-explain" id="tab-btn-explain">Explain Clause</button>
  </div>

  <!-- TAB: Draft Document -->
  <div class="ai-tab-content active" id="tab-draft" role="tabpanel" aria-labelledby="tab-btn-draft">
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
      <span class="btn-icon">📋</span> Summarize Document
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

  <!-- ERROR STATE -->
  <div class="ai-error" id="ai-error" style="display:none">
    <span class="error-icon">⚠️</span>
    <p class="error-text" id="error-text"></p>
  </div>
</div>`;
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
