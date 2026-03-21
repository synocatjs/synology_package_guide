
// ============================================================
// DSM Markdown Editor — Editor UI Store (Pinia)
// ============================================================

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { EditorSettings, ViewMode, Theme, DSMNotification } from '@/types'
import { readStorage, writeStorage, SETTINGS_KEY } from '@/utils/storage'

const DEFAULT_SETTINGS: EditorSettings = {
  theme: 'dark',
  viewMode: 'split',
  sidebarOpen: true,
  focusMode: false,
  fontSize: 13,
  lineHeight: 1.7,
  wordWrap: true,
  showLineNumbers: true,
  autoSave: true,
  autoSaveDelay: 2000,
  spellCheck: false,
  sortBy: 'modified',
  tabSize: 2,
}

export const useEditorStore = defineStore('editor', () => {
  // ---- State ----
  const settings = ref<EditorSettings>({ ...DEFAULT_SETTINGS })
  const showCommandPalette = ref(false)
  const showSearch = ref(false)
  const showSettings = ref(false)
  const searchQuery = ref('')
  const notifications = ref<(DSMNotification & { id: string; timer?: ReturnType<typeof setTimeout> })[]>([])
  const cursorLine = ref(1)
  const cursorCol = ref(1)
  const isDragging = ref(false)

  // ---- Computed ----
  const isDark = computed(() => settings.value.theme === 'dark')

  // ---- Actions ----
  function init() {
    const stored = readStorage<Partial<EditorSettings>>(SETTINGS_KEY, {})
    settings.value = { ...DEFAULT_SETTINGS, ...stored }
    applyTheme(settings.value.theme)
  }

  function applyTheme(theme: Theme) {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    root.classList.toggle('light', theme !== 'dark')
  }

  function setTheme(theme: Theme) {
    settings.value.theme = theme
    applyTheme(theme)
    persistSettings()
  }

  function toggleTheme() {
    setTheme(settings.value.theme === 'dark' ? 'light' : 'dark')
  }

  function setViewMode(mode: ViewMode) {
    settings.value.viewMode = mode
    persistSettings()
  }

  function toggleSidebar() {
    settings.value.sidebarOpen = !settings.value.sidebarOpen
    persistSettings()
  }

  function toggleFocusMode() {
    settings.value.focusMode = !settings.value.focusMode
    persistSettings()
  }

  function updateSettings(patch: Partial<EditorSettings>) {
    settings.value = { ...settings.value, ...patch }
    if (patch.theme) applyTheme(patch.theme)
    persistSettings()
  }

  function persistSettings() {
    writeStorage(SETTINGS_KEY, settings.value)
  }

  function openCommandPalette() {
    showCommandPalette.value = true
  }

  function closeCommandPalette() {
    showCommandPalette.value = false
  }

  function toggleSearch() {
    showSearch.value = !showSearch.value
    if (!showSearch.value) searchQuery.value = ''
  }

  function notify(n: DSMNotification) {
    const id = `notif-${Date.now()}`
    const duration = n.duration ?? 3000
    const item = { ...n, id }
    notifications.value.push(item)
    if (duration > 0) {
      setTimeout(() => dismissNotification(id), duration)
    }
  }

  function dismissNotification(id: string) {
    const idx = notifications.value.findIndex(n => n.id === id)
    if (idx !== -1) notifications.value.splice(idx, 1)
  }

  function updateCursor(line: number, col: number) {
    cursorLine.value = line
    cursorCol.value = col
  }

  return {
    settings,
    showCommandPalette,
    showSearch,
    showSettings,
    searchQuery,
    notifications,
    cursorLine,
    cursorCol,
    isDragging,
    isDark,
    init,
    setTheme,
    toggleTheme,
    setViewMode,
    toggleSidebar,
    toggleFocusMode,
    updateSettings,
    openCommandPalette,
    closeCommandPalette,
    toggleSearch,
    notify,
    dismissNotification,
    updateCursor,
  }
})