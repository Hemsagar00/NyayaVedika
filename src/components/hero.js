/**
 * NyayaVedika v5 — Hero Section
 * Bold SaaS hero with typewriter, dual CTA, avatar cluster, marquee
 * Midnight Court palette: deep indigo + Supreme Court gold
 */
export function mountHero(container) {
  if (!container) return;

  // Inject styles
  if (!document.getElementById('nv-hero-v5-styles')) {
    const style = document.createElement('style');
    style.id = 'nv-hero-v5-styles';
    style.textContent = `
      .nv-hero-v5 {
        position: relative;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: 120px 24px 40px;
        overflow: hidden;
      }

      .nv-hero-v5-badge {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 6px 16px;
        border-radius: 9999px;
        background: rgba(191, 155, 48, 0.08);
        border: 1px solid rgba(191, 155, 48, 0.15);
        font-size: 0.8rem;
        color: #bf9b30;
        margin-bottom: 32px;
        animation: fadeInUp 0.8s ease-out;
      }

      .nv-hero-v5-badge-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #bf9b30;
        animation: pulse 2s infinite;
      }

      .nv-hero-v5-title {
        font-family: 'Sora', 'Inter', system-ui, sans-serif;
        font-size: clamp(2.8rem, 7vw, 5.5rem);
        font-weight: 800;
        line-height: 1.08;
        letter-spacing: -0.03em;
        max-width: 900px;
        margin-bottom: 24px;
        animation: fadeInUp 0.8s ease-out 0.1s both;
      }

      .nv-hero-v5-title .gold {
        background: linear-gradient(135deg, #bf9b30 0%, #d4af37 40%, #e8cd78 70%, #bf9b30 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      .nv-hero-v5-typewriter {
        font-family: 'JetBrains Mono', monospace;
        font-size: 1.2rem;
        color: #bf9b30;
        margin-bottom: 16px;
        min-height: 1.8em;
        animation: fadeInUp 0.8s ease-out 0.2s both;
      }

      .nv-hero-v5-typewriter .cursor {
        display: inline-block;
        width: 2px;
        height: 1.2em;
        background: #bf9b30;
        margin-left: 2px;
        animation: blink 0.8s infinite;
        vertical-align: text-bottom;
      }

      .nv-hero-v5-subtitle {
        font-size: 1.15rem;
        color: #9a968a;
        max-width: 560px;
        margin: 0 auto 40px;
        line-height: 1.7;
        animation: fadeInUp 0.8s ease-out 0.3s both;
      }

      .nv-hero-v5-ctas {
        display: flex;
        gap: 16px;
        flex-wrap: wrap;
        justify-content: center;
        margin-bottom: 48px;
        animation: fadeInUp 0.8s ease-out 0.4s both;
      }

      .nv-hero-v5-btn-primary {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 16px 32px;
        border-radius: 9999px;
        font-size: 1rem;
        font-weight: 600;
        color: #080a14;
        background: linear-gradient(135deg, #bf9b30 0%, #d4af37 50%, #bf9b30 100%);
        background-size: 200% 200%;
        box-shadow: 0 0 32px rgba(191, 155, 48, 0.25);
        text-decoration: none;
        transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .nv-hero-v5-btn-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 0 48px rgba(191, 155, 48, 0.4);
        background-position: 100% 100%;
      }

      .nv-hero-v5-btn-secondary {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 16px 32px;
        border-radius: 9999px;
        font-size: 1rem;
        font-weight: 600;
        color: #e8e4db;
        background: transparent;
        border: 1px solid rgba(255,255,255,0.1);
        text-decoration: none;
        transition: all 0.3s ease;
      }
      .nv-hero-v5-btn-secondary:hover {
        border-color: #bf9b30;
        color: #bf9b30;
        background: rgba(191, 155, 48, 0.06);
      }

      .nv-hero-v5-avatars {
        display: flex;
        align-items: center;
        gap: 16px;
        margin-bottom: 48px;
        animation: fadeInUp 0.8s ease-out 0.5s both;
      }

      .nv-hero-v5-avatar-stack {
        display: flex;
        margin-right: 4px;
      }
      .nv-hero-v5-avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 2px solid #080a14;
        margin-left: -12px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        font-size: 0.85rem;
        color: #080a14;
      }
      .nv-hero-v5-avatar:first-child { margin-left: 0; }
      .nv-hero-v5-avatar:nth-child(1) { background: #bf9b30; }
      .nv-hero-v5-avatar:nth-child(2) { background: #d4af37; }
      .nv-hero-v5-avatar:nth-child(3) { background: #e8cd78; }
      .nv-hero-v5-avatar:nth-child(4) { background: #c9a84c; }

      .nv-hero-v5-avatar-text {
        color: #9a968a;
        font-size: 0.9rem;
      }
      .nv-hero-v5-avatar-text strong {
        color: #bf9b30;
        font-weight: 700;
      }

      /* Marquee */
      .nv-hero-v5-marquee {
        width: 100%;
        overflow: hidden;
        border-top: 1px solid rgba(255,255,255,0.04);
        border-bottom: 1px solid rgba(255,255,255,0.04);
        padding: 16px 0;
        margin-top: auto;
        animation: fadeInUp 0.8s ease-out 0.6s both;
      }

      .nv-hero-v5-marquee-track {
        display: flex;
        gap: 48px;
        animation: marqueeLeft 35s linear infinite;
        white-space: nowrap;
      }

      .nv-hero-v5-marquee-track span {
        color: #5a564d;
        font-size: 0.85rem;
        font-weight: 500;
        letter-spacing: 0.02em;
      }

      @keyframes marqueeLeft {
        from { transform: translateX(0); }
        to { transform: translateX(-50%); }
      }

      @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
      }

      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.4; }
      }

      @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
      }

      @media (max-width: 640px) {
        .nv-hero-v5-title { font-size: 2.2rem; }
        .nv-hero-v5-typewriter { font-size: 1rem; }
        .nv-hero-v5-subtitle { font-size: 1rem; }
      }
    `;
    document.head.appendChild(style);
  }

  const words = ['SLPs.', 'Writs.', 'Bail Applications.', 'Revenue Appeals.', 'NDPS Bail.'];
  const marqueeText = 'Trusted by advocates at Supreme Court · Delhi High Court · Bombay High Court · Madras High Court · Karnataka High Court · Andhra Pradesh High Court';

  container.innerHTML = `
    <section class="nv-hero-v5">
      <div class="nv-hero-v5-badge">
        <span class="nv-hero-v5-badge-dot"></span>
        Now drafting with NVIDIA Llama 4
      </div>

      <h1 class="nv-hero-v5-title">
        <span class="gold">AI That Drafts.</span><br>
        <span style="color:#e8e4db">You That Wins.</span>
      </h1>

      <div class="nv-hero-v5-typewriter">
        <span id="nv-typewriter-text"></span><span class="cursor"></span>
      </div>

      <p class="nv-hero-v5-subtitle">
        Generate court-ready petitions in minutes. Free for every Indian advocate — Supreme Court, High Court, and District Courts.
      </p>

      <div class="nv-hero-v5-ctas">
        <a href="#drafting" class="nv-hero-v5-btn-primary">⚡ Try Free Draft</a>
        <a href="#how-it-works" class="nv-hero-v5-btn-secondary">See How It Works ↓</a>
      </div>

      <div class="nv-hero-v5-avatars">
        <div class="nv-hero-v5-avatar-stack">
          <div class="nv-hero-v5-avatar">AK</div>
          <div class="nv-hero-v5-avatar">RS</div>
          <div class="nv-hero-v5-avatar">MP</div>
          <div class="nv-hero-v5-avatar">+</div>
        </div>
        <span class="nv-hero-v5-avatar-text"><strong>500+</strong> advocates drafting daily</span>
      </div>

      <div class="nv-hero-v5-marquee">
        <div class="nv-hero-v5-marquee-track">
          <span>${marqueeText}</span>
          <span>${marqueeText}</span>
        </div>
      </div>
    </section>
  `;

  // Typewriter effect
  const el = document.getElementById('nv-typewriter-text');
  if (!el) return;

  let wordIdx = 0, charIdx = 0, isDeleting = false;
  function type() {
    const current = words[wordIdx];
    if (isDeleting) {
      el.textContent = current.substring(0, charIdx - 1);
      charIdx--;
    } else {
      el.textContent = current.substring(0, charIdx + 1);
      charIdx++;
    }

    if (!isDeleting && charIdx === current.length) {
      setTimeout(() => { isDeleting = true; type(); }, 1800);
      return;
    }
    if (isDeleting && charIdx === 0) {
      isDeleting = false;
      wordIdx = (wordIdx + 1) % words.length;
      setTimeout(type, 400);
      return;
    }

    setTimeout(type, isDeleting ? 40 : 80);
  }
  type();
}
