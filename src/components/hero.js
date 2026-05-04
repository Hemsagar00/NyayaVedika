/**
 * NyayaVedika — Premium Hero Section
 * Full-viewport hero with floating geometric SVG shapes, headline,
 * subheadline, dual CTAs, and scroll-reveal animation.
 *
 * Exports: mountHero(container) — appends the hero section to the given element.
 */
export function mountHero(container) {
  if (!container) return;

  /* ── Inject component-scoped styles ── */
  if (!document.getElementById('nv-hero-styles')) {
    const style = document.createElement('style');
    style.id = 'nv-hero-styles';
    style.textContent = `
      /* ── Hero Section Shell ── */
      .nv-hero {
        position: relative;
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: 120px 28px 80px;
        overflow: hidden;
        background: linear-gradient(175deg, #fafafa 0%, #f0f0f5 40%, #eaeaf0 100%);
        font-family: var(--font, 'Inter', system-ui, sans-serif);
      }

      [data-theme="dark"] .nv-hero {
        background: linear-gradient(175deg, #1a1a2e 0%, #151528 40%, #111122 100%);
      }

      /* ── Ambient gradient overlays ── */
      .nv-hero::before {
        content: '';
        position: absolute;
        inset: 0;
        background:
          radial-gradient(ellipse 55% 50% at 50% 35%, rgba(212, 168, 83, 0.08), transparent 70%),
          radial-gradient(ellipse 35% 30% at 75% 60%, rgba(212, 168, 83, 0.04), transparent 70%),
          radial-gradient(ellipse 30% 35% at 20% 45%, rgba(26, 26, 46, 0.05), transparent 70%);
        pointer-events: none;
        z-index: 0;
      }

      /* ── Hero content wrapper ── */
      .nv-hero-inner {
        position: relative;
        z-index: 2;
        max-width: 780px;
        margin: 0 auto;
      }

      /* ── Headline ── */
      .nv-hero-headline {
        font-family: var(--font-heading, 'Playfair Display', Georgia, serif);
        font-size: clamp(2.6rem, 7vw, 4.6rem);
        font-weight: 700;
        line-height: 1.10;
        letter-spacing: -0.025em;
        color: #1a1a2e;
        margin: 0 0 24px;
        opacity: 0;
        transform: translateY(32px);
        transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
                    transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
      }
      [data-theme="dark"] .nv-hero-headline {
        color: #fafafa;
      }

      .nv-hero-headline.revealed {
        opacity: 1;
        transform: translateY(0);
      }

      /* Gold accent for "Speaks Law" */
      .nv-hero-headline .nv-gold {
        background: linear-gradient(135deg, #d4a853 0%, #e0c472 40%, #c9a040 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      /* ── Subheadline ── */
      .nv-hero-sub {
        font-size: clamp(1.05rem, 1.8vw, 1.25rem);
        color: #555;
        line-height: 1.75;
        max-width: 600px;
        margin: 0 auto 44px;
        opacity: 0;
        transform: translateY(24px);
        transition: opacity 0.8s 0.15s cubic-bezier(0.16, 1, 0.3, 1),
                    transform 0.8s 0.15s cubic-bezier(0.16, 1, 0.3, 1);
      }
      [data-theme="dark"] .nv-hero-sub {
        color: #b0b0c0;
      }

      .nv-hero-sub.revealed {
        opacity: 1;
        transform: translateY(0);
      }

      /* ── CTA Row ── */
      .nv-hero-ctas {
        display: flex;
        gap: 16px;
        justify-content: center;
        flex-wrap: wrap;
        opacity: 0;
        transform: translateY(24px);
        transition: opacity 0.8s 0.30s cubic-bezier(0.16, 1, 0.3, 1),
                    transform 0.8s 0.30s cubic-bezier(0.16, 1, 0.3, 1);
      }

      .nv-hero-ctas.revealed {
        opacity: 1;
        transform: translateY(0);
      }

      /* ── Primary Gradient CTA ── */
      .nv-btn-primary {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 16px 36px;
        border-radius: 12px;
        font-family: var(--font, 'Inter', system-ui, sans-serif);
        font-size: 1rem;
        font-weight: 600;
        color: #fff;
        text-decoration: none;
        white-space: nowrap;
        cursor: pointer;
        border: none;
        background: linear-gradient(135deg, #1a1a2e 0%, #4a3f6b 40%, #d4a853 100%);
        background-size: 200% 200%;
        background-position: 0% 0%;
        box-shadow: 0 4px 24px rgba(212, 168, 83, 0.22);
        transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        position: relative;
        overflow: hidden;
      }

      .nv-btn-primary::after {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(135deg,
          transparent 35%,
          rgba(255, 255, 255, 0.18) 50%,
          transparent 65%);
        transform: translateX(-100%);
        transition: transform 0.7s ease;
      }

      .nv-btn-primary:hover {
        background-position: 100% 100%;
        box-shadow: 0 6px 36px rgba(212, 168, 83, 0.40);
        transform: translateY(-2px);
      }
      .nv-btn-primary:hover::after {
        transform: translateX(100%);
      }

      /* ── Outline CTA ── */
      .nv-btn-outline {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 16px 36px;
        border-radius: 12px;
        font-family: var(--font, 'Inter', system-ui, sans-serif);
        font-size: 1rem;
        font-weight: 600;
        color: #1a1a2e;
        background: transparent;
        border: 1.5px solid rgba(26, 26, 46, 0.25);
        text-decoration: none;
        white-space: nowrap;
        cursor: pointer;
        transition: all 0.35s ease;
      }
      [data-theme="dark"] .nv-btn-outline {
        color: #fafafa;
        border-color: rgba(250, 250, 250, 0.20);
      }

      .nv-btn-outline:hover {
        border-color: #d4a853;
        color: #d4a853;
        background: rgba(212, 168, 83, 0.06);
      }

      /* ── Floating SVG Shapes ── */
      .nv-shapes {
        position: absolute;
        inset: 0;
        pointer-events: none;
        z-index: 1;
      }

      .nv-shape {
        position: absolute;
        opacity: 0.16;
        animation: nv-float 7s ease-in-out infinite;
      }
      [data-theme="dark"] .nv-shape {
        opacity: 0.12;
      }

      /* Individual shape positioning & timing offsets */
      .nv-shape--1 {
        top: 12%;
        left: 8%;
        animation-duration: 6.5s;
        animation-delay: 0s;
      }
      .nv-shape--2 {
        top: 68%;
        left: 10%;
        animation-duration: 8.5s;
        animation-delay: 1.2s;
      }
      .nv-shape--3 {
        top: 18%;
        right: 10%;
        animation-duration: 7.2s;
        animation-delay: 0.5s;
      }
      .nv-shape--4 {
        top: 60%;
        right: 8%;
        animation-duration: 9.0s;
        animation-delay: 2.0s;
      }
      .nv-shape--5 {
        top: 40%;
        left: 50%;
        animation-duration: 10s;
        animation-delay: 0.8s;
        transform: translate(-50%, -50%);
      }
      .nv-shape--6 {
        bottom: 8%;
        left: 40%;
        animation-duration: 7.8s;
        animation-delay: 1.8s;
      }

      @keyframes nv-float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        33%      { transform: translateY(-18px) rotate(1deg); }
        66%      { transform: translateY(-6px) rotate(-0.5deg); }
      }

      /* ── Responsive ── */
      @media (max-width: 640px) {
        .nv-hero {
          padding: 100px 20px 60px;
          min-height: 90vh;
        }
        .nv-hero-headline {
          font-size: clamp(2rem, 9vw, 2.8rem);
        }
        .nv-hero-sub {
          max-width: 100%;
        }
        .nv-hero-ctas {
          flex-direction: column;
          align-items: stretch;
        }
        .nv-btn-primary,
        .nv-btn-outline {
          width: 100%;
          justify-content: center;
        }
        .nv-shape--5,
        .nv-shape--6 {
          display: none;
        }
      }

      @media (min-width: 641px) and (max-width: 1024px) {
        .nv-shape--6 {
          display: none;
        }
      }
    `;
    document.head.appendChild(style);
  }

  /* ── Build SVG shapes (scale-of-justice & geometric motifs) ── */
  const shapesHTML = `
    <div class="nv-shapes" aria-hidden="true">
      <!-- Shape 1: Abstract scales beam (top-left) -->
      <svg class="nv-shape nv-shape--1" width="72" height="88" viewBox="0 0 72 88" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M36 4L4 84h64L36 4z" stroke="#1a1a2e" stroke-width="1.8" stroke-linejoin="round"/>
        <line x1="36" y1="30" x2="36" y2="84" stroke="#1a1a2e" stroke-width="1.8"/>
        <line x1="18" y1="52" x2="54" y2="52" stroke="#d4a853" stroke-width="1.4" opacity="0.6"/>
        <circle cx="36" cy="18" r="3" fill="#d4a853" opacity="0.7"/>
      </svg>

      <!-- Shape 2: Circle-ring motif (bottom-left) -->
      <svg class="nv-shape nv-shape--2" width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="28" cy="28" r="26" stroke="#1a1a2e" stroke-width="1.5"/>
        <circle cx="28" cy="28" r="14" stroke="#d4a853" stroke-width="1.2" opacity="0.55"/>
        <circle cx="28" cy="28" r="5" fill="#d4a853" opacity="0.35"/>
        <line x1="28" y1="6" x2="28" y2="18" stroke="#1a1a2e" stroke-width="0.8" opacity="0.4"/>
        <line x1="28" y1="38" x2="28" y2="50" stroke="#1a1a2e" stroke-width="0.8" opacity="0.4"/>
        <line x1="6" y1="28" x2="18" y2="28" stroke="#1a1a2e" stroke-width="0.8" opacity="0.4"/>
        <line x1="38" y1="28" x2="50" y2="28" stroke="#1a1a2e" stroke-width="0.8" opacity="0.4"/>
      </svg>

      <!-- Shape 3: Diamond / gavel-head motif (top-right) -->
      <svg class="nv-shape nv-shape--3" width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="20" width="44" height="16" rx="3" stroke="#1a1a2e" stroke-width="1.6"/>
        <rect x="24" y="36" width="16" height="22" rx="2" stroke="#1a1a2e" stroke-width="1.4"/>
        <line x1="18" y1="44" x2="12" y2="50" stroke="#d4a853" stroke-width="1.3" opacity="0.5"/>
        <line x1="46" y1="44" x2="52" y2="50" stroke="#d4a853" stroke-width="1.3" opacity="0.5"/>
        <path d="M32 10l-6 10h12l-6-10z" stroke="#d4a853" stroke-width="1.2" fill="none" opacity="0.6"/>
      </svg>

      <!-- Shape 4: Pillar / column silhouette (bottom-right) -->
      <svg class="nv-shape nv-shape--4" width="44" height="80" viewBox="0 0 44 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="4" width="32" height="8" rx="2" stroke="#1a1a2e" stroke-width="1.5"/>
        <rect x="10" y="12" width="24" height="60" rx="1" stroke="#1a1a2e" stroke-width="1.2"/>
        <rect x="6" y="68" width="32" height="8" rx="2" stroke="#1a1a2e" stroke-width="1.5"/>
        <line x1="22" y1="20" x2="22" y2="44" stroke="#d4a853" stroke-width="1.0" opacity="0.5" stroke-dasharray="4 4"/>
        <line x1="14" y1="30" x2="30" y2="30" stroke="#d4a853" stroke-width="0.8" opacity="0.35"/>
      </svg>

      <!-- Shape 5: Intersecting arcs (center, subtle) -->
      <svg class="nv-shape nv-shape--5" width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M60 20a40 40 0 10-40 40" stroke="#d4a853" stroke-width="1.2" opacity="0.5" fill="none"/>
        <path d="M20 20a40 40 0 1140 40" stroke="#1a1a2e" stroke-width="1.2" opacity="0.35" fill="none"/>
        <circle cx="40" cy="40" r="4" stroke="#d4a853" stroke-width="1.0" opacity="0.45" fill="none"/>
      </svg>

      <!-- Shape 6: Tiny plus / cross (bottom-center, legal motif) -->
      <svg class="nv-shape nv-shape--6" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="16" y1="4" x2="16" y2="28" stroke="#1a1a2e" stroke-width="1.3" opacity="0.5"/>
        <line x1="4" y1="16" x2="28" y2="16" stroke="#d4a853" stroke-width="1.1" opacity="0.45"/>
        <circle cx="16" cy="16" r="3" fill="#d4a853" opacity="0.3"/>
      </svg>
    </div>
  `;

  /* ── Build hero content ── */
  const html = `
    <section class="nv-hero" id="nv-hero-section">
      ${shapesHTML}

      <div class="nv-hero-inner">
        <h1 class="nv-hero-headline" id="nv-hero-headline">
          AI That <span class="nv-gold">Speaks Law</span>
        </h1>

        <p class="nv-hero-sub" id="nv-hero-sub">
          Draft SLPs, writ petitions, bail applications, NDPS bail, revenue appeals,
          and more — powered by AI trained on Indian law. From Supreme Court to
          Tahsildar, generate court-ready pleadings in minutes.
        </p>

        <div class="nv-hero-ctas" id="nv-hero-ctas">
          <a href="#drafting" class="nv-btn-primary">Start Drafting</a>
          <a href="#about" class="nv-btn-outline">Learn More</a>
        </div>
      </div>
    </section>
  `;

  container.insertAdjacentHTML('beforeend', html);

  /* ── Scroll-reveal animation via IntersectionObserver ── */
  const headline = document.getElementById('nv-hero-headline');
  const sub = document.getElementById('nv-hero-sub');
  const ctas = document.getElementById('nv-hero-ctas');

  // Immediately reveal on mount (hero is above the fold) with a short delay
  // to allow the browser to paint first, producing a smooth entrance.
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      if (headline) headline.classList.add('revealed');
      if (sub) sub.classList.add('revealed');
      if (ctas) ctas.classList.add('revealed');
    });
  });

  // Also observe via IntersectionObserver so that if the component is
  // mounted after the page is scrolled past, it still reveals.
  const heroSection = document.getElementById('nv-hero-section');
  if (heroSection) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (headline) headline.classList.add('revealed');
            if (sub) sub.classList.add('revealed');
            if (ctas) ctas.classList.add('revealed');
            observer.unobserve(heroSection);
          }
        });
      },
      { threshold: 0.15 }
    );
    observer.observe(heroSection);
  }
}
