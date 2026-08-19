# NyayaVedika

**Chamber desk for the Anantapur Bar.** Search reported Indian case law, read the ratio, and produce a first-draft pleading.

The site works without API keys. A local desk of Supreme Court holdings and named statutes answers search. Structured templates produce drafts. When `INDIANKANOON_API_KEY`, `NVIDIA_API_KEY`, or `DEEPSEEK_API_KEY` are set, those services are used first.

## Overview

- Case-law search with the ratio already pulled
- First drafts for bail, partition, mutation, Section 80 notice, consumer complaints, and written statements
- Practice areas wired to live search and draft
- Telegram bot at [@nagalawchambers_bot](https://t.me/nagalawchambers_bot)

## Architecture

| Component | Technology |
|---|---|
| Web UI | Next.js 16 + React 19 + Tailwind CSS |
| AI Engine | llama.cpp + Gemma-4 4B (fine-tuned) |
| Styling | Tailwind CSS + shadcn/ui |
| Analytics | Vercel Speed Insights |
| Icons | Lucide React |

## Integrations

- **Telegram Bot**: `@nagalawchambers_bot` — live chat interface for clients
- **Local LLM**: llama.cpp inference on AMD RX 6700 XT (12GB)
- **Cloud Fallback**: ollama-cloud (deepseek-v4-pro, kimi-k2.6)

## Live Site

🔗 [https://nyayavedika.in](https://nyayavedika.in)

Deploy as a **server** app (Vercel / `next start`). Do not use `output: 'export'`. Search and drafting need the `/api/*` routes.

## Project

- **Repo**: `Hemsagar00/NyayaVedika`
- **Branch**: `master`
- **Maintained by**: HemSagar Kasi (FRIDAY stack)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view locally.

## Environment

Copy `.env.example` to `.env.local` and configure as needed.

## Build

```bash
npm run build
```

## License

Private — All rights reserved.
