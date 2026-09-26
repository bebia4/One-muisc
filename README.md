# One Gospel Media

Marketing site for **One Gospel Media** — a faith-based creative media and
communications agency working in cinematic video production, live broadcast,
editorial photography, post-production and media consulting.

Cinematic and reverent: an obsidian canvas, warm ambient light, film grain,
glassmorphism panels and an expansive editorial type hierarchy.

## Stack

| | |
|---|---|
| Framework | React 19 (function components) |
| Build | Vite 8 |
| Styling | Tailwind CSS 4 (CSS-first config — see `src/index.css`) |
| Motion | Framer Motion 13 |
| Icons | Lucide React (brand marks hand-authored — see below) |

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production bundle -> dist/
npm run preview    # serve the built bundle
npm run media      # regenerate the cinematic plate set
```

## Structure

```
src/
├── App.jsx                     Section composition + showreel dialog state
├── main.jsx                    Entry point
├── index.css                   Tailwind theme (@theme), grain, glass, focus rings
├── data/
│   ├── site.js                 All editorial copy — edit words here, not in JSX
│   └── media.js                Image registry and the remote/local switch
├── hooks/
│   ├── useReducedMotion.js     Live OS reduced-motion preference
│   ├── useScrollState.js       Sticky-header state + active section tracking
│   └── useLockBodyScroll.js    Scroll freeze for overlays, without layout jump
├── lib/motion.js               Shared variants, easing and viewport config
└── components/
    ├── Navbar.jsx              Floating glass header, mobile sheet, progress bar
    ├── Hero.jsx                Viewfinder frame, dual CTAs, stats, ticker
    ├── About.jsx               Editorial grid, vision/mission split, process
    ├── Values.jsx              Four interactive pillars
    ├── Services.jsx            Five-category tab hub with deliverable tags
    ├── Showcase.jsx            Filterable project mosaic
    ├── Booking.jsx             Three-step enquiry form with validation
    ├── Footer.jsx              Manifesto, newsletter, navigation, socials
    ├── ShowreelModal.jsx       Player dialog
    └── primitives/             Reusable building blocks
```

## Imagery

Every image resolves through `src/data/media.js`, so art direction changes in
one file rather than across components.

The site ships with a set of **generated cinematic plates** in `public/media` —
layered warm gradients, volumetric light shafts, stage haze, lens bokeh and
crowd silhouettes, produced by `scripts/generate-media.mjs`. They are
deliberately stylised rather than photographic, they add ~155 kB total, and they
mean a clean checkout renders correctly with no network access at all.

### Using real photography

1. Set each entry's `remote` value in `src/data/media.js` to a licensed image URL.
2. Flip `USE_REMOTE_IMAGERY` to `true`.

`SmartImage` loads `remote` first and silently falls back to the local plate if
it fails, so a dead URL or an offline visitor never produces a broken frame. A
tonal placeholder covers the gap while either source loads.

For a production agency the right end state is **your own frames** — stills
pulled from the work in the showcase — rather than stock. Drop them into
`public/media` and point `local` at them.

> Note: the images were generated rather than sourced from a stock library
> because the build environment's network policy blocked every image host. The
> registry and fallback chain exist so swapping in real photography is a
> one-file change.

## Accessibility

Verified with `axe-core` against WCAG 2.1 A and AA — **no violations**.

- Semantic landmarks (`header`, `nav`, `main`, `section`, `footer`) and a skip link
- Services tabs implement the WAI-ARIA tabs pattern, including arrow/Home/End keys
- The showreel dialog traps focus, closes on Escape, and restores focus to its trigger
- Form fields carry labels, `aria-invalid` and `aria-describedby`; errors use `role="alert"`
- Filtering announces its result count through a polite live region
- Hover-revealed copy stays in the DOM and is reachable by keyboard and touch
- All muted text uses the `mist` / `ash` tokens, which clear 4.5:1 on every panel
  shade in use (Tailwind's own `slate-500` sits at ~4.1:1 here and is not used)
- Motion collapses to a plain fade under `prefers-reduced-motion`

## Responsiveness

Verified with no horizontal overflow at 360, 390, 768, 1024, 1440 and 1920 px.
The tab rail and filter row scroll horizontally on small screens; the project
mosaic promotes a single lead cell on desktop only.

## Wiring up the forms

Both forms are front-end only. The integration points are:

- `handleSubmit` in `src/components/Booking.jsx` — currently logs the payload
- `onSubmit` in the `Newsletter` component in `src/components/Footer.jsx`

Point them at your CRM, form endpoint or list provider.
