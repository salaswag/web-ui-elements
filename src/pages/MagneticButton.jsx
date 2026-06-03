import { useRef } from 'react'
import DemoChrome from '../components/DemoChrome.jsx'
import './magnetic-button.css'

function Magnetic({ children, className, strength = 0.4 }) {
  const ref = useRef(null)
  const label = useRef(null)
  const move = (e) => {
    const el = ref.current
    const r = el.getBoundingClientRect()
    const mx = e.clientX - (r.left + r.width / 2)
    const my = e.clientY - (r.top + r.height / 2)
    el.style.transform = `translate(${mx * strength}px, ${my * strength}px)`
    if (label.current) label.current.style.transform = `translate(${mx * strength * 0.45}px, ${my * strength * 0.45}px)`
  }
  const reset = () => {
    ref.current.style.transform = ''
    if (label.current) label.current.style.transform = ''
  }
  return (
    <button ref={ref} className={`mg-btn ${className}`} onMouseMove={move} onMouseLeave={reset}>
      <span ref={label} className="mg-label">{children}</span>
    </button>
  )
}

export default function MagneticButton() {
  return (
    <DemoChrome id="magnetic-button">
      <div className="mg-page">
        <div className="mg-stage">
          <span className="eyebrow">Global · add-anywhere</span>
          <h1 className="mg-title">Buttons that lean in.</h1>
          <p className="mg-sub">Move your cursor near each one — they magnetically follow, then spring back.</p>

          <div className="mg-row">
            <Magnetic className="solid">Book a demo</Magnetic>
            <Magnetic className="outline">Learn more</Magnetic>
            <Magnetic className="icon" strength={0.55}>→</Magnetic>
          </div>
        </div>
      </div>
    </DemoChrome>
  )
}
