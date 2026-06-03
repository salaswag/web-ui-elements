// Theme: 'light' | 'dark' | 'system'. Resolves 'system' via matchMedia.
// Applies data-theme="light|dark" to <html>. Persists choice in localStorage.

const KEY = 'wde.theme.v1'
const mq = typeof window !== 'undefined' ? window.matchMedia('(prefers-color-scheme: dark)') : null
const listeners = new Set()

export function getPref() {
  return localStorage.getItem(KEY) || 'system'
}
export function resolved(pref = getPref()) {
  if (pref === 'system') return mq && mq.matches ? 'dark' : 'light'
  return pref
}
export function apply(pref = getPref()) {
  document.documentElement.dataset.theme = resolved(pref)
}
export function setTheme(pref) {
  localStorage.setItem(KEY, pref)
  apply(pref)
  listeners.forEach((fn) => fn(pref))
}
export function subscribe(fn) {
  listeners.add(fn)
  return () => listeners.delete(fn)
}
export function init() {
  apply()
  // react to OS theme changes while on 'system'
  mq && mq.addEventListener('change', () => { if (getPref() === 'system') { apply(); listeners.forEach((fn) => fn('system')) } })
}
