// Expanding Focus Row — a row of panels where hovering one expands its width and
// reveals a caption while the rest shrink. Pure CSS flex transitions. Placeholders.
const PANELS = [
  { c: 'linear-gradient(160deg,#7c3aed,#4c1d95)', t: 'Discover', s: 'Find what fits.' },
  { c: 'linear-gradient(160deg,#0ea5e9,#0c4a6e)', t: 'Design', s: 'Shape the idea.' },
  { c: 'linear-gradient(160deg,#10b981,#064e3b)', t: 'Build', s: 'Ship it fast.' },
  { c: 'linear-gradient(160deg,#f59e0b,#7c2d12)', t: 'Launch', s: 'Go to market.' },
  { c: 'linear-gradient(160deg,#f43f5e,#881337)', t: 'Grow', s: 'Scale with data.' },
]

export default function FocusRow() {
  const css = `
  *{box-sizing:border-box;margin:0;padding:0}
  .fr-root{font-family:Inter,system-ui,sans-serif;min-height:100vh;background:#0b0b12;display:grid;place-items:center;padding:70px 24px}
  .fr-row{display:flex;gap:12px;width:100%;max-width:920px;height:440px}
  .fr-panel{position:relative;flex:1;border-radius:18px;overflow:hidden;cursor:pointer;transition:flex .5s cubic-bezier(.2,.7,.2,1)}
  .fr-panel:hover{flex:3.4}
  .fr-panel::after{content:'';position:absolute;inset:0;background:rgba(0,0,0,.25);transition:background .4s}
  .fr-panel:hover::after{background:rgba(0,0,0,0)}
  .fr-cap{position:absolute;left:0;right:0;bottom:0;z-index:2;padding:22px;color:#fff}
  .fr-t{font-size:20px;font-weight:900;letter-spacing:-.01em;writing-mode:vertical-rl;transform:rotate(180deg);transition:writing-mode 0s, transform .3s;white-space:nowrap}
  .fr-panel:hover .fr-t{writing-mode:horizontal-tb;transform:none}
  .fr-s{font-size:13px;opacity:0;color:rgba(255,255,255,.8);margin-top:6px;transition:opacity .4s .15s}
  .fr-panel:hover .fr-s{opacity:1}
  @media(max-width:680px){.fr-row{height:380px}.fr-t{writing-mode:horizontal-tb;transform:none;font-size:15px}}
  `
  return (
    <div className="fr-root">
      <style>{css}</style>
      <div className="fr-row">
        {PANELS.map((p) => (
          <div className="fr-panel" key={p.t} style={{ background: p.c }}>
            <div className="fr-cap">
              <div className="fr-t">{p.t}</div>
              <div className="fr-s">{p.s}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
