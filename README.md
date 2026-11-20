# Nyaya Vedik — न्याय वेदिक

Legal AI Platform for Indian Law

## Stack
- **Web**: Next.js 14 (App Router) + TypeScript
- **Styling**: Tailwind CSS + design tokens
- **Database**: PostgreSQL on Supabase (Drizzle ORM)
- **Auth**: Supabase Auth (email/password + OAuth)
- **Payments**: Stripe Billing
- **AI/LLM**: Local uncensored model (Nemotron 3 Ultra) via Ollama
- **Search**: PostgreSQL FTS + pgvector (HNSW)
- **Hosting**: Vercel

## Milestones
1. **Core Loop** (Week 1-2): Sign up → Search Bare Act → Read section → Bookmark → Profile
2. **Judgments & AI Search** (Week 3-4): SC/HC judgments, AI legal search (RAG)
3. **Drafts & Tools** (Week 5): Legal drafts library, fee calculator, law dictionary
4. **Legislation, News, Schemes** (Week 6): Bills, ordinances, news feed, Constitution
5. **Fixes & Polish** (Week 7-8): Verifiable AI citations, corporate acts, affordable Pro, eCourts, PDF fixes, regional languages, offline sync, alerts

## Development
```bash
# Install dependencies
pnpm install

# Setup environment
cp .env.example .env.local

# Run database migrations
pnpm db:push

# Start dev server
pnpm dev
```

## Project Structure
```
nyayavedik/
├── apps/
│   ├── web/          # Next.js app
│   └── mobile/       # Expo app (later)
├── packages/
│   ├── db/           # Drizzle schema & migrations
│   ├── ui/           # Shared UI components
│   ├── ai/           # AI/RAG pipeline
│   └── config/       # Shared config (ESLint, TS, Tailwind)
└── turbo.json
```

## License
Proprietary — Naga Law Chambers Tech
