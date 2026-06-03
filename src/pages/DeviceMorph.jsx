import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import DemoChrome from '../components/DemoChrome.jsx'
import './device-morph.css'

gsap.registerPlugin(ScrollTrigger)

const lerp = (a, b, t) => a + (b - a) * t

export default function DeviceMorph() {
  const root = useRef(null)
  const devRef = useRef(null)
  const standRef = useRef(null)
  const [tv, setTv] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: '.dm-stage',
        start: 'top top',
        end: '+=1200',
        pin: '.dm-pin',
        scrub: 0.5,
        onUpdate: (self) => {
          const p = self.progress
          const dev = devRef.current
          dev.style.width = `${lerp(240, 700, p)}px`
          dev.style.height = `${lerp(480, 420, p)}px`
          dev.style.borderRadius = `${lerp(38, 16, p)}px`
          dev.style.padding = `${lerp(12, 14, p)}px`
          standRef.current.style.opacity = gsap.utils.clamp(0, 1, (p - 0.6) / 0.3)
          setTv((v) => (v === p > 0.5 ? v : p > 0.5))
        },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <DemoChrome id="device-morph">
      <div className="dm-page" ref={root}>
        <section className="dm-stage">
          <div className="dm-pin">
            <div className="dm-rig">
              <div className="dm-device" ref={devRef}>
                <div className="dm-screen">
                  <div className={`dm-view dm-phone-view ${tv ? '' : 'on'}`}>
                    <div className="dm-phone-hello">Hello world</div>
                    <div className="dm-phone-sub">Prompt a conversation and record video…</div>
                  </div>
                  <div className={`dm-view dm-tv-view ${tv ? 'on' : ''}`}>
                    <div className="dm-tv-row">
                      {['Continue', 'Trending', 'New'].map((s) => (
                        <span key={s}>{s}</span>
                      ))}
                    </div>
                    <div className="dm-tv-grid">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <span key={i} style={{ background: ['#6d28d9','#0284c7','#15803d','#b45309','#be185d','#4b5563'][i] }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="dm-stand" ref={standRef} />
            </div>
            <div className="dm-hint">scroll ↓ &nbsp;phone → TV</div>
          </div>
        </section>
        <footer className="dm-foot">No animations were descoped in the making of this website.</footer>
      </div>
    </DemoChrome>
  )
}
