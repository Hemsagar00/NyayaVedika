# ⚖️ NyayaVedika — AI That Speaks Law

**Free AI-powered legal drafting for Indian advocates.** Generate court-ready SLPs, writ petitions, bail applications, NDPS bail, and more — for Supreme Court, High Court & District Courts.

## 🎨 Design — "Midnight Court" v5

Deep Indigo + Supreme Court Gold. Modern SaaS aesthetic meeting Indian legal tradition.

| Token | Value |
|-------|-------|
| Background | `#080a14` (deep night indigo) |
| Surface | `#0d0f20` |
| Accent | `#bf9b30` (Supreme Court gold) |
| Fonts | Sora (headings), Inter (body), JetBrains Mono (code) |

## 🚀 Quick Start

```bash
npm install
npm run dev      # → http://localhost:5173
npm run build    # → dist/
```

## 🧠 AI Backend

| Priority | Provider | Model |
|----------|----------|-------|
| 1 (Primary) | NVIDIA API | `llama-4-maverick-17b-128e-instruct` |
| 2 (Fallback) | NVIDIA API | `mistral-large-3-675b-instruct-2512` |
| 3 (Bridge) | Friday Bridge | `api.nagalawchambers.com` |

**Environment variables needed:**
- `VITE_NVIDIA_API_KEY` — NVIDIA API key (Llama 4 Maverick)
- `VITE_MISTRAL_API_KEY` — NVIDIA API key (Mistral Large 3)

## 📦 Deploy

**Cloudflare Pages (live):**
```bash
CLOUDFLARE_EMAIL=hemsagar00@gmail.com \
CLOUDFLARE_API_KEY=<key> \
npx wrangler pages deploy dist --project-name nyayavedika --branch master
```

**DNS:** `nyayavedika.in` → CNAME `nyayavedika.pages.dev` (Cloudflare proxy)

## 🏗️ Architecture

```
src/
├── main.js              — Entry point, routing, scroll reveal
├── components/
│   ├── hero.js          — Typewriter hero + marquee
│   ├── features.js      — Bento grid drafting cards
│   ├── navbar.js        — Glassmorphism sticky nav
│   ├── three-bg.js      — Three.js 3D background scene
│   ├── draftingPanel.js — AI drafting UI (7 tabs)
│   ├── footer.js        — Midnight Court footer
│   ├── judgments.js     — Latest judgments section
│   └── news.js          — Legal news updates
├── services/
│   ├── aiService.js     — Multi-provider AI with fallback
│   ├── storage.js       — localStorage helpers
│   └── docxExport.js    — .docx export
└── styles/
    ├── design-system.css — Design tokens
    └── global.css        — Full styling system
```

## 📋 Features

- **6 drafting types** — SLP, Writs, Bail, NDPS Bail, Revenue, Consumer
- **All Indian courts** — Supreme Court to District Courts
- **BNS/BNSS ready** — New criminal laws fully supported
- **.docx export** — Download court-ready documents
- **Typewriter hero** — Cycling through document types
- **Bento grid cards** — With legal tags (#Article226, #Section37)

## ⚠️ Disclaimer

NyayaVedika is an AI drafting tool. All generated drafts must be reviewed by a qualified advocate before filing in any court.

## 👨‍💻 Built By

Hemsagar Kasi & Friday AI. Built with conviction in Anantapur. No VC money. Just code and coffee.

---

**Live:** [nyayavedika.pages.dev](https://nyayavedika.pages.dev) · **DNS:** `nyayavedika.in` → Cloudflare Pages · **Repo:** [github.com/Hemsagar00/NyayaVedika](https://github.com/Hemsagar00/NyayaVedika)
