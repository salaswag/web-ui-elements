// Number Ticker — animates a number counting up to its target.
// Inspired by Magic UI's "Number Ticker".
import { useEffect, useState } from 'react'

function Ticker({ to, prefix = '', suffix = '' }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    let raf, start
    const dur = 1400
    const step = (t) => {
      start = start ?? t
      const p = Math.min((t - start) / dur, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setN(Math.floor(eased * to))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [to])
  return <span>{prefix}{n.toLocaleString()}{suffix}</span>
}

export default function NumberTicker() {
  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#fff', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ display: 'flex', gap: 56, textAlign: 'center' }}>
        {[['', 12480, '', 'calls answered'], ['', 98, '%', 'SMS open rate'], ['$', 204000, '', 'no-shows saved']].map(([p, v, s, label], i) => (
          <div key={i}>
            <div style={{ fontSize: 'clamp(40px,6vw,72px)', fontWeight: 800, letterSpacing: '-.03em', color: '#0f0f12' }}>
              <Ticker to={v} prefix={p} suffix={s} />
            </div>
            <div style={{ fontSize: 14, color: '#6b6b76', marginTop: 6 }}>{label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
