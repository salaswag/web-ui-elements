import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import DemoChrome from '../components/DemoChrome.jsx'
import './serpentine-path.css'

gsap.registerPlugin(ScrollTrigger)

// diagonal, weaving path (viewBox 1000 x 2800)
const PATH =
  'M 120 60 C 520 360 700 520 820 760 C 940 1000 300 1180 220 1460 C 140 1740 760 1860 840 2160 C 900 2400 520 2520 480 2740'

// generic CUSTOMER / patient journey (placeholder values, business-themed)
const stages = [
  { t: 'Missed call, caught', s: 'Clara answers 24/7 — no inquiry hits voicemail.' },
  { t: 'Booked on the spot', s: 'Live calendar booking while they’re still on the line.' },
  { t: 'Reminders that land', s: 'SMS confirmations + nudges at 98% open rates.' },
  { t: '5-star reviews, asked', s: 'Only happy patients get the public review link.' },
  { t: 'Win-backs, automated', s: 'Lapsed patients re-engaged with a comeback offer.' },
]

export default function SerpentinePath() {
  const root = useRef(null)
  const traceRef = useRef(null)
  const trackRef = useRef(null)
  const [stage, setStage] = useState(0)

  useEffect(() => {
    const svgW = Math.min(window.innerWidth * 1.05, 1150)
    const scale = svgW / 1000
    const svgH = 2800 * scale
    trackRef.current.style.width = `${svgW}px`
    trackRef.current.querySelector('svg').setAttribute('width', svgW)
    trackRef.current.querySelector('svg').setAttribute('height', svgH)

    const len = traceRef.current.getTotalLength()
    traceRef.current.style.strokeDasharray = String(len)
    traceRef.current.style.strokeDashoffset = String(len)
    const travel = svgH - window.innerHeight

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: '.sp-stage',
        start: 'top top',
        end: '+=3200',
        pin: '.sp-pin',
        scrub: 0.5,
        onUpdate: (self) => {
          const p = self.progress
          gsap.set(trackRef.current, { y: -travel * p })
          traceRef.current.style.strokeDashoffset = String(len * (1 - p))
          const i = Math.min(stages.length - 1, Math.floor(p * stages.length))
          setStage((prev) => (prev === i ? prev : i))
        },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <DemoChrome id="serpentine-path">
      <div className="sp-page" ref={root}>
        <section className="sp-stage">
          <div className="sp-pin">
            <span className="sp-eyebrow">The patient journey, automated</span>

            {/* drifting sparks for life */}
            <div className="sp-sparks">
              {Array.from({ length: 14 }).map((_, i) => (
                <span key={i} style={{ left: `${(i * 37) % 100}%`, animationDelay: `${(i % 7) * 0.8}s`, animationDuration: `${6 + (i % 5)}s` }} />
              ))}
            </div>

            <div className="sp-track" ref={trackRef}>
              <svg viewBox="0 0 1000 2800">
                <defs>
                  <linearGradient id="sp-glow" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#ffd27a" />
                    <stop offset="100%" stopColor="#ff7a1a" />
                  </linearGradient>
                </defs>
                <path d={PATH} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="3" />
                <path
                  ref={traceRef}
                  d={PATH}
                  fill="none"
                  stroke="url(#sp-glow)"
                  strokeWidth="7"
                  strokeLinecap="round"
                  className="sp-trace"
                />
              </svg>
            </div>

            {/* BIG centered label that swaps per stage */}
            <div className="sp-labels">
              {stages.map((m, i) => (
                <div className={`sp-label ${i === stage ? 'on' : ''}`} key={m.t}>
                  <span className="sp-step">Step {i + 1} / {stages.length}</span>
                  <span className="sp-pulse" />
                  <h2>{m.t}</h2>
                  <p>{m.s}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <div className="scroll-spacer">end</div>
      </div>
    </DemoChrome>
  )
}
