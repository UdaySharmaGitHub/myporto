# My Portfolio

A personal portfolio website built with **Next.js 16**, **React 19**, and **Tailwind CSS v4** — featuring cinematic micro-animations, scroll-driven reveals, and a bold editorial aesthetic.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19.2, Tailwind CSS v4 |
| Animations | Motion (`motion/react`), GSAP |
| Language | TypeScript |
| Package Manager | pnpm |

## Sections

- **Hero** — animated entrance with staggered text reveal
- **Works** — project showcase with scroll-triggered card animations
- **Explorations** — side projects and experiments
- **Stats** — animated counters on scroll
- **Journal** — writing / blog entries
- **Footer** — contact and social links

## Make It Yours — `ResumeData.json`

All portfolio content lives in a single file: **[`ResumeData.json`](ResumeData.json)** at the project root. No code changes needed — just edit the JSON and the site updates automatically.

```
ResumeData.json
├── personal       ← name, bio, location, email, roles, availability
├── social         ← links to X, LinkedIn, GitHub, Medium, etc.
├── stats          ← animated counter cards (years, projects, clients)
├── projects       ← works/portfolio cards with title, colors, layout
├── journal        ← blog/writing entries with title, date, read-time
├── explorations   ← side-project accent cards (colors & rotation)
├── footer         ← marquee text and CTA heading
└── video          ← HLS stream URL for the hero background video
```

### Field Reference

#### `personal`
| Field | Description |
|---|---|
| `name` | Your full name (displayed in hero & navbar) |
| `initials` | Short prefix shown beside your name |
| `location` | City / country |
| `email` | Contact email |
| `collection` | Vintage tag, e.g. `'22` for your founding year |
| `bio` | One-line tagline under your name |
| `roles` | Array of rotating role titles in the hero |
| `availability` | `true` / `false` — shows/hides the green availability badge |
| `availabilityText` | Label beside the badge |
| `copyrightYear` | Year shown in the footer |

#### `social`
Array of `{ label, href }` objects — add or remove as needed.

#### `stats`
Array of `{ value, suffix, label }` — numbers animate up on scroll.

#### `projects`
Each entry is a work card. `span` controls the CSS grid width (`md:col-span-7` = wide, `md:col-span-5` = narrow). `bg` is a Tailwind gradient string; `accent` is a hex color for hover glows.

#### `journal`
Each entry has `title`, `time` (read estimate), `date`, and a `bg` gradient for the card.

#### `explorations`
Six accent cards — each has a `bg` gradient, an `accent` hex, and a `rotation` in degrees for the tilt effect.

#### `footer`
`marqueeText` — the scrolling ticker text (include ` • ` as a separator). `ctaTitle` — the large CTA heading.

#### `video`
`hlsSrc` — an HLS `.m3u8` stream URL for the hero background video. Replace with your own Mux / Cloudflare Stream / self-hosted URL.

---

## Getting Started

```bash
# Install dependencies
pnpm install

# Start dev server (Turbopack)
pnpm dev

# Production build
pnpm build

# Start production server
pnpm start

# Lint
pnpm lint
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
app/
├── components/         # All UI sections and reusable components
│   ├── HeroSection.tsx
│   ├── Navbar.tsx
│   ├── WorksSection.tsx
│   ├── ExplorationsSection.tsx
│   ├── StatsSection.tsx
│   ├── JournalSection.tsx
│   ├── LoadingScreen.tsx
│   ├── Portfolio.tsx
│   └── FooterSection.tsx
├── globals.css         # Tailwind v4 imports + CSS custom properties
├── layout.tsx          # Root layout
└── page.tsx            # Home route
public/
└── Portfolio.mp4       # Site preview video
```

## Styling

Tailwind CSS v4 is imported via `@import "tailwindcss"` in `globals.css`. Theme tokens (colors, fonts, spacing) are defined using `@theme inline` blocks — no `tailwind.config.js` needed.

## Deploy

Deploy instantly on [Vercel](https://vercel.com/new):

```bash
vercel
```
