// Auto-registry for external effects. Each effect is ONE self-contained .jsx file in
// ./effects. We load BOTH the live component AND its real source text (via ?raw) so the
// "View code" panel shows the exact code that renders the preview — clickable, real files.

const comps = import.meta.glob('./effects/*.jsx', { eager: true })
const raws = import.meta.glob('./effects/*.jsx', { eager: true, query: '?raw', import: 'default' })

const slug = (p) => p.split('/').pop().replace(/\.\w+$/, '')

export const registry = {}
for (const p in comps) {
  const s = slug(p)
  registry[s] = registry[s] || { files: [] }
  registry[s].Component = comps[p].default
}
for (const p in raws) {
  const s = slug(p)
  registry[s] = registry[s] || { files: [] }
  registry[s].files.push({ file: p.split('/').pop(), content: raws[p] })
}

export const getExtComponent = (s) => registry[s] && registry[s].Component
export const getExtFiles = (s) => (registry[s] && registry[s].files) || []
