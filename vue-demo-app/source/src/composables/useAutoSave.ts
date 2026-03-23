// ============================================================
// DSM Markdown Editor — useAutoSave Composable
// ============================================================

import { watch, ref } from 'vue'
import { useFilesStore } from '@/stores/files'
import { useEditorStore } from '@/stores/editor'

export function useAutoSave() {
  const filesStore  = useFilesStore()
  const editorStore = useEditorStore()
  const timer = ref<ReturnType<typeof setTimeout> | null>(null)

  function scheduleAutoSave() {
    if (!editorStore.settings.autoSave) return
    if (timer.value) clearTimeout(timer.value)
    timer.value = setTimeout(() => {
      const file = filesStore.currentFile
      if (file && !file.saved) {
        filesStore.saveFile(file.id)
      }
    }, editorStore.settings.autoSaveDelay)
  }

  function cancelAutoSave() {
    if (timer.value) {
      clearTimeout(timer.value)
      timer.value = null
    }
  }

  // Watch content changes on current file
  watch(
    () => filesStore.currentFile?.content,
    () => scheduleAutoSave(),
  )

  return { scheduleAutoSave, cancelAutoSave }
}