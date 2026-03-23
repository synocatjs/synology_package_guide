
// ============================================================
// DSM Markdown Editor — Storage Utility
// Mirrors DSM package data persistence patterns
// ============================================================

const FILES_KEY = 'dsm-mde:files'
const SETTINGS_KEY = 'dsm-mde:settings'

export function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export function writeStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (e) {
    console.warn('[DSM-MDE] Storage write failed:', e)
  }
}

export function removeStorage(key: string): void {
  try {
    localStorage.removeItem(key)
  } catch {}
}

export { FILES_KEY, SETTINGS_KEY }