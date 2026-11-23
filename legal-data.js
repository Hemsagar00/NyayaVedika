// NyayaVedika Legal Data & Client State Engine
const LEGAL_DATA = {
  news: [
    {
      id: "news-01",
      category: "supreme_court",
      title: "Supreme Court Clarifies Mandatory Nature of Section 50 NDPS Personal Search Safeguards",
      summary: "A three-judge bench of the Supreme Court reiterates that compliance with Section 50 of the NDPS Act is mandatory and violation vitiates the conviction.",
      citation: "2026 INSC 152",
      date: "Nov 22, 2026",
      bench: "Justice Surya Kant, Justice K.V. Viswanathan",
      readTime: "4 min read"
    },
    {
      id: "news-02",
      category: "supreme_court",
      title: "Arbitral Tribunal Cannot Rewrite Commercial Contracts Under Guise of Interpretation: SC",
      summary: "Setting aside an award under Section 34 of the Arbitration Act, the Supreme Court ruled that arbitral tribunals must strictly abide by contract terms.",
      citation: "2026 INSC 148",
      date: "Nov 21, 2026",
      bench: "Justice P.S. Narasimha, Justice Manoj Misra",
      readTime: "5 min read"
    },
    {
      id: "news-03",
      category: "high_court",
      title: "Delhi High Court: Interim Maintenance Must Account for Inflated Living Expenses of Dependent Spouse",
      summary: "In a matrimonial revision petition, Delhi HC held that maintenance amounts should enable the dependent spouse to live with identical dignity.",
      citation: "2026 DHC 892",
      date: "Nov 20, 2026",
      bench: "Justice Rajiv Shakdher",
      readTime: "3 min read"
    },
    {
      id: "news-04",
      category: "banking",
      title: "NCLAT Upholds Resolution Plan: Dissenting Financial Creditor Cannot Claim Liquidation Value in Cash",
      summary: "The Appellate Tribunal held that Section 30(2)(b) of the IBC ensures minimum entitlement but does not grant veto power to dissenting creditors.",
      citation: "2026 NCLAT 412",
      date: "Nov 19, 2026",
      bench: "Justice Ashok Bhushan, Barun Mitra",
      readTime: "4 min read"
    },
    {
      id: "news-05",
      category: "taxation",
      title: "Supreme Court: Reassessment Notices Under Section 148 Issued Post-2021 Must Follow New Regime",
      summary: "Clarifying the taxation jurisprudence, the Apex Court upheld taxpayer appeals where procedural safeguards of Section 148A were omitted.",
      citation: "2026 INSC 139",
      date: "Nov 18, 2026",
      bench: "Justice B.V. Nagarathna, Justice Augustine George Masih",
      readTime: "6 min read"
    },
    {
      id: "news-06",
      category: "corporate",
      title: "MCA Extends Filing Deadlines for Annual Return Forms MGT-7 and AOC-4 for FY 2025-26",
      summary: "Ministry of Corporate Affairs notifies a 30-day relaxation window for private limited companies facing portal validation hurdles.",
      citation: "MCA Circular 08/2026",
      date: "Nov 17, 2026",
      bench: "Executive Notification",
      readTime: "2 min read"
    }
  ],

  judgments: [
    {
      id: "judg-01",
      title: "Poornima Gupta vs Saurav Gupta",
      court: "Supreme Court of India",
      courtCode: "SC",
      citation: "(2026) 2 SCC 104",
      neutralCitation: "2026 INSC 142",
      date: "November 14, 2026",
      bench: ["Dr. D.Y. Chandrachud", "B.V. Nagarathna"],
      petitioner: "Poornima Gupta",
      respondent: "Saurav Gupta",
      disposition: "Allowed",
      keyActs: ["Hindu Marriage Act, 1955 § 13B", "Family Courts Act, 1984 § 7", "Constitution of India Art. 142"],
      ratio: "The statutory cooling-off period of six months under Section 13B(2) of the Hindu Marriage Act is directory and not mandatory. Where the marriage has broken down irretrievably and parties have settled all maintenance, custody, and property disputes with no scope of reconciliation, the Supreme Court in exercise of plenary powers under Article 142 may waive the statutory duration to dissolve marriage without protracted hardship.",
      headnote: "Family Law — Mutual Consent Divorce — Cooling-off period under Section 13B(2) of Hindu Marriage Act, 1955 — Whether mandatory or directory — Held: Directory — When conditions for settlement are fully satisfied, mechanical adherence to waiting periods serves no societal purpose.",
      fullText: `1. Leave granted.
2. This appeal arises from the judgment of the High Court declining to waive the statutory cooling-off period of six months stipulated under Section 13B(2) of the Hindu Marriage Act, 1955.
3. The parties were married in 2018. Within eight months of matrimony, irreconcilable differences surfaced. They have resided separately since 2019 without any cohabitation.
4. An exhaustive settlement agreement was signed before the Supreme Court Mediation Centre, where all permanent alimony (₹ 45,00,000) was remitted and accepted. No minor children were born out of the wedlock.
5. In Amardeep Singh v. Harveen Kaur (2017) 8 SCC 746 and Shilpa Sailesh v. Varun Sreenivasan (2023) SCC OnLine SC 544, the constitutional bench established that where separation extends beyond statutory timelines and genuine mediation has dissolved the marital bond, the courts need not force the parties through agonizing delays.
6. Consequently, the marriage is dissolved by a decree of divorce by mutual consent under Section 13B. The judgment of the High Court is set aside. Decree to be drawn accordingly.`
    },
    {
      id: "judg-02",
      title: "Subrata Bhattacharya vs Securities and Exchange Board of India (SEBI)",
      court: "Supreme Court of India",
      courtCode: "SC",
      citation: "(2026) 3 SCC 410",
      neutralCitation: "2026 INSC 128",
      date: "November 08, 2026",
      bench: ["Justice Surya Kant", "Justice Dipankar Datta"],
      petitioner: "Subrata Bhattacharya",
      respondent: "Securities and Exchange Board of India (SEBI)",
      disposition: "Directions Issued",
      keyActs: ["SEBI Act, 1992 § 11AA", "Collective Investment Schemes Regulations, 1999"],
      ratio: "In mega-insolvencies and collective investment scheme liquidations involving millions of small retail depositors, the Lodha Committee's mandate for asset monetization takes precedence over unilateral civil court attachments. State government and local revenue authorities are restrained from obstructing auction sales conducted under court supervision.",
      headnote: "Securities Law — Collective Investment Schemes (CIS) — Mobilization of funds from retail public without SEBI certificate of registration — Recovery mechanism and refund priorities under Justice R.M. Lodha Committee.",
      fullText: `1. In continuation of the earlier monitoring directions regarding the recovery of funds from PACL Ltd., the present applications seek clarity on conflicting attachment orders passed by various sub-divisional magistrates.
2. The core objective remains the refund of hard-earned monies to approximately 5.8 crore small retail investors.
3. We make it explicitly clear that properties seized under SEBI orders shall be liquidated solely through the high-powered Committee. Any third-party encumbrance created post the 2014 freezing order is ab initio void.`
    },
    {
      id: "judg-03",
      title: "Helena Anna Maria Lersch vs State of Goa",
      court: "High Court of Bombay at Goa",
      courtCode: "BOMBAY_HC",
      citation: "2026 SCC OnLine Bom 42",
      neutralCitation: "2026 BHC-GOA 189",
      date: "October 29, 2026",
      bench: ["Justice M.S. Karnik"],
      petitioner: "Helena Anna Maria Lersch",
      respondent: "State of Goa & Anti-Narcotics Cell",
      disposition: "Acquitted",
      keyActs: ["Narcotic Drugs and Psychotropic Substances Act, 1985 § 42, § 50"],
      ratio: "Section 50 of the NDPS Act mandates informing the suspect of their statutory right to be searched before a Gazetted Officer or Magistrate. Merely informing them that they 'may' choose one if they wish, without informing them of their legal right, violates constitutional safeguards under Article 21, vitiating the contraband recovery.",
      headnote: "Criminal Law — NDPS Act — Section 50 Personal Search — Ambiguous intimation of legal right — Held: Mandatory right must be stated with absolute precision. Benefit of doubt accorded.",
      fullText: `1. The appellant, a foreign national, challenges her conviction under Section 20(b)(ii)(C) of the NDPS Act.
2. The search memo records that the inspecting officer informed the accused: 'If you want, a Gazetted Officer can be called.'
3. As settled in State of Punjab v. Baldev Singh (1999) 6 SCC 172 and Vijaysinh Chandubha Jadeja (2011) 1 SCC 609, failure to unequivocally convey that the law entitles the person to such presence renders the search illicit. Conviction set aside.`
    },
    {
      id: "judg-04",
      title: "Power Grid Corporation of India Ltd vs Tamil Nadu Generation and Distribution Corp (TANGEDCO)",
      court: "Supreme Court of India",
      courtCode: "SC",
      citation: "(2026) 1 SCC 512",
      neutralCitation: "2026 INSC 98",
      date: "October 18, 2026",
      bench: ["Justice B.R. Gavai", "Justice Prashant Kumar Mishra"],
      petitioner: "Power Grid Corporation of India Limited",
      respondent: "TANGEDCO",
      disposition: "Dismissed",
      keyActs: ["Electricity Act, 2003 § 62, § 79", "CERC (Terms and Conditions of Tariff) Regulations"],
      ratio: "Commercial transmission utilities cannot pass on cost overruns caused by contractual delays to downstream public distribution companies without showing that every reasonable mitigation measure was timely pursued.",
      headnote: "Energy Law — Tariff Determination — Transmission line capitalization — Prudence check by Central Electricity Regulatory Commission.",
      fullText: `1. The appellant contests the disallowance of Return on Equity for a 14-month delay in commissioning the 765 kV inter-state transmission link.
2. The finding of CERC that delay was due to avoidable agency coordination failures is supported by factual records. We find no error in the Appellate Tribunal's affirmation.`
    }
  ],

  bareActs: [
    {
      code: "BNS",
      name: "Bharatiya Nyaya Sanhita, 2023",
      replaces: "Indian Penal Code, 1860 (IPC)",
      year: 2023,
      sectionsCount: 358,
      keySections: [
        { section: "Section 103", title: "Punishment for Murder", map: "IPC § 302", desc: "Whoever commits murder shall be punished with death or imprisonment for life, and shall also be liable to fine." },
        { section: "Section 115", title: "Voluntarily Causing Hurt", map: "IPC § 323", desc: "Whoever causes hurt with the intention of thereby causing hurt to any person." },
        { section: "Section 316", title: "Criminal Breach of Trust", map: "IPC § 405/406", desc: "Whoever, being in any manner entrusted with property, dishonestly misappropriates or converts to his own use." },
        { section: "Section 318", title: "Cheating and dishonestly inducing delivery of property", map: "IPC § 420", desc: "Cheating with knowledge that wrongful loss may ensue to person whose interest offender is bound to protect." },
        { section: "Section 69", title: "Sexual intercourse by deceitful means", map: "New Provision", desc: "Intercourse by promising marriage without intention to fulfill, or by deceitful inducement of employment/promotion." }
      ]
    },
    {
      code: "BNSS",
      name: "Bharatiya Nagarik Suraksha Sanhita, 2023",
      replaces: "Code of Criminal Procedure, 1973 (CrPC)",
      year: 2023,
      sectionsCount: 531,
      keySections: [
        { section: "Section 35", title: "When police may arrest without warrant", map: "CrPC § 41", desc: "Procedural boundaries for non-cognizable vs cognizable offences; mandatory notice of appearance." },
        { section: "Section 173", title: "Information in cognizable cases (Zero FIR)", map: "CrPC § 154", desc: "Registration of FIR irrespective of jurisdiction, electronic information recording." },
        { section: "Section 187", title: "Procedure when investigation cannot be completed in 24 hours", map: "CrPC § 167", desc: "Police custody timeline and judicial custody extensions up to 60/90 days." },
        { section: "Section 482", title: "Saving of inherent powers of High Court", map: "CrPC § 482", desc: "Inherent jurisdiction of High Courts to prevent abuse of court process and secure ends of justice." }
      ]
    },
    {
      code: "BSA",
      name: "Bharatiya Sakshya Adhiniyam, 2023",
      replaces: "Indian Evidence Act, 1872 (IEA)",
      year: 2023,
      sectionsCount: 170,
      keySections: [
        { section: "Section 61", title: "Admissibility of Electronic Records", map: "IEA § 65B", desc: "Comprehensive framework for electronic records, hashing, cloud backups, and digital signatures." },
        { section: "Section 104", title: "Burden of proof as to particular fact", map: "IEA § 103", desc: "The burden of proof as to any particular fact lies on that person who wishes the court to believe in its existence." }
      ]
    }
  ],

  // Advocate Diary (Default Seed for Local Demonstration)
  diary: [
    {
      id: "case-01",
      caseNumber: "WP (C) No. 4120/2026",
      court: "Supreme Court of India (Court Hall 3)",
      itemNo: 14,
      parties: "Mehta Polymers v. Union of India",
      stage: "Admission & Interim Relief",
      nextDate: "Today",
      client: "Rajesh Mehta (CMD)",
      clientPhone: "+91 98201 12345",
      notes: "Senior Advocate ready. Press for ad-interim stay on reverse GST demand notice."
    },
    {
      id: "case-02",
      caseNumber: "CS (COMM) 184/2025",
      court: "Delhi High Court (Court Hall 11)",
      itemNo: 7,
      parties: "Apex Pharma v. Novus Health Tech",
      stage: "Cross-Examination of PW-1",
      nextDate: "Today",
      client: "Dr. Arvind Rao",
      clientPhone: "+91 99100 87654",
      notes: "File original invoice exhibits and comparative trademark packaging samples."
    },
    {
      id: "case-03",
      caseNumber: "CP (IB) No. 92/2026",
      court: "NCLT Delhi Bench II",
      itemNo: 21,
      parties: "Axis Credit Ltd v. Horizon Infra Corp",
      stage: "Section 7 CIRP Hearing",
      nextDate: "Tomorrow",
      client: "Axis Credit Resolution Cell",
      clientPhone: "+91 98111 54321",
      notes: "Verify threshold default certificate and NeSL record."
    }
  ]
};

// State Persistence for Advocate Diary (LocalStorage)
function getDiaryCases() {
  const saved = localStorage.getItem('nyayavedika_diary');
  if (saved) {
    try { return JSON.parse(saved); } catch (e) { }
  }
  return LEGAL_DATA.diary;
}

function saveDiaryCase(newCase) {
  const current = getDiaryCases();
  current.unshift({
    id: "case-" + Date.now(),
    ...newCase
  });
  localStorage.setItem('nyayavedika_diary', JSON.stringify(current));
  return current;
}
