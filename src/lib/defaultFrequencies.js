// Suggested default usage frequency per effect.
// These are shown when the user hasn't explicitly set their own value.
// Values: 'everywhere' | 'often' | 'rare' | 'superrare'

export const DEFAULT_FREQ = {
  // ── Original effects ──────────────────────────────────────
  'sticky-card':        'everywhere',  // versatile feature section pattern
  'vault-hero':         'everywhere',  // hero text reveal, great for landing pages
  'word-fill':          'everywhere',  // sentence highlight, extremely reusable
  'sticky-scroller':    'everywhere',  // two-column sticky feature scroller
  'floating-widgets':   'everywhere',  // cards fly in on scroll, any section
  'magnetic-button':    'everywhere',  // global micro-interaction, add anywhere
  'page-transition':    'often',       // global wipe — needs consistent design system
  'tilt-shimmer':       'often',       // hover shimmer, good for CTAs/cards
  'parallax-masonry':   'often',       // image-heavy sections
  'perspective-flatten':'often',       // calendar/dashboard reveal
  'tablet-tabs':        'often',       // device showcase section
  'scattered-cards':    'rare',        // timeline + scattered layout, very specific
  'velocity-skew':      'rare',        // gallery skew effect
  'deck-zoom':          'rare',        // deck zoom greeting
  'deck-zoom-v2':       'rare',        // dark aurora variant
  'device-morph':       'rare',        // phone→TV morph, very specific
  'serpentine-path':    'superrare',   // diagonal path / patient journey theme
  'gyro-parallax':      'superrare',   // mobile gyroscope parallax

  // ── External — live interactive bits ──────────────────────
  'ext-spotlight':      'everywhere',  // cursor spotlight, hero dark bg
  'ext-blurtext':       'everywhere',  // blur-in text reveal
  'ext-reveal':         'everywhere',  // scroll reveal, ultra common
  'ext-ticker':         'everywhere',  // number ticker / counter
  'ext-textgen':        'often',       // typewriter-style text generate
  'ext-3dcard':         'often',       // 3D tilt card hover
  'ext-marquee':        'often',       // scrolling marquee ticker
  'ext-magnet':         'often',       // magnetic button hover
  'ext-borderbeam':     'often',       // animated border beam
  'ext-meteors':        'rare',        // meteor particle background
  'ext-tilt':           'rare',        // react-parallax-tilt
  'ext-shimmer':        'rare',        // shimmer button
  'ext-ripple':         'rare',        // ripple background
  'ext-lamp':           'rare',        // lamp spotlight bg
  'ext-clickspark':     'rare',        // click particle spark
  'ext-starborder':     'rare',        // star border animation
  'ext-aurora':         'superrare',   // aurora gradient bg

  // ── Section Transitions — live demos ─────────────────────
  'ext-fade-sections':      'often',      // IO-based fade+slide section reveal
  'ext-clip-wipe':          'often',      // clip-path panel wipe on scroll
  'ext-sticky-color-shift': 'rare',       // pinned color-lerp scrub
  'ext-horizontal-scroll':  'often',      // GSAP pinned horizontal panels
  'ext-zoom-portal':        'rare',       // circle scales to full-screen reveal
  'ext-curtain-reveal':     'often',      // layered curtain wipes up
  'ext-word-stagger':       'everywhere', // word-by-word stagger is nearly universal
  'ext-stagger-grid':       'everywhere', // grid cascade is nearly universal
  'ext-scroll-snap':        'often',      // CSS snap sections
  'ext-morph-clip':         'rare',       // circle clip-path morph
  'ext-flip-sections':      'often',      // 3D rotateX card entrance
  'ext-parallax-depth':     'often',      // multi-layer parallax
  'ext-count-up':           'everywhere', // stat counters, used everywhere
  'ext-view-transition':    'rare',       // View Transitions API, Chrome only

  // ── Section Transitions — library references ──────────────
  'ext-barba':              'often',      // Barba.js page transitions
  'ext-swup':               'often',      // Swup page transitions
  'ext-gsap-pagetransition':'rare',       // GSAP page transition pattern
  'ext-locomotive':         'often',      // Locomotive Scroll smooth scroll
  'ext-sheryjs':            'rare',       // Shery.js WebGL distortion
  'ext-motionone':          'often',      // Motion One scroll animations
  'ext-theatrejs':          'superrare',  // Theatre.js, heavy but elite
  'ext-css-scroll-driven':  'often',      // Native CSS scroll-driven

  // ── External — library references ──────────────────────────
  'ext-gsap-scrolltrigger': 'everywhere',
  'ext-lenis':              'often',
  'ext-gsap-splittext':     'often',
  'ext-gsap-flip':          'rare',
  'ext-framer-layout':      'rare',
  'ext-splitting':          'rare',
  'ext-react-parallax-tilt':'rare',
  'ext-parallax-js':        'superrare',

  // ── New Hero / Header effects ─────────────────────────────
  'ext-gradient-orb-bg':      'everywhere',  // ambient orbs, universal dark hero bg
  'ext-hero-countup':         'everywhere',  // stat strip count-up, nearly universal
  'ext-gradient-text-hero':   'everywhere',  // gradient text sweep, top SaaS pattern
  'ext-glassmorphism-hero':   'often',       // frosted glass card hero
  'ext-bento-reveal':         'often',       // bento feature grid reveal
  'ext-terminal-hero':        'often',       // terminal typing, dev/tech products
  'ext-mouse-gradient-hero':  'often',       // cursor-tracked glow, desktop only
  'ext-word-rotate-hero':     'everywhere',  // rotating headline word, universal SaaS
  'ext-grain-texture-hero':   'often',       // grain texture, premium feel
  'ext-hero-scroll-split':    'rare',        // dramatic split, strong visual statement
  'ext-floating-nav-hero':    'everywhere',  // scroll-aware nav, every site needs this
  'ext-scroll-fade-sections': 'everywhere',  // baseline scroll reveal, universal
}
