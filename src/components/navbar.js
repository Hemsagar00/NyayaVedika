/**
 * NyayaVedika — Premium Navbar Component
 * Sticky frosted-glass navigation with backdrop-blur.
 * Exports: mountNavbar(container) — appends navbar to the given element.
 *
 * Design tokens consumed from :root / design-system.css:
 *   --font, --font-heading, --accent (#d4a853), --bg (#1a1a2e), --text, etc.
 */
export function mountNavbar(container) {
  if (!container) return;

  /* ── Inject component-scoped styles ── */
  if (!document.getElementById('nv-navbar-styles')) {
    const style = document.createElement('style');
    style.id = 'nv-navbar-styles';
    style.textContent = `
      /* ── Navbar shell ── */
      .nv-nav {
        position: sticky;
        top: 0;
        z-index: 110;
        width: 100%;
        background: rgba(5, 5, 5, 0.82);
        backdrop-filter: blur(18px) saturate(2);
        -webkit-backdrop-filter: blur(18px) saturate(2);
        border-bottom: 1px solid rgba(217, 119, 87, 0.14);
        transition: background 0.4s ease;
        font-family: var(--font-body, 'Inter', system-ui, sans-serif);
      }

      [data-theme="light"] .nv-nav {
        background: rgba(255, 255, 255, 0.55);
        border-bottom: 1px solid rgba(217, 119, 87, 0.12);
      }

      .nv-nav-inner {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 28px;
        display: flex;
        align-items: center;
        height: 68px;
        gap: 36px;
      }

      /* ── Logo ── */
      .nv-logo {
        display: flex;
        align-items: baseline;
        gap: 5px;
        font-family: var(--font-heading, 'Playfair Display', Georgia, serif);
        font-size: 1.45rem;
        font-weight: 700;
        color: #f0ede8;
        text-decoration: none;
        letter-spacing: -0.01em;
        flex-shrink: 0;
        transition: color 0.3s;
      }
      [data-theme="light"] .nv-logo {
        color: #1a1a2e;
      }

      .nv-logo-dot {
        display: inline-block;
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: #D97757;
        margin-left: 1px;
        vertical-align: middle;
        position: relative;
        top: -10px;
        box-shadow: 0 0 8px rgba(217, 119, 87, 0.5);
      }

      /* ── Nav links ── */
      .nv-links {
        display: flex;
        align-items: center;
        gap: 4px;
        margin-left: auto;
        list-style: none;
      }

      .nv-link {
        padding: 8px 16px;
        border-radius: 8px;
        font-size: 0.88rem;
        font-weight: 500;
        color: #8c8984;
        text-decoration: none;
        transition: all 0.25s ease;
        white-space: nowrap;
      }
      [data-theme="light"] .nv-link {
        color: #444;
      }

      .nv-link:hover {
        color: #f0ede8;
        background: rgba(217, 119, 87, 0.10);
      }
      [data-theme="light"] .nv-link:hover {
        color: #1a1a2e;
        background: rgba(217, 119, 87, 0.12);
      }

      /* ── CTA Gradient Button ── */
      .nv-cta {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        padding: 10px 24px;
        border-radius: 10px;
        font-family: var(--font-body, 'Inter', system-ui, sans-serif);
        font-size: 0.85rem;
        font-weight: 600;
        color: #000;
        text-decoration: none;
        white-space: nowrap;
        cursor: pointer;
        border: none;
        background: linear-gradient(135deg, #D97757 0%, #E0886A 50%, #D97757 100%);
        background-size: 200% 200%;
        background-position: 0% 0%;
        box-shadow: 0 2px 16px rgba(217, 119, 87, 0.20);
        transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        position: relative;
        overflow: hidden;
      }

      .nv-cta::after {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(135deg,
          transparent 35%,
          rgba(255, 255, 255, 0.2) 50%,
          transparent 65%);
        transform: translateX(-100%);
        transition: transform 0.7s ease;
      }

      .nv-cta:hover {
        background-position: 100% 100%;
        box-shadow: 0 4px 28px rgba(217, 119, 87, 0.40);
        transform: translateY(-1px);
      }
      .nv-cta:hover::after {
        transform: translateX(100%);
      }

      /* ── Hamburger (mobile) ── */
      .nv-hamburger {
        display: none;
        flex-direction: column;
        justify-content: center;
        gap: 5px;
        width: 28px;
        height: 22px;
        background: none;
        border: none;
        cursor: pointer;
        padding: 0;
        flex-shrink: 0;
        z-index: 120;
      }

      .nv-hamburger span {
        display: block;
        width: 100%;
        height: 2px;
        border-radius: 2px;
        background: #f0ede8;
        transition: all 0.3s ease;
      }
      [data-theme="light"] .nv-hamburger span {
        background: #1a1a2e;
      }

      .nv-hamburger.open span:nth-child(1) {
        transform: translateY(7px) rotate(45deg);
      }
      .nv-hamburger.open span:nth-child(2) {
        opacity: 0;
        transform: scaleX(0);
      }
      .nv-hamburger.open span:nth-child(3) {
        transform: translateY(-7px) rotate(-45deg);
      }

      /* ── Mobile menu panel ── */
      .nv-mobile-menu {
        display: none;
        position: fixed;
        top: 68px;
        left: 0;
        right: 0;
        background: rgba(5, 5, 5, 0.96);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border-bottom: 1px solid rgba(217, 119, 87, 0.15);
        padding: 20px 28px 28px;
        flex-direction: column;
        gap: 8px;
        z-index: 109;
        box-shadow: 0 12px 32px rgba(0, 0, 0, 0.6);
        transform: translateY(-8px);
        opacity: 0;
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      }
      [data-theme="light"] .nv-mobile-menu {
        background: rgba(255, 255, 255, 0.94);
        box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
      }

      .nv-mobile-menu.active {
        display: flex;
        transform: translateY(0);
        opacity: 1;
      }

      .nv-mobile-menu .nv-link {
        padding: 12px 16px;
        font-size: 1rem;
        border-radius: 10px;
      }

      .nv-mobile-menu .nv-cta {
        margin-top: 8px;
        width: 100%;
        justify-content: center;
        padding: 14px 24px;
        font-size: 0.95rem;
      }

      /* ── Responsive ── */
      @media (max-width: 860px) {
        .nv-nav-inner {
          gap: 16px;
          padding: 0 20px;
        }
        .nv-links {
          display: none;
        }
        .nv-cta.desktop-only {
          display: none;
        }
        .nv-hamburger {
          display: flex;
          margin-left: auto;
        }
      }

      @media (min-width: 861px) {
        .nv-mobile-menu {
          display: none !important;
          opacity: 0 !important;
          transform: translateY(-8px) !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  /* ── Build HTML ── */
  const links = [
    { label: 'Drafting', href: '#drafting' },
    { label: 'Legal Updates', href: '#legal-updates' },
    { label: 'Judgments', href: '#judgments' },
  ];

  const html = `
    <nav class="nv-nav" id="nv-navbar" role="navigation" aria-label="Main navigation">
      <div class="nv-nav-inner">
        <a href="#" class="nv-logo" aria-label="NyayaVedika home">
          NyayaVedika<span class="nv-logo-dot" aria-hidden="true"></span>
        </a>

        <div class="nv-links">
          ${links.map(l => `<a href="${l.href}" class="nv-link">${l.label}</a>`).join('')}
        </div>

        <a href="#drafting" class="nv-cta desktop-only">Start Drafting</a>

        <button class="nv-hamburger" id="nv-hamburger" aria-label="Toggle menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>

      <div class="nv-mobile-menu" id="nv-mobile-menu">
        ${links.map(l => `<a href="${l.href}" class="nv-link">${l.label}</a>`).join('')}
        <a href="#drafting" class="nv-cta">Start Drafting</a>
      </div>
    </nav>
  `;

  container.insertAdjacentHTML('beforeend', html);

  /* ── Attach mobile toggle ── */
  const hamburger = document.getElementById('nv-hamburger');
  const mobileMenu = document.getElementById('nv-mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('active');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when a link is clicked
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.focus();
      }
    });
  }
}
