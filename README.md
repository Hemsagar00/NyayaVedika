# NyayaVedika

<div align="center">

**AI-Powered Drafting for Indian Advocates**  
_Generate court-ready pleadings in minutes — free & unlimited_

[![Live Site](https://img.shields.io/badge/Live%20Site-nyayavedika.com-0052cc?style=for-the-badge)](https://nyayavedika.in)
[![Vercel Status](https://img.shields.io/badge/Vercel-Deployed-black?style=for-the-badge&logo=vercel)](https://vercel.com)

</div>

---

## About

NyayaVedika is a free, AI-powered legal drafting platform built for Indian advocates. It generates court-ready SLPs, writ petitions, bail applications, revenue appeals, and more — using **NVIDIA Llama 4 Maverick** (default), DeepSeek, Anthropic Claude, or Google Gemini API.

All features are available to every user with no paywalls, subscriptions, or usage limits.

---

## Tech Stack

- **Frontend:** HTML5, CSS3, Vanilla JS (Vite 6)
- **AI:** NVIDIA Llama 4 Maverick (default), DeepSeek, Anthropic Claude, or Google Gemini
- **Legal:** BNS/BNSS/BSA (2023) + IPC/CrPC/CPC (legacy cross-references)
- **Hosting:** Vercel (static deployment)
- **CI/CD:** GitHub Actions

---

## Project Structure

```
nyayavedika/
├── src/
│   ├── main.js                    # App entry + routing
│   ├── style.css                  # Design system tokens + page styles
│   ├── services/
│   │   └── aiService.js           # AI API handler (NVIDIA / DeepSeek / Claude / Gemini)
│   └── components/
│       ├── draftingPanel.js       # AI Drafting UI component
│       └── aiPanel.css            # Panel styles
├── .env.example                   # Environment variable template
├── .github/
│   └── workflows/
│       └── deploy.yml             # GitHub Actions CI/CD
├── vercel.json                    # Vercel SPA rewrites
├── vite.config.js
└── index.html
```

---

## Local Setup

```bash
# 1. Clone
git clone https://github.com/Hemsagar00/NyayaVedika.git
cd NyayaVedika

# 2. Install
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local and add your API key:
#   VITE_AI_PROVIDER=nvidia
#   VITE_NVIDIA_API_KEY=nvapi-...

# 4. Start dev server
npm run dev
# Opens at http://localhost:4001
```

---

## GitHub Environment Setup (for Deployment)

Since API keys must never be committed to the repo, use **GitHub Environments** to inject them at build time.

### Step 1 — Create the Environment

1. Go to your repo: `https://github.com/Hemsagar00/NyayaVedika`
2. Click **Settings** → **Environments** → **New environment**
3. Name it: `NyayaVedika`
4. Click **Configure environment**

### Step 2 — Add Secrets

Under **Environment secrets**, click **Add secret** for each:

| Secret Name | Value |
|---|---|
| `VITE_NVIDIA_API_KEY` | Your NVIDIA API key from [build.nvidia.com](https://build.nvidia.com/) |
| `VITE_DEEPSEEK_API_KEY` | Your DeepSeek API key from [platform.deepseek.com](https://platform.deepseek.com/api_keys) *(optional)* |
| `VITE_ANTHROPIC_API_KEY` | Your Claude API key from [console.anthropic.com](https://console.anthropic.com/settings/keys) *(optional)* |
| `VITE_GEMINI_API_KEY` | Your Gemini key from [aistudio.google.com](https://aistudio.google.com/app/apikey) *(optional)* |

### Step 3 — Add Variables (non-sensitive)

Under **Environment variables**, click **Add variable**:

| Variable Name | Value |
|---|---|
| `VITE_AI_PROVIDER` | `nvidia` *(or `deepseek`, `anthropic`, or `gemini`)* |

### Step 4 — Push to main

The `.github/workflows/deploy.yml` workflow will:
1. Install dependencies
2. Inject secrets as `VITE_` env vars
3. Run `vite build` — keys are baked into the dist bundle at build time
4. Deploy to Vercel (configure Vercel separately or use Vercel's own env system)

---

## Vercel Deployment (Alternative)

If you prefer Vercel's own environment variable system instead of GitHub Actions:

1. Go to your Vercel project → **Settings** → **Environment Variables**
2. Add the same keys: `VITE_NVIDIA_API_KEY`, `VITE_AI_PROVIDER`
3. Set scope to **Production** (and Preview if needed)
4. Redeploy

---

## Supported AI Providers

| Provider | Model | Cost | Setup |
|---|---|---|---|
| **NVIDIA Llama** (default) | `meta/llama-4-maverick-17b-128e-instruct` | Free tier (1000 req/day) | [Get API Key](https://build.nvidia.com/) |
| **DeepSeek** | `deepseek-chat` | Very cheap / free tier | [Get API Key](https://platform.deepseek.com/api_keys) |
| **Anthropic Claude** | `claude-sonnet-4-20250514` | Paid | [Get API Key](https://console.anthropic.com/settings/keys) |
| **Google Gemini** | `gemini-1.5-flash` | Free tier available | [Get API Key](https://aistudio.google.com/app/apikey) |

Switch providers by setting `VITE_AI_PROVIDER` to `nvidia`, `deepseek`, `anthropic`, or `gemini`.

---

## AI Features

| Feature | Description |
|---|---|
| **Draft Document** | Generates full petitions — bail, writ, SLP, revenue appeal — with grounds, synopsis, list of dates, and prayer clause. Cites BNS/BNSS and IPC/CrPC cross-references. |
| **Suggest Grounds** | Analyzes facts and suggests strongest legal grounds under Indian law |
| **Summarize Document** | Extracts key parties, orders, and deadlines from any legal document |
| **Explain Clause** | Plain-English explanation of any legal clause or section |

---

## Legal Disclaimer

NyayaVedika is an AI drafting tool, **not a law firm**. All outputs must be reviewed and finalized by a qualified advocate before filing. No attorney-client relationship is created by using this platform.

---

© 2026 NyayaVedika. All Rights Reserved.  
Made with ❤️ for Justice
