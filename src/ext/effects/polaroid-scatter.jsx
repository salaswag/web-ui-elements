// Polaroid Scatter — photo cards tossed at random angles; hovering one straightens
// it, lifts it, and brings it to front. Pure CSS transitions. Gradient placeholders.
const PICS = [
  { c: 'linear-gradient(135deg,#f472b6,#7c3aed)', cap: 'Launch day', r: -8, x: -210, y: -30 },
  { c: 'linear-gradient(135deg,#22d3ee,#3b82f6)', cap: 'The team', r: 6, x: -70, y: 20 },
  { c: 'linear-gradient(135deg,#f59e0b,#ef4444)', cap: 'First office', r: -4, x: 70, y: -20 },
  { c: 'linear-gradient(135deg,#34d399,#10b981)', cap: 'Offsite', r: 9, x: 210, y: 24 },
]

export default function PolaroidScatter() {
  const css = `
  *{box-sizing:border-box;margin:0;padding:0}
  .ps-root{font-family:Inter,system-ui,sans-serif;min-height:100vh;background:#14141b;display:grid;place-items:center;padding:60px 24px;overflow:hidden}
  .ps-stage{position:relative;width:min(620px,90vw);height:420px}
  .ps-card{position:absolute;top:50%;left:50%;width:180px;background:#fff;padding:12px 12px 0;border-radius:4px;box-shadow:0 18px 40px -16px rgba(0,0,0,.6);transition:transform .35s cubic-bezier(.2,.7,.2,1),box-shadow .35s;cursor:pointer}
  .ps-photo{aspect-ratio:1;border-radius:2px}
  .ps-cap{font-family:'Fraunces',Georgia,serif;text-align:center;padding:12px 4px 16px;font-size:15px;color:#1a1a1a}
  .ps-card:hover{transform:translate(-50%,-50%) rotate(0deg) scale(1.08) !important;z-index:10;box-shadow:0 30px 60px -18px rgba(0,0,0,.7)}
  .ps-hint{position:absolute;bottom:34px;color:rgba(255,255,255,.4);font-size:12px;letter-spacing:.05em}
  `
  return (
    <div className="ps-root">
      <style>{css}</style>
      <div className="ps-stage">
        {PICS.map((p, i) => (
          <div key={i} className="ps-card"
            style={{ transform: `translate(calc(-50% + ${p.x}px), calc(-50% + ${p.y}px)) rotate(${p.r}deg)` }}>
            <div className="ps-photo" style={{ background: p.c }} />
            <div className="ps-cap">{p.cap}</div>
          </div>
        ))}
        <span className="ps-hint">hover a photo — it straightens</span>
      </div>
    </div>
  )
}
