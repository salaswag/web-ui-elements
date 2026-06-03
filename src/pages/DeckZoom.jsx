import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import DemoChrome from '../components/DemoChrome.jsx'
import './deck-zoom.css'

gsap.registerPlugin(ScrollTrigger)

const cardColors = ['#6d28d9', '#0284c7', '#db2777', '#f59e0b', '#059669']
const greeting = [
  'Happy', 'Wednesday!', "It's", { i: '🕘' }, '9:58', 'PM', 'and', { i: '☁️' }, 'clear', 'in',
  'Canberra.', 'You', 'got', { i: '✉️' }, '2', 'emails', 'and', 'have', 'a', 'free', 'morning.',
]
const clamp01 = (v) => gsap.utils.clamp(0, 1, v)

export default function DeckZoom() {
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
          // deck converges + zooms
          gsap.utils.toArray('.dz-card').forEach((c, i) => {
            const off = i - 2
            c.style.transform = `translateX(${off * 70 * (1 - pd)}px) rotateY(${off * 18 * (1 - pd)}deg) translateZ(${(1 - pd) * -40}px)`
          })
          deckRef.current.style.transform = `scale(${1 + pd * 2.4})`
          deckRef.current.style.opacity = String(1 - clamp01((p - 0.42) / 0.16))
          // sky resolves
          skyRef.current.style.opacity = String(clamp01((p - 0.36) / 0.2))
          // greeting fills
          const front = clamp01((p - 0.55) / 0.42) * (total + 1)
          wordRefs.current.forEach((el, i) => el && (el.style.color = i < front ? '#fff' : 'rgba(255,255,255,0.32)'))
          // email card slides up
          const e = clamp01((p - 0.72) / 0.2)
          emailRef.current.style.transform = `translate(-50%, ${(1 - e) * 120}px)`
          emailRef.current.style.opacity = String(e)
        },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <DemoChrome id="deck-zoom">
      <div className="dz-page" ref={root}>
        <section className="dz-stage">
          <div className="dz-pin">
            <div className="dz-sky" ref={skyRef}>
              <span className="dz-blob b1" />
              <span className="dz-blob b2" />
            </div>

            <div className="dz-deck" ref={deckRef}>
              {cardColors.map((c, i) => (
                <div key={i} className="dz-card" style={{ background: `linear-gradient(160deg, ${c}, #0b0b12)`, zIndex: i === 2 ? 6 : 5 - Math.abs(i - 2) }}>
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
              <span className="dz-email-from">Sam Rivera</span>
              <span className="dz-email-subj">Re: launch plan — looks great ✅</span>
            </div>

            <div className="dz-hint">scroll ↓ &nbsp;zoom through the deck</div>
          </div>
        </section>
        <div className="scroll-spacer">end</div>
      </div>
    </DemoChrome>
  )
}
