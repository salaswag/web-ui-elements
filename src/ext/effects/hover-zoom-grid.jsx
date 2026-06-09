// Hover Zoom Gallery — a tight grid of tiles; hovering one zooms its image inside a
// fixed frame and fades in a caption. Pure CSS (overflow + transform). Placeholders.
const TILES = [
  { c: 'linear-gradient(135deg,#7c3aed,#db2777)', t: 'Aurora' },
  { c: 'linear-gradient(135deg,#0ea5e9,#22d3ee)', t: 'Tide' },
  { c: 'linear-gradient(135deg,#f59e0b,#ef4444)', t: 'Ember' },
  { c: 'linear-gradient(135deg,#10b981,#84cc16)', t: 'Moss' },
  { c: 'linear-gradient(135deg,#6366f1,#8b5cf6)', t: 'Dusk' },
  { c: 'linear-gradient(135deg,#f43f5e,#fb7185)', t: 'Coral' },
]

export default function HoverZoomGrid() {
  const css = `
  *{box-sizing:border-box;margin:0;padding:0}
  .hz-root{font-family:Inter,system-ui,sans-serif;min-height:100vh;background:#0b0b12;display:grid;place-items:center;padding:70px 24px}
  .hz-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;width:100%;max-width:880px}
  .hz-tile{position:relative;aspect-ratio:4/3;border-radius:14px;overflow:hidden;cursor:pointer}
  .hz-img{position:absolute;inset:0;transition:transform .5s cubic-bezier(.2,.7,.2,1)}
  .hz-tile:hover .hz-img{transform:scale(1.14)}
  .hz-cap{position:absolute;left:0;right:0;bottom:0;padding:16px;color:#fff;font-weight:800;font-size:16px;background:linear-gradient(transparent,rgba(0,0,0,.6));opacity:0;transform:translateY(8px);transition:opacity .35s,transform .35s}
  .hz-tile:hover .hz-cap{opacity:1;transform:none}
  @media(max-width:680px){.hz-grid{grid-template-columns:1fr 1fr}}
  `
  return (
    <div className="hz-root">
      <style>{css}</style>
      <div className="hz-grid">
        {TILES.map((t) => (
          <div className="hz-tile" key={t.t}>
            <div className="hz-img" style={{ background: t.c }} />
            <div className="hz-cap">{t.t}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
