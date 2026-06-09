// Sticky Color-Shift Sections — one pinned container whose background and
// text color cross-fades as each content block scrolls through. GSAP scrub.
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const STOPS = [
  { bg: '#0a0a0f', fg: '#ffffff', accent: '#7c3aed', label: '01', title: 'Intention',  body: 'Good design begins before the first pixel.' },
  { bg: '#7c3aed', fg: '#ffffff', accent: '#ede9fe', label: '02', title: 'Momentum',   body: 'Consistency builds trust. Trust builds love.' },
  { bg: '#f0fdf4', fg: '#052e16', accent: '#059669', label: '03', title: 'Growth',     body: 'Small improvements compound into excellence.' },
  { bg: '#fff7ed', fg: '#431407', accent: '#ea580c', label: '04', title: 'Delivery',   body: 'Done well beats perfect and never shipped.' },
  { bg: '#0f172a', fg: '#f8fafc', accent: '#38bdf8', label: '05', title: 'Reflection', body: 'Ship it. Learn. Then do it better next time.' },
]

const css = `
.scs-wrap { font-family: Inter, system-ui, sans-serif; }
.scs-pin { height: 600vh; }
.scs-sticky {
  position: sticky; top: 0; height: 100vh; display: flex;
  align-items: center; justify-content: center;
  transition: background .05s, color .05s;
}
.scs-content { text-align: center; padding: 0 40px; max-width: 700px; }
.scs-label { font-size: 11px; font-weight: 700; letter-spacing: .2em; text-transform: uppercase; margin-bottom: 20px; opacity: .6; }
.scs-h { font-size: clamp(48px,7vw,88px); font-weight: 900; letter-spacing: -.04em; line-height: .95; margin: 0 0 20px; }
.scs-p { font-size: 20px; line-height: 1.6; margin: 0; opacity: .75; }
.scs-bar { position: fixed; bottom: 32px; left: 50%; transform: translateX(-50%); display: flex; gap: 6px; z-index: 10; }
.scs-pip { width: 32px; height: 3px; border-radius: 2px; background: currentColor; opacity: .2; transition: opacity .3s; }
.scs-pip.on { opacity: 1; }
`

export default function StickyColorShift() {
  const wrapRef = useRef(null)
  const stickyRef = useRef(null)
  const labelRef = useRef(null)
  const hRef = useRef(null)
  const pRef = useRef(null)
  const pipRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const total = STOPS.length
      ScrollTrigger.create({
        trigger: wrapRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
        onUpdate: (self) => {
          const prog = self.progress * (total - 1)
          const i = Math.min(Math.floor(prog), total - 2)
          const t = prog - i
          const a = STOPS[i]
          const b = STOPS[i + 1]
          const mix = (av, bv) => {
            const parse = (v) => {
              const m = v.match(/^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i)
              return m ? [parseInt(m[1],16), parseInt(m[2],16), parseInt(m[3],16)] : [0,0,0]
            }
            const [ar,ag,ab] = parse(av), [br,bg,bb] = parse(bv)
            return `rgb(${Math.round(ar+t*(br-ar))},${Math.round(ag+t*(bg-ag))},${Math.round(ab+t*(bb-ab))})`
          }
          stickyRef.current.style.background = mix(a.bg, b.bg)
          stickyRef.current.style.color = mix(a.fg, b.fg)
          if (labelRef.current) labelRef.current.textContent = t < 0.5 ? a.label : b.label
          if (hRef.current) {
            hRef.current.style.opacity = t < 0.15 ? '1' : t < 0.5 ? String(1-(t-0.15)/0.35) : t < 0.65 ? String((t-0.5)/0.15) : '1'
            hRef.current.textContent = t < 0.5 ? a.title : b.title
          }
          if (pRef.current) pRef.current.textContent = t < 0.5 ? a.body : b.body
          pipRefs.current.forEach((p, pi) => {
            if (p) p.classList.toggle('on', Math.round(prog) === pi)
          })
        }
      })
    }, wrapRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={wrapRef} className="scs-wrap" style={{ background: STOPS[0].bg, color: STOPS[0].fg }}>
      <style>{css}</style>
      <div className="scs-pin">
        <div ref={stickyRef} className="scs-sticky" style={{ background: STOPS[0].bg, color: STOPS[0].fg }}>
          <div className="scs-content">
            <div ref={labelRef} className="scs-label">{STOPS[0].label}</div>
            <h2 ref={hRef} className="scs-h">{STOPS[0].title}</h2>
            <p ref={pRef} className="scs-p">{STOPS[0].body}</p>
          </div>
          <div className="scs-bar">
            {STOPS.map((_, i) => (
              <div key={i} ref={(el) => pipRefs.current[i] = el} className={`scs-pip ${i === 0 ? 'on' : ''}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
