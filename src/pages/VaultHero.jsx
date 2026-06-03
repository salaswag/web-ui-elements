import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import DemoChrome from '../components/DemoChrome.jsx'
import './vault-hero.css'

gsap.registerPlugin(ScrollTrigger)

const WORD = 'Confidential Cloud'

export default function VaultHero() {
  const root = useRef(null)
  const solidRef = useRef(null)
  const headlineRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: '.vh-stage',
        start: 'top top',
        end: '+=1700',
        pin: '.vh-pin',
        scrub: 0.4,
        onUpdate: (self) => {
          const p = self.progress
          const solid = solidRef.current
          const headline = headlineRef.current
          if (!solid || !headline) return

          if (p < 0.42) {
            // FILL: solid ink grows from the left
            const t = p / 0.42
            solid.style.clipPath = `inset(0 ${(1 - t) * 100}% 0 0)`
            headline.style.opacity = 1
          } else if (p < 0.78) {
            // UNFILL: solid drains away from the left, back to outline
            const t = (p - 0.42) / 0.36
            solid.style.clipPath = `inset(0 0 0 ${t * 100}%)`
            headline.style.opacity = 1
          } else {
            // FADE: empty outline fades out
            const t = (p - 0.78) / 0.22
            solid.style.clipPath = `inset(0 0 0 100%)`
            headline.style.opacity = 1 - t
          }
        },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <DemoChrome id="vault-hero">
      <div className="vh-page" ref={root}>
        <section className="vh-stage">
          <div className="vh-pin">
            {/* faint, static decorative accent — deliberately NOT the focus */}
            <div className="vh-accent" aria-hidden="true">
              <svg viewBox="0 0 300 300">
                <circle cx="150" cy="150" r="120" fill="none" stroke="#0f0f12" strokeWidth="1" />
                <circle cx="150" cy="150" r="86" fill="none" stroke="#0f0f12" strokeWidth="1" />
                <circle cx="150" cy="150" r="52" fill="none" stroke="#0f0f12" strokeWidth="1" />
              </svg>
            </div>

            <h1 className="vh-headline" ref={headlineRef}>
              <span className="vh-line1">Privacy protected with</span>
              <span className="vh-word-wrap">
                <span className="vh-word vh-outline">{WORD}</span>
                <span className="vh-word vh-solid" ref={solidRef}>{WORD}</span>
              </span>
            </h1>

            <div className="vh-hint">scroll ↓ &nbsp;·&nbsp; fill → unfill → fade</div>
          </div>
        </section>

        <div className="scroll-spacer">end of hero</div>
      </div>
    </DemoChrome>
  )
}
