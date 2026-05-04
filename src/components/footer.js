// src/components/footer.js — Premium Footer
export function mountFooter(container) {
  const id = 'nv-footer-styles';
  if (!document.getElementById(id)) {
    const style = document.createElement('style');
    style.id = id;
    style.textContent = `
      #nv-footer {
        border-top: 1px solid var(--color-border);
        padding: var(--space-3xl) var(--space-lg) var(--space-2xl);
        background: var(--color-primary);
        color: rgba(255,255,255,0.8);
      }
      #nv-footer .footer-inner {
        max-width: var(--max-width);
        margin: 0 auto;
        display: grid;
        grid-template-columns: 2fr 1fr 1fr 1fr;
        gap: var(--space-2xl);
      }
      #nv-footer .footer-brand h3 {
        font-family: var(--font-heading);
        font-size: 1.5rem;
        color: white;
        margin-bottom: var(--space-sm);
      }
      #nv-footer .footer-brand p {
        font-size: 0.9rem;
        opacity: 0.7;
        line-height: 1.6;
      }
      #nv-footer h4 {
        font-family: var(--font-heading);
        color: var(--color-accent);
        font-size: 0.85rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        margin-bottom: var(--space-lg);
      }
      #nv-footer ul {
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: var(--space-sm);
      }
      #nv-footer ul li a {
        font-size: 0.9rem;
        opacity: 0.7;
        transition: opacity var(--duration-fast);
      }
      #nv-footer ul li a:hover { opacity: 1; color: var(--color-accent); }
      #nv-footer .footer-bottom {
        max-width: var(--max-width);
        margin: var(--space-2xl) auto 0;
        padding-top: var(--space-xl);
        border-top: 1px solid rgba(255,255,255,0.1);
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: var(--space-md);
        font-size: 0.8rem;
        opacity: 0.6;
      }
      @media (max-width: 768px) {
        #nv-footer .footer-inner { grid-template-columns: 1fr 1fr; }
      }
      @media (max-width: 500px) {
        #nv-footer .footer-inner { grid-template-columns: 1fr; }
      }
    `;
    document.head.appendChild(style);
  }

  const footer = document.createElement('footer');
  footer.id = 'nv-footer';

  footer.innerHTML = `
    <div class="footer-inner">
      <div class="footer-brand">
        <h3>NyayaVedika</h3>
        <p>AI-powered legal drafting, research, and case analysis for Indian advocates. All courts. Free.</p>
      </div>
      <div>
        <h4>Tools</h4>
        <ul>
          <li><a href="#nv-drafting">Legal Drafting</a></li>
          <li><a href="#nv-judgments">Judgments Feed</a></li>
          <li><a href="#">Case Analysis</a></li>
          <li><a href="#">Legal Research</a></li>
        </ul>
      </div>
      <div>
        <h4>Courts</h4>
        <ul>
          <li><a href="#">Supreme Court</a></li>
          <li><a href="#">All High Courts</a></li>
          <li><a href="#">District Courts</a></li>
          <li><a href="#">Tribunals</a></li>
        </ul>
      </div>
      <div>
        <h4>Connect</h4>
        <ul>
          <li><a href="#contact">Contact Us</a></li>
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Terms of Use</a></li>
          <li><a href="#">About</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2026 NyayaVedika. Built with ❤️ for Indian advocates.</span>
      <span>Made in India 🇮🇳</span>
    </div>
  `;

  container.appendChild(footer);
}
