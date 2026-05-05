import './styles/global.css';
import { mountThreeBackground } from './components/three-bg.js';
import { mountNavbar } from './components/navbar.js';
import { mountHero } from './components/hero.js';
import { mountFeatures } from './components/features.js';
import { mountJudgments } from './components/judgments.js';
import { mountNews } from './components/news.js';
import { mountFooter } from './components/footer.js';
import { mountDraftingPanel } from './components/draftingPanel.js';
import { generateLegalUpdate } from './services/aiService.js';
import { getTheme, setTheme, toggleTheme } from './services/storage.js';

/* ─── Init 3D ─── */
mountThreeBackground();

/* ─── Scroll parallax variable ─── */
window.addEventListener('scroll', () => {
  document.documentElement.style.setProperty('--scroll-offset', `${window.scrollY}px`);
}, { passive: true });

/* ─── 3D Card Tilt on mouse move ─── */
let tiltRAF = null;
document.addEventListener('mousemove', (e) => {
  if (tiltRAF) return;
  tiltRAF = requestAnimationFrame(() => {
    tiltRAF = null;
    const cards = document.querySelectorAll('.card-3d, .feature-card, .judgment-card, .news-card, .nv-features-v5-card');
    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 1.5) {
        const tiltX = dy * -8;
        const tiltY = dx * 8;
        card.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-2px)`;
        card.style.boxShadow = `0 20px 50px rgba(191,155,48,0.15), ${-tiltY}px ${-tiltX}px 30px rgba(0,0,0,0.3)`;
        card.style.borderColor = '#bf9b30';
      } else {
        card.style.transform = '';
        card.style.boxShadow = '';
        card.style.borderColor = '';
      }
    });
  });
}, { passive: true });

/* ─── Drafting page ─── */
function renderDrafting() {
  return `
  <section class="section" id="drafting-hero" style="text-align:center;padding-top:120px">
    <h1 style="font-family:'Sora',sans-serif;font-size:clamp(2rem,5vw,3rem);color:#e8e4db;margin-bottom:16px">AI Drafting <span style="background:linear-gradient(135deg,#bf9b30,#e8cd78);-webkit-background-clip:text;-webkit-text-fill-color:transparent">Assistant</span></h1>
    <p style="color:#9a968a;max-width:640px;margin:0 auto;font-size:1.1rem">Generate court-ready petitions for Supreme Court, High Court & District Courts. Free for all advocates.</p>
  </section>
  <div class="container" id="ai-panel-mount" style="padding-bottom:64px"></div>
  <section style="background:#0d0f20;color:#9a968a;padding:32px;text-align:center;font-size:0.9rem">
    <p><strong style="color:#bf9b30">⚠️ Important:</strong> All drafts must be reviewed by a qualified advocate before filing. NyayaVedika is a drafting tool, not legal advice.</p>
  </section>`;
}

/* ─── Legal Updates page ─── */
function renderLegalUpdates() {
  const topics = [
    'Section 37 NDPS Act — Twin Conditions for Bail',
    'Article 226 vs 227 — High Court Powers',
    'Default Bail under Section 187 BNSS',
    'Quashing under Section 528 BNSS / 482 CrPC',
    'Anticipatory Bail under BNS/BNSS',
  ];
  return `
  <section class="section" style="text-align:center;padding-top:120px">
    <h1 style="font-family:'Sora',sans-serif;font-size:clamp(2rem,5vw,3rem);color:#e8e4db;margin-bottom:16px">📰 Legal Updates & Digest</h1>
    <p style="color:#9a968a;max-width:640px;margin:0 auto">Enter any legal topic — get a comprehensive AI-generated digest with statutes, landmark judgments, and practice tips.</p>
  </section>
  <section style="padding:48px 0 96px">
    <div class="container">
      <div style="display:flex;gap:12px;margin-bottom:24px;flex-wrap:wrap">
        <input class="form-input" id="legal-topic-input" placeholder="e.g. Section 37 NDPS Act twin conditions for bail..." style="flex:1;min-width:250px;font-size:1rem" />
        <button class="btn-primary" id="btn-generate-update" style="padding:14px 28px;border-radius:9999px;background:linear-gradient(135deg,#bf9b30,#d4af37);color:#080a14;font-weight:700;border:none;cursor:pointer">Generate Digest</button>
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:32px">
        ${topics.map(t => `<button class="topic-chip" data-topic="${t}" style="padding:8px 16px;border:1px solid rgba(255,255,255,0.06);border-radius:9999px;background:#0d0f20;color:#7a766d;font-size:0.85rem;cursor:pointer;transition:all 0.2s">${t}</button>`).join('')}
      </div>
      <div id="update-loading" style="display:none;text-align:center;padding:40px"><p style="color:#9a968a">Generating digest...</p></div>
      <div id="update-result" style="display:none"><div id="update-result-body" style="background:#0d0f20;border:1px solid rgba(255,255,255,0.06);border-radius:14px;padding:32px;white-space:pre-wrap;line-height:1.8;font-size:0.95rem;color:#e8e4db"></div>
      <div style="margin-top:16px;display:flex;gap:8px"><button class="btn-secondary" id="btn-update-copy">Copy</button><button class="btn-secondary" id="btn-update-download">Download .txt</button></div></div>
      <div id="update-error" style="display:none;color:#cf4a4a;padding:16px;text-align:center"></div>
    </div>
  </section>
  <section style="background:#0d0f20;color:#9a968a;padding:32px;text-align:center;font-size:0.9rem">
    <p><strong style="color:#bf9b30">⚠️ AI-Generated:</strong> Legal updates are generated by AI. Always verify with primary sources before relying on this information.</p>
  </section>`;
}

function attachLegalUpdatesEvents() {
  const input = document.getElementById('legal-topic-input');
  const btn = document.getElementById('btn-generate-update');
  const loading = document.getElementById('update-loading');
  const result = document.getElementById('update-result');
  const resultBody = document.getElementById('update-result-body');
  const error = document.getElementById('update-error');

  async function run(topic) {
    if (!topic) { error.style.display='block'; error.textContent='Please enter a legal topic.'; return; }
    error.style.display='none'; result.style.display='none'; loading.style.display='block';
    try {
      const out = await generateLegalUpdate(topic);
      loading.style.display='none'; resultBody.textContent = out; result.style.display='block';
    } catch (err) {
      loading.style.display='none'; error.style.display='block'; error.textContent = err.message;
    }
  }

  btn?.addEventListener('click', () => run(input?.value));
  document.querySelectorAll('.topic-chip').forEach(c => c.addEventListener('click', () => { input.value = c.dataset.topic; run(c.dataset.topic); }));
  document.getElementById('btn-update-copy')?.addEventListener('click', () => { navigator.clipboard.writeText(resultBody?.innerText); });
  document.getElementById('btn-update-download')?.addEventListener('click', () => {
    const blob = new Blob([resultBody?.innerText], {type:'text/plain'});
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download=`nyayavedika-digest-${Date.now()}.txt`; a.click();
  });
}

/* ─── Home page ─── */
function renderHome() {
  const app = document.getElementById('app');
  const navbar = document.createElement('div'); app.appendChild(navbar); mountNavbar(navbar);
  const hero = document.createElement('div'); app.appendChild(hero); mountHero(hero);
  const features = document.createElement('div'); app.appendChild(features); mountFeatures(features);
  const judgments = document.createElement('div'); app.appendChild(judgments); mountJudgments(judgments);
  const news = document.createElement('div'); app.appendChild(news); mountNews(news);
  const cta = document.createElement('section');
  cta.innerHTML = `<div class="container" style="text-align:center;padding:96px 0">
    <h2 style="font-family:'Sora',sans-serif;font-size:clamp(1.8rem,3vw,2.5rem);color:#e8e4db;margin-bottom:16px">Start drafting like a <span style="background:linear-gradient(135deg,#bf9b30,#e8cd78);-webkit-background-clip:text;-webkit-text-fill-color:transparent">top-tier chamber</span> — for free</h2>
    <p style="color:#9a968a;max-width:600px;margin:0 auto 32px;font-size:1.1rem">No subscriptions. No paywalls. Just powerful AI drafting for every Indian advocate.</p>
    <a href="#drafting" style="display:inline-flex;padding:16px 36px;border-radius:9999px;background:linear-gradient(135deg,#bf9b30,#d4af37);color:#080a14;font-weight:700;text-decoration:none;font-size:1.1rem;box-shadow:0 0 32px rgba(191,155,48,0.25)">Open AI Drafting Tool — Free</a>
  </div>`;
  app.appendChild(cta);
  const footer = document.createElement('div'); app.appendChild(footer); mountFooter(footer);
  setupScrollReveal();
}

/* ─── Scroll Reveal ─── */
function setupScrollReveal() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('[data-reveal]').forEach(el => { el.classList.add('revealed'); });
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('revealed'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
}

/* ─── Routing ─── */
const routes = { 'drafting': renderDrafting, 'legal-updates': renderLegalUpdates };
const hasRoutes = { 'drafting': true, 'legal-updates': true };

function getPage() {
  const h = window.location.hash.replace('#', '');
  return routes[h] ? h : '';
}

function render() {
  const app = document.getElementById('app');
  app.innerHTML = '';
  const page = getPage();

  if (page) {
    const navbar = document.createElement('div'); app.appendChild(navbar); mountNavbar(navbar);
    const content = document.createElement('div'); content.innerHTML = routes[page](); app.appendChild(content);
    const footer = document.createElement('div'); app.appendChild(footer); mountFooter(footer);

    if (page === 'drafting') mountDraftingPanel('ai-panel-mount');
    if (page === 'legal-updates') setTimeout(attachLegalUpdatesEvents, 50);
    setupScrollReveal();
  } else {
    renderHome();
  }
  window.scrollTo(0, 0);
}

/* ─── Init ─── */
window.addEventListener('hashchange', render);
setTheme(getTheme());
render();
