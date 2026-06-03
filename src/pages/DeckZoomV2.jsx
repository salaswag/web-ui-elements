import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import DemoChrome from '../components/DemoChrome.jsx'
import './deck-zoom.css'
import './deck-zoom-v2.css'

gsap.registerPlugin(ScrollTrigger)

const cardColors = ['#312e81', '#0f766e', '#6d28d9', '#1e3a8a', '#155e75']
const greeting = [
  'Good', 'evening.', "It's", { i: '🌙' }, '9:58', 'PM', '—', { i: '✨' }, 'clear', 'skies',
  'over', 'Canberra.', 'Inbox', 'is', { i: '✉️' }, 'quiet,', 'and', 'tomorrow', 'is', 'wide', 'open.',
]
const clamp01 = (v) => gsap.utils.clamp(0, 1, v)

export default function DeckZoomV2() {
  const root = useRef(null)
  const deckRef = useRef(null)
  const skyRef = useRef(null)
  const emailRef = useRef(null)
  const wordRefs = useRef([])

  useEffect(() => {
    const total = greeting.length
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: '.dz-stage',
        start: 'top top',
        end: '+=1700',
        pin: '.dz-pin',
        scrub: 0.5,
        onUpdate: (self) => {
          const p = self.progress
          const pd = clamp01(p / 0.5)
          gsap.utils.toArray('.dz-card').forEach((c, i) => {
            const off = i - 2
            // v2: cards SPIRAL (rotateZ wind-up) as they converge
            c.style.transform = `translateX(${off * 70 * (1 - pd)}px) rotateY(${off * 18 * (1 - pd)}deg) rotateZ(${off * 14 * (1 - pd)}deg) translateZ(${(1 - pd) * -40}px)`
          })
          deckRef.current.style.transform = `scale(${1 + pd * 2.4}) rotate(${pd * 40}deg)`
          deckRef.current.style.opacity = String(1 - clamp01((p - 0.42) / 0.16))
          skyRef.current.style.opacity = String(clamp01((p - 0.36) / 0.2))
          const front = clamp01((p - 0.55) / 0.42) * (total + 1)
          wordRefs.current.forEach((el, i) => el && (el.style.color = i < front ? '#fff' : 'rgba(255,255,255,0.28)'))
          const e = clamp01((p - 0.72) / 0.2)
          emailRef.current.style.transform = `translate(-50%, ${(1 - e) * 120}px)`
          emailRef.current.style.opacity = String(e)
        },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <DemoChrome id="deck-zoom-v2">
      <div className="dz-page dz-v2" ref={root}>
        <section className="dz-stage">
          <div className="dz-pin">
            <div className="dz-sky dz-aurora" ref={skyRef}>
              <span className="dz-band a1" />
              <span className="dz-band a2" />
              <span className="dz-band a3" />
            </div>

            <div className="dz-deck" ref={deckRef}>
              {cardColors.map((c, i) => (
                <div key={i} className="dz-card" style={{ background: `linear-gradient(160deg, ${c}, #05060d)`, zIndex: i === 2 ? 6 : 5 - Math.abs(i - 2) }}>
                  <span className="dz-card-dot" />
                  <span className="dz-card-line" />
                  <span className="dz-card-line short" />
                </div>
              ))}
            </div>

            <h1 className="dz-greeting">
              {greeting.map((w, i) =>
                typeof w === 'string' ? (
                  <span key={i} ref={(el) => (wordRefs.current[i] = el)}>{w} </span>
                ) : (
                  <span key={i} ref={(el) => (wordRefs.current[i] = el)} className="dz-ico">{w.i} </span>
                ),
              )}
            </h1>

            <div className="dz-email" ref={emailRef}>
              <span className="dz-email-from">Tonight</span>
              <span className="dz-email-subj">3 things wrapped up · 0 left for you ✦</span>
            </div>

            <div className="dz-hint">scroll ↓ · spiral through into the aurora</div>
          </div>
        </section>
        <div className="scroll-spacer">end</div>
      </div>
    </DemoChrome>
  )
}
