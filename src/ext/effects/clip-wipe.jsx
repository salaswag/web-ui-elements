// Clip-Path Wipe Transition — scroll drives a clip-path that sweeps the next
// section into view. Each section wipes in from the left edge. GSAP + ScrollTrigger.
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const PANELS = [
  { bg: '#0b0b12', color: '#fff',     title: 'Foundation',  sub: 'Where everything starts.', accent: '#7c3aed' },
  { bg: '#7c3aed', color: '#fff',     title: 'Structure',   sub: 'Build on solid ground.',   accent: '#0b0b12' },
  { bg: '#ede9fe', color: '#1e1b4b',  title: 'Clarity',     sub: 'Simplify until it sings.', accent: '#7c3aed' },
  { bg: '#fff',    color: '#0b0b12',  title: 'Launch',      sub: 'Ship it. Then improve.',   accent: '#7c3aed' },
]

const css = `
.cw-wrap { position: relative; font-family: Inter, system-ui, sans-serif; }
.cw-pin { height: 500vh; }
.cw-sticky { position: sticky; top: 0; height: 100vh; overflow: hidden; }
.cw-panel {
  position: absolute; inset: 0; display: flex; align-items: center;
  justify-content: center; padding: 60px;
}
.cw-panel-inner { text-align: center; }
.cw-eyebrow { font-size: 11px; font-weight: 700; letter-spacing: .16em; text-transform: uppercase; opacity: .6; margin-bottom: 16px; }
.cw-h { font-size: clamp(52px,8vw,100px); font-weight: 900; letter-spacing: -.04em; margin: 0 0 16px; line-height: .9; }
.cw-sub { font-size: 20px; opacity: .7; margin: 0; }
`

export default function ClipWipe() {
  const wrapRef = useRef(null)
  const panelRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // First panel always visible. Each subsequent panel clips in from left.
      panelRefs.current.slice(1).forEach((panel, i) => {
        gsap.fromTo(panel,
          { clipPath: 'inset(0 100% 0 0)' },
          {
            clipPath: 'inset(0 0% 0 0)',
            ease: 'none',
            scrollTrigger: {
              trigger: wrapRef.current,
              start: `${(i + 1) * 25}% top`,
              end: `${(i + 1) * 25 + 25}% top`,
              scrub: true,
            },
          }
        )
      })
    }, wrapRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={wrapRef} className="cw-wrap">
      <style>{css}</style>
      <div className="cw-pin">
        <div className="cw-sticky">
          {PANELS.map((p, i) => (
            <div
              key={i}
              ref={(el) => panelRefs.current[i] = el}
              className="cw-panel"
              style={{ background: p.bg, color: p.color }}
            >
              <div className="cw-panel-inner">
                <div className="cw-eyebrow" style={{ color: p.accent }}>0{i + 1} — {p.title}</div>
                <h2 className="cw-h">{p.title}</h2>
                <p className="cw-sub">{p.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
