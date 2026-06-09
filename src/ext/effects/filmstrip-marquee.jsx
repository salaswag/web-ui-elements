// Filmstrip Marquee — a seamless auto-scrolling row of gallery cards that pauses on
// hover. Duplicated track + CSS translateX loop. Zero dependencies.
const SHOTS = [
  { c: 'linear-gradient(135deg,#7c3aed,#db2777)', t: 'Studio' },
  { c: 'linear-gradient(135deg,#0ea5e9,#22d3ee)', t: 'Coastline' },
  { c: 'linear-gradient(135deg,#f59e0b,#ef4444)', t: 'Desert' },
  { c: 'linear-gradient(135deg,#10b981,#84cc16)', t: 'Forest' },
  { c: 'linear-gradient(135deg,#6366f1,#8b5cf6)', t: 'Night' },
  { c: 'linear-gradient(135deg,#f43f5e,#fb7185)', t: 'Bloom' },
]

export default function FilmstripMarquee() {
  const css = `
  *{box-sizing:border-box;margin:0;padding:0}
  .fm-root{font-family:Inter,system-ui,sans-serif;min-height:100vh;background:#0b0b12;display:flex;flex-direction:column;justify-content:center;gap:18px;overflow:hidden;color:#fff}
  .fm-head{text-align:center;padding:0 24px}
  .fm-head h2{font-size:clamp(26px,4vw,44px);font-weight:900;letter-spacing:-.03em}
  .fm-head p{color:rgba(255,255,255,.45);font-size:14px;margin-top:8px}
  .fm-mask{-webkit-mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent);mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)}
  .fm-track{display:flex;gap:18px;width:max-content;animation:fm-roll 26s linear infinite}
  .fm-mask:hover .fm-track{animation-play-state:paused}
  @keyframes fm-roll{from{transform:translateX(0)}to{transform:translateX(-50%)}}
  .fm-card{position:relative;width:280px;aspect-ratio:3/2;border-radius:16px;flex-shrink:0;overflow:hidden}
  .fm-card span{position:absolute;left:0;right:0;bottom:0;padding:14px 16px;font-weight:800;font-size:15px;background:linear-gradient(transparent,rgba(0,0,0,.55))}
  `
  const all = [...SHOTS, ...SHOTS]
  return (
    <div className="fm-root">
      <style>{css}</style>
      <div className="fm-head"><h2>The gallery, in motion.</h2><p>Hover to pause the strip.</p></div>
      <div className="fm-mask">
        <div className="fm-track">
          {all.map((s, i) => (
            <div className="fm-card" key={i} style={{ background: s.c }}><span>{s.t}</span></div>
          ))}
        </div>
      </div>
    </div>
  )
}
