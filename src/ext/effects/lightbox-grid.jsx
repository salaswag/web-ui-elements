// Lightbox Grid — click any thumbnail to expand it into a centered overlay with a
// dimmed backdrop; click anywhere or Esc to close. Pure React state. Placeholders.
import { useEffect, useState } from 'react'

const PICS = [
  'linear-gradient(135deg,#7c3aed,#db2777)', 'linear-gradient(135deg,#0ea5e9,#22d3ee)',
  'linear-gradient(135deg,#f59e0b,#ef4444)', 'linear-gradient(135deg,#10b981,#84cc16)',
  'linear-gradient(135deg,#6366f1,#8b5cf6)', 'linear-gradient(135deg,#f43f5e,#fb7185)',
  'linear-gradient(135deg,#14b8a6,#0ea5e9)', 'linear-gradient(135deg,#a855f7,#6366f1)',
]

export default function LightboxGrid() {
  const [open, setOpen] = useState(null)
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setOpen(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])
  const css = `
  *{box-sizing:border-box;margin:0;padding:0}
  .lb-root{font-family:Inter,system-ui,sans-serif;min-height:100vh;background:#0b0b12;padding:70px 24px;display:grid;place-items:center}
  .lb-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;width:100%;max-width:880px}
  .lb-thumb{aspect-ratio:1;border-radius:12px;cursor:pointer;transition:transform .25s,box-shadow .25s}
  .lb-thumb:hover{transform:translateY(-4px);box-shadow:0 16px 34px -16px rgba(124,58,237,.7)}
  .lb-scrim{position:fixed;inset:0;background:rgba(5,5,10,.86);backdrop-filter:blur(6px);display:grid;place-items:center;z-index:50;padding:40px;animation:lb-fade .25s ease}
  @keyframes lb-fade{from{opacity:0}to{opacity:1}}
  .lb-big{width:min(560px,90vw);aspect-ratio:1;border-radius:20px;box-shadow:0 40px 100px -30px rgba(0,0,0,.9);animation:lb-pop .3s cubic-bezier(.2,.8,.2,1)}
  @keyframes lb-pop{from{transform:scale(.8);opacity:0}to{transform:scale(1);opacity:1}}
  .lb-close{position:fixed;top:24px;right:28px;color:#fff;font-size:30px;background:none;border:none;cursor:pointer;line-height:1}
  @media(max-width:680px){.lb-grid{grid-template-columns:repeat(3,1fr)}}
  `
  return (
    <div className="lb-root">
      <style>{css}</style>
      <div className="lb-grid">
        {PICS.map((p, i) => (
          <div key={i} className="lb-thumb" style={{ background: p }} onClick={() => setOpen(i)} />
        ))}
      </div>
      {open !== null && (
        <div className="lb-scrim" onClick={() => setOpen(null)}>
          <button className="lb-close" aria-label="Close">×</button>
          <div className="lb-big" style={{ background: PICS[open] }} onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </div>
  )
}
