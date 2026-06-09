// View Transitions API — native browser transition between views using
// document.startViewTransition(). No JS animation library. Chrome 111+.
import { useState } from 'react'

const VIEWS = [
  {
    id: 'home',
    bg: '#0b0b12',
    accent: '#7c3aed',
    title: 'Home',
    headline: 'The starting point.',
    body: 'Every journey begins somewhere. This is the view that grounds everything else.',
    items: ['Dashboard', 'Projects', 'Activity'],
    next: 'projects',
    nextLabel: 'Go to Projects →',
  },
  {
    id: 'projects',
    bg: '#0a1628',
    accent: '#3b82f6',
    title: 'Projects',
    headline: 'Where work lives.',
    body: 'Three projects in progress. One shipped last week. Two more in the pipeline.',
    items: ['Atlas — Active', 'Nova — Shipped', 'Forge — Planning'],
    next: 'detail',
    nextLabel: 'Open Detail →',
  },
  {
    id: 'detail',
    bg: '#041a12',
    accent: '#10b981',
    title: 'Detail',
    headline: 'Zoomed in.',
    body: 'The full picture only appears when you commit to one thing long enough to see it clearly.',
    items: ['Spec v3.1', 'Design Review', 'Shipping Friday'],
    next: 'home',
    nextLabel: 'Back to Home →',
  },
]

const css = `
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:Inter,system-ui,sans-serif}
.vt-wrap{min-height:100vh;display:flex;flex-direction:column}
.vt-header{
  padding:20px 32px;border-bottom:1px solid rgba(255,255,255,.08);
  display:flex;align-items:center;gap:16px;
}
.vt-badge{
  font-size:10px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;
  padding:3px 10px;border-radius:20px;background:rgba(255,255,255,.08);color:rgba(255,255,255,.5);
}
.vt-view-name{
  font-size:13px;font-weight:600;color:rgba(255,255,255,.6);
  view-transition-name:view-label;
}
.vt-body{
  flex:1;display:flex;align-items:center;justify-content:center;
  padding:60px 5vw;
  view-transition-name:main-content;
}
.vt-inner{max-width:580px;width:100%}
.vt-eyebrow{
  font-size:10px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;
  margin-bottom:20px;
}
.vt-h{
  font-size:clamp(40px,6vw,72px);font-weight:900;letter-spacing:-.04em;
  line-height:.95;color:#fff;margin-bottom:18px;
}
.vt-p{font-size:16px;line-height:1.65;opacity:.55;color:#fff;margin-bottom:40px}
.vt-items{display:flex;flex-direction:column;gap:10px;margin-bottom:48px}
.vt-item{
  padding:14px 18px;border-radius:10px;background:rgba(255,255,255,.05);
  border:1px solid rgba(255,255,255,.08);
  font-size:14px;color:rgba(255,255,255,.7);
  transform:translateX(-8px);
  view-transition-name:none;
}
.vt-btn{
  display:inline-flex;align-items:center;gap:8px;
  font-family:Inter,system-ui,sans-serif;font-size:14px;font-weight:600;
  padding:13px 24px;border-radius:10px;border:none;
  cursor:pointer;transition:opacity .15s;
}
.vt-btn:hover{opacity:.85}
.vt-note{
  position:fixed;bottom:20px;left:50%;transform:translateX(-50%);
  font-size:11px;letter-spacing:.1em;text-transform:uppercase;
  color:rgba(255,255,255,.25);background:#0b0b12;
  padding:6px 14px;border-radius:20px;border:1px solid rgba(255,255,255,.08);
  pointer-events:none;white-space:nowrap;
}

/* View transition animations */
@keyframes vt-slide-in{
  from{opacity:0;transform:translateY(20px)}
  to{opacity:1;transform:translateY(0)}
}
@keyframes vt-slide-out{
  from{opacity:1;transform:translateY(0)}
  to{opacity:0;transform:translateY(-16px)}
}
::view-transition-old(main-content){ animation:vt-slide-out .28s ease-in both }
::view-transition-new(main-content){ animation:vt-slide-in  .35s ease-out both }
::view-transition-old(view-label)  { animation:vt-slide-out .2s ease-in both }
::view-transition-new(view-label)  { animation:vt-slide-in  .28s ease-out both }
`

export default function ViewTransition() {
  const [viewId, setViewId] = useState('home')
  const view = VIEWS.find((v) => v.id === viewId)

  const goto = (nextId) => {
    if (!document.startViewTransition) {
      setViewId(nextId)
      return
    }
    document.startViewTransition(() => setViewId(nextId))
  }

  return (
    <div className="vt-wrap" style={{ background: view.bg }}>
      <style>{css}</style>
      <div className="vt-header" style={{ background: view.bg }}>
        <div className="vt-badge">View Transitions API</div>
        <span className="vt-view-name">{view.title}</span>
      </div>
      <div className="vt-body" style={{ background: view.bg }}>
        <div className="vt-inner">
          <div className="vt-eyebrow" style={{ color: view.accent }}>{view.id.toUpperCase()}</div>
          <h2 className="vt-h">{view.headline}</h2>
          <p className="vt-p">{view.body}</p>
          <div className="vt-items">
            {view.items.map((item, i) => (
              <div key={i} className="vt-item">{item}</div>
            ))}
          </div>
          <button
            className="vt-btn"
            style={{ background: view.accent, color: '#fff' }}
            onClick={() => goto(view.next)}
          >
            {view.nextLabel}
          </button>
        </div>
      </div>
      <div className="vt-note">
        {typeof document !== 'undefined' && !document.startViewTransition
          ? 'Upgrade to Chrome 111+ to see transitions'
          : 'Click the button to trigger a native view transition'}
      </div>
    </div>
  )
}
