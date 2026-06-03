// On-Scroll Reveal — elements fade/slide in as they enter the viewport.
// Inspired by Codrops tutorials (IntersectionObserver, no library).
import { useEffect, useRef } from 'react'

export default function ScrollReveal() {
  const root = useRef(null)
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('in')),
      { threshold: 0.25 },
    )
    root.current.querySelectorAll('.reveal').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
  const blocks = ['Scroll down', 'Each block', 'reveals as it', 'enters the viewport.', 'No library needed.']
  return (
    <div ref={root} style={{ background: '#fff', fontFamily: 'Inter, sans-serif' }}>
      <style>{`.reveal{opacity:0;transform:translateY(40px);transition:opacity .7s ease, transform .7s ease}
        .reveal.in{opacity:1;transform:none}`}</style>
      <div style={{ height: '40vh' }} />
      {blocks.map((b, i) => (
        <div key={i} className="reveal" style={{ minHeight: '70vh', display: 'grid', placeItems: 'center', fontSize: 'clamp(32px,6vw,72px)', fontWeight: 800, letterSpacing: '-.03em', color: '#0f0f12' }}>
          {b}
        </div>
      ))}
    </div>
  )
}
