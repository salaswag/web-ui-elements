// Zig-Zag Journey — alternating image/text rows that slide in from opposite sides.
// IntersectionObserver. A storytelling feature walkthrough.
import { useEffect, useRef } from 'react'

const ROWS = [
  { tag: 'Capture', t: 'Every lead, answered', s: 'AI picks up on the first ring, qualifies the caller, and never sleeps.', c: '#22d3ee' },
  { tag: 'Convert', t: 'Booked before they hang up', s: 'Live availability means the appointment is set while intent is highest.', c: '#7c3aed' },
  { tag: 'Retain', t: 'They come back', s: 'Smart follow-ups and review requests turn one job into a relationship.', c: '#f59e0b' },
]

const css = `
*{box-sizing:border-box;margin:0;padding:0}
.zzj-root{font-family:Inter,system-ui,sans-serif;background:#07090f;min-height:100vh;padding:90px 28px;color:#eaf2f3}
.zzj-wrap{max-width:980px;margin:0 auto;display:flex;flex-direction:column;gap:80px}
.zzj-row{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center}
.zzj-row.rev{direction:rtl}.zzj-row.rev>*{direction:ltr}
.zzj-art{height:230px;border-radius:20px;opacity:0;transform:translateX(-44px);transition:opacity .7s ease,transform .7s ease}
.zzj-row.rev .zzj-art{transform:translateX(44px)}
.zzj-row.in .zzj-art{opacity:1;transform:none}
.zzj-copy{opacity:0;transform:translateX(44px);transition:opacity .7s ease .1s,transform .7s ease .1s}
.zzj-row.rev .zzj-copy{transform:translateX(-44px)}
.zzj-row.in .zzj-copy{opacity:1;transform:none}
.zzj-tag{display:inline-block;font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;padding:5px 11px;border-radius:99px;margin-bottom:16px}
.zzj-t{font-size:clamp(24px,3vw,36px);font-weight:900;letter-spacing:-.02em;margin-bottom:12px;line-height:1.1}
.zzj-s{font-size:15px;line-height:1.65;color:rgba(234,242,243,.5)}
@media(max-width:720px){.zzj-row,.zzj-row.rev{grid-template-columns:1fr;direction:ltr}.zzj-art{height:170px}}
`

export default function ZigzagJourney() {
  const root = useRef(null)
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('in')),
      { threshold: 0.35 },
    )
    root.current.querySelectorAll('.zzj-row').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
  return (
    <div className="zzj-root" ref={root}>
      <style>{css}</style>
      <div className="zzj-wrap">
        {ROWS.map((r, i) => (
          <div key={r.t} className={`zzj-row ${i % 2 ? 'rev' : ''}`}>
            <div className="zzj-art" style={{ background: `linear-gradient(135deg, ${r.c}, #0b0b12)` }} />
            <div className="zzj-copy">
              <span className="zzj-tag" style={{ background: `${r.c}22`, color: r.c }}>{r.tag}</span>
              <div className="zzj-t">{r.t}</div>
              <div className="zzj-s">{r.s}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
