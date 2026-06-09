import { useEffect, useRef, useState, useCallback } from 'react'
import DemoChrome from '../components/DemoChrome.jsx'
import './tilt-shimmer.css'

// holographic card that tilts in 3D + shifts its shimmer with device orientation (mouse fallback)
export default function TiltShimmer() {
  const card = useRef(null)
  const [needPerm, setNeedPerm] = useState(false)

  const setTilt = useCallback((rx, ry) => {
    const el = card.current
    if (!el) return
    el.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`
    const sx = 50 + ry * 2.2
    const sy = 50 - rx * 2.2
    el.style.setProperty('--sx', `${sx}%`)
    el.style.setProperty('--sy', `${sy}%`)
  }, [])

  // Stable handler reference so enableMotion can register it AND the effect cleanup
  // can remove it.
  const onOrient = useCallback((e) => setTilt(
    Math.max(-20, Math.min(20, ((e.beta || 0) - 45) / 2)),
    Math.max(-20, Math.min(20, (e.gamma || 0) / 2)),
  ), [setTilt])

  useEffect(() => {
    const onMouse = (e) => {
      const r = card.current.getBoundingClientRect()
      const px = (e.clientX - (r.left + r.width / 2)) / r.width
      const py = (e.clientY - (r.top + r.height / 2)) / r.height
      setTilt(-py * 18, px * 18)
    }
    window.addEventListener('mousemove', onMouse)
    const DOE = window.DeviceOrientationEvent
    if (DOE && typeof DOE.requestPermission === 'function') setNeedPerm(true)
    else if (DOE) window.addEventListener('deviceorientation', onOrient)
    return () => {
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('deviceorientation', onOrient)
    }
  }, [setTilt, onOrient])

  const enableMotion = async () => {
    try {
      if ((await window.DeviceOrientationEvent.requestPermission()) === 'granted') {
        window.addEventListener('deviceorientation', onOrient)
        setNeedPerm(false)
      }
    } catch { /* ignore */ }
  }

  return (
    <DemoChrome id="tilt-shimmer">
      <div className="ts-page">
        <div className="ts-stage">
          <span className="eyebrow">Mobile-first · gyroscope</span>
          <div className="ts-card-wrap">
            <div className="ts-card" ref={card}>
              <div className="ts-shine" />
              <div className="ts-content">
                <span className="ts-chip">MEMBER</span>
                <span className="ts-name">Atlas Augment</span>
                <span className="ts-no">•••• 2026</span>
              </div>
            </div>
          </div>
          <p className="ts-hint">Tilt the phone (or move your mouse) — the holographic sheen follows.</p>
          {needPerm && <button className="ts-enable" onClick={enableMotion}>Enable motion</button>}
        </div>
      </div>
    </DemoChrome>
  )
}
