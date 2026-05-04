// src/components/news.js — Legal News & Updates
export function mountNews(container) {
  const id = 'nv-news-styles';
  if (!document.getElementById(id)) {
    const style = document.createElement('style');
    style.id = id;
    style.textContent = `
      #nv-news {
        padding: var(--space-4xl) var(--space-lg);
        max-width: var(--max-width);
        margin: 0 auto;
      }
      #nv-news .section-header {
        text-align: center;
        margin-bottom: var(--space-2xl);
      }
      #nv-news .section-header h2 {
        font-family: var(--font-heading);
        font-size: clamp(2rem, 4vw, 2.8rem);
        color: var(--color-primary);
        margin-bottom: var(--space-md);
      }
      #nv-news .ticker {
        background: linear-gradient(135deg, var(--color-primary), #2d2d4a);
        color: white;
        padding: 12px var(--space-xl);
        border-radius: var(--radius-full);
        margin-bottom: var(--space-2xl);
        display: flex;
        align-items: center;
        gap: var(--space-md);
        overflow: hidden;
        font-size: 0.9rem;
      }
      #nv-news .ticker-label {
        background: var(--color-accent);
        color: var(--color-primary);
        padding: 4px 12px;
        border-radius: var(--radius-sm);
        font-weight: 700;
        font-size: 0.75rem;
        text-transform: uppercase;
        white-space: nowrap;
        flex-shrink: 0;
      }
      #nv-news .ticker-text {
        white-space: nowrap;
        animation: ticker 30s linear infinite;
      }
      @keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      #nv-news .categories {
        display: flex;
        justify-content: center;
        gap: var(--space-sm);
        margin-bottom: var(--space-2xl);
        flex-wrap: wrap;
      }
      #nv-news .cat-pill {
        padding: 8px 18px;
        border-radius: var(--radius-full);
        font-size: 0.85rem;
        font-weight: 500;
        color: var(--color-text-muted);
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        cursor: pointer;
        transition: all var(--duration-fast) var(--ease-out);
      }
      #nv-news .cat-pill.active, #nv-news .cat-pill:hover {
        background: var(--color-primary);
        color: white;
        border-color: var(--color-primary);
      }
      #nv-news .news-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: var(--space-xl);
      }
      #nv-news .news-card {
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        overflow: hidden;
        transition: all var(--duration-normal) var(--ease-out);
      }
      #nv-news .news-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-xl); }
      #nv-news .news-card-body {
        padding: var(--space-xl);
      }
      #nv-news .news-card-cat {
        font-size: 0.75rem;
        font-weight: 600;
        color: var(--color-accent);
        text-transform: uppercase;
        letter-spacing: 0.05em;
        margin-bottom: var(--space-sm);
      }
      #nv-news .news-card h3 {
        font-family: var(--font-heading);
        font-size: 1.15rem;
        margin-bottom: var(--space-sm);
        color: var(--color-primary);
      }
      #nv-news .news-card p {
        color: var(--color-text-muted);
        font-size: 0.9rem;
        line-height: 1.6;
        margin-bottom: var(--space-md);
      }
      #nv-news .news-card-date {
        font-size: 0.8rem;
        color: var(--color-text-muted);
      }
      @media (max-width: 640px) {
        #nv-news { padding: var(--space-3xl) var(--space-md); }
      }
    `;
    document.head.appendChild(style);
  }

  const newsItems = [
    {cat:'Constitutional',title:'Parliament Passes BNS Amendment Bill 2026',desc:'Key amendments to Bharatiya Nyaya Sanhita introduce community service as punishment for minor offences and expand the definition of organised crime.',date:'May 4, 2026'},
    {cat:'Corporate',title:'SEBI Introduces New AIF Valuation Norms',desc:'SEBI mandates independent valuation for Alternative Investment Funds above ₹500 crore corpus. New norms effective from July 2026.',date:'May 3, 2026'},
    {cat:'Criminal',title:'SC Issues Guidelines on Digital Arrests',desc:'Supreme Court lays down 8-point guidelines for arrests in cybercrime cases. Prior notice, reasons in writing mandatory.',date:'May 2, 2026'},
    {cat:'Civil',title:'Delhi HC: Limitation Act Section 14 Exclusion Applies to Wrong Forum Filings',desc:'In a significant ruling on limitation, the Delhi High Court held that time spent prosecuting a case before a wrong forum in good faith must be excluded while computing limitation.',date:'May 1, 2026'},
    {cat:'Constitutional',title:'SC Constitution Bench to Hear Plea on Places of Worship Act',desc:'A 5-judge bench will examine the constitutional validity of the Places of Worship (Special Provisions) Act, 1991. Hearing scheduled for July.',date:'Apr 30, 2026'},
    {cat:'Corporate',title:'NCLAT: Operational Creditors Entitled to Interest During CIRP',desc:'In a landmark ruling, NCLAT held that operational creditors are entitled to interest at contract rate during CIRP if the resolution plan provides for payment to financial creditors with interest.',date:'Apr 29, 2026'}
  ];

  const section = document.createElement('section');
  section.id = 'nv-news';
  section.setAttribute('data-reveal','');

  section.innerHTML = `
    <div class="section-header">
      <h2>Legal <span class="gradient-text">Updates</span></h2>
    </div>
    <div class="ticker">
      <span class="ticker-label">⚡ Breaking</span>
      <span class="ticker-text">Supreme Court Suo Motu on Odisha Bail Cleaning Conditions &nbsp;•&nbsp; Rajasthan HC Quashes Belated Rape Allegations as Abuse of Process &nbsp;•&nbsp; Calcutta HC Bars Writ Interference Mid-Elections &nbsp;•&nbsp; Delhi Court Directs Joint CP Probe on IGI Stray Dogs &nbsp;•&nbsp; Kerala HC Upholds Dam Tourism Tender: PIL by Stranger Lacking Locus Rejected</span>
    </div>
    <div class="categories">
      <button class="cat-pill active">All</button>
      <button class="cat-pill">Constitutional</button>
      <button class="cat-pill">Criminal</button>
      <button class="cat-pill">Civil</button>
      <button class="cat-pill">Corporate</button>
    </div>
    <div class="news-grid">
      ${newsItems.map(n => `
        <div class="news-card">
          <div class="news-card-body">
            <div class="news-card-cat">${n.cat}</div>
            <h3>${n.title}</h3>
            <p>${n.desc}</p>
            <div class="news-card-date">📅 ${n.date}</div>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  section.querySelectorAll('.cat-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      section.querySelectorAll('.cat-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
    });
  });

  container.appendChild(section);
}
