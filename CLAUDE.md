# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
pnpm dev        # Start dev server (Turbopack, outputs to .next/dev)
pnpm build      # Production build (Turbopack by default)
pnpm start      # Start production server
pnpm lint       # Run ESLint directly (next lint no longer exists)
```

To use Webpack instead of Turbopack: `pnpm dev --webpack` / `pnpm build --webpack`

## Architecture

This is a **Next.js 16** App Router project using TypeScript, React 19.2, Tailwind CSS v4, and pnpm.

- `app/` — App Router root. `layout.tsx` is the required root layout. `page.tsx` files define routes.
- `public/` — Static assets served from `/`
- `@/*` path alias resolves to the repo root (configured in `tsconfig.json`)

Styling uses Tailwind CSS v4 via `@import "tailwindcss"` in `globals.css` (not `@tailwind` directives). Theme tokens are defined with `@theme inline` blocks. PostCSS uses `@tailwindcss/postcss`.

## Next.js 16 Breaking Changes

**Always read `node_modules/next/dist/docs/` before writing Next.js-specific code.**

Key breaking changes from prior versions:

- **All dynamic APIs are async-only** — `cookies()`, `headers()`, `draftMode()`, `params`, and `searchParams` must all be `await`ed. No synchronous access.
- **`middleware` renamed to `proxy`** — Use `proxy.ts` with `export function proxy(request)`. The `edge` runtime is not supported in `proxy`; use `middleware.ts` if you need edge runtime.
- **`next lint` removed** — Use `eslint` CLI directly. `next build` no longer runs linting.
- **Parallel routes require explicit `default.js`** — Builds fail without `default.js` in every `@slot` directory.
- **`serverRuntimeConfig`/`publicRuntimeConfig` removed** — Use `process.env` directly; prefix with `NEXT_PUBLIC_` for client-accessible vars. Use `connection()` from `next/server` to read env vars at runtime rather than build time.
- **AMP support removed** entirely.
- **`revalidateTag` requires a second `cacheLife` argument** — e.g. `revalidateTag('posts', 'max')`. For read-your-writes semantics, use `updateTag` instead.
- **`cacheLife`/`cacheTag` are stable** — Drop the `unstable_` prefix.
- **PPR (`experimental.ppr`) removed** — Use `cacheComponents: true` in `next.config.ts` instead.
- **`turbopack` config is top-level** — Move from `experimental.turbopack` to `turbopack` in `next.config.ts`.
- **`next/image` defaults changed** — `minimumCacheTTL` now 4h (was 60s), `imageSizes` no longer includes 16px, default `qualities` is `[75]`, local images with query strings require `images.localPatterns.search`.
- **Sass tilde imports unsupported** — Use bare `node_modules` paths instead of `~package/`.
- **`next dev` outputs to `.next/dev`** — Separate from `next build` output.
- **`scroll-behavior: smooth` no longer overridden** — Add `data-scroll-behavior="smooth"` to `<html>` to restore previous behavior.

## Frontend Design

This is a **portfolio site** — every UI element must feel crafted and intentional, not generated. Use the `/frontend-design` skill when building any component, page, or interface.

- **Bold aesthetic direction** — commit to a clear tone (brutalist, editorial, luxury, etc.) before writing code. Every design should be distinct and context-specific.
- **Typography** — use characterful, unexpected font pairings. Never use Inter, Roboto, Arial, or system fonts.
- **Color** — CSS variables, dominant colors with sharp accents. No purple gradients on white backgrounds.
- **Spatial composition** — asymmetry, overlap, diagonal flow, grid-breaking elements.
- **Backgrounds** — gradient meshes, noise textures, geometric patterns, layered transparencies — no solid-color defaults.

### Micro-animations (required throughout)

Every interactive and transitional element must have a purposeful micro-animation. These are non-negotiable for a portfolio — they are what separates a memorable site from a generic one.

**Implementation**: CSS animations/transitions for simple effects; Motion library (`motion/react`) for orchestrated sequences in React components.

Required micro-animation patterns:
- **Page/section entry** — staggered fade-up or slide-in on scroll using `IntersectionObserver` + `animation-delay`. Elements should reveal sequentially, not all at once.
- **Hover states** — every interactive element (links, buttons, cards, nav items) needs a tactile hover response: subtle lift (`translateY`), color shift, underline draw, border reveal, or glow.
- **Button interactions** — press feedback (`scale(0.97)`) on `active`, smooth color/bg transitions on hover.
- **Cursor / focus** — custom cursor or magnetic effect on key CTAs for portfolio flair.
- **Text effects** — hero headings should have entrance animations: character stagger, word reveal, or blur-to-sharp. Use `animation-delay` per character/word.
- **Card reveals** — project/work cards animate in on scroll with staggered delay; hovering a card should shift shadow, scale slightly, or reveal an overlay.
- **Link underlines** — animated underline draw on hover (scale-x from 0→1) rather than static underline.
- **Scroll-triggered counters/progress** — skill bars, stats, or progress indicators animate when scrolled into view.
- **Smooth page transitions** — use View Transitions API (available in Next.js 16 / React 19.2) for route changes.

Timing guidelines: entries `300–600ms` with `ease-out`; hover responses `150–250ms`; exit/out `100–200ms`. Never animate for longer than needed — snappy beats slow.

Avoid all generic "AI aesthetics": predictable layouts, common font stacks (Space Grotesk, etc.), cookie-cutter component patterns, and static interfaces with no motion.

## ESLint

Config is `eslint.config.mjs` (flat config format). Uses `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`.

## TypeScript

Run `npx next typegen` to generate typed helpers (`PageProps`, `LayoutProps`, `RouteContext`) for async `params`/`searchParams`.
