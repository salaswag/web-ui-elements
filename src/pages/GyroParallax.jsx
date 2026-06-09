import { useEffect, useRef, useState, useCallback } from 'react'
import DemoChrome from '../components/DemoChrome.jsx'
import './gyro-parallax.css'

// layered parallax scene driven by device tilt (gyroscope) with a mouse fallback.
const layers = [
  { cls: 'sky', depth: 6 },
  { cls: 'hills', depth: 16 },
  { cls: 'mid', depth: 30 },
  { cls: 'fore', depth: 52 },
]

export default function GyroParallax() {
  const root = useRef(null)
  const [needPerm, setNeedPerm] = useState(false)
  const tx = useRef(0)
  const ty = useRef(0)

  const apply = useCallback(() => {
    const els = root.current?.querySelectorAll('.gp-layer') || []
    els.forEach((el) => {
      const d = Number(el.dataset.depth)
      el.style.transform = `translate3d(${tx.current * d}px, ${ty.current * d}px, 0)`
    })
  }, [])

  // Stable handler reference so enableMotion can register it AND the effect cleanup
  // can remove it (gamma: left-right -90..90, beta: front-back -180..180).
  const onOrient = useCallback((e) => {
    const clamp = (v, a, b) => Math.max(a, Math.min(b, v))
    tx.current = clamp((e.gamma || 0) / 45, -1, 1)
    ty.current = clamp(((e.beta || 0) - 45) / 45, -1, 1)
    apply()
  }, [apply])

  useEffect(() => {
    const onMouse = (e) => {
      tx.current = (e.clientX / window.innerWidth - 0.5) * 2
      ty.current = (e.clientY / window.innerHeight - 0.5) * 2
      apply()
    }
    window.addEventListener('mousemove', onMouse)
    // iOS 13+ needs a user-gesture permission; flag it
    const DOE = window.DeviceOrientationEvent
    if (DOE && typeof DOE.requestPermission === 'function') {
      setNeedPerm(true)
    } else if (DOE) {
      window.addEventListener('deviceorientation', onOrient)
    }
    return () => {
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('deviceorientation', onOrient)
    }
  }, [apply, onOrient])

  const enableMotion = async () => {
    try {
      const res = await window.DeviceOrientationEvent.requestPermission()
      if (res === 'granted') {
        window.addEventListener('deviceorientation', onOrient)
        setNeedPerm(false)
      }
    } catch { /* ignore */ }
  }

  return (
    <DemoChrome id="gyro-parallax">
      <div className="gp-page" ref={root}>
        <div className="gp-scene">
          {layers.map((l) => (
            <div key={l.cls} className={`gp-layer gp-${l.cls}`} data-depth={l.depth} />
          ))}
          <div className="gp-copy">
            <span className="eyebrow">Mobile-first · gyroscope</span>
            <h1>Tilt your phone.</h1>
            <p>The layers shift with the device’s orientation (mouse-move on desktop).</p>
            {needPerm && <button className="gp-enable" onClick={enableMotion}>Enable motion</button>}
          </div>
        </div>
      </div>
    </DemoChrome>
  )
}
