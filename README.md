# NyayaVedika

<div align="center">

**AI-Powered Legal Drafting for Indian Advocates**  
_Generate court-ready pleadings in minutes — zero cost, unlimited use_

[![Live Site](https://img.shields.io/badge/Live%20Site-nyayavedika.in-6366f1?style=for-the-badge)](https://nyayavedika.in)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel)](https://vercel.com)
[![License](https://img.shields.io/badge/License-Proprietary-red?style=for-the-badge)]()

</div>

---

## What is NyayaVedika?

NyayaVedika is a **free, world-class AI drafting platform** for Indian advocates. It generates court-ready legal documents — SLPs, writ petitions, bail applications, NDPS bail, revenue appeals, quashing petitions, legal notices, and 20+ more document types — for Supreme Court, High Court, District Courts, and Tribunals.

**No subscriptions. No paywalls. No usage limits.** Built by advocates, for advocates.

### AI Backend

| Provider | Use Case | Model |
|---|---|---|
| **LM Studio** (primary) | Local, zero-cost, unlimited | `google/gemma-4-e4b` |
| **NVIDIA** (backup) | Cloud fallback, free tier | `meta/llama-3.1-70b-instruct` |
| **DeepSeek** | Cheap cloud option | `deepseek-chat` |
| **Anthropic Claude** | Premium quality | `claude-3-5-sonnet-20241022` |
| **Google Gemini** | Free tier available | `gemini-2.0-flash` |

---

## Features

### AI Drafting Tools (7 tabs)
| Tool | What it does |
|---|---|
| **Ask AI** | Chat with AI about any legal topic — statutes, case law, practice guidance |
| **Draft** | Generate full petitions with cause title, synopsis, grounds, prayer clause, verification |
| **Case Laws** | Find relevant Supreme Court & High Court precedents with citations |
| **Analyze** | Comprehensive analysis of FIRs, chargesheets, judgments, orders |
| **Grounds** | AI suggests strongest legal grounds with statutory citations |
| **Summarize** | Extract parties, issues, orders, deadlines from any legal document |
| **Explain** | Plain-English breakdown of complex clauses and provisions |

### Legal Coverage
- **Bharatiya Nyaya Sanhita (BNS, 2023)** — replaces IPC
- **Bharatiya Nagarik Suraksha Sanhita (BNSS, 2023)** — replaces CrPC
- **Bharatiya Sakshya Adhiniyam (BSA, 2023)** — replaces Evidence Act
- IPC/CrPC/IEA cross-references for transitional cases
- NDPS Act, NI Act, Consumer Protection Act, DV Act, IBC
- Constitutional law (Articles 14, 19, 21, 32, 136, 226, 227)
- 25+ document types across all court levels and tribunals

### Platform
- **Live Judgments Widget** — SC, HC, and Tribunal updates in sidebar
- **Legal Updates Digest** — AI-generated deep-dives on any legal topic
- **Dark theme** — designed for long drafting sessions
- **Fully responsive** — works on desktop, tablet, and mobile
- **Accessible** — skip links, focus indicators, reduced-motion support, ARIA labels

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML5, CSS3, Vanilla JS (ES modules) |
| Build | Vite 6 |
| AI | LM Studio / NVIDIA / DeepSeek / Claude / Gemini |
| Hosting | Vercel (static) |
| CI/CD | GitHub Actions |
| Fonts | Inter + DM Sans (Google Fonts) |

---

## Quick Start

### Option A: Local Development with LM Studio (Recommended)

```bash
# 1. Install LM Studio
#    Download from https://lmstudio.ai/
#    Load the google/gemma-4-e4b model
#    Start the local server (default: http://localhost:1234)

# 2. Clone & install
git clone https://github.com/Hemsagar00/NyayaVedika.git
cd NyayaVedika
npm install

# 3. Configure
cp .env.example .env.local
# Edit .env.local:
#   VITE_AI_PROVIDER=lmstudio
#   VITE_LMSTUDIO_API_KEY=lm-studio

# 4. Run
npm run dev
# Opens at http://localhost:4001
```

The app auto-selects LM Studio in dev mode and NVIDIA in production. You can override by setting `VITE_AI_PROVIDER` explicitly.

### Option B: Cloud Deployment (Vercel)

1. **Fork/clone** this repo to your GitHub
2. **Import** into Vercel → `https://vercel.com/new`
3. **Add Environment Variables** in Vercel project settings:
   - `VITE_AI_PROVIDER` = `nvidia` (or `deepseek`, `anthropic`, `gemini`)
   - `VITE_NVIDIA_API_KEY` = your API key
4. **Deploy** — Vercel auto-builds and deploys on every push to master

### API Keys

| Provider | Get Key | Free Tier |
|---|---|---|
| LM Studio | [lmstudio.ai](https://lmstudio.ai/) | Unlimited (runs locally) |
| NVIDIA | [build.nvidia.com](https://build.nvidia.com/) | 1,000 req/day |
| DeepSeek | [platform.deepseek.com](https://platform.deepseek.com/api_keys) | Available |
| Anthropic | [console.anthropic.com](https://console.anthropic.com/settings/keys) | No |
| Gemini | [aistudio.google.com](https://aistudio.google.com/app/apikey) | Available |

---

## Project Structure

```
nyayavedika/
├── src/
│   ├── main.js                    # App shell, routing, page renderers
│   ├── style.css                  # Design system + world-class animations
│   ├── services/
│   │   └── aiService.js           # AI handler (5 providers, unified API)
│   └── components/
│       ├── draftingPanel.js       # 7-tab AI drafting UI + live feed widget
│       └── aiPanel.css            # Panel & drafting layout styles
├── api/
│   └── friday.js                  # Vercel serverless proxy (optional)
├── .env.example                   # Environment variable template
├── .github/workflows/deploy.yml   # CI/CD pipeline
├── vercel.json                    # SPA rewrites + security headers
├── vite.config.js
└── index.html
```

---

## Security

- **CSP headers** — strict content security policy via `vercel.json`
- **XSS prevention** — HTML escaping on all dynamic content
- **No data storage** — documents processed in-memory, not retained
- **HTTPS only** — enforced at Vercel edge
- **API keys** — injected at build time via Vite env variables (never in source)

---

## Legal Disclaimer

**NyayaVedika is an AI drafting tool, not a law firm.** All generated drafts must be reviewed, verified, and finalized by a qualified advocate before filing with any court or authority. No attorney-client relationship is created. The advocate bears full professional responsibility for all filed documents.

---

<div align="center">

© 2026 NyayaVedika. All Rights Reserved.  
Made for Justice ⚖️

</div>
