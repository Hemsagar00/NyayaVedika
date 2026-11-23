# Component Specifications: NyayaVedika

Built for standard Tailwind CSS & shadcn/ui React components.

---

## 1. LegalSearchBar
- **Role**: Universal hero and persistent header search bar for citations, judgments, acts, and keywords.
- **Variants**:
  - `hero`: Large input (height: 56px, font-size: 18px), rounded-full, with instant suggestion popup and voice search toggle.
  - `compact`: Header-mounted (height: 40px, font-size: 14px), with quick keyboard shortcut (`Cmd+K` / `Ctrl+K`).
- **States**: `idle`, `focus`, `has-input`, `loading`, `dropdown-open`.
- **Keyboard Navigation**: ArrowUp/Down to navigate suggestion items, Enter to select, Escape to dismiss.

## 2. JudgmentCard
- **Role**: Displays case search results and feed items.
- **Elements**:
  - Title: *Petitioner v. Respondent* (bold serif).
  - Citation badges: SCC, AIR, or Neutral Citation (gold outlined badge).
  - Court & Bench metadata: Supreme Court / High Court, Coram/Bench list, Date.
  - Ratio snippet: 2-3 line executive summary with highlighted search terms.
  - Quick Actions: Read Full Judgment, Copy Citation, Save to Case Binder, AI Summarize.
- **States**: `default`, `hover` (slight card lift and shadow elevation), `bookmarked`.

## 3. RatioBox & HeadnoteBanner
- **Role**: Prominently highlights the core holding (*Ratio Decidendi*) at the top of the judgment reader view.
- **Styling**: Surface background with a 4px left border in `--gold` (`#9a3412`), serif header "RATIO DECIDENDI", copy button.
- **Features**: 1-click citation copy in formatted legal standard (e.g., *Maneka Gandhi v. Union of India, (1978) 1 SCC 248*).

## 4. DailyCauseListTable (from CourtDiary)
- **Role**: Advocate daily court board.
- **Columns**: Item No, Court Hall / Bench, Case Number, Parties, Stage, Next Date, Action.
- **States**: `pending` (neutral), `passed-over` (amber), `adjourned` (slate), `argued/disposed` (emerald).

## 5. BareActSectionViewer
- **Role**: Dual-pane or collapsible statutory reader for BNS, BNSS, BSA, IPC, CrPC, Evidence Act.
- **Features**: Jump to section, historical amendments timeline, link to leading Supreme Court precedents interpreting this section.
