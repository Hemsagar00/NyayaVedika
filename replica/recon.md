# Recon map: Supreme Today AI (Web & Android CourtDiary)

Scope: Indian Legal Research, Supreme Court & High Court Judgments, Legal News, AI Drafting/Analysis, and Advocate Case Diary
For: Indian Advocates, Legal Practitioners, Law Firms, Judges, Law Students, and Citizens seeking affordable access to justice under **NyayaVedika** (`nyayavedika.in`)
Date: 2026-11-23

---

## Sources

| # | Source | URL | Notes |
|---|---|---|---|
| 1 | Marketing & News Portal | `https://supremetoday.ai/` | Reverse-engineered layout, top stories, court filters, news feed |
| 2 | Legal Tools Hub | `https://supremetoday.ai/legal-tools` | AI Research, Drafting Assistant, Legal Memo, Summarizer, Judgment Analyzer |
| 3 | Legal Judgements Browser | `https://supremetoday.ai/legal-judgements` | High Court & Supreme Court judgments, case cards, citation search |
| 4 | About & Mission | `https://supremetoday.ai/about` | Positioning: AI-powered legal assistant for Indian law |
| 5 | User Manual & Tutorials | `https://supremetoday.ai/user-manual` | Workflows, search operators, Boolean query guide |
| 6 | Android Court Diary App | `https://play.google.com/store/apps/details?id=com.courtdiary.app` | Case tracking, cause lists, client billing, hearing reminders |
| 7 | REA Static Bundle Analysis | `capture/how-it-works.md` | 19 scripts analyzed, 34 endpoints mapped, DOM event handlers documented |

---

## Core Loop

**Lawyers and litigants search Indian court judgments by citation, act, or semantic query; analyze complex precedents with AI summaries; and manage their active court cases in a daily digital diary.**

---

## Screens

| ID | Screen | Route / How to Reach | Purpose | Key Components | States Seen |
|---|---|---|---|---|---|
| **S01** | Home & Legal News | `/` | Daily legal headlines, Supreme Court/High Court updates, trending topics, quick citation search bar | NewsHero, CategoryTabs, NewsGrid, TrendingTicker, QuickSearch | Empty, filled, loading, mobile |
| **S02** | Legal AI Tools Suite | `/legal-tools` | Gateway to AI research, memo generator, summarizer, drafting assistant | ToolCardGrid, JourneyStepper, FeatureShowcase, PricingCTA | Filled, interactive |
| **S03** | Judgment Search & Repository | `/legal-judgements` | Search across millions of Indian court rulings by citation, court, judge, party | SearchBar, CourtFilter, DateRangePicker, JudgmentCardList, Pagination | Empty, loading, results, error |
| **S04** | Judgment Detail View | `/judgement/[id]` | Full judgment reader with paragraph numbering, headnotes, ratio decidendi, and citations | HeadnoteBanner, RatioBox, JudgmentTextViewer, CitationSidebar, ExportActions | Loading, filled |
| **S05** | Case Diary & Cause List | `/diary` | Digital advocate diary (from CourtDiary): upcoming hearing dates, daily board, client matters | CauseListTable, CaseCalendar, HearingModal, ClientQuickView | Empty, filled, today-board |
| **S06** | AI Legal Assistant Chat | `/assistant` | Interactive conversational legal intelligence grounded in Indian case law | ChatStream, CitationBadge, DocumentUploader, LegalDisclaimer | Empty, streaming, error |
| **S07** | Bare Acts & Statutory Library | `/bare-acts` | Reference Indian codes: BNS, BNSS, BSA, IPC, CrPC, CPC, Evidence Act | ActDirectory, SectionAccordion, CrossRefPill | Search, tree-view |
| **S08** | About NyayaVedika | `/about` | Mission, editorial integrity, judicial compliance, accessibility pledge | TeamProfile, MissionStatement, MetricCounters | Static filled |
| **S09** | User Manual & Guidance | `/user-manual` | Guides on legal Boolean search, citation formats, and court etiquette | StepByStepGuide, SearchCheatSheet, VideoEmbeds | Static filled |
| **S10** | User Auth (Clerk) | `/sign-in`, `/sign-up` | Secure lawyer/client authentication | ClerkSignIn, ClerkSignUp, SSO (Google) | Modal, page |

---

## Flows

```
F01 Search & Research a Precedent
    S01 Home -> S03 Judgments -> Filter by Court (SC) & Year -> S04 Read Judgment -> Copy Citation & Summary
    Happy path clicks: 4
    Edge cases: No citation match, unreported judgment, split bench

F02 AI Judgment Analysis & Summarization
    S02 Tools -> Select "Summarizer" -> Paste Judgment or Upload PDF -> Generate 1-page Ratio & Key Holdings -> Export PDF
    Happy path clicks: 3
    Edge cases: PDF exceeds token limit, scanned non-OCR document, multi-appellant ruling

F03 Daily Case Diary & Board Management (CourtDiary Integration)
    S01 Dashboard -> S05 Diary -> View Today's Daily Cause List -> Add Hearing Outcome & Set Next Date -> Notify Client
    Happy path clicks: 3
    Edge cases: Case adjourned without date, bench not sitting, item passed over

F04 Statutory Cross-Referencing
    S04 Judgment -> Click highlighted Section (e.g., Section 302 IPC / Section 103 BNS) -> S07 Bare Acts -> Read Full Provision
    Happy path clicks: 2
    Edge cases: Repealed provision, transition from IPC to BNS
```

---

## Components

| Component | Variants | States | Used On |
|---|---|---|---|
| **LegalSearchBar** | Universal (Hero), Compact (Header), Filtered (Judgments) | Default, active, loading, with-suggestions, speech-active | S01, S02, S03 |
| **JudgmentCard** | Compact, Detailed, Bookmarked | Default, hover, selected | S01, S03, S05 |
| **CourtFilterPill** | Supreme Court, High Court, Tribunals, District Courts | Active, inactive, disabled | S01, S03 |
| **RatioBox** | Highlighted, Collapsed, Expanded | Default, copied | S04 |
| **CauseListRow** | Urgent, Regular, Motion, Disposed | Pending, adjourned, passed-over, completed | S05 |
| **CitationBadge** | SCC, AIR, SCR, High Court citation | Default, copy-clicked | S01, S03, S04 |
| **Button** | Judicial Primary (Navy), Accent (Gold), Ghost, Outline, Destructive | Default, hover, active, disabled, loading | All screens |
| **Modal / Dialog** | New Case, Export, Share, AI Opinion | Closed, opening, open, closing | S04, S05, S06 |

---

## Inferred Data Model

```
User (Lawyer / Litigant)
    id: uuid, email: text, name: text, bar_council_id: text, phone: text, role: enum('advocate', 'student', 'citizen', 'admin')
    evidence: Clerk auth, user profile, CourtDiary account
    confidence: high

Court
    id: uuid, name: text, code: text, type: enum('supreme_court', 'high_court', 'tribunal', 'district'), state: text
    evidence: S01 & S03 court categories
    confidence: high

Judgment
    id: uuid, title: text, court_id: uuid, case_number: text, citation: text, neutral_citation: text, date_of_judgment: date
    bench: text[], petitioner: text, respondent: text, judgment_text: text, summary: text, ratio_decidendi: text
    embedding: vector(1536), disposal_nature: text
    evidence: S03 judgment lists, S04 judgment text, Supabase pgvector
    confidence: high

BareAct
    id: uuid, act_title: text, act_number: text, year: int, status: enum('in_force', 'repealed', 'amended')
    evidence: S07 statutory cross-references
    confidence: high

BareActSection
    id: uuid, act_id: uuid, section_number: text, section_title: text, content: text, illustration: text
    evidence: S04 legal statutory citations
    confidence: high

CaseDiaryEntry
    id: uuid, user_id: uuid, case_number: text, court_id: uuid, client_name: text, client_phone: text
    opposite_party: text, next_hearing_date: date, stage_of_case: text, notes: text, court_hall_number: text, item_number: int
    evidence: CourtDiary app manifest, F03 flow
    confidence: high

SavedResearch
    id: uuid, user_id: uuid, folder_name: text, judgment_id: uuid, notes: text, created_at: timestamptz
    evidence: S03 bookmarking & binder features
    confidence: high
```

---

## Feature Matrix Summary
See `replica/features.csv`.
- **Must-haves**: 14 (Search, citations, court filters, full text, ratio decidendi, bare acts, legal news, daily diary, AI assistant, summaries, Clerk auth, bookmarks)
- **Should-haves**: 6 (AI drafting assistant, ratio extractor, document comparison, regional translation, PDF export, client CRM)
- **Could-haves**: 2 (Offline reading, SMS/WhatsApp alerts)
- **Skipped**: 1 (Third-party advertising networks - NyayaVedika remains clean and focused)

---

## Out of Scope (Clean-Room Boundary)
- Proprietary closed-source scrapers or private API tokens from Supreme Today.
- Scraped proprietary editorial commentary with copyright restrictions.
- Paid 3rd party advertising trackers (`scripts.clarity.ms`, commercial ad cookies).

---

## Size & Complexity
- **Screens**: 10 screens mapped
- **Flows**: 4 primary user flows
- **Entities**: 7 core relational entities with `pgvector` semantic support
- **Hard Parts**: Fast vector semantic search over millions of legal paragraphs; high-precision OCR/parsing of Indian court PDF rulings; accurate dual-citation matching (SCC vs AIR vs Neutral Citation).
- **Size**: **Large (L)**.
