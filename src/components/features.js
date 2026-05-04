// src/components/features.js — NyayaVedika Features Grid
export function mountFeatures(container) {
  const id = 'nv-features-styles';
  if (!document.getElementById(id)) {
    const style = document.createElement('style');
    style.id = id;
    style.textContent = `
      #nv-features {
        padding: var(--space-4xl) var(--space-lg);
        max-width: var(--max-width);
        margin: 0 auto;
      }
      #nv-features .section-header {
        text-align: center;
        margin-bottom: var(--space-3xl);
      }
      #nv-features .section-header h2 {
        font-family: var(--font-heading);
        font-size: clamp(2rem, 4vw, 2.8rem);
        color: var(--color-primary);
        margin-bottom: var(--space-md);
      }
      #nv-features .section-header p {
        color: var(--color-text-muted);
        font-size: 1.1rem;
        max-width: 600px;
        margin: 0 auto;
      }
      #nv-features .grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: var(--space-xl);
      }
      #nv-features .feature-card {
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        padding: var(--space-2xl);
        transition: all var(--duration-normal) var(--ease-out);
        position: relative;
        overflow: hidden;
      }
      #nv-features .feature-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 3px;
        background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
        transform: scaleX(0);
        transition: transform var(--duration-slow) var(--ease-out);
      }
      #nv-features .feature-card:hover { transform: translateY(-6px); box-shadow: var(--shadow-xl); }
      #nv-features .feature-card:hover::before { transform: scaleX(1); }
      #nv-features .feature-icon {
        width: 48px;
        height: 48px;
        border-radius: var(--radius-md);
        background: rgba(212,168,83,0.1);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        margin-bottom: var(--space-lg);
      }
      #nv-features .feature-card h3 {
        font-family: var(--font-heading);
        font-size: 1.25rem;
        margin-bottom: var(--space-sm);
        color: var(--color-primary);
      }
      #nv-features .feature-card p {
        color: var(--color-text-muted);
        font-size: 0.95rem;
        line-height: 1.7;
      }
      @media (max-width: 640px) {
        #nv-features { padding: var(--space-3xl) var(--space-md); }
        #nv-features .grid { grid-template-columns: 1fr; }
      }
    `;
    document.head.appendChild(style);
  }

  const features = [
    {icon:'⚖️',title:'Document Drafting',desc:'Generate court-ready SLPs, writ petitions, bail applications, revenue appeals, civil suits — formatted per Supreme Court, High Court & District Court rules.'},
    {icon:'🔍',title:'Legal Research',desc:'Find relevant case laws, statutory provisions (BNS, BNSS, BSA), and precedents across all Indian courts — from Supreme Court to Magistrate Courts.'},
    {icon:'📋',title:'Case Analysis',desc:'Upload FIRs, chargesheets, or judgments for AI-powered analysis. Identify key issues, applicable statutes, and strategic recommendations instantly.'},
    {icon:'📡',title:'Live Judgments',desc:'Stay updated with the latest Supreme Court and High Court judgments. Real-time feeds with AI-generated digests and key legal principles.'},
    {icon:'🏛️',title:'Multi-Court Support',desc:'Coverage across all 25 High Courts, District & Sessions Courts, NCLT/NCLAT, ITAT, NCDRC, CAT, NGT, RERA, DRT — every forum in the Indian judicial system.'},
    {icon:'✨',title:'AI Summaries',desc:'Upload lengthy judgments or legal documents for instant, accurate summaries. Extract parties, issues, holdings, and deadlines in seconds.'}
  ];

  const section = document.createElement('section');
  section.id = 'nv-features';
  section.setAttribute('data-reveal','');

  section.innerHTML = `
    <div class="section-header">
      <h2>Everything an Advocate Needs</h2>
      <p>From drafting to research to case analysis — one platform, every court.</p>
    </div>
    <div class="grid">
      ${features.map(f => `
        <div class="feature-card">
          <div class="feature-icon">${f.icon}</div>
          <h3>${f.title}</h3>
          <p>${f.desc}</p>
        </div>
      `).join('')}
    </div>
  `;

  container.appendChild(section);
}
