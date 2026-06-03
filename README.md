# Scroll Effect Library — Prompt → Effect

A browsable library of scroll-driven web-design effects, each rebuilt from a recording.
Built for landing pages / client demos. **Every prompt lives inside the app.**

## Run

```bash
npm install
npm run dev
```

Open http://localhost:5173/.

## How to browse (hub)

- **Click any tile** → a popup opens the effect **live in an iframe** (scroll inside it),
  with its categories, your tags, an **Open full page** link, and **View prompt**.
- **Filter** by built-in category chips; **filter by your own tags**; **sort** by
  number / complexity / category.
- **Tag anything yourself** — type a tag in a tile's popup. Tags persist in
  `localStorage` (`userTags.js`) and become filters on the hub.
- **Browse sidebar** (top-left, on every page incl. inside a demo) jumps to any demo,
  grouped by category.

## Type roles (kept deliberately distinct)

- **Space Grotesk** — site UI/chrome · **Inter** — demo content · **JetBrains Mono** —
  prompt text · **Fraunces** — editorial serif.

## Effects

`prompts.js` is the single source of truth (categories, prompts, variants).

| # | Route | Notes |
| --- | --- | --- |
| 1A | `/sticky-card` | Pinned card → 4 tabs (scroll shortened) |
| 2 | `/vault-hero` | Headline fill → unfill → fade |
| 3 | `/word-fill` | Word-by-word fill + icon pops |
| 4 | `/sticky-scroller` | Sticky two-column feature scroller |
| 5 | `/parallax-masonry` | Parallax masonry wall |
| 6 | `/tablet-tabs` | **Reworked:** scroll-driven tabs, drifting/tilting iPad |
| 7 | `/scattered-cards` | Scattered cards + timeline rail |
| 8 | `/serpentine-path` | **Reworked:** diagonal path, big centered labels, patient-journey theme |
| 9 | `/velocity-skew` | Velocity-skew gallery + page wipe |
| 10 | `/perspective-flatten` | **Reworked:** rich weekly calendar, flatten + blur→sharp + idle hover |
| 11 | `/floating-widgets` | **Reworked:** cards fly in on scroll + hover tilt |
| 12 | `/device-morph` | Phone → TV morph |
| 13 | `/deck-zoom` | Deck zoom + greeting fill |
| 13 v2 | `/deck-zoom-v2` | Dark aurora variant (spiral converge) |
| G1 | `/magnetic-button` | Global: magnetic buttons |
| G2 | `/page-transition` | Global: page-transition wipes |

> Removed: the old `feature-list` (1B).

Stack: React 18 + Vite 5 + GSAP 3 (ScrollTrigger). HashRouter, so a static `npm run build`
also works. The preview iframe loads each route chrome-less (DemoChrome hides itself when
embedded).
