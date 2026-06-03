import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import DemoChrome from '../components/DemoChrome.jsx'
import './floating-widgets.css'

gsap.registerPlugin(ScrollTrigger)

const widgets = [
  { c: 'Among Us · 30m', bg: '#ede9fe', fg: '#6d28d9', x: 4, y: 14, delay: 0 },
  { c: '🎂 Birthday · 23 Aug', bg: '#fee2e2', fg: '#b91c1c', x: 70, y: 8, delay: 0.6 },
  { c: 'Fri 4.02', bg: '#dcfce7', fg: '#15803d', x: 78, y: 46, delay: 1.1 },
  { c: 'Together · 2×', bg: '#dbeafe', fg: '#1d4ed8', x: 2, y: 54, delay: 0.3 },
  { c: '❤️', bg: '#fce7f3', fg: '#be185d', x: 14, y: 80, delay: 0.9, small: true },
  { c: 'RSVP · Going', bg: '#fef9c3', fg: '#a16207', x: 72, y: 78, delay: 1.4 },
]

function Widget({ w }) {
  const tilt = useRef(null)
  const move = (e) => {
    const el = tilt.current
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    el.style.transform = `perspective(500px) rotateY(${px * 22}deg) rotateX(${-py * 22}deg) translateZ(14px) scale(1.07)`
  }
  const reset = () => { tilt.current.style.transform = '' }
  return (
    <div
      className="fw-card"
      style={{ left: `${w.x}%`, top: `${w.y}%` }}
      data-fromx={w.x < 50 ? -340 : 340}
      data-fromy={w.y < 50 ? -240 : 240}
    >
      <div className="fw-idle" style={{ animationDelay: `${w.delay}s` }}>
        <div
          ref={tilt}
          className={`fw-tilt ${w.small ? 'small' : ''}`}
          style={{ background: w.bg, color: w.fg }}
          onMouseMove={move}
          onMouseLeave={reset}
        >
          {w.c}
        </div>
      </div>
    </div>
  )
}

export default function FloatingWidgets() {
  const root = useRef(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.fw-card').forEach((card, i) => {
        gsap.fromTo(
          card,
          { x: Number(card.dataset.fromx), y: Number(card.dataset.fromy), scale: 0.5, opacity: 0 },
          {
            x: 0, y: 0, scale: 1, opacity: 1, ease: 'power2.out',
            scrollTrigger: { trigger: '.fw-field', start: 'top 85%', end: 'top 35%', scrub: 0.5 },
          },
        )
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <DemoChrome id="floating-widgets">
      <div className="fw-page" ref={root}>
        <div className="scroll-spacer">scroll — the cards fly in</div>
        <div className="fw-stage">
          <h1 className="fw-heading">
            <span className="fw-l1">Amie has the features.</span>
            <span className="fw-l2">Both familiar and new.</span>
          </h1>
          <p className="fw-hint">hover the cards</p>

          <div className="fw-field">
            {widgets.map((w) => <Widget key={w.c} w={w} />)}
            <div className="fw-phone">
              <div className="fw-screen">
                <div className="fw-time">9:41</div>
                <div className="fw-cal-head">August</div>
                {['Standup', 'Design sync', 'Gym', 'Dinner w/ Sam'].map((e, i) => (
                  <div key={e} className="fw-cal-row" style={{ borderColor: ['#6d28d9','#0284c7','#15803d','#b91c1c'][i] }}>{e}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="scroll-spacer">end</div>
      </div>
    </DemoChrome>
  )
}
