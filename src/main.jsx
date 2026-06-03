import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'
import './styles/global.css'
import { init as initTheme } from './theme.js'

initTheme()

import Home from './pages/Home.jsx'
import StickyCard from './pages/StickyCard.jsx'
import VaultHero from './pages/VaultHero.jsx'
import WordFill from './pages/WordFill.jsx'
import StickyScroller from './pages/StickyScroller.jsx'
import ParallaxMasonry from './pages/ParallaxMasonry.jsx'
import TabletTabs from './pages/TabletTabs.jsx'
import ScatteredCards from './pages/ScatteredCards.jsx'
import SerpentinePath from './pages/SerpentinePath.jsx'
import VelocitySkew from './pages/VelocitySkew.jsx'
import PerspectiveFlatten from './pages/PerspectiveFlatten.jsx'
import FloatingWidgets from './pages/FloatingWidgets.jsx'
import DeviceMorph from './pages/DeviceMorph.jsx'
import DeckZoom from './pages/DeckZoom.jsx'
import DeckZoomV2 from './pages/DeckZoomV2.jsx'
import MagneticButton from './pages/MagneticButton.jsx'
import PageTransition from './pages/PageTransition.jsx'
import GyroParallax from './pages/GyroParallax.jsx'
import TiltShimmer from './pages/TiltShimmer.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sticky-card" element={<StickyCard />} />
        <Route path="/vault-hero" element={<VaultHero />} />
        <Route path="/word-fill" element={<WordFill />} />
        <Route path="/sticky-scroller" element={<StickyScroller />} />
        <Route path="/parallax-masonry" element={<ParallaxMasonry />} />
        <Route path="/tablet-tabs" element={<TabletTabs />} />
        <Route path="/scattered-cards" element={<ScatteredCards />} />
        <Route path="/serpentine-path" element={<SerpentinePath />} />
        <Route path="/velocity-skew" element={<VelocitySkew />} />
        <Route path="/perspective-flatten" element={<PerspectiveFlatten />} />
        <Route path="/floating-widgets" element={<FloatingWidgets />} />
        <Route path="/device-morph" element={<DeviceMorph />} />
        <Route path="/deck-zoom" element={<DeckZoom />} />
        <Route path="/deck-zoom-v2" element={<DeckZoomV2 />} />
        <Route path="/magnetic-button" element={<MagneticButton />} />
        <Route path="/page-transition" element={<PageTransition />} />
        <Route path="/gyro-parallax" element={<GyroParallax />} />
        <Route path="/tilt-shimmer" element={<TiltShimmer />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>,
)
