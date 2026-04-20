---
name: frontend-design
description: Create distinctive, production-grade frontend interfaces with high design quality. Use this skill when the user asks to build web components, pages, or applications. Generates creative, polished code that avoids generic AI aesthetics.
license: Complete terms in LICENSE.txt
---

This skill guides creation of distinctive, production-grade frontend interfaces that avoid generic "AI slop" aesthetics. Implement real working code with exceptional attention to aesthetic details and creative choices.

The user provides frontend requirements: a component, page, application, or interface to build. They may include context about the purpose, audience, or technical constraints.

## Design Thinking

Before coding, understand the context and commit to a BOLD aesthetic direction:
- **Purpose**: What problem does this interface solve? Who uses it?
- **Tone**: Pick an extreme: brutally minimal, maximalist chaos, retro-futuristic, organic/natural, luxury/refined, playful/toy-like, editorial/magazine, brutalist/raw, art deco/geometric, soft/pastel, industrial/utilitarian, etc. There are so many flavors to choose from. Use these for inspiration but design one that is true to the aesthetic direction.
- **Constraints**: Technical requirements (framework, performance, accessibility).
- **Differentiation**: What makes this UNFORGETTABLE? What's the one thing someone will remember?

**CRITICAL**: Choose a clear conceptual direction and execute it with precision. Bold maximalism and refined minimalism both work - the key is intentionality, not intensity.

Then implement working code (HTML/CSS/JS, React, Vue, etc.) that is:
- Production-grade and functional
- Visually striking and memorable
- Cohesive with a clear aesthetic point-of-view
- Meticulously refined in every detail

## Frontend Aesthetics Guidelines

Focus on:
- **Typography**: Choose fonts that are beautiful, unique, and interesting. Avoid generic fonts like Arial and Inter; opt instead for distinctive choices that elevate the frontend's aesthetics; unexpected, characterful font choices. Pair a distinctive display font with a refined body font.
- **Color & Theme**: Commit to a cohesive aesthetic. Use CSS variables for consistency. Dominant colors with sharp accents outperform timid, evenly-distributed palettes.
- **Motion**: Use animations for effects and micro-interactions. Prioritize CSS-only solutions for HTML. Use Motion library for React when available. Focus on high-impact moments: one well-orchestrated page load with staggered reveals (animation-delay) creates more delight than scattered micro-interactions. Use scroll-triggering and hover states that surprise.
- **Spatial Composition**: Unexpected layouts. Asymmetry. Overlap. Diagonal flow. Grid-breaking elements. Generous negative space OR controlled density.
- **Backgrounds & Visual Details**: Create atmosphere and depth rather than defaulting to solid colors. Add contextual effects and textures that match the overall aesthetic. Apply creative forms like gradient meshes, noise textures, geometric patterns, layered transparencies, dramatic shadows, decorative borders, custom cursors, and grain overlays.

NEVER use generic AI-generated aesthetics like overused font families (Inter, Roboto, Arial, system fonts), cliched color schemes (particularly purple gradients on white backgrounds), predictable layouts and component patterns, and cookie-cutter design that lacks context-specific character.

Interpret creatively and make unexpected choices that feel genuinely designed for the context. No design should be the same. Vary between light and dark themes, different fonts, different aesthetics. NEVER converge on common choices (Space Grotesk, for example) across generations.

**IMPORTANT**: Match implementation complexity to the aesthetic vision. Maximalist designs need elaborate code with extensive animations and effects. Minimalist or refined designs need restraint, precision, and careful attention to spacing, typography, and subtle details. Elegance comes from executing the vision well.

## Micro-animations (Portfolio Context)

This project is a portfolio — micro-animations are a first-class requirement, not an afterthought. A static portfolio is a forgettable one. Every element the user's eye lands on should feel alive and purposeful.

**Implementation stack**: CSS transitions/`@keyframes` for simple effects; `motion/react` (Motion library) for orchestrated React sequences; `IntersectionObserver` for scroll-triggered reveals; View Transitions API for route-level transitions (available in Next.js 16 / React 19.2).

### Required patterns — implement all of these unless the aesthetic direction explicitly rules one out:

**Entry & reveal**
- Staggered fade-up or slide-in on scroll via `IntersectionObserver` + `animation-delay`. Elements enter sequentially (50–100ms stagger), never all at once.
- Hero headings: character-by-character or word-by-word entrance (split text, stagger delay per node). Choose blur-to-sharp, clip-path reveal, or translate-up depending on aesthetic.

**Hover & interaction feedback**
- Every interactive element (links, buttons, cards, nav items) needs a tactile hover response. Choose one that fits the tone: `translateY(-2px)` lift, color shift, underline draw, border reveal, glow pulse, or background fill.
- Animated underline on links: `scaleX` 0→1 from left on hover, 1→0 to left on leave. Never a static underline appear/disappear.
- Buttons: `scale(0.97)` + slight shadow collapse on `active` (press feel). Smooth `background`/`color` transition on hover (`150–200ms ease`).

**Cards & project showcases**
- Cards animate in on scroll with staggered delay (each card 60–80ms after previous).
- Card hover: subtle scale (`1.02–1.03`), shadow depth increase, or overlay reveal with project meta. Pick one and execute it crisply.

**Scroll-driven effects**
- Skill bars, stat counters, or progress indicators: animate value/width from 0 when scrolled into view.
- Parallax on hero backgrounds or decorative elements (`transform: translateY` driven by scroll position) — keep subtle (10–20% of scroll delta).

**Page & route transitions**
- Use the View Transitions API for route changes. Wrap navigations so outgoing content fades/slides out and incoming fades/slides in.
- Section-to-section scroll: smooth scroll behavior (`data-scroll-behavior="smooth"` on `<html>` for Next.js 16).

**Cursor & focus polish**
- Custom cursor or magnetic pull effect on primary CTAs for portfolio impact.
- Keyboard focus rings should be styled and animated (scale-in ring, not browser default).

### Timing guidelines

| Type | Duration | Easing |
|---|---|---|
| Page/section entry | 400–600ms | `ease-out` or `cubic-bezier(0.16, 1, 0.3, 1)` |
| Hover response | 150–250ms | `ease` |
| Press/active | 80–120ms | `ease-in` |
| Exit/out | 100–200ms | `ease-in` |
| Stagger increment | 50–100ms per item | — |

Never animate longer than necessary. Snappy always beats slow. If an animation makes the UI feel sluggish, halve its duration before removing it entirely.

### What to avoid
- `transition: all` — always specify the exact property.
- Looping animations on static content (spinning logos, pulsing text) — they become noise.
- Animating `width`/`height` — use `transform: scale` instead for performance.
- Too many simultaneous animations — orchestrate so only 2–3 things move at once.

Remember: Claude is capable of extraordinary creative work. Don't hold back, show what can truly be created when thinking outside the box and committing fully to a distinctive vision.