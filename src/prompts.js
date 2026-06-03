// Single source of truth for every demo + its copy-paste prompt.
// Hub cards, the preview modal, the sidebar, and the in-page prompt panel all read this.
//
// Built-in `categories` are fixed taxonomy. Users add their own free-text tags on top
// (stored in localStorage — see userTags.js). `variantOf` links alternate versions.

export const CATEGORIES = [
  'Hero / Header',
  'Text Effect',
  'Device Mockup',
  'Photo / Gallery',
  'Cards / Layout',
  'Journey / Timeline',
  'Motion / Device',
  'Global / Add-anywhere',
  'Scroll-driven',
]

// Defaults applied to any demo missing them (keeps the 17 originals terse):
//   source: 'original', platform: 'desktop', live: true

export const demos = [
  {
    id: 'sticky-card',
    route: '/sticky-card',
    num: '1A',
    title: 'Scroll-Pinned Card → 4 Tabs',
    blurb:
      'A meeting-app card pins in place and morphs through Prep → Transcript → Notes → Summary as the left text swaps.',
    video: '202847.mp4',
    complexity: 'mod',
    categories: ['Cards / Layout', 'Scroll-driven'],
    library: 'GSAP ScrollTrigger (pin + scrub + snap)',
    prompt: `Build a scroll-driven "sticky card" feature section, desktop layout.

A single product card is pinned in the right-center of the viewport and stays fixed
while the section scrolls. To the left, eyebrow + heading + subtext blocks swap in sync.

Meeting-app card: rounded corners, soft shadow, white bg, title row ("Product Review")
+ status pill + time range + avatar stack, a tab bar (Prep | Transcript | Notes |
Summary, active tab has a sliding purple underline), and a content area.

4 stages swapped together on scroll: Prep (Agenda + "Join & Record"), Transcript (red
REC + Stop/Pause + live lines), Notes (auto notes), Summary ("Ended" + Key Updates /
Challenges). Card stays put; tab indicator slides, content cross-fades.

Stack: GSAP ScrollTrigger pin:true + scrub:true, snap to the 4 stages. Keep the scroll
distance tight (~one short viewport per stage). Purple accent #6D28D9.`,
  },
  {
    id: 'vault-hero',
    route: '/vault-hero',
    num: '2',
    title: 'Fill → Unfill → Fade Headline',
    blurb:
      'A ghost-outline headline whose ink sweeps IN to solid, then sweeps back OUT to outline, then fades away on scroll.',
    video: '202929.mp4',
    complexity: 'mod',
    categories: ['Hero / Header', 'Text Effect', 'Scroll-driven'],
    library: 'GSAP ScrollTrigger scrub + clip-path text fill',
    prompt: `Scroll-driven hero. Headline two lines, centered. Line 1 solid heavy black.
Line 2 is the star: an OUTLINE / ghost word (transparent fill + faint grey stroke).

Effect on line 2, tied to scroll (scrubbed), 3 beats:
1. FILL  — solid ink sweeps across L→R so the outline becomes a solid word.
2. UNFILL— keep scrolling, ink sweeps back out, returning it to empty outline.
3. FADE  — the empty outline fades to 0.

So: outline → fills solid → empties to outline → disappears. It's about the TEXT, not
any 3D object moving. Implement with two stacked copies (outline + clipped solid), clip
inset driven 0→1 by ScrollTrigger scrub, plus an opacity tween at the end.`,
  },
  {
    id: 'word-fill',
    route: '/word-fill',
    num: '3',
    title: 'Word-by-Word Fill + Icon Pops',
    blurb:
      'A sentence fills grey → black left-to-right tied to scroll, with platform icons popping above each keyword.',
    video: 'general animation 1.mp4',
    complexity: 'mod',
    categories: ['Text Effect', 'Scroll-driven'],
    library: 'GSAP ScrollTrigger scrub; per-word spans',
    prompt: `Scroll-driven sentence-highlight, centered.
Sentence: "A web app, Mac app, Windows app, and a wearable to power your personalized AI."

Every word starts light grey; as you scroll, words fill grey→black L→R (scrubbed). When
the fill front reaches each of the 4 platform keywords, a small app icon fades+scales in
above that word and out as the front passes (~one icon visible at a time).

Wrap each word in a span; ScrollTrigger scrub drives 0→1 mapped to how many words are
black, triggering each icon at its threshold. Weight-700+ filled words, white bg.`,
  },
  {
    id: 'sticky-scroller',
    route: '/sticky-scroller',
    num: '4',
    title: 'Sticky Two-Column Feature Scroller',
    blurb:
      'Pinned section: a feature list where one item is active/black, the media panel cross-fades to match.',
    video: '203140.mp4',
    complexity: 'mod',
    categories: ['Cards / Layout', 'Photo / Gallery', 'Scroll-driven'],
    library: 'Aceternity "Sticky Scroll Reveal" / GSAP ScrollTrigger',
    prompt: `Pinned two-column feature section. Left = vertical list of feature names. Right = a
media panel with a caption pill bottom-right. The section pins for its scroll duration.

As you scroll: exactly ONE list item is active (solid black, others grey); the active
item advances and the list gently scrolls to keep it vertically centered; the right
media panel cross-fades to the matching asset and the caption updates. Some assets show
an overlay notification card. Scrub-linked, rounded media panel, white bg.
Library: Aceternity UI "Sticky Scroll Reveal".`,
  },
  {
    id: 'parallax-masonry',
    route: '/parallax-masonry',
    num: '5',
    title: 'Parallax Masonry Image Wall',
    blurb:
      'A multi-column photo grid where each column scrolls at a slightly different speed for a wavy parallax feel.',
    video: '203240.mp4',
    complexity: 'easy',
    categories: ['Photo / Gallery', 'Scroll-driven'],
    library: 'Aceternity "Parallax Scroll" / Locomotive data-scroll-speed',
    prompt: `Multi-column masonry grid of photos (4-7 columns), varied heights, rounded corners,
tight gutters, white bg. Each column scrolls at a slightly different speed (parallax) so
the wall has a wavy/arched feel rather than moving rigidly. Optional slight scale-up as
an image enters center viewport.
Library: Aceternity UI "Parallax Scroll"/"Hero Parallax", or Locomotive data-scroll-speed.`,
  },
  {
    id: 'tablet-tabs',
    route: '/tablet-tabs',
    num: '6',
    title: 'Tablet Mockup + Scroll-Driven Tabs',
    blurb:
      'An iPad that drifts and tilts as you scroll; scroll itself walks through the tabs, each swapping the screen.',
    video: '203429.mp4',
    complexity: 'mod',
    categories: ['Device Mockup', 'Scroll-driven'],
    library: 'GSAP ScrollTrigger scrub (pin) + state-driven screen swap',
    prompt: `Centered tablet/iPad mockup (dark bezel) showing a health-dashboard UI. A floating pill
tab bar below: Home | Services | Action Plan | Data | Doctors, with a dark "active" pill
that slides between tabs. The active tab is driven BY SCROLL (not a timer) — scrolling
walks through the tabs and swaps the tablet screen content to match.

The tablet has lively movement: it floats/drifts (small x/y wander) and tilts in 3D, all
tied to scroll, easing toward flat. Keep the scroll distance SHORT so a little scroll
produces a lot of movement. Heading above fills grey→black as it enters.
Library: Container-scroll tilt + React state for tab/screen swap.`,
  },
  {
    id: 'scattered-cards',
    route: '/scattered-cards',
    num: '7',
    title: 'Scattered Floating Cards + Timeline Rail',
    blurb:
      'Cards scattered at irregular offsets and rotations drift with parallax; a numbered timeline rail runs down the page.',
    video: '203539.mp4',
    complexity: 'mod',
    categories: ['Cards / Layout', 'Photo / Gallery', 'Scroll-driven'],
    library: 'Aceternity "Hero Parallax" + "Timeline"/"Tracing Beam"',
    prompt: `"Scattered card collage": rounded image cards at irregular x/y offsets with small
rotations (-8°..+8°). On scroll they drift with parallax (different depths, different
speeds) and settle. Labels under each. Plus a vertical center timeline rail with numbered
nodes connecting stacked shots, and a monochrome category grid with a corner-bracketed
"JOIN WAITLIST" CTA. White bg, scrub-linked parallax.
Library: Aceternity "Hero Parallax" + "Timeline"/"Tracing Beam".`,
  },
  {
    id: 'serpentine-path',
    route: '/serpentine-path',
    num: '8',
    title: 'Diagonal Glowing Journey Path',
    blurb:
      'On black: a diagonal glowing line you scroll along; big centered milestones light up as the warm glow reaches them.',
    video: '205115.mp4',
    complexity: 'high',
    categories: ['Journey / Timeline', 'Scroll-driven'],
    library: 'Custom — SVG path + stroke-dashoffset trace + ScrollTrigger pan',
    prompt: `Full-bleed black section. A single glowing line winds DIAGONALLY across the screen
(not a straight top-to-bottom column) — it sweeps left-to-right as it descends. Fixed
heading top-center. As you scroll, the camera pans ALONG the path and the traveled
portion glows warm orange with a soft bloom; the untraveled part is thin white.

Big, CENTERED milestone labels (large type) fade/scale in as the glow reaches each one,
with a small target icon and supporting line. Add dynamic touches along the way: drifting
particles/sparks, a pulsing node at the active milestone, faint connecting tick marks.
The path is long — you scroll a while to travel the whole journey.

Theme is a generic JOURNEY (e.g. a customer journey), not a lifespan. Use journey-stage
placeholders. Scrub-linked: scroll drives both the pan and the orange trace
(stroke-dashoffset). Implement with an SVG <path>, animated stroke-dashoffset for the
trace, drop-shadow/blur for the glow, ScrollTrigger for the pan.`,
  },
  {
    id: 'velocity-skew',
    route: '/velocity-skew',
    num: '9',
    title: 'Velocity-Skew Gallery + Page Wipe',
    blurb:
      'A serif-titled gallery that shears with scroll velocity; clicking a project wipes a colored panel across.',
    video: '205901.mp4',
    complexity: 'high',
    categories: ['Photo / Gallery', 'Global / Add-anywhere', 'Scroll-driven'],
    library: 'Lenis + GSAP quickTo skew (Codrops); Framer/Barba transition',
    prompt: `Vertical gallery of large project images, each with a huge serif title overlaid and a
circular "→" hover button. Key effect: images SKEW based on scroll velocity (faster
scroll = more shear, settling flat at rest) for a liquid feel. Dark theme, oversized
serif overlapping imagery. Secondary: clicking a project wipes a solid colored panel
across the screen (page transition).
Library: Lenis smooth scroll + GSAP quickTo velocity skew (Codrops tutorial); transition
via Framer Motion AnimatePresence or Barba.js.`,
  },
  {
    id: 'perspective-flatten',
    route: '/perspective-flatten',
    num: '10',
    title: '3D Calendar Flatten + Hover + Blur→Sharp',
    blurb:
      'A rich weekly calendar starts tilted back & blurred, flattens and sharpens on scroll, then idles with a gentle hover.',
    video: '210026.mp4',
    complexity: 'mod',
    categories: ['Hero / Header', 'Device Mockup', 'Scroll-driven'],
    library: 'Aceternity "Container Scroll" + interpolated blur() + idle float',
    prompt: `Hero with a RICH weekly-calendar product screenshot (Akiflow/Amie style): a 7-day grid
packed with many colorful event blocks (varied pastel colors, varied times), a left todo
sidebar with checklist items, and a small avatar stack on the right. At the top of scroll
the calendar is rotated back in 3D (rotateX) and blurred; as you scroll it rotates flat
(0°), the blur resolves to crisp, and it scales up slightly. Keep the scroll distance
SHORT (lots of movement per scroll). Once flat, it keeps a gentle idle HOVER (slow float
+ micro-tilt). Heading below fills grey→black.
Library: Aceternity "Container Scroll Animation" + filter:blur() on the same progress +
a looping idle-float animation.`,
  },
  {
    id: 'floating-widgets',
    route: '/floating-widgets',
    num: '11',
    title: 'Phone + Scroll-Reactive Floating Cards',
    blurb:
      'A phone mockup ringed by widget cards that fly in and orbit on scroll, and tilt/lift with a springy 3D hover.',
    video: '210108.mp4',
    complexity: 'mod',
    categories: ['Device Mockup', 'Hero / Header', 'Scroll-driven'],
    library: 'GSAP ScrollTrigger entrance + mouse-tilt (Aceternity "3D Card")',
    prompt: `Centered phone mockup (calendar/todo app). Around it float colorful widget cards at
varied positions. On scroll the cards FLY IN from the edges and settle into orbit (a
little scroll → lots of motion), then idle-float. On hover each card tilts/lifts with a
springy 3D effect (mouse-tracking rotateX/Y). A hint reads "hover the cards". Heading
above: line 1 solid black, line 2 grey. Light bg, soft shadows, pastel cards.
Library: GSAP ScrollTrigger for the entrance + mouse-tilt (Aceternity "3D Card Effect").`,
  },
  {
    id: 'device-morph',
    route: '/device-morph',
    num: '12',
    title: 'Device Morph: Phone → TV',
    blurb:
      'A phone mockup whose frame continuously reshapes into a landscape TV as you scroll, screen content swapping midway.',
    video: '210238.mp4',
    complexity: 'high',
    categories: ['Device Mockup', 'Scroll-driven'],
    library: 'Custom — GSAP scrub on width/height/radius',
    prompt: `Centered device mockup that starts as a portrait PHONE showing app screens. On scroll
the FRAME morphs: the phone widens/reshapes into a landscape TV (with stand), and the
screen swaps to a TV streaming UI. Continuous, scrub-linked (aspect ratio, corner radius,
bezel all animate). Clean white bg. Footer easter egg: "No animations were descoped in
the making of this website." Build the frame as an element and animate width/height/
border-radius with GSAP ScrollTrigger scrub; cross-fade screen content at the midpoint.`,
  },
  {
    id: 'deck-zoom',
    route: '/deck-zoom',
    num: '13',
    title: '3D Card-Deck Zoom + Greeting Fill',
    blurb:
      'A fanned 3D deck converges and the camera zooms through into a sky scene; a greeting headline fills word-by-word.',
    video: '210413.mp4',
    complexity: 'high',
    categories: ['Hero / Header', 'Scroll-driven'],
    library: 'GSAP 3D transforms + Magic UI "Text Reveal"',
    prompt: `Beat 1: a deck of ~5 app screenshots fanned in 3D (overlapping, rotated on Y). On scroll
the deck converges and the camera zooms THROUGH it into a single screen that expands to a
full-bleed sky gradient (blue→peach). Beat 2: over the sky, a greeting fills word-by-word
grey→white with inline emoji/app icons; soft 3D blobs drift; an email card slides up.
Scrub-linked deck zoom; word-fill tied to scroll.
Library: GSAP 3D transforms; word-fill = Magic UI "Text Reveal".`,
  },
  {
    id: 'deck-zoom-v2',
    route: '/deck-zoom-v2',
    num: '13',
    title: 'Deck Zoom — Dark Aurora Variant',
    blurb:
      'Same zoom-through-the-deck, but the deck spirals as it converges and resolves into a dark aurora scene.',
    video: '210413.mp4',
    complexity: 'high',
    variantOf: 'deck-zoom',
    variantLabel: 'v2',
    categories: ['Hero / Header', 'Scroll-driven'],
    library: 'GSAP 3D transforms + Magic UI "Text Reveal"',
    prompt: `Variant of the deck-zoom. Same core (deck converges + camera zooms through into a scene
+ word-by-word greeting fill), but: the deck cards SPIRAL/rotate as they converge (add a
rotateZ wind-up), and the destination scene is a DARK aurora gradient (deep indigo →
teal → violet) with drifting aurora bands instead of a daytime sky. Greeting fills
grey→white. Use this when you want a nighttime / premium-dark hero instead of the airy
daytime one.`,
  },

  // ---------- Global / add-anywhere building blocks ----------
  {
    id: 'magnetic-button',
    route: '/magnetic-button',
    num: 'G1',
    title: 'Magnetic Buttons',
    blurb:
      'Buttons (and their labels) that magnetically lean toward the cursor and snap back — droppable on any page.',
    video: '—',
    complexity: 'easy',
    categories: ['Global / Add-anywhere'],
    library: 'GSAP quickTo (mouse-follow) — pure, no scroll',
    prompt: `Build a reusable "magnetic button": on mouse-move within a small radius around the
button, the button (and optionally its label, slightly more) translates toward the cursor
by a fraction of the offset; on mouse-leave it springs back to center. Use GSAP quickTo
for smooth follow. No scroll involved — this is a global interaction you can drop on any
CTA. Provide a few sizes/variants (solid, outline, icon).`,
  },
  {
    id: 'page-transition',
    route: '/page-transition',
    num: 'G2',
    title: 'Page-Transition Wipes',
    blurb:
      'Full-screen colored panels that wipe across on navigation — a global transition you can wrap any route in.',
    video: '—',
    complexity: 'mod',
    categories: ['Global / Add-anywhere'],
    library: 'Framer Motion AnimatePresence / GSAP timeline overlay',
    prompt: `Build a reusable full-page transition: on navigation, one or more solid colored panels
sweep across the viewport to cover the screen, the new content mounts behind, then the
panels sweep off the other side to reveal it. Offer 2-3 styles (single wipe, stacked
multi-panel stagger, center-split). Wrap your router so every route change plays it.
Library: Framer Motion AnimatePresence, or a GSAP timeline over a fixed overlay.`,
  },

  // ---------- mobile / device-motion (original) ----------
  {
    id: 'gyro-parallax',
    route: '/gyro-parallax',
    num: 'M1',
    title: 'Gyroscope Parallax Scene',
    blurb: 'Layered scene that shifts with the phone’s tilt (deviceorientation), mouse-move on desktop.',
    video: '—',
    complexity: 'mod',
    source: 'original',
    platform: 'mobile',
    categories: ['Motion / Device', 'Hero / Header'],
    library: 'deviceorientation API + mouse fallback (iOS 13 permission)',
    prompt: `Build a layered parallax hero driven by DEVICE TILT. Stack 3-4 absolutely-positioned
layers (sky, hills, mid sparkles, foreground). Listen to the deviceorientation event
(gamma = left/right, beta = front/back), normalize to -1..1, and translate each layer by
offset * depth (deeper layers move more). On desktop fall back to mousemove. iOS 13+
requires DeviceOrientationEvent.requestPermission() from a tap — show an "Enable motion"
button when that API exists.`,
  },
  {
    id: 'tilt-shimmer',
    route: '/tilt-shimmer',
    num: 'M2',
    title: 'Holographic Tilt Card',
    blurb: 'A card that tilts in 3D and whose holographic sheen tracks the device’s orientation.',
    video: '—',
    complexity: 'mod',
    source: 'original',
    platform: 'mobile',
    categories: ['Motion / Device', 'Cards / Layout'],
    library: 'deviceorientation + CSS conic-gradient sheen (mouse fallback)',
    prompt: `A holographic membership card. rotateX/rotateY follow device tilt (beta/gamma) or the
mouse. A conic/radial gradient "sheen" layer (mix-blend-mode: color-dodge) has its center
(--sx/--sy) driven by the same tilt so the rainbow sheen slides as you move the phone.
iOS 13+ permission button as above.`,
  },

  // ============================================================
  // EXTERNAL — curated open-source effects from other creators.
  // The 'live:true' ones are clean REIMPLEMENTATIONS you can SEE (live preview) and copy
  // (real source file shown under "View code"). The 'live:false' ones are libraries you
  // install — shown with real install/usage code + a link. All attributed to their source.
  // ============================================================
  { id: 'ext-spotlight', num: '↗', source: 'external', live: true, ext: 'spotlight', route: '/x/spotlight',
    title: 'Spotlight', author: 'Aceternity UI', sourceUrl: 'https://ui.aceternity.com',
    blurb: 'A soft radial glow that follows the cursor across a dark hero.',
    complexity: 'easy', platform: 'desktop', categories: ['Hero / Header'],
    library: 'Reimplementation · CSS radial-gradient + mousemove' },
  { id: 'ext-3dcard', num: '↗', source: 'external', live: true, ext: 'three-d-card', route: '/x/three-d-card',
    title: '3D Card Effect', author: 'Aceternity UI', sourceUrl: 'https://ui.aceternity.com',
    blurb: 'Card tilts toward the cursor; inner layers lift on the Z axis.',
    complexity: 'mod', platform: 'desktop', categories: ['Cards / Layout'],
    library: 'Reimplementation · perspective + rotateX/Y' },
  { id: 'ext-textgen', num: '↗', source: 'external', live: true, ext: 'text-generate', route: '/x/text-generate',
    title: 'Text Generate Effect', author: 'Aceternity UI', sourceUrl: 'https://ui.aceternity.com',
    blurb: 'Headline words fade + rise in sequence on mount.',
    complexity: 'easy', platform: 'any', categories: ['Text Effect'],
    library: 'Reimplementation · staggered CSS animation' },
  { id: 'ext-lamp', num: '↗', source: 'external', live: true, ext: 'lamp', route: '/x/lamp',
    title: 'Lamp Effect', author: 'Aceternity UI', sourceUrl: 'https://ui.aceternity.com',
    blurb: 'A conic “lamp” glow that blooms behind a heading.',
    complexity: 'mod', platform: 'desktop', categories: ['Hero / Header'],
    library: 'Reimplementation · conic-gradient + blur' },
  { id: 'ext-meteors', num: '↗', source: 'external', live: true, ext: 'meteors', route: '/x/meteors',
    title: 'Meteors', author: 'Magic UI', sourceUrl: 'https://magicui.design',
    blurb: 'Streaking meteors falling diagonally across a dark hero.',
    complexity: 'easy', platform: 'desktop', categories: ['Hero / Header'],
    library: 'Reimplementation · CSS keyframes' },
  { id: 'ext-borderbeam', num: '↗', source: 'external', live: true, ext: 'border-beam', route: '/x/border-beam',
    title: 'Border Beam', author: 'Magic UI', sourceUrl: 'https://magicui.design',
    blurb: 'A light that travels around an element’s border.',
    complexity: 'mod', platform: 'any', categories: ['Global / Add-anywhere'],
    library: 'Reimplementation · conic-gradient spin' },
  { id: 'ext-shimmer', num: '↗', source: 'external', live: true, ext: 'shimmer-button', route: '/x/shimmer-button',
    title: 'Shimmer Button', author: 'Magic UI', sourceUrl: 'https://magicui.design',
    blurb: 'A sheen of light sweeps across the button surface.',
    complexity: 'easy', platform: 'any', categories: ['Global / Add-anywhere'],
    library: 'Reimplementation · CSS sweep' },
  { id: 'ext-marquee', num: '↗', source: 'external', live: true, ext: 'marquee', route: '/x/marquee',
    title: 'Marquee', author: 'Magic UI', sourceUrl: 'https://magicui.design',
    blurb: 'Seamless infinite scrolling row, pauses on hover.',
    complexity: 'easy', platform: 'any', categories: ['Global / Add-anywhere', 'Photo / Gallery'],
    library: 'Reimplementation · duplicated track + translateX' },
  { id: 'ext-ticker', num: '↗', source: 'external', live: true, ext: 'number-ticker', route: '/x/number-ticker',
    title: 'Number Ticker', author: 'Magic UI', sourceUrl: 'https://magicui.design',
    blurb: 'Numbers count up to their target with easing.',
    complexity: 'easy', platform: 'any', categories: ['Text Effect'],
    library: 'Reimplementation · requestAnimationFrame' },
  { id: 'ext-ripple', num: '↗', source: 'external', live: true, ext: 'ripple', route: '/x/ripple',
    title: 'Ripple', author: 'Magic UI', sourceUrl: 'https://magicui.design',
    blurb: 'Concentric rings expanding from a center point.',
    complexity: 'easy', platform: 'any', categories: ['Hero / Header'],
    library: 'Reimplementation · CSS keyframes' },
  { id: 'ext-blurtext', num: '↗', source: 'external', live: true, ext: 'blur-text', route: '/x/blur-text',
    title: 'Blur Text', author: 'React Bits', sourceUrl: 'https://reactbits.dev',
    blurb: 'Words animate from blurred + offset to sharp, one after another.',
    complexity: 'easy', platform: 'any', categories: ['Text Effect'],
    library: 'Reimplementation · per-word CSS animation' },
  { id: 'ext-magnet', num: '↗', source: 'external', live: true, ext: 'magnet', route: '/x/magnet',
    title: 'Magnet', author: 'React Bits', sourceUrl: 'https://reactbits.dev',
    blurb: 'An element pulled toward the cursor, springs back on leave.',
    complexity: 'easy', platform: 'desktop', categories: ['Global / Add-anywhere'],
    library: 'Reimplementation · transform follow + spring' },
  { id: 'ext-clickspark', num: '↗', source: 'external', live: true, ext: 'click-spark', route: '/x/click-spark',
    title: 'Click Spark', author: 'React Bits', sourceUrl: 'https://reactbits.dev',
    blurb: 'A burst of little sparks radiates from each click.',
    complexity: 'easy', platform: 'any', categories: ['Global / Add-anywhere'],
    library: 'Reimplementation · WAAPI burst' },
  { id: 'ext-aurora', num: '↗', source: 'external', live: true, ext: 'aurora', route: '/x/aurora',
    title: 'Aurora', author: 'React Bits', sourceUrl: 'https://reactbits.dev',
    blurb: 'Soft animated aurora ribbons as a full-bleed background.',
    complexity: 'mod', platform: 'any', categories: ['Hero / Header'],
    library: 'Reimplementation · blurred animated gradients' },
  { id: 'ext-starborder', num: '↗', source: 'external', live: true, ext: 'star-border', route: '/x/star-border',
    title: 'Star Border', author: 'React Bits', sourceUrl: 'https://reactbits.dev',
    blurb: 'A glowing star sweeps around a button’s border.',
    complexity: 'easy', platform: 'any', categories: ['Global / Add-anywhere'],
    library: 'Reimplementation · conic-gradient spin' },
  { id: 'ext-tilt', num: '↗', source: 'external', live: true, ext: 'tilt-glare', route: '/x/tilt-glare',
    title: 'Tilt + Glare', author: 'vanilla-tilt.js', sourceUrl: 'https://micku7zu.github.io/vanilla-tilt.js/',
    blurb: 'Smooth 3D tilt with a moving glare highlight (gyroscope-ready).',
    complexity: 'easy', platform: 'any', categories: ['Motion / Device', 'Cards / Layout'],
    library: 'Reimplementation · pointer-driven rotate + glare' },
  { id: 'ext-reveal', num: '↗', source: 'external', live: true, ext: 'scroll-reveal', route: '/x/scroll-reveal',
    title: 'On-Scroll Reveal', author: 'Codrops', sourceUrl: 'https://tympanus.net/codrops',
    blurb: 'Blocks fade/slide in as they enter the viewport (no library).',
    complexity: 'easy', platform: 'any', categories: ['Scroll-driven'],
    library: 'Reimplementation · IntersectionObserver' },

  // ---- libraries you install (real usage code + link; not a discrete visual to "preview") ----
  { id: 'ext-gsap-scrolltrigger', num: '↗', source: 'external', live: false,
    title: 'ScrollTrigger Pin + Scrub', author: 'GSAP (GreenSock)', sourceUrl: 'https://gsap.com',
    blurb: 'The core scroll-driven primitive — pin a section, scrub a timeline by scroll. Install GSAP.',
    complexity: 'mod', platform: 'any', categories: ['Scroll-driven'], library: 'Library · npm i gsap',
    code: [{ file: 'pin.js', content: `gsap.registerPlugin(ScrollTrigger)
gsap.timeline({
  scrollTrigger: { trigger: '.section', start: 'top top', end: '+=1500', pin: true, scrub: true }
}).to('.box', { x: 400, rotate: 90, ease: 'none' })` }] },
  { id: 'ext-gsap-splittext', num: '↗', source: 'external', live: false,
    title: 'SplitText Reveal', author: 'GSAP (GreenSock)', sourceUrl: 'https://gsap.com',
    blurb: 'Split a heading into chars/words and stagger them in. SplitText is now free.',
    complexity: 'easy', platform: 'any', categories: ['Text Effect'], library: 'Library · npm i gsap',
    code: [{ file: 'split.js', content: `const split = new SplitText('.title', { type: 'chars' })
gsap.from(split.chars, { yPercent: 100, opacity: 0, stagger: 0.02, ease: 'back.out(2)' })` }] },
  { id: 'ext-gsap-flip', num: '↗', source: 'external', live: false,
    title: 'Flip (layout animation)', author: 'GSAP (GreenSock)', sourceUrl: 'https://gsap.com',
    blurb: 'Animate elements smoothly between two layout states (grid ↔ list).',
    complexity: 'mod', platform: 'any', categories: ['Cards / Layout'], library: 'Library · npm i gsap',
    code: [{ file: 'flip.js', content: `const state = Flip.getState('.card')
container.classList.toggle('list-view')
Flip.from(state, { duration: 0.6, ease: 'power2.inOut', stagger: 0.04 })` }] },
  { id: 'ext-lenis', num: '↗', source: 'external', live: false,
    title: 'Lenis Smooth Scroll', author: 'darkroom.engineering', sourceUrl: 'https://lenis.dev',
    blurb: 'Industry-standard buttery momentum scrolling (3KB). Global behavior — pairs with ScrollTrigger.',
    complexity: 'easy', platform: 'any', categories: ['Scroll-driven', 'Global / Add-anywhere'], library: 'Library · npm i lenis',
    code: [{ file: 'lenis.js', content: `import Lenis from 'lenis'
const lenis = new Lenis({ lerp: 0.1, smoothWheel: true })
function raf(t){ lenis.raf(t); requestAnimationFrame(raf) }
requestAnimationFrame(raf)` }] },
  { id: 'ext-react-parallax-tilt', num: '↗', source: 'external', live: false,
    title: 'react-parallax-tilt', author: 'mkosir', sourceUrl: 'https://www.npmjs.com/package/react-parallax-tilt',
    blurb: 'React tilt/glare/parallax component with a gyroscope option for mobile.',
    complexity: 'easy', platform: 'mobile', categories: ['Motion / Device'], library: 'Library · npm i react-parallax-tilt',
    code: [{ file: 'Tilt.jsx', content: `import Tilt from 'react-parallax-tilt'
<Tilt gyroscope tiltMaxAngleX={20} tiltMaxAngleY={20} glareEnable>
  <div className="card">Tilts on hover AND device orientation</div>
</Tilt>` }] },
  { id: 'ext-parallax-js', num: '↗', source: 'external', live: false,
    title: 'parallax.js', author: 'Matthew Wagerfield', sourceUrl: 'https://matthew.wagerfield.com/parallax/',
    blurb: 'Layered parallax that reacts to device orientation, falling back to the cursor.',
    complexity: 'easy', platform: 'mobile', categories: ['Motion / Device', 'Hero / Header'], library: 'Library · github.com/wagerfield/parallax',
    code: [{ file: 'parallax.html', content: `<ul class="scene">
  <li class="layer" data-depth="0.2">...</li>
  <li class="layer" data-depth="0.6">...</li>
</ul>
<script>new Parallax(document.querySelector('.scene'))</script>` }] },
  { id: 'ext-splitting', num: '↗', source: 'external', live: false,
    title: 'Splitting.js', author: 'Splitting.js', sourceUrl: 'https://splitting.js.org',
    blurb: 'Splits text into chars/words/lines with CSS vars for index-based stagger.',
    complexity: 'easy', platform: 'any', categories: ['Text Effect'], library: 'Library · npm i splitting',
    code: [{ file: 'splitting.js', content: `Splitting()  // adds .char spans + --char-index CSS vars
/* .char { animation: rise .5s calc(var(--char-index) * 40ms) both } */` }] },
  { id: 'ext-framer-layout', num: '↗', source: 'external', live: false,
    title: 'Shared Layout Animation', author: 'Motion (Framer Motion)', sourceUrl: 'https://motion.dev',
    blurb: 'Magic-move elements between states/positions with a shared layoutId.',
    complexity: 'mod', platform: 'any', categories: ['Cards / Layout'], library: 'Library · npm i motion',
    code: [{ file: 'layout.jsx', content: `import { motion } from 'framer-motion'
{items.map(i => <motion.div key={i.id} layout layoutId={i.id} />)}
// share a layoutId between a card and its detail view to morph between them` }] },
]

export const byId = Object.fromEntries(demos.map((d) => [d.id, d]))
