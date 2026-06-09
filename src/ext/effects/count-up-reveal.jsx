// Count-Up Stats Reveal — large statistics count up to their values as the section
// scrolls into view. Counter + stagger entrance. GSAP ScrollTrigger. Codrops-level.
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { value: 98,   suffix: '%',   label: 'Client satisfaction',     desc: 'Measured after project delivery' },
  { value: 3.2,  suffix: 'M',   label: 'Users reached',           desc: 'Across all launched products' },
  { value: 47,   suffix: '',    label: 'Products shipped',        desc: 'From MVP to enterprise scale' },
  { value: 12,   suffix: '+',   label: 'Years of craft',          desc: 'Building things that last' },
  { value: 99.9, suffix: '%',   label: 'Uptime guarantee',        desc: 'For all production systems' },
  { value: 4.8,  suffix: '★',   label: 'Design quality rating',  desc: 'Average across design reviews' },
]

const css = `
*{box-sizing:border-box;margin:0;padding:0}
.cu-wrap{
  font-family:Inter,system-ui,sans-serif;
  background:#09090b;min-height:100vh;
  padding:100px 5vw 80px;
}
.cu-header{margin-bottom:80px;max-width:520px}
.cu-eyebrow{
  font-size:10px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;
  color:#7c3aed;margin-bottom:12px;
}
.cu-h{
  font-size:clamp(36px,5vw,60px);font-weight:900;letter-spacing:-.03em;
  color:#fff;line-height:1.05;
}
.cu-grid{
  display:grid;
  grid-template-columns:repeat(auto-fill,minmax(280px,1fr));
  gap:1px;
  border:1px solid #1e1e2a;
  border-radius:16px;overflow:hidden;
}
.cu-cell{
  background:#0f0f15;
  padding:36px 32px;
  opacity:0;transform:translateY(24px);
}
.cu-value-row{display:flex;align-items:baseline;gap:4px;margin-bottom:10px}
.cu-value{
  font-size:clamp(48px,6vw,72px);font-weight:900;letter-spacing:-.04em;
  color:#fff;line-height:1;font-variant-numeric:tabular-nums;
}
.cu-suffix{
  font-size:clamp(28px,4vw,42px);font-weight:700;color:#7c3aed;
}
.cu-label{
  font-size:15px;font-weight:600;color:#fff;margin-bottom:4px;
}
.cu-desc{font-size:12.5px;color:#6b6b7a;line-height:1.5}
`

export default function CountUpReveal() {
  const wrapRef = useRef(null)
  const cellRefs = useRef([])
  const valRefs  = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapRef.current.querySelector('.cu-grid'),
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      })

      // Cells fade in with stagger
      tl.to(cellRefs.current.filter(Boolean), {
        opacity: 1,
        y: 0,
        stagger: 0.08,
        duration: 0.55,
        ease: 'power3.out',
      })

      // Numbers count up
      valRefs.current.forEach((el, i) => {
        if (!el) return
        const stat = STATS[i]
        const isDecimal = String(stat.value).includes('.')
        gsap.from(el, {
          textContent: 0,
          duration: 1.6,
          delay: i * 0.08,
          ease: 'power2.out',
          snap: { textContent: isDecimal ? 0.1 : 1 },
          onUpdate() {
            const v = parseFloat(el.textContent)
            el.textContent = isDecimal ? v.toFixed(1) : Math.round(v)
          },
          scrollTrigger: {
            trigger: wrapRef.current.querySelector('.cu-grid'),
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        })
      })
    }, wrapRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={wrapRef} className="cu-wrap">
      <style>{css}</style>
      <div className="cu-header">
        <div className="cu-eyebrow">By the numbers</div>
        <h2 className="cu-h">Results that speak<br/>for themselves.</h2>
      </div>
      <div className="cu-grid">
        {STATS.map((s, i) => (
          <div key={i} ref={(el) => cellRefs.current[i] = el} className="cu-cell">
            <div className="cu-value-row">
              <span ref={(el) => valRefs.current[i] = el} className="cu-value">0</span>
              <span className="cu-suffix">{s.suffix}</span>
            </div>
            <div className="cu-label">{s.label}</div>
            <div className="cu-desc">{s.desc}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
