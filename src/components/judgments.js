// src/components/judgments.js — Live Judgments Feed
export function mountJudgments(container) {
  const id = 'nv-judgments-styles';
  if (!document.getElementById(id)) {
    const style = document.createElement('style');
    style.id = id;
    style.textContent = `
      #nv-judgments {
        padding: var(--space-4xl) var(--space-lg);
        max-width: var(--max-width);
        margin: 0 auto;
      }
      #nv-judgments .section-header {
        text-align: center;
        margin-bottom: var(--space-2xl);
      }
      #nv-judgments .section-header h2 {
        font-family: var(--font-heading);
        font-size: clamp(2rem, 4vw, 2.8rem);
        color: var(--color-primary);
        margin-bottom: var(--space-md);
      }
      #nv-judgments .section-header p {
        color: var(--color-text-muted);
        font-size: 1.1rem;
      }
      #nv-judgments .tabs {
        display: flex;
        justify-content: center;
        gap: var(--space-sm);
        margin-bottom: var(--space-2xl);
        flex-wrap: wrap;
      }
      #nv-judgments .tab {
        padding: 10px 20px;
        border-radius: var(--radius-full);
        font-size: 0.9rem;
        font-weight: 500;
        color: var(--color-text-muted);
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        cursor: pointer;
        transition: all var(--duration-fast) var(--ease-out);
      }
      #nv-judgments .tab.active, #nv-judgments .tab:hover {
        background: var(--color-primary);
        color: white;
        border-color: var(--color-primary);
      }
      #nv-judgments .feed {
        display: grid;
        gap: var(--space-md);
      }
      #nv-judgments .judgment-card {
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        padding: var(--space-xl);
        transition: all var(--duration-normal) var(--ease-out);
        display: flex;
        gap: var(--space-lg);
        align-items: flex-start;
      }
      #nv-judgments .judgment-card:hover {
        box-shadow: var(--shadow-lg);
        border-color: var(--color-accent);
      }
      #nv-judgments .judgment-court {
        font-family: var(--font-mono);
        font-size: 0.75rem;
        font-weight: 500;
        color: var(--color-accent);
        text-transform: uppercase;
        letter-spacing: 0.05em;
        min-width: 100px;
        padding-top: 4px;
      }
      #nv-judgments .judgment-body { flex: 1; }
      #nv-judgments .judgment-body h3 {
        font-family: var(--font-heading);
        font-size: 1.1rem;
        margin-bottom: var(--space-sm);
        color: var(--color-primary);
      }
      #nv-judgments .judgment-body p {
        color: var(--color-text-muted);
        font-size: 0.9rem;
        line-height: 1.6;
        margin-bottom: var(--space-md);
      }
      #nv-judgments .judgment-meta {
        display: flex;
        gap: var(--space-lg);
        font-size: 0.8rem;
        color: var(--color-text-muted);
      }
      #nv-judgments .skeleton {
        background: linear-gradient(90deg, var(--color-border) 25%, var(--color-bg) 50%, var(--color-border) 75%);
        background-size: 200% 100%;
        animation: shimmer 1.5s infinite;
        border-radius: var(--radius-sm);
      }
      @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
      @media (max-width: 640px) {
        #nv-judgments { padding: var(--space-3xl) var(--space-md); }
        #nv-judgments .judgment-card { flex-direction: column; gap:var(--space-sm); }
      }
    `;
    document.head.appendChild(style);
  }

  const judgments = [
    {court:'SUPREME COURT',title:'Supreme Court Expands Article 21: Right to Speedy Trial Includes Bail Consideration',summary:'In a landmark ruling, the Supreme Court held that unreasonable delay in bail consideration violates Article 21. Directed all High Courts to dispose of bail applications within 2 weeks.',date:'May 3, 2026',bench:'3-Judge Bench'},
    {court:'DELHI HC',title:'Delhi High Court: WhatsApp Chats Admissible as Electronic Evidence Under BSA Section 63',summary:'The Court clarified that WhatsApp conversations, when properly certified under Section 63 BSA, are admissible as electronic evidence without requiring a separate Section 65B certificate.',date:'May 2, 2026',bench:'Single Judge'},
    {court:'BOMBAY HC',title:'Bombay High Court Quashes FIR: Mere Presence at Scene Not Abetment Under BNS Section 44',summary:'The Court held that mere presence at the scene of an offence, without active participation or instigation, does not constitute abetment under Section 44 BNS.',date:'May 1, 2026',bench:'Division Bench'},
    {court:'KARNATAKA HC',title:'Karnataka HC: ROR Mutation Does Not Confer Title — Only Records Possession',summary:'Reiterating settled law, the Court held that Revenue Records (ROR) entries are for fiscal purposes only and do not confer or extinguish title to immovable property.',date:'Apr 30, 2026',bench:'Single Judge'},
    {court:'SUPREME COURT',title:'SC: NDPS Act Section 37 Twin Conditions Apply Even at Anticipatory Bail Stage',summary:'A Constitution Bench held that the rigors of Section 37 NDPS Act — requiring reasonable grounds for believing innocence and no likelihood of re-offending — apply equally to anticipatory bail.',date:'Apr 28, 2026',bench:'5-Judge Bench'}
  ];

  const section = document.createElement('section');
  section.id = 'nv-judgments';
  section.setAttribute('data-reveal','');

  section.innerHTML = `
    <div class="section-header">
      <h2>Latest <span class="gradient-text">Judgments</span></h2>
      <p>Real-time updates from Supreme Court and all High Courts — with AI-powered digests</p>
    </div>
    <div class="tabs">
      <button class="tab active">All Courts</button>
      <button class="tab">Supreme Court</button>
      <button class="tab">High Courts</button>
      <button class="tab">NCLAT</button>
      <button class="tab">ITAT</button>
    </div>
    <div class="feed">
      ${judgments.map(j => `
        <div class="judgment-card">
          <div class="judgment-court">${j.court}</div>
          <div class="judgment-body">
            <h3>${j.title}</h3>
            <p>${j.summary}</p>
            <div class="judgment-meta">
              <span>📅 ${j.date}</span>
              <span>👨‍⚖️ ${j.bench}</span>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  // Tab switching
  section.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      section.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });

  container.appendChild(section);
}
