// ============================================================
// DSM Markdown Editor — useKeyboard Composable
// Global keyboard shortcut registration
// ============================================================

import { onMounted, onUnmounted } from 'vue'
import { useFilesStore } from '@/stores/files'
import { useEditorStore } from '@/stores/editor'
import { exportMarkdown, exportHTML } from '@/utils/export'
import { renderMarkdown } from '@/utils/markdown'

export function useKeyboard() {
  const filesStore  = useFilesStore()
  const editorStore = useEditorStore()

  function handler(e: KeyboardEvent) {
    const ctrl = e.ctrlKey || e.metaKey

    // Ctrl+P — command palette
    if (ctrl && e.key === 'p') {
      e.preventDefault()
      editorStore.openCommandPalette()
      return
    }

    // Ctrl+S — save
    if (ctrl && e.key === 's' && !e.shiftKey) {
      e.preventDefault()
      const f = filesStore.currentFile
      if (f) {
        filesStore.saveFile(f.id)
        editorStore.notify({ type: 'success', title: '已保存', message: f.name })
      }
      return
    }

    // Ctrl+Shift+S — save all
    if (ctrl && e.shiftKey && e.key === 'S') {
      e.preventDefault()
      filesStore.saveAll()
      editorStore.notify({ type: 'success', title: '全部已保存', message: '' })
      return
    }

    // Ctrl+N — new file
    if (ctrl && e.key === 'n') {
      e.preventDefault()
      filesStore.newFile()
      return
    }

    // Ctrl+F — search
    if (ctrl && e.key === 'f') {
      e.preventDefault()
      editorStore.toggleSearch()
      return
    }

    // Ctrl+\ — toggle split view
    if (ctrl && e.key === '\\') {
      e.preventDefault()
      const next = editorStore.settings.viewMode === 'split' ? 'edit' : 'split'
      editorStore.setViewMode(next)
      return
    }

    // Ctrl+, — settings
    if (ctrl && e.key === ',') {
      e.preventDefault()
      editorStore.showSettings = true
      return
    }

    // F11 — focus mode
    if (e.key === 'F11') {
      e.preventDefault()
      editorStore.toggleFocusMode()
      return
    }

    // Escape — close overlays
    if (e.key === 'Escape') {
      editorStore.closeCommandPalette()
      if (editorStore.showSearch) editorStore.toggleSearch()
      if (editorStore.showSettings) editorStore.showSettings = false
      return
    }
  }

  onMounted(() => document.addEventListener('keydown', handler))
  onUnmounted(() => document.removeEventListener('keydown', handler))
}