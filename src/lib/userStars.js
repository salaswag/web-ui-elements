const KEY = 'wde.stars.v1'
const listeners = new Set()

function read() {
  try { return new Set(JSON.parse(localStorage.getItem(KEY) || '[]')) } catch { return new Set() }
}
function write(set) {
  localStorage.setItem(KEY, JSON.stringify([...set]))
  listeners.forEach((fn) => fn())
}

export const toggleStar = (id) => { const s = read(); s.has(id) ? s.delete(id) : s.add(id); write(s) }
export const isStarred  = (id) => read().has(id)
export const getAll     = ()   => [...read()]
export const subscribe  = (fn) => { listeners.add(fn); return () => listeners.delete(fn) }
