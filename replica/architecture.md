# Architecture: NyayaVedika

A clean-room, modernized rebuild and enhancement of Supreme Today AI (`supremetoday.ai`) and Court Diary (`com.courtdiary.app`).

---

## 1. Stack Choices

| Layer | Choice | Why |
|---|---|---|
| **Web App** | Next.js 15 (App Router) + TypeScript + React 19 | Server-side rendering (SSR) for legal SEO, fast streaming for AI research, static generation for bare acts and landmark rulings. |
| **Styling** | Tailwind CSS + shadcn/ui + Lucide Icons | Clean typography, dark mode, high-contrast judicial themes matching `replica/design/tokens.json`. |
| **Database** | PostgreSQL on Supabase (`ap-south-1` Mumbai) | Managed Postgres with native `pgvector` for instant legal semantic search across millions of judicial paragraphs. |
| **Auth** | Clerk (`@clerk/nextjs`) | Seamless advocate onboarding via Google SSO, email magic links, and organizational roles (Law Firms / Chambers). |
| **Legal AI Engine** | Gemini API (`gemini-1.5-pro` & `gemini-1.5-flash`) | Large context window (up to 2M tokens) capable of analyzing 300+ page Supreme Court rulings and extracting precise ratios with citations. |
| **Hosting & CDN** | Vercel + Cloudflare DNS (`nyayavedika.in`) | Fast edge distribution across Indian metropolitan and regional nodes, automated preview environments, zero-maintenance SSL. |
| **Client Storage** | IndexedDB / LocalStorage via PWA ServiceWorker | Offline reading for advocates arguing in basements and courtroom halls with spotty cellular coverage. |

---

## 2. Relational Schema Summary
Full SQL in [`replica/schema.sql`](file:///D:/Friday/Websites/nyayavedika.in/replica/schema.sql).
- `courts`: Supreme Court, 25 High Courts, NCLAT, NGT, ITAT, and District Courts.
- `judgments`: Full texts, neutral citations, bench lists, dates, ratio decidendi, and `vector(1536)` embeddings.
- `bare_acts` & `bare_act_sections`: Complete Indian codes (BNS, BNSS, BSA, IPC, CrPC, CPC, Evidence Act).
- `legal_news`: Categorized live legal news and commentary.
- `advocate_cases`: Digital case diary, cause list items, next dates, client details (CourtDiary feature).
- `research_binders` & `binder_judgments`: Bookmarking and client matter binders.

---

## 3. Core API Endpoints

| Method & Path | Does | Access | Input | Output | Related Screen |
|---|---|---|---|---|---|
| `GET /api/search` | Full-text & semantic precedent search | Public | `q, court, year_start, year_end, page` | Judgments list with matched snippets | S01, S03 |
| `GET /api/judgments/[id]` | Fetches full judgment text and ratio | Public | `id` | Judgment object + headnotes | S04 |
| `POST /api/ai/summarize` | Generates structured ratio summary | Auth | `judgment_id` or `text` | `{ ratio, facts, held, key_acts }` | S02, S04 |
| `POST /api/ai/draft` | Drafts legal notice/petition | Auth | `{ type, facts, parties, jurisdiction }` | Formatted legal draft | S02 |
| `GET /api/diary` | Lists advocate's active court cases | Auth | `clerk_user_id, date` | Daily cause list board | S05 |
| `POST /api/diary/case` | Creates or updates a court case | Auth | `{ case_number, court, next_date, client }` | Created case record | S05 |
| `GET /api/news` | Fetches categorized court news | Public | `category, limit` | News feed array | S01 |

---

## 4. Edge Cases & Robustness
- **Indian Citation Parsing**: Multiple overlapping citation styles exist for the same case (e.g. `(2024) 4 SCC 12` vs `2024 INSC 210` vs `AIR 2024 SC 1500`). The search parser normalizes all inputs through a citation lookup dictionary.
- **BNS / IPC Dual Referencing**: With the new criminal codes (Bharatiya Nyaya Sanhita), the bare acts system provides bidirectional mapping (e.g. IPC Section 420 ↔ BNS Section 318).
- **Time Zones**: All hearing dates and news timestamps are stored in UTC and rendered in Indian Standard Time (`IST`, `UTC+05:30`).

---

## 5. Build Roadmap

1. **Step 1: Frontend Modernization & Replica Scaffolding**
   Build the Next.js foundation with the NyayaVedika navigation, hero, judgment card feeds, legal tools directory, and clean responsive layout.
2. **Step 2: Database Migration & Seeding**
   Deploy `replica/schema.sql` to Supabase, seed starter landmark judgments and bare act codes.
3. **Step 3: Clerk Authentication & Advocate Workspace**
   Wrap application in `<ClerkProvider>`, integrate User Profile, and build the `/diary` Advocate Case Board.
4. **Step 4: AI Legal Assistant & Summarizer**
   Hook up Gemini API to provide instant judgment summaries and drafting assistance.
