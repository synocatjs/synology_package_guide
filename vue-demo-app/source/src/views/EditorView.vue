<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useFilesStore } from '@/stores/files'
import { useEditorStore } from '@/stores/editor'
import { useEditor } from '@/composables/useEditor'
import { useAutoSave } from '@/composables/useAutoSave'
import { useKeyboard } from '@/composables/useKeyboard'

import AppSidebar       from '@/components/sidebar/AppSidebar.vue'
import AppToolbar       from '@/components/toolbar/AppToolbar.vue'
import CodeEditor       from '@/components/editor/CodeEditor.vue'
import MarkdownPreview  from '@/components/preview/MarkdownPreview.vue'
import StatusBar        from '@/components/editor/StatusBar.vue'
import SearchPanel      from '@/components/dialogs/SearchPanel.vue'
import CommandPalette   from '@/components/dialogs/CommandPalette.vue'
import SettingsPanel    from '@/components/dialogs/SettingsPanel.vue'
import AppNotifications from '@/components/ui/AppNotifications.vue'

const filesStore  = useFilesStore()
const editorStore = useEditorStore()

// Register global keyboard shortcuts
useKeyboard()
// Auto-save watcher
useAutoSave()

// Textarea ref passed down for format operations
const textareaEl = ref<HTMLTextAreaElement | null>(null)
const { insertFormat, insertRaw } = useEditor(textareaEl)

const isDragging = ref(false)

function onDragover(e: DragEvent) {
  e.preventDefault()
  isDragging.value = true
}
function onDragleave() { isDragging.value = false }

function onDrop(e: DragEvent) {
  e.preventDefault()
  isDragging.value = false
  const file = e.dataTransfer?.files?.[0]
  if (!file) return
  const allowed = ['.md', '.txt', '.markdown']
  const ext = file.name.slice(file.name.lastIndexOf('.'))
  if (!allowed.includes(ext)) {
    editorStore.notify({ type: 'warning', title: '不支持的文件类型', message: '请拖入 .md / .txt 文件' })
    return
  }
  const reader = new FileReader()
  reader.onload = (ev) => {
    const content = ev.target?.result as string ?? ''
    filesStore.importFile(file.name, content)
    editorStore.notify({ type: 'success', title: '文件已导入', message: file.name })
  }
  reader.readAsText(file, 'utf-8')
}

const viewMode = computed(() => editorStore.settings.viewMode)
const focusMode = computed(() => editorStore.settings.focusMode)
</script>

<template>
  <div
    class="flex h-screen overflow-hidden"
    :class="{ 'focus-active': focusMode }"
    @dragover="onDragover"
    @dragleave="onDragleave"
    @drop="onDrop"
  >
    <!-- Sidebar -->
    <AppSidebar v-show="!focusMode" />

    <!-- Main column -->
    <div class="flex flex-col flex-1 min-w-0 overflow-hidden">

      <!-- Toolbar (hidden in focus mode) -->
      <Transition name="slide-down">
        <AppToolbar
          v-show="!focusMode"
          :on-format="insertFormat"
          :on-insert="insertRaw"
        />
      </Transition>

      <!-- Search bar -->
      <SearchPanel />

      <!-- Editor area -->
      <div class="flex flex-1 min-h-0 overflow-hidden relative">

        <!-- Drag overlay -->
        <Transition name="fade">
          <div
            v-if="isDragging"
            class="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3"
            style="
              background: rgba(91,138,245,0.08);
              border: 2px dashed var(--accent);
              color: var(--accent);
            "
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
              <polyline points="17 8 12 3 7 8"/>
              <line x1="12" y1="3" x2="12" y2="15"/>
            </svg>
            <p class="font-display font-bold text-lg">拖拽 Markdown 文件到此处</p>
            <p class="text-sm" style="opacity:0.7">.md / .txt / .markdown</p>
          </div>
        </Transition>

        <!-- Edit pane -->
        <div
          v-if="viewMode !== 'preview'"
          class="flex flex-col overflow-hidden"
          :style="{ flex: viewMode === 'split' ? '1' : '1' }"
        >
          <!-- Pane label -->
          <div
            v-if="viewMode === 'split'"
            class="flex items-center gap-2 px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider flex-shrink-0"
            :style="{ borderBottom: '1px solid var(--border)', color: 'var(--text-muted)', background: 'var(--bg-secondary)' }"
          >
            <span style="color: var(--status-yellow)">●</span>
            Markdown 编辑
          </div>
          <CodeEditor @update:textarea-ref="el => textareaEl = el" />
        </div>

        <!-- Splitter -->
        <div
          v-if="viewMode === 'split'"
          class="w-px flex-shrink-0"
          style="background: var(--border)"
        />

        <!-- Preview pane -->
        <div
          v-if="viewMode !== 'edit'"
          class="flex flex-col overflow-hidden"
          :style="{ flex: viewMode === 'split' ? '1' : '1' }"
        >
          <MarkdownPreview />
        </div>
      </div>

      <!-- Status bar -->
      <StatusBar />
    </div>

    <!-- Global overlays -->
    <CommandPalette />
    <SettingsPanel />
    <AppNotifications />
  </div>
</template>

<style scoped>
.focus-active :deep(.sidebar) { width: 0 !important; }
</style>