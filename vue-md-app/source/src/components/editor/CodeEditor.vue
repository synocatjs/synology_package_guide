
<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { useFilesStore } from '@/stores/files'
import { useEditorStore } from '@/stores/editor'
import { useEditor } from '@/composables/useEditor'

const emit = defineEmits<{
  (e: 'update:textareaRef', el: HTMLTextAreaElement | null): void
}>()

const filesStore  = useFilesStore()
const editorStore = useEditorStore()

const textareaEl = ref<HTMLTextAreaElement | null>(null)
const wrapEl     = ref<HTMLDivElement | null>(null)

const {
  handleEnter,
  handleTab,
  trackCursor,
  insertFormat,
  insertRaw,
  formatButtons,
  insertTemplates,
  applyFormat,
  applyTemplate,
} = useEditor(textareaEl)

// Expose textarea ref to parent
watch(textareaEl, el => emit('update:textareaRef', el))

const lineCount = computed(() => {
  const content = filesStore.currentFile?.content ?? ''
  return content.split('\n').length
})

const lineNumbers = computed(() => Array.from({ length: lineCount.value }, (_, i) => i + 1))

const settings = computed(() => editorStore.settings)

function onInput(e: Event) {
  const ta = e.target as HTMLTextAreaElement
  const file = filesStore.currentFile
  if (!file) return
  filesStore.updateContent(file.id, ta.value)
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter' && !e.shiftKey) {
    handleEnter(e)
    return
  }
  if (e.key === 'Tab') {
    handleTab(e)
    return
  }
  // Per-editor shortcuts (formatting)
  if (e.ctrlKey || e.metaKey) {
    if (e.key === 'b') { e.preventDefault(); insertFormat('**', '**', '粗体'); return }
    if (e.key === 'i') { e.preventDefault(); insertFormat('*', '*', '斜体'); return }
  }
}

// Sync scroll between line numbers and textarea
function onScroll(e: Event) {
  const ta = e.target as HTMLTextAreaElement
  const lineEl = wrapEl.value?.querySelector('.line-numbers') as HTMLElement
  if (lineEl) lineEl.scrollTop = ta.scrollTop
}

// Focus editor when file changes
watch(() => filesStore.currentId, () => nextTick(() => textareaEl.value?.focus()))
</script>

<template>
  <div
    class="flex flex-col flex-1 overflow-hidden"
    :style="{ background: 'var(--bg-primary)' }"
  >
    <div ref="wrapEl" class="flex flex-1 overflow-auto">
      <!-- Line numbers -->
      <div
        v-if="settings.showLineNumbers"
        class="line-numbers select-none overflow-hidden flex-shrink-0 pt-4 pb-4 text-right"
        :style="{
          paddingLeft: '12px',
          paddingRight: '10px',
          color: 'var(--text-muted)',
          fontFamily: 'theme(\'fontFamily.mono\')',
          fontSize: `${settings.fontSize}px`,
          lineHeight: settings.lineHeight,
          minWidth: '48px',
          borderRight: '1px solid var(--border)',
        }"
      >
        <div
          v-for="n in lineNumbers"
          :key="n"
          :style="{ lineHeight: `${settings.lineHeight * settings.fontSize}px` }"
        >
          {{ n }}
        </div>
      </div>

      <!-- Textarea -->
     <textarea
  v-if="filesStore.currentFile"
  ref="textareaEl"
  class="flex-1 bg-transparent border-none outline-none resize-none p-4"
  :value="filesStore.currentFile.content"
  :style="{
    fontFamily: 'JetBrains Mono, Fira Code, monospace',
    fontSize: `${settings.fontSize}px`,
    lineHeight: settings.lineHeight,
    caretColor: 'var(--accent)',
    color: 'var(--text-primary)',
    tabSize: settings.tabSize,
    whiteSpace: settings.wordWrap ? 'pre-wrap' : 'pre',
    overflowWrap: settings.wordWrap ? 'break-word' : 'normal',
    overflowX: settings.wordWrap ? 'hidden' : 'auto',
  }"
  :spellcheck="settings.spellCheck"
  placeholder="在此输入 Markdown..."
  @input="onInput"
  @keydown="onKeydown"
  @scroll="onScroll"
  @click="trackCursor"
  @keyup="trackCursor"
/>


      <!-- Empty state -->
      <div
        v-else
        class="flex-1 flex flex-col items-center justify-center gap-4"
        style="color: var(--text-muted)"
      >
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" style="opacity:0.25">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
          <polyline points="10 9 9 9 8 9"/>
        </svg>
        <div class="text-center">
          <p class="font-display font-bold text-base" style="color: var(--text-secondary)">DSM Markdown Editor</p>
          <p class="text-sm mt-1">新建文档或从侧边栏选择文件</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
textarea::selection {
  background: rgba(91, 138, 245, 0.25);
}
textarea::-webkit-scrollbar { width: 5px; }
textarea::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }
.line-numbers { overflow: hidden !important; }
</style>