import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { demos, CATEGORIES } from '../prompts.js'
import './site-sidebar.css'

const inIframe = typeof window !== 'undefined' && window.self !== window.top

export default function SiteSidebar() {
  const [open, setOpen] = useState(false)
  const loc = useLocation()
  if (inIframe) return null // hidden inside preview embeds

  // group demos by first matching category, but list under every category they belong to
  const groups = CATEGORIES.map((cat) => ({
    cat,
    items: demos.filter((d) => d.categories.includes(cat) && d.route && d.live !== false),
  })).filter((g) => g.items.length)

  return (
    <>
      <button className="sb-toggle" onClick={() => setOpen(true)} aria-label="Browse demos">
        <span /><span /><span />
        Browse
      </button>

      <div className={`sb-scrim ${open ? 'show' : ''}`} onClick={() => setOpen(false)} />
      <nav className={`sb-panel ${open ? 'show' : ''}`} aria-hidden={!open}>
        <div className="sb-head">
          <Link to="/" className="sb-home" onClick={() => setOpen(false)}>← All demos</Link>
          <button className="sb-close" onClick={() => setOpen(false)} aria-label="Close">×</button>
        </div>
        <div className="sb-scroll">
          {groups.map((g) => (
            <div className="sb-group" key={g.cat}>
              <div className="sb-cat">{g.cat}</div>
              {g.items.map((d) => (
                <Link
                  key={d.id}
                  to={d.route}
                  className={`sb-link ${loc.pathname === d.route ? 'on' : ''}`}
                  onClick={() => setOpen(false)}
                >
                  <span className="sb-num">{d.num}</span>
                  {d.title}
                  {d.variantLabel && <span className="sb-var">{d.variantLabel}</span>}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </nav>
    </>
  )
}
