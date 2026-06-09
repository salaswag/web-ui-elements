// Parallax Depth — multiple layers move at different speeds as you scroll, creating
// the illusion of 3D depth. Classic multi-layer parallax, zero dependencies.
import { useEffect, useRef } from 'react'

const LAYERS = [
  // Each layer: speed multiplier, content to show
  { speed: 0.08, content: null, style: { background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(124,58,237,.18) 0%, transparent 70%)' } },
  { speed: 0.22, content: null, style: { background: 'radial-gradient(ellipse 50% 40% at 30% 60%, rgba(59,130,246,.12) 0%, transparent 70%)' } },
  { speed: 0.38, content: null, style: { background: 'radial-gradient(ellipse 40% 50% at 70% 30%, rgba(16,185,129,.1) 0%, transparent 70%)' } },
]

const WORDS = [
  { text: 'Depth',    speed: 0.6,  x: '12%',  y: '20%', size: 72, opacity: 0.9,  color: '#fff' },
  { text: 'Distance', speed: 0.4,  x: '55%',  y: '35%', size: 48, opacity: 0.6,  color: '#a855f7' },
  { text: 'Dimension',speed: 0.25, x: '20%',  y: '55%', size: 32, opacity: 0.35, color: '#3b82f6' },
  { text: 'Near',     speed: 0.7,  x: '65%',  y: '70%', size: 64, opacity: 0.85, color: '#fff' },
  { text: 'Far',      speed: 0.15, x: '40%',  y: '80%', size: 24, opacity: 0.2,  color: '#10b981' },
  { text: 'Layer',    speed: 0.5,  x: '78%',  y: '15%', size: 40, opacity: 0.5,  color: '#f59e0b' },
  { text: 'Parallax', speed: 0.3,  x: '5%',   y: '75%', size: 28, opacity: 0.3,  color: '#7c3aed' },
]

const css = `
*{box-sizing:border-box;margin:0;padding:0}
.pd-outer{
  font-family:Inter,system-ui,sans-serif;
  background:#0b0b12;
}
.pd-stage{
  position:relative;height:300vh;
}
.pd-sticky{
  position:sticky;top:0;height:100vh;overflow:hidden;
}
.pd-layer{
  position:absolute;inset:0;will-change:transform;
}
.pd-bg-layer{
  position:absolute;inset:0;
}
.pd-word{
  position:absolute;font-weight:900;letter-spacing:-.04em;
  line-height:1;will-change:transform;white-space:nowrap;
  user-select:none;
}
.pd-hero{
  position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);
  text-align:center;z-index:20;pointer-events:none;
}
.pd-hero-h{
  font-size:clamp(40px,6vw,72px);font-weight:900;letter-spacing:-.04em;
  color:#fff;margin-bottom:12px;
}
.pd-hero-p{font-size:16px;opacity:.4;color:#fff;max-width:380px;margin:0 auto}
.pd-scroll-hint{
  position:absolute;bottom:32px;left:50%;transform:translateX(-50%);
  font-size:11px;letter-spacing:.16em;text-transform:uppercase;
  color:rgba(255,255,255,.3);
}
`

export default function ParallaxDepth() {
  const outerRef = useRef(null)
  const bgLayerRefs = useRef([])
  const wordRefs = useRef([])
  const rafRef = useRef(null)
  const scrollRef = useRef(0)

  useEffect(() => {
    const sticky = outerRef.current.querySelector('.pd-sticky')

    const update = () => {
      const stageH = outerRef.current.offsetHeight
      const winH   = window.innerHeight
      const maxScroll = stageH - winH
      const progress = Math.min(Math.max(window.scrollY / maxScroll, 0), 1)
      const scrollPx = progress * maxScroll

      // Background gradient layers
      bgLayerRefs.current.forEach((el, i) => {
        if (!el) return
        el.style.transform = `translateY(${-scrollPx * LAYERS[i].speed}px)`
      })

      // Text layers at different depths
      wordRefs.current.forEach((el, i) => {
        if (!el) return
        el.style.transform = `translateY(${-scrollPx * WORDS[i].speed}px)`
      })
    }

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div ref={outerRef} className="pd-outer">
      <style>{css}</style>
      <div className="pd-stage">
        <div className="pd-sticky">
          {/* Background gradient layers */}
          {LAYERS.map((l, i) => (
            <div
              key={i}
              ref={(el) => bgLayerRefs.current[i] = el}
              className="pd-bg-layer"
              style={l.style}
            />
          ))}

          {/* Words at various depths */}
          {WORDS.map((w, i) => (
            <div
              key={i}
              ref={(el) => wordRefs.current[i] = el}
              className="pd-word"
              style={{
                left: w.x,
                top: w.y,
                fontSize: w.size,
                opacity: w.opacity,
                color: w.color,
              }}
            >
              {w.text}
            </div>
          ))}

          {/* Fixed center UI */}
          <div className="pd-hero">
            <h2 className="pd-hero-h">Scroll for depth</h2>
            <p className="pd-hero-p">Elements at different layers move at different speeds, creating the perception of 3D space.</p>
          </div>
          <div className="pd-scroll-hint">↓ scroll</div>
        </div>
      </div>
    </div>
  )
}
