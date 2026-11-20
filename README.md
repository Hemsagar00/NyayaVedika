# Nyaya Vedik — न्याय वेदिक

> **Verifiable AI Legal Research for Indian Law**

India's most trusted legal research platform. Search 10,000+ Bare Acts, Supreme Court & High Court judgments, and legal drafts. Get AI-powered answers with paragraph-level citations you can verify.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FHemsagar00%2FNyayaVedika)
[![License](https://img.shields.io/badge/License-Proprietary-red)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green)](https://supabase.com/)

## ✨ Features (Milestone 1 — Core Loop)

- **🏠 Home** — Landing page with feature highlights
- **📚 Bare Acts Library** — Browse 10,000+ acts with filters (jurisdiction, state, language, search)
- **📖 Bare Act Viewer** — Read full acts with sections, search within, bookmark, font resize, language toggle (12+ Indian languages)
- **👤 User Profile** — Bookmarks, search history, downloads, subscription tier
- **⚙️ Settings** — Language, theme, notifications, security, data privacy
- **🔐 Authentication** — Email/password + Google/GitHub OAuth via Supabase Auth
- **🌙 Dark Mode** — System-aware with manual toggle
- **♿ Accessibility** — WCAG AA compliant, keyboard navigation, screen reader support

## 🏗️ Architecture

```
nyayavedik-app/
├── apps/
│   └── web/                 # Next.js 14 App Router frontend
├── packages/
│   ├── db/                  # Drizzle ORM schema & migrations
│   ├── ui/                  # Shared React components (Radix + Tailwind)
│   └── config/              # Shared ESLint, TypeScript, Tailwind config
├── turbo.json               # Turborepo pipeline config
└── package.json             # Root workspace config
```

**Stack:**
- **Frontend:** Next.js 14 (App Router) + TypeScript + React 18
- **Styling:** Tailwind CSS + design tokens (WCAG AA verified)
- **Database:** PostgreSQL on Supabase + Drizzle ORM
- **Auth:** Supabase Auth (email/password + OAuth)
- **UI Components:** Radix UI primitives + custom components
- **Payments:** Stripe Billing (later milestones)
- **Hosting:** Vercel

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- pnpm 9+
- Supabase account (free tier)
- Stripe account (for payments, later)

### Installation

```bash
# Clone the repository
git clone https://github.com/Hemsagar00/NyayaVedika.git
cd NyayaVedika/nyayavedik-app

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# Push database schema
pnpm db:push

# Start development server
pnpm dev
```

Visit `http://localhost:3000`

### Supabase Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Go to Settings → API to get your `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Go to Settings → Database to get your `DATABASE_URL` (use the pooler URL for serverless)
4. Enable Email/Password and OAuth providers (Google, GitHub) in Authentication → Providers
5. Run `pnpm db:push` to create tables

### Database Schema

The schema includes 22 tables:
- **Core:** `users`, `user_bookmarks`, `user_downloads`, `search_history`
- **Legal Content:** `acts`, `section_mappings`, `constitution_articles`, `courts`, `judgments`, `legal_drafts`, `user_drafts`
- **Reference:** `legal_news`, `bills_ordinances`, `government_schemes`, `legal_terms`, `court_fee_rules`
- **AI & Analytics:** `ai_usage_logs`, `subscription_plans`
- **Security:** Row Level Security (RLS) enabled on all tables

## 📁 Project Structure

```
apps/web/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   └── signup/
│   │   ├── bare-acts/
│   │   │   └── [id]/
│   │   ├── profile/
│   │   ├── settings/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   ├── toaster.tsx
│   │   └── providers.tsx
│   ├── hooks/
│   │   └── use-auth.ts
│   └── lib/
│       └── utils.ts

packages/
├── db/
│   └── src/
│       ├── index.ts          # Drizzle client
│       └── schema.ts         # 22-table schema
├── ui/
│   └── src/
│       ├── components/       # 25+ reusable components
│       ├── lib/utils.ts      # Utilities
│       └── index.ts
└── config/
    ├── eslint/
    ├── typescript/
    └── tailwind/
```

## 🎨 Design System

The design system is defined in `replica/design/tokens.json` and includes:

- **Colors:** Semantic color roles (light/dark) with WCAG AA verified pairs
- **Typography:** Inter (sans), Source Serif 4 (serif), JetBrains Mono + 12 Indian language fonts
- **Spacing:** 4px base scale (0-24)
- **Components:** 25+ primitives (Button, Input, Card, Modal, Toast, etc.)
- **Accessibility:** All components meet WCAG AA (4.5:1 text, 3:1 UI)

Run contrast verification:
```bash
cd replica/design
python3 contrast.py tokens.json
```

## 🌐 Internationalization

Supports 12+ Indian languages:
- English (en), Hindi (hi), Gujarati (gu), Marathi (mr)
- Punjabi (pa), Bengali (bn), Odia (or), Tamil (ta)
- Telugu (te), Kannada (kn), Malayalam (ml), Nepali (ne)

Language-specific fonts loaded via `next/font/google`.

## 🛠️ Development Commands

```bash
# Development
pnpm dev                 # Start all apps in dev mode
pnpm dev --filter=web    # Start only web app

# Building
pnpm build               # Build all packages
pnpm build --filter=web  # Build only web app

# Linting & Formatting
pnpm lint                # Lint all packages
pnpm format              # Format with Prettier

# Database
pnpm db:push             # Push schema to database
pnpm db:studio           # Open Drizzle Studio
pnpm db:generate         # Generate migrations
pnpm db:migrate          # Run migrations

# Type Checking
pnpm type-check          # TypeScript check
```

## 📦 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Environment Variables for Production

```env
NODE_ENV=production
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
DATABASE_URL=postgresql://postgres:password@db.supabase.co:5432/postgres
NEXTAUTH_SECRET=your-production-secret
NEXTAUTH_URL=https://nyayavedika.in
# ... other production keys
```

## 🗺️ Roadmap

### Milestone 1 ✅ (Core Loop) — *Current*
- Home, Bare Acts Library, Act Viewer, Auth, Profile, Settings

### Milestone 2 (Judgments & AI Search)
- Supreme Court & High Court judgments
- AI-powered legal search (RAG with citations)
- Judgment detail with AI analysis

### Milestone 3 (Drafts & Tools)
- Legal drafts library (10,000+ templates)
- Draft viewer with variable substitution
- Court fee calculator, law dictionary

### Milestone 4 (Legislation, News, Constitution)
- Parliament/State bills tracker
- Daily legal news feed
- Constitution of India (updated 2026)

### Milestone 5 (Fixes & Polish)
- Verifiable AI citations
- Corporate acts (Companies, Insolvency, GST)
- Affordable Pro tier (₹6,000/year)
- eCourts integration, PDF viewer fixes
- Regional language quality, offline sync, customizable alerts

## 🤝 Contributing

This is a proprietary project by Naga Law Chambers Tech. For internal development:

1. Create feature branch from `main`
2. Follow conventional commits: `feat:`, `fix:`, `chore:`, `docs:`
3. Ensure all checks pass: `pnpm lint && pnpm type-check && pnpm build`
4. Open PR with description and screenshots

## 📄 License

Proprietary — Naga Law Chambers Tech. All rights reserved.

## 🙏 Acknowledgments

- **India Code** (indiacode.nic.in) — Official Bare Acts source
- **Legislative Department** — Constitution of India
- **eCourts Services** — Case data reference
- **Supabase** — Backend infrastructure
- **Vercel** — Hosting platform
- **Radix UI** — Accessible component primitives
- **Tailwind CSS** — Utility-first styling

---

**Built with ❤️ for Indian legal professionals**

*Nyaya Vedik — Where Justice Meets Knowledge*