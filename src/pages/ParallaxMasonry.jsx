import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import DemoChrome from '../components/DemoChrome.jsx'
import './parallax-masonry.css'

gsap.registerPlugin(ScrollTrigger)

const grads = [
  'linear-gradient(135deg,#fca5a5,#ef4444)',
  'linear-gradient(135deg,#a5b4fc,#6366f1)',
  'linear-gradient(135deg,#6ee7b7,#059669)',
  'linear-gradient(135deg,#fde68a,#f59e0b)',
  'linear-gradient(135deg,#f0abfc,#c026d3)',
  'linear-gradient(135deg,#7dd3fc,#0284c7)',
  'linear-gradient(135deg,#cbd5e1,#475569)',
  'linear-gradient(135deg,#fdba74,#ea580c)',
]
const heights = [240, 320, 200, 360, 280, 220, 340, 260, 300, 210, 290, 250]

// 5 columns, each given a different parallax speed (px of drift over the scroll)
const columns = [
  { speed: -140, tiles: [0, 5, 2, 7] },
  { speed: 90, tiles: [3, 1, 6, 4] },
  { speed: -60, tiles: [2, 7, 0, 5, 3] },
  { speed: 130, tiles: [4, 6, 1, 2] },
  { speed: -110, tiles: [5, 0, 3, 7, 6] },
]

export default function ParallaxMasonry() {
  const root = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.pm-col').forEach((col) => {
        const speed = Number(col.dataset.speed)
        gsap.fromTo(
          col,
          { y: -speed },
          {
            y: speed,
            ease: 'none',
            scrollTrigger: {
              trigger: '.pm-wall',
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.6,
            },
          },
        )
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <DemoChrome id="parallax-masonry">
      <div className="pm-page" ref={root}>
        <header className="pm-head">
          <span className="eyebrow">Lifestyle</span>
          <h1>Ride your city.</h1>
        </header>

        <div className="pm-wall">
          {columns.map((c, ci) => (
            <div className="pm-col" key={ci} data-speed={c.speed}>
              {c.tiles.map((t, ti) => (
                <div
                  className="pm-tile"
                  key={ti}
                  style={{ background: grads[t], height: heights[(ci * 3 + ti) % heights.length] }}
                />
              ))}
            </div>
          ))}
        </div>

        <div className="scroll-spacer">tight gutters · varied speeds</div>
      </div>
    </DemoChrome>
  )
}
