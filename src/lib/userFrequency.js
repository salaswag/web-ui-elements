// Per-effect usage frequency, persisted in localStorage.
// Values: 'everywhere' | 'often' | 'rare' | 'superrare' | null (unset = show default)

import { DEFAULT_FREQ } from './defaultFrequencies.js'

const KEY = 'wde.userFreq.v1'
const listeners = new Set()

export const FREQ_OPTIONS = [
  { value: 'everywhere', label: 'Use Everywhere' },
  { value: 'often',      label: 'Use Often' },
  { value: 'rare',       label: 'Rare' },
  { value: 'superrare',  label: 'Super Rare' },
]

// Map old option values to new ones (one-time migration)
const MIGRATE = { half: 'often', ten: 'rare' }

function read() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || '{}')
    // Migrate any old 'half'/'ten' values
    let changed = false
    for (const k in raw) {
      if (MIGRATE[raw[k]]) { raw[k] = MIGRATE[raw[k]]; changed = true }
    }
    if (changed) localStorage.setItem(KEY, JSON.stringify(raw))
    return raw
  } catch { return {} }
}
function write(data) {
  localStorage.setItem(KEY, JSON.stringify(data))
  listeners.forEach((fn) => fn())
}

export function getFreq(id) {
  return read()[id] || null
}

/** Returns the user-set value if present, otherwise the suggested default. */
export function getEffectiveFreq(id) {
  return read()[id] || DEFAULT_FREQ[id] || null
}

export function isUserSet(id) {
  return !!read()[id]
}

export function setFreq(id, val) {
  const data = read()
  if (val) data[id] = val
  else delete data[id]
  write(data)
}

export function subscribe(fn) {
  listeners.add(fn)
  return () => listeners.delete(fn)
}
