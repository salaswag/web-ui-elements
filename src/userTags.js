// User-defined tags per demo, persisted in localStorage. Simple pub/sub so the hub
// re-renders when tags change. Shape: { [demoId]: string[] }.

const KEY = 'wde.userTags.v1'
const listeners = new Set()

function read() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '{}')
  } catch {
    return {}
  }
}
function write(data) {
  localStorage.setItem(KEY, JSON.stringify(data))
  listeners.forEach((fn) => fn())
}

export function getTags(id) {
  return read()[id] || []
}
export function getAllTags() {
  const data = read()
  const set = new Set()
  Object.values(data).forEach((arr) => arr.forEach((t) => set.add(t)))
  return [...set].sort()
}
export function addTag(id, tag) {
  const t = tag.trim()
  if (!t) return
  const data = read()
  const arr = data[id] || []
  if (!arr.includes(t)) data[id] = [...arr, t]
  write(data)
}
export function removeTag(id, tag) {
  const data = read()
  data[id] = (data[id] || []).filter((x) => x !== tag)
  if (!data[id].length) delete data[id]
  write(data)
}
export function subscribe(fn) {
  listeners.add(fn)
  return () => listeners.delete(fn)
}
