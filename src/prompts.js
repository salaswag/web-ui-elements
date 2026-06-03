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
  // Marked source:'external' (teal accent + "External" tag), code-only (no live route).
  // Code snippets are minimal ILLUSTRATIVE implementations — see each source for the real,
  // full component. Links are to the project home; verify before shipping.
  // ============================================================
  {
    id: 'ext-aceternity-3dcard', num: '↗', source: 'external', live: false,
    title: '3D Card Effect', author: 'Aceternity UI', sourceUrl: 'https://ui.aceternity.com',
    blurb: 'Card that tilts in 3D toward the cursor, children lift on the Z axis.',
    complexity: 'mod', platform: 'desktop', categories: ['Cards / Layout'],
    code: [{ file: 'ThreeDCard.jsx', content: `// Illustrative — full version: ui.aceternity.com (Framer Motion)
function ThreeDCard({ children }) {
  const ref = useRef(null)
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    ref.current.style.transform =
      \`rotateY(\${x * 16}deg) rotateX(\${-y * 16}deg)\`
  }
  return (
    <div style={{ perspective: 1000 }} onMouseMove={onMove}
         onMouseLeave={() => (ref.current.style.transform = '')}>
      <div ref={ref} style={{ transition: 'transform .15s', transformStyle: 'preserve-3d' }}>
        {children}
      </div>
    </div>
  )
}` }],
  },
  {
    id: 'ext-aceternity-spotlight', num: '↗', source: 'external', live: false,
    title: 'Spotlight', author: 'Aceternity UI', sourceUrl: 'https://ui.aceternity.com',
    blurb: 'A soft radial spotlight that follows the cursor across a dark hero.',
    complexity: 'easy', platform: 'desktop', categories: ['Hero / Header'],
    code: [{ file: 'spotlight.css', content: `/* Illustrative — see ui.aceternity.com */
.spotlight { position: relative; background: #0b0b12; overflow: hidden; }
.spotlight::before {
  content: ''; position: absolute; inset: 0;
  background: radial-gradient(400px circle at var(--mx) var(--my),
    rgba(124,58,237,.25), transparent 60%);
}
/* JS: el.style.setProperty('--mx', e.clientX+'px') on mousemove */` }],
  },
  {
    id: 'ext-aceternity-beams', num: '↗', source: 'external', live: false,
    title: 'Background Beams', author: 'Aceternity UI', sourceUrl: 'https://ui.aceternity.com',
    blurb: 'Animated gradient SVG beams sweeping behind hero content.',
    complexity: 'mod', platform: 'desktop', categories: ['Hero / Header'],
    code: [{ file: 'Beams.jsx', content: `// Illustrative — see ui.aceternity.com (animated SVG paths)
const Beams = () => (
  <svg className="beams" width="100%" height="100%">
    {Array.from({ length: 12 }).map((_, i) => (
      <path key={i} d={\`M\${i*80} 0 Q\${i*80+40} 300 \${i*80} 600\`}
        stroke="url(#g)" fill="none" strokeWidth="1">
        <animate attributeName="stroke-dashoffset" values="200;0" dur="3s" repeatCount="indefinite"/>
      </path>
    ))}
  </svg>
)` }],
  },
  {
    id: 'ext-aceternity-textgen', num: '↗', source: 'external', live: false,
    title: 'Text Generate Effect', author: 'Aceternity UI', sourceUrl: 'https://ui.aceternity.com',
    blurb: 'Headline words fade + blur in one after another on mount.',
    complexity: 'easy', platform: 'any', categories: ['Text Effect'],
    code: [{ file: 'TextGenerate.jsx', content: `// Illustrative — see ui.aceternity.com (Framer Motion stagger)
import { motion } from 'framer-motion'
const TextGenerate = ({ text }) => (
  <p>{text.split(' ').map((w, i) => (
    <motion.span key={i} initial={{ opacity: 0, filter: 'blur(8px)' }}
      animate={{ opacity: 1, filter: 'blur(0)' }} transition={{ delay: i * 0.08 }}>
      {w}{' '}
    </motion.span>
  ))}</p>
)` }],
  },
  {
    id: 'ext-aceternity-movingcards', num: '↗', source: 'external', live: false,
    title: 'Infinite Moving Cards', author: 'Aceternity UI', sourceUrl: 'https://ui.aceternity.com',
    blurb: 'A seamless looping marquee of testimonial cards.',
    complexity: 'easy', platform: 'any', categories: ['Photo / Gallery', 'Global / Add-anywhere'],
    code: [{ file: 'marquee.css', content: `/* Illustrative — duplicate the track for a seamless loop */
.track { display: flex; gap: 16px; width: max-content; animation: scroll 30s linear infinite; }
@keyframes scroll { to { transform: translateX(-50%); } }
/* render items twice inside .track */` }],
  },
  {
    id: 'ext-aceternity-lamp', num: '↗', source: 'external', live: false,
    title: 'Lamp Effect', author: 'Aceternity UI', sourceUrl: 'https://ui.aceternity.com',
    blurb: 'A conic “lamp” glow that blooms behind a heading.',
    complexity: 'mod', platform: 'desktop', categories: ['Hero / Header'],
    code: [{ file: 'lamp.css', content: `/* Illustrative — see ui.aceternity.com */
.lamp { background: conic-gradient(from 90deg at 50% 0,
  transparent, rgba(124,58,237,.7), transparent); filter: blur(40px); height: 220px; }` }],
  },
  {
    id: 'ext-magicui-marquee', num: '↗', source: 'external', live: false,
    title: 'Marquee', author: 'Magic UI', sourceUrl: 'https://magicui.design',
    blurb: 'Configurable horizontal/vertical infinite marquee with pause-on-hover.',
    complexity: 'easy', platform: 'any', categories: ['Global / Add-anywhere'],
    code: [{ file: 'Marquee.jsx', content: `// Illustrative — see magicui.design
const Marquee = ({ children }) => (
  <div className="mq" style={{ overflow: 'hidden' }}>
    <div className="mq-row">{children}{children}</div>
  </div>
)
/* .mq-row { display:flex; animation: mq 20s linear infinite }
   .mq:hover .mq-row { animation-play-state: paused }
   @keyframes mq { to { transform: translateX(-50%) } } */` }],
  },
  {
    id: 'ext-magicui-borderbeam', num: '↗', source: 'external', live: false,
    title: 'Border Beam', author: 'Magic UI', sourceUrl: 'https://magicui.design',
    blurb: 'A light beam that travels around an element’s border.',
    complexity: 'mod', platform: 'any', categories: ['Global / Add-anywhere'],
    code: [{ file: 'border-beam.css', content: `/* Illustrative — see magicui.design (uses offset-path) */
.beam { position: absolute; inset: 0; border-radius: inherit; }
.beam::after { content:''; position:absolute; width:40px; height:40px;
  background: radial-gradient(circle, #7c3aed, transparent 60%);
  offset-path: rect(0 100% 100% 0 round 16px); animation: beam 4s linear infinite; }
@keyframes beam { to { offset-distance: 100%; } }` }],
  },
  {
    id: 'ext-magicui-shimmer', num: '↗', source: 'external', live: false,
    title: 'Shimmer Button', author: 'Magic UI', sourceUrl: 'https://magicui.design',
    blurb: 'A button with a shimmering light sweeping across its surface.',
    complexity: 'easy', platform: 'any', categories: ['Global / Add-anywhere'],
    code: [{ file: 'shimmer.css', content: `/* Illustrative — see magicui.design */
.shimmer { position: relative; overflow: hidden; }
.shimmer::before { content:''; position:absolute; inset:0;
  background: linear-gradient(110deg, transparent 30%, rgba(255,255,255,.6), transparent 70%);
  transform: translateX(-100%); animation: shimmer 2.5s infinite; }
@keyframes shimmer { to { transform: translateX(100%); } }` }],
  },
  {
    id: 'ext-magicui-animbeam', num: '↗', source: 'external', live: false,
    title: 'Animated Beam', author: 'Magic UI', sourceUrl: 'https://magicui.design',
    blurb: 'An SVG beam connecting two nodes with a moving gradient (integration diagrams).',
    complexity: 'mod', platform: 'desktop', categories: ['Cards / Layout'],
    code: [{ file: 'AnimatedBeam.jsx', content: `// Illustrative — see magicui.design (measures node positions, draws an SVG path)
// <svg><path d={curveBetween(fromRect, toRect)} stroke="url(#grad)" />
//   <linearGradient id="grad"><animate .../></linearGradient></svg>` }],
  },
  {
    id: 'ext-magicui-meteors', num: '↗', source: 'external', live: false,
    title: 'Meteors', author: 'Magic UI', sourceUrl: 'https://magicui.design',
    blurb: 'Streaking meteors falling diagonally across a hero.',
    complexity: 'easy', platform: 'desktop', categories: ['Hero / Header'],
    code: [{ file: 'meteors.css', content: `/* Illustrative — see magicui.design */
.meteor { position:absolute; width:2px; height:2px; background:#fff; border-radius:50%;
  box-shadow:0 0 0 1px rgba(255,255,255,.1); animation: fall linear infinite; }
.meteor::after { content:''; position:absolute; width:60px; height:1px;
  background: linear-gradient(90deg,#fff, transparent); }
@keyframes fall { to { transform: translate(-300px, 300px); opacity:0; } }` }],
  },
  {
    id: 'ext-magicui-ticker', num: '↗', source: 'external', live: false,
    title: 'Number Ticker', author: 'Magic UI', sourceUrl: 'https://magicui.design',
    blurb: 'A number that counts up to its target when scrolled into view.',
    complexity: 'easy', platform: 'any', categories: ['Text Effect'],
    code: [{ file: 'NumberTicker.jsx', content: `// Illustrative — see magicui.design (uses spring + IntersectionObserver)
function NumberTicker({ to }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    let raf, start
    const step = (t) => { start ??= t; const p = Math.min((t - start) / 1200, 1)
      setN(Math.floor(p * to)); if (p < 1) raf = requestAnimationFrame(step) }
    raf = requestAnimationFrame(step); return () => cancelAnimationFrame(raf)
  }, [to])
  return <span>{n.toLocaleString()}</span>
}` }],
  },
  {
    id: 'ext-magicui-ripple', num: '↗', source: 'external', live: false,
    title: 'Ripple', author: 'Magic UI', sourceUrl: 'https://magicui.design',
    blurb: 'Concentric expanding rings radiating from a center point.',
    complexity: 'easy', platform: 'any', categories: ['Hero / Header'],
    code: [{ file: 'ripple.css', content: `/* Illustrative — see magicui.design */
.ripple span { position:absolute; border:1px solid rgba(124,58,237,.3); border-radius:50%;
  inset:0; margin:auto; animation: ripple 3s ease-out infinite; }
.ripple span:nth-child(2){ animation-delay:.6s } .ripple span:nth-child(3){ animation-delay:1.2s }
@keyframes ripple { from{ width:0;height:0;opacity:.8 } to{ width:600px;height:600px;opacity:0 } }` }],
  },
  {
    id: 'ext-reactbits-splash', num: '↗', source: 'external', live: false,
    title: 'Splash Cursor', author: 'React Bits', sourceUrl: 'https://reactbits.dev',
    blurb: 'A fluid, liquid trail that follows the cursor (WebGL).',
    complexity: 'high', platform: 'desktop', categories: ['Global / Add-anywhere'],
    code: [{ file: 'note.md', content: `Illustrative note — full WebGL fluid sim at reactbits.dev (SplashCursor).
It renders a fluid simulation to a canvas and advects dye based on pointer velocity.
Copy the component from React Bits; it's ~1 file but shader-heavy.` }],
  },
  {
    id: 'ext-reactbits-blurtext', num: '↗', source: 'external', live: false,
    title: 'Blur Text', author: 'React Bits', sourceUrl: 'https://reactbits.dev',
    blurb: 'Words animate from blurred + offset to sharp, word by word.',
    complexity: 'easy', platform: 'any', categories: ['Text Effect'],
    code: [{ file: 'BlurText.jsx', content: `// Illustrative — see reactbits.dev
const BlurText = ({ text }) => text.split(' ').map((w, i) => (
  <span key={i} style={{ display:'inline-block', animation:\`blurin .6s \${i*0.08}s both\` }}>{w}&nbsp;</span>
))
/* @keyframes blurin { from{ filter:blur(8px); opacity:0; transform:translateY(8px) } } */` }],
  },
  {
    id: 'ext-reactbits-aurora', num: '↗', source: 'external', live: false,
    title: 'Aurora', author: 'React Bits', sourceUrl: 'https://reactbits.dev',
    blurb: 'Soft animated aurora ribbons as a full-bleed background.',
    complexity: 'mod', platform: 'any', categories: ['Hero / Header'],
    code: [{ file: 'aurora.css', content: `/* Illustrative — see reactbits.dev (often a shader; CSS approximation) */
.aurora { background: linear-gradient(120deg,#5eead4,#818cf8,#c084fc); filter: blur(60px);
  background-size: 200% 200%; animation: aurora 12s ease infinite; }
@keyframes aurora { 0%,100%{ background-position:0 50% } 50%{ background-position:100% 50% } }` }],
  },
  {
    id: 'ext-reactbits-magnet', num: '↗', source: 'external', live: false,
    title: 'Magnet', author: 'React Bits', sourceUrl: 'https://reactbits.dev',
    blurb: 'Wraps any element so it’s pulled toward the cursor within a radius.',
    complexity: 'easy', platform: 'desktop', categories: ['Global / Add-anywhere'],
    code: [{ file: 'Magnet.jsx', content: `// Illustrative — see reactbits.dev (compare to our /magnetic-button)
const Magnet = ({ children, strength = 0.4 }) => {
  const ref = useRef(null)
  const move = (e) => { const r = ref.current.getBoundingClientRect()
    ref.current.style.transform = \`translate(\${(e.clientX-r.left-r.width/2)*strength}px,
      \${(e.clientY-r.top-r.height/2)*strength}px)\` }
  return <span ref={ref} onMouseMove={move}
    onMouseLeave={() => (ref.current.style.transform='')}>{children}</span>
}` }],
  },
  {
    id: 'ext-reactbits-clickspark', num: '↗', source: 'external', live: false,
    title: 'Click Spark', author: 'React Bits', sourceUrl: 'https://reactbits.dev',
    blurb: 'A burst of little sparks radiates from each click.',
    complexity: 'easy', platform: 'any', categories: ['Global / Add-anywhere'],
    code: [{ file: 'note.md', content: `Illustrative — see reactbits.dev (ClickSpark).
On click, draw N short lines from the point outward on a canvas, animating length+opacity to 0.` }],
  },
  {
    id: 'ext-reactbits-starborder', num: '↗', source: 'external', live: false,
    title: 'Star Border', author: 'React Bits', sourceUrl: 'https://reactbits.dev',
    blurb: 'A button/box with a glowing star sweeping around the border.',
    complexity: 'easy', platform: 'any', categories: ['Global / Add-anywhere'],
    code: [{ file: 'star-border.css', content: `/* Illustrative — see reactbits.dev */
.star-border { position:relative; border-radius:14px; background:#0b0b12; }
.star-border::before { content:''; position:absolute; inset:-2px; border-radius:inherit;
  background: conic-gradient(from 0deg,#7c3aed,transparent 25%); animation: spin 3s linear infinite; z-index:-1; }
@keyframes spin { to { transform: rotate(360deg); } }` }],
  },
  {
    id: 'ext-gsap-scrolltrigger', num: '↗', source: 'external', live: false,
    title: 'ScrollTrigger Pin + Scrub', author: 'GSAP (GreenSock)', sourceUrl: 'https://gsap.com',
    blurb: 'The core scroll-driven primitive: pin a section and scrub a timeline by scroll.',
    complexity: 'mod', platform: 'any', categories: ['Scroll-driven'],
    code: [{ file: 'pin.js', content: `// docs: gsap.com/docs/v3/Plugins/ScrollTrigger — free since Webflow acquisition
gsap.registerPlugin(ScrollTrigger)
gsap.timeline({
  scrollTrigger: { trigger: '.section', start: 'top top', end: '+=1500', pin: true, scrub: true }
}).to('.box', { x: 400, rotate: 90, ease: 'none' })` }],
  },
  {
    id: 'ext-gsap-splittext', num: '↗', source: 'external', live: false,
    title: 'SplitText Reveal', author: 'GSAP (GreenSock)', sourceUrl: 'https://gsap.com',
    blurb: 'Split a heading into chars/words and stagger them in (SplitText is now free).',
    complexity: 'easy', platform: 'any', categories: ['Text Effect'],
    code: [{ file: 'split.js', content: `// docs: gsap.com/docs/v3/Plugins/SplitText
const split = new SplitText('.title', { type: 'chars' })
gsap.from(split.chars, { yPercent: 100, opacity: 0, stagger: 0.02, ease: 'back.out(2)' })` }],
  },
  {
    id: 'ext-gsap-flip', num: '↗', source: 'external', live: false,
    title: 'Flip (layout animation)', author: 'GSAP (GreenSock)', sourceUrl: 'https://gsap.com',
    blurb: 'Animate elements smoothly between two layout states (grid ↔ list, etc.).',
    complexity: 'mod', platform: 'any', categories: ['Cards / Layout'],
    code: [{ file: 'flip.js', content: `// docs: gsap.com/docs/v3/Plugins/Flip
const state = Flip.getState('.card')
container.classList.toggle('list-view')   // mutate the DOM/layout
Flip.from(state, { duration: 0.6, ease: 'power2.inOut', stagger: 0.04 })` }],
  },
  {
    id: 'ext-lenis', num: '↗', source: 'external', live: false,
    title: 'Lenis Smooth Scroll', author: 'darkroom.engineering', sourceUrl: 'https://lenis.dev',
    blurb: 'The 2026 industry-standard buttery momentum scrolling (3KB). Pairs with ScrollTrigger.',
    complexity: 'easy', platform: 'any', categories: ['Scroll-driven', 'Global / Add-anywhere'],
    code: [{ file: 'lenis.js', content: `// npm i lenis — github.com/darkroomengineering/lenis
import Lenis from 'lenis'
const lenis = new Lenis({ lerp: 0.1, smoothWheel: true })
function raf(t){ lenis.raf(t); requestAnimationFrame(raf) }
requestAnimationFrame(raf)` }],
  },
  {
    id: 'ext-codrops-reveal', num: '↗', source: 'external', live: false,
    title: 'On-Scroll Reveal', author: 'Codrops', sourceUrl: 'https://tympanus.net/codrops',
    blurb: 'Lightweight reveal-on-enter with IntersectionObserver (no library).',
    complexity: 'easy', platform: 'any', categories: ['Scroll-driven'],
    code: [{ file: 'reveal.js', content: `// pattern popularized by Codrops tutorials
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => e.isIntersecting && e.target.classList.add('in'))
}, { threshold: 0.2 })
document.querySelectorAll('.reveal').forEach(el => io.observe(el))
/* .reveal{opacity:0;transform:translateY(24px);transition:.6s} .reveal.in{opacity:1;transform:none} */` }],
  },
  {
    id: 'ext-codrops-imagetrail', num: '↗', source: 'external', live: false,
    title: 'Image Trail', author: 'Codrops', sourceUrl: 'https://tympanus.net/codrops',
    blurb: 'A trail of images that spawns and fades following the cursor.',
    complexity: 'high', platform: 'desktop', categories: ['Photo / Gallery'],
    code: [{ file: 'note.md', content: `Illustrative — search "Codrops image trail effect" (tympanus.net/codrops).
On mousemove past a distance threshold, show the next image at the pointer, animate scale/opacity, recycle a pool.` }],
  },
  {
    id: 'ext-vanilla-tilt', num: '↗', source: 'external', live: false,
    title: 'vanilla-tilt.js', author: 'micku7zu', sourceUrl: 'https://micku7zu.github.io/vanilla-tilt.js/',
    blurb: 'Dependency-free smooth 3D tilt on hover, with an optional gyroscope mode.',
    complexity: 'easy', platform: 'any', categories: ['Motion / Device', 'Cards / Layout'],
    code: [{ file: 'tilt.html', content: `<!-- github.com/micku7zu/vanilla-tilt.js -->
<div data-tilt data-tilt-max="20" data-tilt-glare data-tilt-gyroscope="true">Card</div>
<script src="vanilla-tilt.js"></script>
<!-- or: VanillaTilt.init(document.querySelector('.card'), { max: 20, gyroscope: true }) -->` }],
  },
  {
    id: 'ext-react-parallax-tilt', num: '↗', source: 'external', live: false,
    title: 'react-parallax-tilt', author: 'mkosir', sourceUrl: 'https://www.npmjs.com/package/react-parallax-tilt',
    blurb: 'React tilt/glare/parallax component with a gyroscope option for mobile.',
    complexity: 'easy', platform: 'mobile', categories: ['Motion / Device'],
    code: [{ file: 'Tilt.jsx', content: `// npm i react-parallax-tilt
import Tilt from 'react-parallax-tilt'
<Tilt gyroscope tiltMaxAngleX={20} tiltMaxAngleY={20} glareEnable>
  <div className="card">Tilts on hover AND device orientation</div>
</Tilt>` }],
  },
  {
    id: 'ext-parallax-js', num: '↗', source: 'external', live: false,
    title: 'parallax.js', author: 'Matthew Wagerfield', sourceUrl: 'https://matthew.wagerfield.com/parallax/',
    blurb: 'Layered parallax that reacts to device orientation, falling back to the cursor.',
    complexity: 'easy', platform: 'mobile', categories: ['Motion / Device', 'Hero / Header'],
    code: [{ file: 'parallax.html', content: `<!-- github.com/wagerfield/parallax -->
<ul class="scene">
  <li class="layer" data-depth="0.2">...</li>
  <li class="layer" data-depth="0.6">...</li>
</ul>
<script>new Parallax(document.querySelector('.scene'))</script>` }],
  },
  {
    id: 'ext-framer-layout', num: '↗', source: 'external', live: false,
    title: 'Shared Layout Animation', author: 'Motion (Framer Motion)', sourceUrl: 'https://motion.dev',
    blurb: 'Magic-move elements between states/positions with a shared layoutId.',
    complexity: 'mod', platform: 'any', categories: ['Cards / Layout'],
    code: [{ file: 'layout.jsx', content: `// motion.dev — layout + layoutId do the FLIP for you
import { motion } from 'framer-motion'
{items.map(i => <motion.div key={i.id} layout layoutId={i.id} />)}
// the selected item can share a layoutId with a detail view to morph between them` }],
  },
  {
    id: 'ext-splitting', num: '↗', source: 'external', live: false,
    title: 'Splitting.js', author: 'Splitting.js', sourceUrl: 'https://splitting.js.org',
    blurb: 'Splits text into chars/words/lines with CSS vars for index-based stagger animations.',
    complexity: 'easy', platform: 'any', categories: ['Text Effect'],
    code: [{ file: 'splitting.js', content: `// splitting.js.org
Splitting()  // adds .char spans + --char-index CSS vars
/* .char { animation: rise .5s calc(var(--char-index) * 40ms) both } */` }],
  },
]

export const byId = Object.fromEntries(demos.map((d) => [d.id, d]))
