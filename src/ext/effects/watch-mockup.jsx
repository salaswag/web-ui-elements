// Smartwatch Mockup — a rounded-square watch frame with a live-ticking ring and
// time. Pure CSS + a tiny clock interval (cleaned up on unmount).
import { useEffect, useState } from 'react'

export default function WatchMockup() {
  const [t, setT] = useState('9:41')
  useEffect(() => {
    // gentle animated progress ring driven by a slow interval
    let p = 0
    const id = setInterval(() => {
      p = (p + 3) % 100
      document.documentElement.style.setProperty('--wm-prog', `${p}%`)
    }, 90)
    return () => clearInterval(id)
  }, [])
  const css = `
  *{box-sizing:border-box;margin:0;padding:0}
  .wm-root{font-family:Inter,system-ui,sans-serif;background:#08080e;min-height:100vh;display:grid;place-items:center;padding:60px 24px}
  .wm-watch{position:relative;width:230px;height:268px;background:#1a1a22;border-radius:62px;padding:16px;box-shadow:0 30px 80px -30px rgba(16,185,129,.5),0 0 0 2px #2a2a35}
  .wm-band{position:absolute;left:50%;transform:translateX(-50%);width:120px;background:#23232e;z-index:0}
  .wm-band.top{top:-46px;height:60px;border-radius:14px 14px 0 0}
  .wm-band.bot{bottom:-46px;height:60px;border-radius:0 0 14px 14px}
  .wm-face{position:relative;z-index:1;width:100%;height:100%;border-radius:48px;background:#000;display:grid;place-items:center;overflow:hidden}
  .wm-ring{width:130px;height:130px;border-radius:50%;background:conic-gradient(#10b981 var(--wm-prog,30%),rgba(255,255,255,.08) 0);display:grid;place-items:center}
  .wm-inner{width:108px;height:108px;border-radius:50%;background:#000;display:grid;place-items:center;text-align:center;color:#fff}
  .wm-time{font-size:30px;font-weight:800;letter-spacing:-.02em}
  .wm-sub{font-size:11px;color:#10b981;margin-top:2px;letter-spacing:.06em}
  `
  return (
    <div className="wm-root">
      <style>{css}</style>
      <div className="wm-watch">
        <span className="wm-band top" />
        <div className="wm-face">
          <div className="wm-ring">
            <div className="wm-inner">
              <div>
                <div className="wm-time">{t}</div>
                <div className="wm-sub">ACTIVITY</div>
              </div>
            </div>
          </div>
        </div>
        <span className="wm-band bot" />
      </div>
    </div>
  )
}
