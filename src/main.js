import './style.css';
import './components/aiPanel.css';
import { mountDraftingPanel } from './components/draftingPanel.js';
import { generateLegalUpdate } from './services/aiService.js';
import { getTheme, setTheme, toggleTheme } from './services/storage.js';

/* ─── Page renderers ─── */
function renderHome() {
  return `
  <section class="hero reveal visible" id="hero">
    <div class="hero-inner">
      <span class="hero-badge">Free for All Indian Advocates — No Subscription Required</span>
      <h1 class="hero-title">AI-Powered Legal Drafting<br><span class="gradient-text">for Supreme Court, High Court & District Courts</span></h1>
      <p class="hero-sub">An indispensable AI drafting tool for Indian legal professionals. Generate court-ready SLPs, writ petitions, bail applications, NDPS bail, revenue appeals — in minutes, not hours.</p>
      <div class="hero-cta">
        <a href="#drafting" class="btn btn-primary" id="cta-start">Start Drafting — Free</a>
        <a href="#how-it-works" class="btn btn-outline" id="cta-how">See how it works</a>
      </div>
    </div>
  </section>

  <section class="trust-row reveal" id="trust-stats">
    <div class="container">
      <div class="trust-grid">
        <div class="trust-item reveal reveal-delay-1">
          <span class="trust-value">15+</span>
          <span class="trust-label">Document Types</span>
        </div>
        <div class="trust-item reveal reveal-delay-2">
          <span class="trust-value">&lt; 3 min</span>
          <span class="trust-label">Average Draft Time</span>
        </div>
        <div class="trust-item reveal reveal-delay-3">
          <span class="trust-value">SC • HC • DC</span>
          <span class="trust-label">All Court Levels</span>
        </div>
        <div class="trust-item reveal reveal-delay-4">
          <span class="trust-value">100%</span>
          <span class="trust-label">Free — No Paywall</span>
        </div>
      </div>
    </div>
  </section>

  <section class="features reveal" id="features">
    <div class="container">
      <h2 class="section-title">Everything an advocate needs — from Supreme Court to Tahsildar</h2>
      <p class="section-sub">AI-assisted legal research, drafting, and document analysis. Built for the way Indian advocates actually practice.</p>
      <div class="feature-grid feature-grid-6">
        <div class="feature-card reveal reveal-delay-1" id="feat-ask">
          <div class="feature-icon">
            <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 8h24v20H18l-6 6v-6H8V8z" stroke-linejoin="round"/><line x1="14" y1="16" x2="26" y2="16"/><line x1="14" y1="21" x2="22" y2="21"/></svg>
          </div>
          <h3>Ask a Question</h3>
          <p>Chat with AI about any legal topic — get detailed answers with relevant statutes, case law, and practical guidance.</p>
        </div>
        <div class="feature-card reveal reveal-delay-2" id="feat-drafting">
          <div class="feature-icon">
            <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="6" y="4" width="28" height="32" rx="3"/><line x1="12" y1="12" x2="28" y2="12"/><line x1="12" y1="18" x2="28" y2="18"/><line x1="12" y1="24" x2="22" y2="24"/><path d="M26 28l4-4-4-4" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <h3>Draft Documents & Legal Notices</h3>
          <p>Generate 25+ document types — SLPs, writs, bail, legal notices, written submissions, PIL, consumer complaints — all courts covered.</p>
        </div>
        <div class="feature-card reveal reveal-delay-3" id="feat-caselaws">
          <div class="feature-icon">
            <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="18" cy="18" r="10"/><line x1="25" y1="25" x2="34" y2="34" stroke-linecap="round"/><line x1="14" y1="14" x2="22" y2="14"/><line x1="14" y1="18" x2="22" y2="18"/><line x1="14" y1="22" x2="18" y2="22"/></svg>
          </div>
          <h3>Find Case Laws</h3>
          <p>Enter your legal issue — AI finds relevant Supreme Court & High Court precedents with citations and legal principles.</p>
        </div>
        <div class="feature-card reveal reveal-delay-4" id="feat-analyze">
          <div class="feature-icon">
            <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="4" y="6" width="20" height="28" rx="2"/><path d="M28 12h6v22a2 2 0 01-2 2H10"/><circle cx="14" cy="20" r="4"/><line x1="10" y1="28" x2="18" y2="28"/></svg>
          </div>
          <h3>Analyze Case / Chargesheet</h3>
          <p>Upload any FIR, chargesheet, judgment, or court order — AI extracts parties, issues, applicable law, and strategic notes.</p>
        </div>
        <div class="feature-card reveal reveal-delay-1" id="feat-submissions">
          <div class="feature-icon">
            <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="8" y="4" width="24" height="32" rx="2"/><line x1="14" y1="12" x2="26" y2="12"/><line x1="14" y1="17" x2="26" y2="17"/><line x1="14" y1="22" x2="26" y2="22"/><line x1="14" y1="27" x2="20" y2="27"/><path d="M4 8v28h28" stroke-dasharray="3 3"/></svg>
          </div>
          <h3>Write Submissions</h3>
          <p>AI drafts comprehensive written arguments with statutory citations, case law, and proper Indian court format.</p>
        </div>
        <div class="feature-card reveal reveal-delay-2" id="feat-summarize">
          <div class="feature-icon">
            <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 6h28v28H6z" rx="3"/><line x1="12" y1="14" x2="28" y2="14"/><line x1="12" y1="20" x2="24" y2="20"/><line x1="12" y1="26" x2="20" y2="26"/><circle cx="8" cy="14" r="1" fill="currentColor"/><circle cx="8" cy="20" r="1" fill="currentColor"/><circle cx="8" cy="26" r="1" fill="currentColor"/></svg>
          </div>
          <h3>Summarize & Explain</h3>
          <p>Summarize Supreme Court & High Court judgments, extract key orders, and explain complex clauses in plain English.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="workflow-preview reveal" id="workflow-preview">
    <div class="container">
      <h2 class="section-title">See the workflow in action</h2>
      <div class="preview-box">
        <div class="preview-steps">
          <div class="preview-step active" data-step="1">
            <span class="step-num">1</span>
            <span>Upload case files</span>
          </div>
          <div class="preview-step" data-step="2">
            <span class="step-num">2</span>
            <span>Describe relief sought</span>
          </div>
          <div class="preview-step" data-step="3">
            <span class="step-num">3</span>
            <span>AI generates draft</span>
          </div>
          <div class="preview-step" data-step="4">
            <span class="step-num">4</span>
            <span>Download DOCX</span>
          </div>
        </div>
        <div class="preview-screen">
          <div class="screen-mock">
            <div class="screen-toolbar">
              <span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span>
              <span class="screen-url">app.nyayavedika.in</span>
            </div>
            <div class="screen-body">
              <div class="mock-sidebar">
                <div class="mock-item active"></div>
                <div class="mock-item"></div>
                <div class="mock-item"></div>
              </div>
              <div class="mock-content">
                <div class="mock-line w80"></div>
                <div class="mock-line w60"></div>
                <div class="mock-line w90"></div>
                <div class="mock-line w40"></div>
                <div class="mock-line w70"></div>
                <div class="mock-line w50"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="cta-bottom reveal" id="cta-bottom">
    <div class="container">
      <h2>Start drafting like a top-tier chamber — for free</h2>
      <p>No subscriptions. No paywalls. Just powerful AI drafting for every Indian advocate, from solo practitioners to large firms.</p>
      <a href="#drafting" class="btn btn-primary btn-lg">Open AI Drafting Tool — Free</a>
    </div>
  </section>`;
}

function renderDrafting() {
  return `
  <section class="page-hero reveal visible" id="drafting-hero">
    <div class="container">
      <h1 class="page-hero-title">AI Drafting Assistant</h1>
      <p class="page-hero-sub">Generate court-ready petitions for Supreme Court, High Court & District Courts. Analyze judgments, explore legal grounds, and draft in minutes — free for all advocates.</p>
    </div>
  </section>
  <div class="container">
    <div id="ai-panel-mount"></div>
  </div>
  <section class="disclaimer-banner" id="drafting-disclaimer">
    <div class="container">
      <p><strong>⚠️ Important:</strong> All drafts must be reviewed and finalized by a qualified advocate before filing. NyayaVedika is a drafting tool, not legal advice.</p>
    </div>
  </section>`;
}

function renderHowItWorks() {
  const steps = [
    { num: '01', title: 'Select Document Type & Court', desc: 'Choose from 15+ document types — SLPs, writ petitions, bail applications (including NDPS bail), revenue appeals, quashing petitions, and more. Select the specific court or authority for proper formatting.', icon: '📋' },
    { num: '02', title: 'Enter Case Facts & Relief', desc: 'Describe your client\'s situation — FIR details, impugned orders, land records, previous court orders. Specify the relief sought. The AI understands BNS, BNSS, IPC, CrPC, and special acts.', icon: '⚖️' },
    { num: '03', title: 'AI Generates Court-Ready Draft', desc: 'NyayaVedika generates a structured, statute-compliant draft with proper cause title, synopsis, numbered grounds with citations, prayer clause, and verification — in under 3 minutes.', icon: '🤖' },
    { num: '04', title: 'Copy, Download & File', desc: 'Copy to clipboard or download as a text file. Review the draft, make any modifications, and file with confidence. The AI drafts — you retain full professional control.', icon: '📥' }
  ];

  return `
  <section class="page-hero reveal visible" id="hiw-hero">
    <div class="container">
      <h1 class="page-hero-title">How It Works</h1>
      <p class="page-hero-sub">Four simple steps from case files to court-ready draft.</p>
    </div>
  </section>

  <section class="steps-section reveal" id="steps">
    <div class="container">
      <div class="steps-timeline">
        ${steps.map((s, i) => `
          <div class="step-card" id="step-${s.num}" style="--delay: ${i * 0.1}s">
            <div class="step-left">
              <span class="step-number">${s.num}</span>
              <div class="step-line${i === steps.length - 1 ? ' last' : ''}"></div>
            </div>
            <div class="step-right">
              <span class="step-icon">${s.icon}</span>
              <h3>${s.title}</h3>
              <p>${s.desc}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  </section>

  <section class="disclaimer-banner" id="hiw-disclaimer">
    <div class="container">
      <p><strong>⚠️ Important:</strong> All drafts must be reviewed and finalized by a qualified advocate. NyayaVedika is a tool, not a law firm.</p>
    </div>
  </section>`;
}

function renderForAdvocates() {
  const segments = [
    {
      id: 'solo',
      title: 'Solo Practitioners',
      desc: 'You handle everything — research, drafting, filing, court appearances. NyayaVedika gives you the drafting capacity of a junior without the overhead. All features free, no subscription.',
      cases: ['Bail & anticipatory bail for District & Sessions Courts', 'NDPS bail applications with Section 37 twin conditions', 'Writ petitions under Article 226 before High Court', 'Revenue appeals (ROR mutations, land disputes, 1-B proceedings)', 'Default bail under Section 187 BNSS / 167 CrPC', 'Cheque bounce complaints under NI Act Section 138']
    },
    {
      id: 'chambers',
      title: 'Chambers & Associates',
      desc: 'Your chambers handles a steady volume of cases. NyayaVedika lets your team produce consistent, well-structured drafts in a fraction of the time.',
      cases: ['Standardize brief formats across associates', 'Handle multiple criminal revisions in parallel', 'Quick turnaround on bail and remand applications', 'Quashing petitions under Section 528 BNSS / 482 CrPC', 'Interlocutory Applications (IAs) and caveat petitions', 'Consumer disputes before NCDRC and State Commission']
    },
    {
      id: 'firms',
      title: 'Law Firms',
      desc: 'For firms handling high-volume Supreme Court and High Court litigation. NyayaVedika produces court-ready drafts following SC Rules 2013 and HC Original Side Rules.',
      cases: ['SLPs before the Supreme Court under Article 136', 'Writ petitions under Article 32 for fundamental rights', 'Multi-party property and partition suits', 'Contempt petitions under Contempt of Courts Act', 'Batch drafting for similar case types across courts', 'SC/ST Act cases and NDPS special bail procedures']
    }
  ];

  return `
  <section class="page-hero reveal visible" id="adv-hero">
    <div class="container">
      <h1 class="page-hero-title">Built for Advocates</h1>
      <p class="page-hero-sub">Whether you practice alone or lead a team — NyayaVedika fits your workflow.</p>
    </div>
  </section>

  <section class="segments reveal" id="segments">
    <div class="container">
      ${segments.map((seg, i) => `
        <div class="segment-card reveal reveal-delay-${i + 1}" id="seg-${seg.id}">
          <div class="segment-header">
            <h2>${seg.title}</h2>
            <p>${seg.desc}</p>
          </div>
          <ul class="segment-list">
            ${seg.cases.map(c => `<li>${c}</li>`).join('')}
          </ul>
        </div>
      `).join('')}
    </div>
  </section>`;
}



function renderSecurity() {
  return `
  <section class="page-hero reveal visible" id="security-hero">
    <div class="container">
      <h1 class="page-hero-title">Security & Legal</h1>
      <p class="page-hero-sub">How we handle your data, and what to know before using NyayaVedika.</p>
    </div>
  </section>

  <section class="security-section reveal" id="security-content">
    <div class="container">
      <div class="security-grid">
        <div class="security-card reveal reveal-delay-1" id="sec-encryption">
          <div class="security-icon">🔒</div>
          <h3>Encryption at Rest & in Transit</h3>
          <p>All data is encrypted using AES-256 at rest and TLS 1.3 in transit. Your case files and drafts are protected at every stage.</p>
        </div>
        <div class="security-card reveal reveal-delay-2" id="sec-retention">
          <div class="security-icon">🗑️</div>
          <h3>Minimal Data Retention</h3>
          <p>Uploaded documents are processed and not retained beyond your active session unless you explicitly save them to your account. You control your data.</p>
        </div>
        <div class="security-card reveal reveal-delay-3" id="sec-access">
          <div class="security-icon">🛡️</div>
          <h3>Access Controls</h3>
          <p>Role-based access for team accounts. Only authorized members of your chambers or firm can view or edit shared drafts.</p>
        </div>
        <div class="security-card reveal reveal-delay-4" id="sec-compliance">
          <div class="security-icon">📋</div>
          <h3>Compliance Ready</h3>
          <p>Built with Indian data protection considerations in mind. We are actively working toward compliance with applicable regulations.</p>
        </div>
      </div>

      <div class="legal-disclaimer" id="legal-disclaimer">
        <h2>⚖️ Legal Disclaimer</h2>
        <div class="disclaimer-content">
          <p><strong>NyayaVedika is an AI-assisted drafting tool, not a law firm and not a substitute for qualified legal counsel.</strong></p>
          <ul>
            <li>All drafts generated by NyayaVedika must be reviewed, verified, and finalized by a qualified advocate before submission to any court or authority.</li>
            <li>NyayaVedika provides <strong>high statutory coverage with AI assistance</strong>. The platform does not guarantee the accuracy, completeness, or legal sufficiency of any generated document.</li>
            <li>No attorney-client relationship is created by using NyayaVedika.</li>
            <li>Past results, sample outputs, or demonstrated capabilities do not guarantee similar outcomes in your specific case.</li>
            <li>The advocate using NyayaVedika bears full professional responsibility for all documents filed with courts or authorities.</li>
          </ul>
          <p class="disclaimer-final">By using NyayaVedika, you acknowledge that you are a qualified legal professional and accept these terms.</p>
        </div>
      </div>
    </div>
  </section>`;
}

function renderLegalUpdates() {
  const popularTopics = [
    'Section 37 NDPS Act — Twin Conditions for Bail',
    'Article 226 vs 227 — High Court Powers',
    'Default Bail under Section 187 BNSS',
    'Quashing under Section 528 BNSS / 482 CrPC',
    'Anticipatory Bail under BNS/BNSS',
    'Consumer Protection Act 2019 — Key Changes',
    'IBC — CIRP Process and Timelines',
    'Cheque Bounce — NI Act Section 138 Procedure',
    'DV Act — Protection Orders and Remedies',
    'Article 21 — Right to Life and Bail Jurisprudence',
    'Land Revenue Appeals — AP & Telangana Procedure',
    'Contempt of Courts Act — Civil vs Criminal Contempt'
  ];

  return `
  <section class="page-hero reveal visible" id="legal-updates-hero">
    <div class="container">
      <h1 class="page-hero-title">📰 Legal Updates & Digest</h1>
      <p class="page-hero-sub">Enter any legal topic — get a comprehensive AI-generated digest with statutes, landmark judgments, recent developments, and practice tips.</p>
    </div>
  </section>

  <section class="legal-updates-section reveal" id="legal-updates-content">
    <div class="container">
      <div class="legal-updates-input-area">
        <div class="form-group">
          <label class="form-label" for="legal-topic-input">Enter Legal Topic</label>
          <input class="form-input form-input-lg" id="legal-topic-input" placeholder="e.g. Section 37 NDPS Act twin conditions for bail, Article 226 vs 227 differences..." />
        </div>
        <button class="btn btn-primary btn-lg" id="btn-generate-update">
          <span class="btn-icon">🔍</span> Generate Legal Digest
        </button>
      </div>

      <div class="popular-topics">
        <h3>Popular Topics</h3>
        <div class="topics-grid">
          ${popularTopics.map(t => `<button class="topic-chip" data-topic="${t}">${t}</button>`).join('')}
        </div>
      </div>

      <div class="legal-update-loading" id="update-loading" style="display:none">
        <div class="loading-spinner"></div>
        <p>Generating legal digest...</p>
      </div>

      <div class="legal-update-result" id="update-result" style="display:none">
        <div class="update-result-header">
          <h3 id="update-result-title"></h3>
          <div class="output-actions">
            <button class="btn btn-outline btn-sm" id="btn-update-copy">Copy</button>
            <button class="btn btn-outline btn-sm" id="btn-update-download">Download .txt</button>
          </div>
        </div>
        <div class="update-result-body" id="update-result-body"></div>
      </div>

      <div class="ai-error" id="update-error" style="display:none">
        <span class="error-icon">⚠️</span>
        <p class="error-text" id="update-error-text"></p>
      </div>
    </div>
  </section>

  <section class="disclaimer-banner" id="updates-disclaimer">
    <div class="container">
      <p><strong>⚠️ AI-Generated Content:</strong> Legal updates are generated by AI and may not reflect the most recent developments. Always verify with primary sources before relying on this information.</p>
    </div>
  </section>`;
}

function attachLegalUpdatesEvents() {
  const input = document.getElementById('legal-topic-input');
  const btn = document.getElementById('btn-generate-update');
  const loading = document.getElementById('update-loading');
  const result = document.getElementById('update-result');
  const resultTitle = document.getElementById('update-result-title');
  const resultBody = document.getElementById('update-result-body');
  const error = document.getElementById('update-error');
  const errorText = document.getElementById('update-error-text');

  async function generateUpdate(topic) {
    if (!topic) {
      error.style.display = 'flex';
      errorText.textContent = 'Please enter a legal topic.';
      return;
    }
    error.style.display = 'none';
    result.style.display = 'none';
    loading.style.display = 'flex';
    try {
      const output = await generateLegalUpdate(topic);
      loading.style.display = 'none';
      resultTitle.textContent = `Legal Digest: ${topic}`;
      resultBody.textContent = output;
      result.style.display = 'block';
    } catch (err) {
      loading.style.display = 'none';
      error.style.display = 'flex';
      errorText.textContent = err.message;
    }
  }

  btn?.addEventListener('click', () => generateUpdate(input?.value));

  // Topic chips
  document.querySelectorAll('.topic-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      input.value = chip.dataset.topic;
      generateUpdate(chip.dataset.topic);
    });
  });

  // Copy & Download
  document.getElementById('btn-update-copy')?.addEventListener('click', () => {
    const text = resultBody?.innerText;
    navigator.clipboard.writeText(text).then(() => {
      const b = document.getElementById('btn-update-copy');
      b.textContent = 'Copied!';
      setTimeout(() => { b.textContent = 'Copy'; }, 2000);
    });
  });

  document.getElementById('btn-update-download')?.addEventListener('click', () => {
    const text = resultBody?.innerText;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nyayavedika-legal-digest-${Date.now()}.txt`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });
}

/* ─── Navigation ─── */
function renderNav(currentPage) {
  const links = [
    { hash: '', label: 'Home' },
    { hash: 'drafting', label: '⚡ AI Drafting' },
    { hash: 'legal-updates', label: '📰 Legal Updates' },
    { hash: 'how-it-works', label: 'How It Works' },
    { hash: 'for-advocates', label: 'For Advocates' },
    { hash: 'security', label: 'Security & Legal' }
  ];

  return `
  <nav class="nav" id="main-nav" role="navigation" aria-label="Main navigation">
    <div class="nav-inner">
      <a href="#" class="nav-logo" id="nav-logo" aria-label="NyayaVedika home">
        <span class="nav-logo-mark">◈</span>
        <span class="nav-logo-text">NyayaVedika</span>
      </a>
      <button class="nav-toggle" id="nav-toggle" aria-label="Toggle menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
      <div class="nav-links" id="nav-links">
        ${links.map(l => `
          <a href="#${l.hash}" class="nav-link${currentPage === l.hash ? ' active' : ''}${currentPage === l.hash ? '" aria-current="page' : ''}" id="nav-${l.hash || 'home'}">${l.label}</a>
        `).join('')}
      </div>
      <button class="theme-toggle" id="theme-toggle" aria-label="Toggle theme" title="Toggle dark/light theme">
        <span class="theme-icon-dark">🌙</span>
        <span class="theme-icon-light">☀️</span>
      </button>
      <a href="#drafting" class="btn btn-primary btn-sm nav-cta" id="nav-cta">Get Started</a>
    </div>
  </nav>`;
}

function renderFooter() {
  return `
  <footer class="footer" id="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <span class="nav-logo-mark">◈</span>
          <span class="nav-logo-text">NyayaVedika</span>
          <p class="footer-tagline">AI-powered legal drafting for Indian advocates.</p>
        </div>
        <div class="footer-col">
          <h4>Product</h4>
          <a href="#drafting">AI Drafting</a>
          <a href="#legal-updates">Legal Updates</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#for-advocates">For Advocates</a>
        </div>
        <div class="footer-col">
          <h4>Use Cases</h4>
          <a href="#for-advocates">Solo Practitioners</a>
          <a href="#for-advocates">Chambers</a>
          <a href="#for-advocates">Law Firms</a>
        </div>
        <div class="footer-col">
          <h4>Legal</h4>
          <a href="#security">Disclaimer</a>
          <a href="#security">Privacy Policy</a>
          <a href="#security">Terms of Use</a>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2026 NyayaVedika. All rights reserved.</p>
        <p class="footer-disclaimer">NyayaVedika is a drafting tool. All outputs must be reviewed by a qualified advocate.</p>
      </div>
    </div>
  </footer>`;
}

/* ─── Routing ─── */
const routes = {
  '':               renderHome,
  'drafting':       renderDrafting,
  'legal-updates':  renderLegalUpdates,
  'how-it-works':   renderHowItWorks,
  'for-advocates':  renderForAdvocates,
  'security':       renderSecurity
};

function getPage() {
  const hash = window.location.hash.replace('#', '');
  return routes[hash] ? hash : '';
}

/* ─── Scroll-triggered reveal animations ─── */
function setupRevealObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ─── Feature card mouse tracking ─── */
function setupCardTracking() {
  document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mouse-x', `${((e.clientX - r.left) / r.width) * 100}%`);
      card.style.setProperty('--mouse-y', `${((e.clientY - r.top) / r.height) * 100}%`);
    });
  });
}

function render() {
  const page = getPage();
  const app = document.getElementById('app');
  app.innerHTML = renderNav(page) + routes[page]() + renderFooter();

  if (page === 'drafting') {
    mountDraftingPanel('ai-panel-mount');
  }

  if (page === 'legal-updates') {
    attachLegalUpdatesEvents();
  }

  setupRevealObserver();
  setupCardTracking();

  // Re-bind theme toggle after re-render
  document.getElementById('theme-toggle')?.addEventListener('click', () => {
    const newTheme = toggleTheme();
    updateThemeIcon(newTheme);
  });
  updateThemeIcon(getTheme());

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ─── One-time nav setup ─── */
function setupNav() {
  document.addEventListener('click', (e) => {
    const link = e.target.closest('.nav-link');
    if (link) {
      const navLinks = document.getElementById('nav-links');
      const toggle = document.getElementById('nav-toggle');
      navLinks?.classList.remove('open');
      toggle?.classList.remove('open');
      toggle?.setAttribute('aria-expanded', 'false');
    }

    if (e.target.closest('#nav-toggle')) {
      const navLinks = document.getElementById('nav-links');
      const toggle = document.getElementById('nav-toggle');
      const isOpen = navLinks?.classList.toggle('open');
      toggle?.classList.toggle('open');
      toggle?.setAttribute('aria-expanded', String(isOpen));
    }
  });
}

/* ─── Theme ─── */
function initTheme() {
  setTheme(getTheme());
  document.getElementById('theme-toggle')?.addEventListener('click', () => {
    const newTheme = toggleTheme();
    updateThemeIcon(newTheme);
  });
}

function updateThemeIcon(theme) {
  const dark = document.querySelector('.theme-icon-dark');
  const light = document.querySelector('.theme-icon-light');
  if (!dark || !light) return;
  dark.style.display = theme === 'dark' ? 'none' : 'inline';
  light.style.display = theme === 'dark' ? 'inline' : 'none';
}

window.addEventListener('hashchange', render);
setupNav();
initTheme();
render();
updateThemeIcon(getTheme());
