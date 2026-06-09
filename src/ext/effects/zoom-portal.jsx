// Zoom Portal — a circle at the bottom of each pinned section scales up to fill the
// screen, revealing the next section's color. Classic Awwwards / Codrops technique.
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const SECTIONS = [
  { heading: 'Begin.',    sub: 'Every great journey starts with a single scroll.',     bg: '#0b0b12', next: '#4f1d96' },
  { heading: 'Deepen.',   sub: 'The space between ideas becomes part of the story.',   bg: '#4f1d96', next: '#0c4a6e' },
  { heading: 'Arrive.',   sub: 'The destination reshapes everything that preceded it.', bg: '#0c4a6e', next: '#064e3b' },
  { heading: 'Remain.',   sub: 'Stay curious. The best work never fully finishes.',    bg: '#064e3b', next: null },
]

const css = `
*{box-sizing:border-box;margin:0;padding:0}
.zp-wrap{font-family:Inter,system-ui,sans-serif}
.zp-block{height:200vh}
.zp-sticky{
  position:sticky;top:0;height:100vh;overflow:hidden;
  display:flex;align-items:center;justify-content:center;
}
.zp-text{text-align:center;color:#fff;position:relative;z-index:2;padding:20px}
.zp-h{
  font-size:clamp(52px,9vw,110px);font-weight:900;letter-spacing:-.05em;
  line-height:.9;margin-bottom:20px;
}
.zp-p{font-size:17px;line-height:1.6;opacity:.6;max-width:400px;margin:0 auto}
.zp-portal{
  position:absolute;width:90px;height:90px;border-radius:50%;
  bottom:56px;left:50%;transform:translateX(-50%) scale(1);
  z-index:3;transform-origin:center bottom;
  display:flex;align-items:center;justify-content:center;
  cursor:default;
}
.zp-arrow{color:#fff;font-size:18px;opacity:.7}
`

export default function ZoomPortal() {
  const wrapRef = useRef(null)
  const blockRefs = useRef([])
  const portalRefs = useRef([])

  useEffect(() => {
    const vw = window.innerWidth
    const vh = window.innerHeight
    // Scale needed to cover the full viewport from the portal position
    const maxScale = Math.ceil(Math.sqrt(vw ** 2 + vh ** 2) / 45) * 2

    const ctx = gsap.context(() => {
      SECTIONS.forEach((_, i) => {
        if (!portalRefs.current[i]) return
        gsap.fromTo(
          portalRefs.current[i],
          { scale: 1 },
          {
            scale: maxScale,
            ease: 'none',
            scrollTrigger: {
              trigger: blockRefs.current[i],
              start: 'top top',
              end: '+=700',
              scrub: 1,
              pin: true,
            },
          }
        )
      })
    }, wrapRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={wrapRef} className="zp-wrap">
      <style>{css}</style>
      {SECTIONS.map((s, i) => (
        <div key={i} ref={(el) => blockRefs.current[i] = el} className="zp-block" style={{ background: s.bg }}>
          <div className="zp-sticky">
            <div className="zp-text">
              <h2 className="zp-h">{s.heading}</h2>
              <p className="zp-p">{s.sub}</p>
            </div>
            {s.next && (
              <div
                ref={(el) => portalRefs.current[i] = el}
                className="zp-portal"
                style={{ background: s.next }}
              >
                <span className="zp-arrow">↓</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
