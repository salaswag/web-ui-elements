// Hero Stats Count-Up — numbers animate to target when section enters viewport.
// GSAP ScrollTrigger. Common SaaS social-proof pattern.
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { value: 24, suffix: '/7', label: 'Calls answered' },
  { value: 98,  suffix: '%', label: 'Text open rate' },
  { value: 14,  suffix: 'd',  label: 'Days to go live' },
  { value: 4200, suffix: '+', label: 'Leads captured' },
]

const css = `
*{box-sizing:border-box;margin:0;padding:0}
.hcu-root{
  font-family:Inter,system-ui,sans-serif;
  background:#07090f;min-height:100vh;
  display:flex;flex-direction:column;
}
.hcu-hero{
  flex:1;display:flex;flex-direction:column;
  align-items:center;justify-content:center;
  padding:80px 32px 60px;text-align:center;
}
.hcu-eyebrow{
  font-size:11.5px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;
  color:#22d3ee;margin-bottom:18px;
}
.hcu-h1{
  font-size:clamp(40px,6vw,80px);font-weight:900;letter-spacing:-.04em;
  line-height:.96;color:#eaf2f3;margin-bottom:18px;
}
.hcu-p{font-size:18px;color:rgba(234,242,243,.44);max-width:480px;line-height:1.65;margin-bottom:48px}
.hcu-cta{
  padding:14px 32px;border-radius:10px;border:none;cursor:pointer;
  background:#22d3ee;color:#07090f;font-weight:800;font-size:15px;
  transition:opacity .15s,transform .15s;
}
.hcu-cta:hover{opacity:.88;transform:translateY(-1px)}
/* stats strip */
.hcu-strip{
  border-top:1px solid rgba(255,255,255,.07);
  display:grid;grid-template-columns:repeat(4,1fr);
}
.hcu-stat{
  padding:40px 24px;border-right:1px solid rgba(255,255,255,.07);
  display:flex;flex-direction:column;align-items:center;text-align:center;
}
.hcu-stat:last-child{border-right:none}
.hcu-num{
  font-size:clamp(40px,4vw,60px);font-weight:900;letter-spacing:-.04em;
  color:#eaf2f3;line-height:1;margin-bottom:8px;
}
.hcu-suffix{color:#22d3ee}
.hcu-label{font-size:13.5px;color:rgba(234,242,243,.42);font-weight:500;letter-spacing:.02em}
@media(max-width:640px){
  .hcu-strip{grid-template-columns:repeat(2,1fr)}
  .hcu-stat:nth-child(2){border-right:none}
  .hcu-stat:nth-child(3){border-top:1px solid rgba(255,255,255,.07)}
}
`

export default function HeroCountUp() {
  const numRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      numRefs.current.forEach((el, i) => {
        if (!el) return
        const target = STATS[i].value
        gsap.fromTo(el, { textContent: 0 }, {
          textContent: target,
          duration: 1.6,
          ease: 'power2.out',
          snap: { textContent: 1 },
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
        })
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div className="hcu-root">
      <style>{css}</style>
      <div className="hcu-hero">
        <div className="hcu-eyebrow">Proven results</div>
        <h1 className="hcu-h1">Your business,<br />always on.</h1>
        <p className="hcu-p">Automated systems that capture leads, eliminate no-shows, and recover lost customers.</p>
        <button className="hcu-cta">Book a demo →</button>
      </div>
      <div className="hcu-strip">
        {STATS.map((s, i) => (
          <div key={i} className="hcu-stat">
            <div className="hcu-num">
              <span ref={(el) => numRefs.current[i] = el}>0</span>
              <span className="hcu-suffix">{s.suffix}</span>
            </div>
            <div className="hcu-label">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
