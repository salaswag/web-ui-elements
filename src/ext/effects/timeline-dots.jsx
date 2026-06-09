// Animated Dot Timeline — a vertical rail whose dots light up in sequence as you
// scroll, with the connecting line filling behind them. IntersectionObserver.
import { useEffect, useRef } from 'react'

const ITEMS = [
  { t: 'Sign up', s: 'Create your workspace in minutes.' },
  { t: 'Import', s: 'Bring your calendar and contacts over.' },
  { t: 'Automate', s: 'Turn on the flows that fit your business.' },
  { t: 'Scale', s: 'Add seats and locations as you grow.' },
]

const css = `
*{box-sizing:border-box;margin:0;padding:0}
.tld-root{font-family:Inter,system-ui,sans-serif;background:#0b0b14;min-height:100vh;padding:110px 24px;color:#eef0f6;display:flex;justify-content:center}
.tld-rail{position:relative;max-width:520px;width:100%;padding-left:46px}
.tld-rail::before{content:'';position:absolute;left:11px;top:6px;bottom:6px;width:2px;background:rgba(255,255,255,.1)}
.tld-fill{position:absolute;left:11px;top:6px;width:2px;background:linear-gradient(#10b981,#22d3ee);height:0;transition:height .5s ease}
.tld-item{position:relative;margin-bottom:46px;opacity:.35;transition:opacity .4s ease}
.tld-item.on{opacity:1}
.tld-dot{position:absolute;left:-41px;top:2px;width:24px;height:24px;border-radius:50%;background:#0b0b14;border:2px solid rgba(255,255,255,.2);display:grid;place-items:center;transition:border-color .4s,box-shadow .4s}
.tld-dot::after{content:'';width:8px;height:8px;border-radius:50%;background:transparent;transition:background .4s}
.tld-item.on .tld-dot{border-color:#22d3ee;box-shadow:0 0 0 6px rgba(34,211,238,.12)}
.tld-item.on .tld-dot::after{background:#22d3ee}
.tld-t{font-size:18px;font-weight:800;letter-spacing:-.01em;margin-bottom:6px}
.tld-s{font-size:14px;color:rgba(238,240,246,.5);line-height:1.6}
`

export default function TimelineDots() {
  const root = useRef(null)
  const fillRef = useRef(null)
  useEffect(() => {
    const items = [...root.current.querySelectorAll('.tld-item')]
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('on') })
      const onCount = items.filter((el) => el.classList.contains('on')).length
      if (fillRef.current) fillRef.current.style.height = `${(onCount / items.length) * 100}%`
    }, { threshold: 0.6 })
    items.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
  return (
    <div className="tld-root" ref={root}>
      <style>{css}</style>
      <div className="tld-rail">
        <span className="tld-fill" ref={fillRef} />
        {ITEMS.map((it) => (
          <div key={it.t} className="tld-item">
            <span className="tld-dot" />
            <div className="tld-t">{it.t}</div>
            <div className="tld-s">{it.s}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
