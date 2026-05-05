/**
 * NyayaVedika v5 — Features Section
 * Bento Grid: "What You Can Draft" — 6 drafting cards
 * Midnight Court palette
 */
export function mountFeatures(container) {
  if (!container) return;

  if (!document.getElementById('nv-features-v5-styles')) {
    const style = document.createElement('style');
    style.id = 'nv-features-v5-styles';
    style.textContent = `
      .nv-features-v5 {
        padding: 100px 24px;
        background: #080a14;
        position: relative;
      }

      .nv-features-v5-header {
        text-align: center;
        max-width: 640px;
        margin: 0 auto 64px;
      }

      .nv-features-v5-header .tag {
        display: inline-flex;
        padding: 6px 14px;
        border-radius: 9999px;
        background: rgba(191, 155, 48, 0.08);
        color: #bf9b30;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.75rem;
        margin-bottom: 20px;
      }

      .nv-features-v5-header h2 {
        font-family: 'Sora', sans-serif;
        font-size: clamp(2rem, 4vw, 3.2rem);
        font-weight: 800;
        color: #e8e4db;
        margin-bottom: 16px;
        letter-spacing: -0.02em;
      }

      .nv-features-v5-header h2 .gold {
        background: linear-gradient(135deg, #bf9b30, #e8cd78);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      .nv-features-v5-header p {
        color: #9a968a;
        font-size: 1.1rem;
        line-height: 1.7;
      }

      .nv-features-v5-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
        max-width: 1100px;
        margin: 0 auto;
      }

      @media (max-width: 860px) {
        .nv-features-v5-grid { grid-template-columns: repeat(2, 1fr); }
      }
      @media (max-width: 540px) {
        .nv-features-v5-grid { grid-template-columns: 1fr; }
      }

      .nv-features-v5-card {
        background: #0d0f20;
        border: 1px solid rgba(255,255,255,0.04);
        border-radius: 20px;
        padding: 32px 28px;
        transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        cursor: default;
        position: relative;
        overflow: hidden;
      }

      .nv-features-v5-card::before {
        content: '';
        position: absolute;
        inset: 0;
        background: radial-gradient(ellipse at top left, rgba(191,155,48,0.06), transparent 70%);
        opacity: 0;
        transition: opacity 0.35s ease;
      }

      .nv-features-v5-card:hover {
        transform: translateY(-4px);
        border-color: rgba(191, 155, 48, 0.35);
        box-shadow: 0 8px 32px rgba(0,0,0,0.4), 0 0 24px rgba(191,155,48,0.06);
      }
      .nv-features-v5-card:hover::before { opacity: 1; }

      .nv-features-v5-card-icon {
        font-size: 2rem;
        margin-bottom: 16px;
        position: relative;
      }

      .nv-features-v5-card h3 {
        font-family: 'Sora', sans-serif;
        font-size: 1.15rem;
        font-weight: 700;
        color: #e8e4db;
        margin-bottom: 8px;
        position: relative;
      }

      .nv-features-v5-card p {
        font-size: 0.9rem;
        color: #7a766d;
        line-height: 1.6;
        margin-bottom: 16px;
        position: relative;
      }

      .nv-features-v5-card-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        position: relative;
      }

      .nv-features-v5-card-tag {
        display: inline-flex;
        padding: 4px 10px;
        border-radius: 9999px;
        background: rgba(191,155,48,0.06);
        color: #bf9b30;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.7rem;
        border: 1px solid rgba(191,155,48,0.1);
      }

      /* Bento highlight — first card spans */
      .nv-features-v5-card.featured {
        background: linear-gradient(135deg, #0d0f20 0%, rgba(191,155,48,0.04) 100%);
        border-color: rgba(191,155,48,0.12);
      }
    `;
    document.head.appendChild(style);
  }

  const cards = [
    { icon: '⚖️', title: 'Special Leave Petition', desc: 'Supreme Court SLP under Article 136. Synopsis, list of dates, grounds with constitutional citations.', tags: ['#Article136', '#Civil', '#Criminal'] },
    { icon: '📜', title: 'Writ Petition', desc: 'Articles 226 & 32. Mandamus, certiorari, habeas corpus, quo warranto. Against State or authority.', tags: ['#Article226', '#Article32', '#Mandamus'] },
    { icon: '🔓', title: 'Bail Application', desc: 'Regular, anticipatory, and default bail under BNSS/BNSS. All courts — Magistrate to Supreme Court.', tags: ['#Section483', '#BNSS', '#Anticipatory'] },
    { icon: '💊', title: 'NDPS Bail', desc: 'Section 37 twin conditions satisfaction. Special reasons memo. Supreme Court & High Court precedents.', tags: ['#Section37', '#NDPS', '#TwinTest'] },
    { icon: '🏛️', title: 'Revenue Appeal', desc: 'AP/Telangana Revenue — ROR appeals, mutation, 1-B proceedings, Joint Collector revisions.', tags: ['#Revenue', '#ROR', '#Mutation'] },
    { icon: '🛒', title: 'Consumer Complaint', desc: 'NCDRC & District Forum. Deficiency in service, unfair trade practice, medical negligence.', tags: ['#CPA2019', '#NCDRC', '#Deficiency'] },
  ];

  const cardsHTML = cards.map((c, i) => `
    <div class="nv-features-v5-card${i === 0 ? ' featured' : ''}" data-reveal style="animation-delay:${i * 0.1}s">
      <div class="nv-features-v5-card-icon">${c.icon}</div>
      <h3>${c.title}</h3>
      <p>${c.desc}</p>
      <div class="nv-features-v5-card-tags">
        ${c.tags.map(t => `<span class="nv-features-v5-card-tag">${t}</span>`).join('')}
      </div>
    </div>
  `).join('');

  container.innerHTML = `
    <section class="nv-features-v5">
      <div class="nv-features-v5-header">
        <span class="tag">#DraftingEngine</span>
        <h2>What You Can <span class="gold">Draft</span></h2>
        <p>Court-ready petitions across all Indian courts. Pick a type, describe your case, and the AI generates the complete draft — with proper cause titles, grounds, and prayer clauses.</p>
      </div>
      <div class="nv-features-v5-grid">
        ${cardsHTML}
      </div>
    </section>
  `;
}
