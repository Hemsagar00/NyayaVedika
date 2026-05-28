# NyayaVedika

**AI-powered Indian Legal Q&A & Drafting Assistant** — fine-tuned for Indian law, revenue procedures, and Andhra Pradesh-specific regulations.

## Overview

NyayaVedika combines a locally-hosted large language model (Gemma-4 fine-tuned on Indian legal corpus) with a modern web interface to deliver:

- Legal question answering in plain language
- Automated document drafting (petitions, notices, applications)
- Revenue-specific guidance (Adangal, Pahani, EC, NOC)
- Tailored for farmers, property buyers, and government job applicants

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
