import { useState, useRef, useEffect } from 'react'
import { FREQ_OPTIONS } from '../lib/userFrequency.js'
import './frequency-select.css'

const DEFAULT_OPTS = [{ value: '', label: 'Not set' }, ...FREQ_OPTIONS]

// Generic custom dropdown. When `options` not provided, uses frequency options.
// When `isUserSet` is provided, applies user/default state coloring.
// When `plain` is true, neutral appearance (no state coloring) — use for sort etc.
export default function FrequencySelect({
  value,
  onChange,
  isUserSet,
  compact = false,
  options,
  placeholder,
  plain = false,
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  const opts = options || DEFAULT_OPTS

  // Build label map from whatever options are passed
  const labelMap = Object.fromEntries(opts.map((o) => [o.value, o.label]))
  const displayLabel = labelMap[value ?? ''] ?? (placeholder || 'Select…')

  useEffect(() => {
    if (!open) return
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  const select = (val) => { setOpen(false); onChange(val) }

  const stateClass = plain
    ? 'fsel--plain'
    : (value && value !== '') ? (isUserSet ? 'fsel--user' : 'fsel--default') : 'fsel--empty'

  return (
    <div ref={ref} className={`fsel ${stateClass} ${compact ? 'fsel--compact' : ''} ${open ? 'fsel--open' : ''}`}>
      <button
        type="button"
        className="fsel-trigger"
        onClick={() => setOpen((o) => !o)}
        title={isUserSet ? 'Your setting — click to change' : value ? 'Suggested default — click to override' : undefined}
      >
        <span className="fsel-label">{displayLabel}</span>
        <svg className="fsel-chevron" viewBox="0 0 10 6" fill="none">
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {open && (
        <div className="fsel-menu">
          {opts.map((o) => (
            <button
              key={o.value}
              className={`fsel-item ${(value ?? '') === o.value ? 'fsel-item--active' : ''}`}
              onClick={() => select(o.value)}
            >
              {o.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
