import './style.css';

/* ─── Page renderers ─── */
function renderHome() {
  return `
  <section class="hero" id="hero">
    <div class="hero-inner">
      <span class="hero-badge">For Indian Advocates</span>
      <h1 class="hero-title">AI-Powered Drafting<br><span class="gradient-text">for Indian Advocates</span></h1>
      <p class="hero-sub">Generate court-ready pleadings in minutes — SLPs, writs, bail applications, revenue appeals, and more.</p>
      <div class="hero-cta">
        <a href="#pricing" class="btn btn-primary" id="cta-start">Start with ₹100 free credits</a>
        <a href="#how-it-works" class="btn btn-outline" id="cta-how">See how it works</a>
      </div>
    </div>
  </section>

  <section class="trust-row" id="trust-stats">
    <div class="container">
      <div class="trust-grid">
        <div class="trust-item">
          <span class="trust-value">12+</span>
          <span class="trust-label">Document Types</span>
        </div>
        <div class="trust-item">
          <span class="trust-value">&lt; 5 min</span>
          <span class="trust-label">Average Draft Time</span>
        </div>
        <div class="trust-item">
          <span class="trust-value">500+</span>
          <span class="trust-label">Advocates Served</span>
        </div>
        <div class="trust-item">
          <span class="trust-value">10k+</span>
          <span class="trust-label">Drafts Generated</span>
        </div>
      </div>
    </div>
  </section>

  <section class="features" id="features">
    <div class="container">
      <h2 class="section-title">Powerful tools for every stage of your case</h2>
      <p class="section-sub">From first-draft to final filing — NyayaVedika covers the heavy lifting.</p>
      <div class="feature-grid">
        <div class="feature-card" id="feat-drafting">
          <div class="feature-icon">
            <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="6" y="4" width="28" height="32" rx="3"/><line x1="12" y1="12" x2="28" y2="12"/><line x1="12" y1="18" x2="28" y2="18"/><line x1="12" y1="24" x2="22" y2="24"/><path d="M26 28l4-4-4-4" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <h3>Court-Ready Drafting</h3>
          <p>AI generates SLPs, writs, bail applications, appeals, and civil suits following Indian court formats and statutory requirements.</p>
        </div>
        <div class="feature-card" id="feat-research">
          <div class="feature-icon">
            <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="18" cy="18" r="10"/><line x1="25" y1="25" x2="34" y2="34" stroke-linecap="round"/><line x1="14" y1="14" x2="22" y2="14"/><line x1="14" y1="18" x2="22" y2="18"/><line x1="14" y1="22" x2="18" y2="22"/></svg>
          </div>
          <h3>Legal Research Engine</h3>
          <p>Search through case law, statutes, and precedents to build a solid foundation for every argument.</p>
        </div>
        <div class="feature-card" id="feat-ocr">
          <div class="feature-icon">
            <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="4" y="6" width="20" height="28" rx="2"/><path d="M28 12h6v22a2 2 0 01-2 2H10"/><circle cx="14" cy="20" r="4"/><line x1="10" y1="28" x2="18" y2="28"/></svg>
          </div>
          <h3>Document Intelligence</h3>
          <p>Upload scanned files, judgments, and court orders — our OCR extracts and structures the data for your drafts.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="workflow-preview" id="workflow-preview">
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

  <section class="cta-bottom" id="cta-bottom">
    <div class="container">
      <h2>Ready to draft smarter?</h2>
      <p>Join hundreds of advocates already using NyayaVedika to save hours on every filing.</p>
      <a href="#pricing" class="btn btn-primary btn-lg">Get Started — Free Credits Included</a>
    </div>
  </section>`;
}

function renderHowItWorks() {
  const steps = [
    { num: '01', title: 'Upload Your Case Files', desc: 'Drag and drop your FIR copies, previous orders, sale deeds, revenue records, or any supporting documents. Our OCR handles scanned files automatically.', icon: '📄' },
    { num: '02', title: 'Describe the Relief & Court', desc: 'Tell the AI what you need — bail application before Sessions Court, writ petition under Article 226, SLP before Supreme Court, or a revenue appeal. Specify the forum and the relief sought.', icon: '⚖️' },
    { num: '03', title: 'AI Drafts Your Petition', desc: 'NyayaVedika generates a structured, statute-compliant draft with proper formatting, relevant citations, and prayer clauses — in under 5 minutes.', icon: '🤖' },
    { num: '04', title: 'Review, Edit & Download', desc: 'Review the draft in our editor, make any changes, and download as a print-ready DOCX. You retain full control — the AI assists, you decide.', icon: '📥' }
  ];

  return `
  <section class="page-hero" id="hiw-hero">
    <div class="container">
      <h1 class="page-hero-title">How It Works</h1>
      <p class="page-hero-sub">Four simple steps from case files to court-ready draft.</p>
    </div>
  </section>

  <section class="steps-section" id="steps">
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
      desc: 'You handle everything — research, drafting, filing, court appearances. NyayaVedika gives you the drafting capacity of a junior without the overhead.',
      cases: ['Bail applications for District & Sessions Courts', 'Writ petitions under Article 226', 'Revenue appeals (ROR mutations, land disputes)', 'Civil suit drafts (partition, injunctions, specific performance)']
    },
    {
      id: 'chambers',
      title: 'Chambers & Associates',
      desc: 'Your chambers handles a steady volume of cases. NyayaVedika lets your team produce consistent, well-structured drafts in a fraction of the time.',
      cases: ['Standardize brief formats across associates', 'Handle multiple revenue appeals in parallel', 'Quick turnaround on bail and remand applications', 'Build a template library for your practice areas']
    },
    {
      id: 'firms',
      title: 'Law Firms',
      desc: 'For firms handling high-volume litigation or establishing legal-tech-forward workflows. NyayaVedika integrates with your document pipeline.',
      cases: ['SLPs before the Supreme Court', 'Multi-party property and partition suits', 'Batch drafting for similar case types', 'Compliance and audit-ready document trails']
    }
  ];

  return `
  <section class="page-hero" id="adv-hero">
    <div class="container">
      <h1 class="page-hero-title">Built for Advocates</h1>
      <p class="page-hero-sub">Whether you practice alone or lead a team — NyayaVedika fits your workflow.</p>
    </div>
  </section>

  <section class="segments" id="segments">
    <div class="container">
      ${segments.map(seg => `
        <div class="segment-card" id="seg-${seg.id}">
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

function renderPricing() {
  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      audience: 'Solo Practitioners',
      price: '₹499',
      period: '/month',
      features: ['5 drafts per month', 'All document types', 'DOCX export', 'Email support', 'Basic templates'],
      cta: 'Coming Soon',
      highlight: false
    },
    {
      id: 'chambers',
      name: 'Chambers',
      audience: 'Small Teams',
      price: '₹1,499',
      period: '/month',
      features: ['25 drafts per month', 'All document types', 'DOCX + PDF export', 'Priority support', 'Custom templates', 'Team sharing'],
      cta: 'Early Access',
      highlight: true
    },
    {
      id: 'firm',
      name: 'Firm',
      audience: 'Large Teams',
      price: 'Custom',
      period: '',
      features: ['Unlimited drafts', 'All document types', 'API access', 'Dedicated support', 'Custom integrations', 'Audit trail & compliance', 'On-premise option'],
      cta: 'Contact Us',
      highlight: false
    }
  ];

  return `
  <section class="page-hero" id="pricing-hero">
    <div class="container">
      <h1 class="page-hero-title">Simple, Transparent Pricing</h1>
      <p class="page-hero-sub">Start free with ₹100 in credits. Scale as your practice grows.</p>
    </div>
  </section>

  <section class="pricing-section" id="pricing-cards">
    <div class="container">
      <div class="pricing-grid">
        ${plans.map(p => `
          <div class="pricing-card${p.highlight ? ' highlighted' : ''}" id="plan-${p.id}">
            ${p.highlight ? '<span class="popular-badge">Most Popular</span>' : ''}
            <h3 class="plan-name">${p.name}</h3>
            <p class="plan-audience">${p.audience}</p>
            <div class="plan-price">
              <span class="price-amount">${p.price}</span>
              <span class="price-period">${p.period}</span>
            </div>
            <ul class="plan-features">
              ${p.features.map(f => `<li><span class="check">✓</span> ${f}</li>`).join('')}
            </ul>
            <button class="btn ${p.highlight ? 'btn-primary' : 'btn-outline'} btn-block" id="plan-cta-${p.id}">${p.cta}</button>
          </div>
        `).join('')}
      </div>
      <p class="pricing-note">All plans include ₹100 free credits to get started. No credit card required for trial.</p>
    </div>
  </section>`;
}

function renderSecurity() {
  return `
  <section class="page-hero" id="security-hero">
    <div class="container">
      <h1 class="page-hero-title">Security & Legal</h1>
      <p class="page-hero-sub">How we handle your data, and what to know before using NyayaVedika.</p>
    </div>
  </section>

  <section class="security-section" id="security-content">
    <div class="container">
      <div class="security-grid">
        <div class="security-card" id="sec-encryption">
          <div class="security-icon">🔒</div>
          <h3>Encryption at Rest & in Transit</h3>
          <p>All data is encrypted using AES-256 at rest and TLS 1.3 in transit. Your case files and drafts are protected at every stage.</p>
        </div>
        <div class="security-card" id="sec-retention">
          <div class="security-icon">🗑️</div>
          <h3>Minimal Data Retention</h3>
          <p>Uploaded documents are processed and not retained beyond your active session unless you explicitly save them to your account. You control your data.</p>
        </div>
        <div class="security-card" id="sec-access">
          <div class="security-icon">🛡️</div>
          <h3>Access Controls</h3>
          <p>Role-based access for team accounts. Only authorized members of your chambers or firm can view or edit shared drafts.</p>
        </div>
        <div class="security-card" id="sec-compliance">
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

/* ─── Navigation ─── */
function renderNav(currentPage) {
  const links = [
    { hash: '', label: 'Home' },
    { hash: 'how-it-works', label: 'How It Works' },
    { hash: 'for-advocates', label: 'For Advocates' },
    { hash: 'pricing', label: 'Pricing' },
    { hash: 'security', label: 'Security & Legal' }
  ];

  return `
  <nav class="nav" id="main-nav">
    <div class="nav-inner">
      <a href="#" class="nav-logo" id="nav-logo">
        <span class="nav-logo-mark">◈</span>
        <span class="nav-logo-text">NyayaVedika</span>
      </a>
      <button class="nav-toggle" id="nav-toggle" aria-label="Toggle menu">
        <span></span><span></span><span></span>
      </button>
      <div class="nav-links" id="nav-links">
        ${links.map(l => `
          <a href="#${l.hash}" class="nav-link${currentPage === l.hash ? ' active' : ''}" id="nav-${l.hash || 'home'}">${l.label}</a>
        `).join('')}
      </div>
      <a href="#pricing" class="btn btn-primary btn-sm nav-cta" id="nav-cta">Get Started</a>
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
          <a href="#how-it-works">How It Works</a>
          <a href="#pricing">Pricing</a>
          <a href="#security">Security</a>
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
  '':              renderHome,
  'how-it-works':  renderHowItWorks,
  'for-advocates': renderForAdvocates,
  'pricing':       renderPricing,
  'security':      renderSecurity
};

function getPage() {
  const hash = window.location.hash.replace('#', '');
  return routes[hash] ? hash : '';
}

function render() {
  const page = getPage();
  const app = document.getElementById('app');
  app.innerHTML = renderNav(page) + routes[page]() + renderFooter();

  // mobile nav toggle
  const toggle = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
      toggle.classList.toggle('open');
    });
  }

  // close mobile nav on link click
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      links?.classList.remove('open');
      toggle?.classList.remove('open');
    });
  });

  // scroll to top on page change
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.addEventListener('hashchange', render);
render();
