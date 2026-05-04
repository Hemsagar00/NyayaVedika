# NyayaVedika Redesign — Implementation Plan

## North Star
Sarvam.ai design quality + SupremeToday.ai feature set. Premium legal AI platform.

## Design System (from Sarvam + Linear inspiration)

### Typography
- Headings: Playfair Display (serif, legal gravitas)
- Body: Inter (clean sans)
- Mono: JetBrains Mono (for legal citations/code)

### Colors
- Primary: Deep indigo #1a1a2e
- Accent: Amber/gold #d4a853 (judicial gold)
- Surface: Off-white #fafafa, white #ffffff
- Text: Near-black #0f0f0f, muted #666666
- Border: Subtle #e6e6e6

### Components
- Frosted glass navbar (backdrop-blur, semi-transparent bg)
- Gradient buttons (indigo→gold shimmer)
- Scroll-triggered section reveals (opacity + translateY)
- Card grid with hover lift
- Smooth transitions (600-800ms cubic-bezier)

---

## Tasks

### Task 1: Project Setup & Config
- Rewrite index.html: proper SEO meta, OG tags, schema.org (law firm), font loading
- New vercel.json with CSP allowing api.nagalawchambers.com
- vite.config.js: keep existing, add alias
- .env: keep existing Friday bridge setup

### Task 2: Global Styles & Design System
- Create src/styles/design-system.css: CSS custom properties, typography, colors, spacing
- Create src/styles/global.css: reset, base styles, scroll-reveal utility, animations
- Import both in main.js

### Task 3: Premium Navbar (frosted glass)
- src/components/navbar.js: sticky frosted glass header
- Logo: "NyayaVedika" in serif + gold accent
- Nav links: Drafting | Research | News | About
- CTA button: "Start Drafting" with gradient

### Task 4: Hero Section (Sarvam-quality)
- src/components/hero.js: full-viewport hero
- Floating geometric shapes (legal motif — scales of justice subtle SVG)
- Headline: "AI That Speaks Law"
- Subheadline: "Draft SLPs, writ petitions, bail applications, and more — powered by AI trained on Indian law"
- Gradient CTA + secondary "Explore Features" link
- Scroll-reveal animation

### Task 5: Features Grid
- src/components/features.js: 3-column grid
- Cards: Document Drafting, Legal Research, Case Analysis, Judgments Feed, Multi-Court Support, AI-Powered Summaries
- Each card: icon, heading, description, hover lift animation

### Task 6: Live Judgments Feed (SupremeToday feature)
- src/components/judgments.js: real-time-like feed
- Card feed showing latest SC/HC judgments
- Court filter tabs: Supreme Court | High Courts | NCLAT | ITAT
- Each item: case title, court, date, 2-line summary, "Read Summary" link
- Loading skeleton state

### Task 7: AI Drafting Workspace (keep existing, polish UI)
- src/components/draftingPanel.js: existing functionality, new styles
- Cleaner form layout, better spacing
- Animated submit button, loading states
- Result card with copy-to-clipboard

### Task 8: News & Updates Section
- src/components/news.js: legal news cards
- Breaking news ticker at top
- Category pills: Constitutional, Criminal, Civil, Corporate
- Responsive grid

### Task 9: Footer
- src/components/footer.js: premium footer
- Logo + tagline
- Quick links: Drafting, Research, Contact, Privacy
- Social links (placeholder)
- Copyright + "Built with ❤️ for Indian advocates"

### Task 10: Integration & Polish
- Update main.js: mount all components
- Add scroll-reveal observer
- Smooth scroll navigation
- Responsive breakpoints
- Test Friday bridge integration
- Vercel deploy
