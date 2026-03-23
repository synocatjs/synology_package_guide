
<script setup lang="ts">
import { computed, ref, watch, nextTick } from 'vue'
import hljs from 'highlight.js'
import { useFilesStore } from '@/stores/files'
import { useEditorStore } from '@/stores/editor'
import { renderMarkdown } from '@/utils/markdown'

const filesStore  = useFilesStore()
const editorStore = useEditorStore()
const containerEl = ref<HTMLDivElement | null>(null)

const rendered = computed(() => {
  const content = filesStore.currentFile?.content ?? ''
  let html = renderMarkdown(content)

  // Highlight search matches
  const q = editorStore.searchQuery.trim()
  if (q) {
    try {
      const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      const re = new RegExp(`(${escaped})`, 'gi')
      html = html.replace(re, '<mark>$1</mark>')
    } catch { /* ignore invalid regex */ }
  }
  return html
})

// Re-run hljs after DOM updates
watch(rendered, async () => {
  await nextTick()
  if (!containerEl.value) return
  containerEl.value.querySelectorAll<HTMLElement>('pre code:not(.hljs)').forEach(el => {
    hljs.highlightElement(el)
  })
})
</script>

<template>
  <div
    class="flex flex-col flex-1 overflow-hidden"
    :style="{ background: 'var(--bg-primary)' }"
  >
    <!-- Preview label -->
    <div
      class="flex items-center gap-2 px-4 py-1.5 flex-shrink-0 text-[10px] font-bold uppercase tracking-wider"
      :style="{ borderBottom: '1px solid var(--border)', color: 'var(--text-muted)', background: 'var(--bg-secondary)' }"
    >
      <span style="color: var(--accent)">●</span>
      实时预览
    </div>

    <div
      ref="containerEl"
      class="flex-1 overflow-y-auto prose-md"
      :style="{ padding: editorStore.settings.focusMode ? '48px max(10%, 72px)' : '32px 48px' }"
    >
      <div
        v-if="filesStore.currentFile"
        class="max-w-[720px] mx-auto font-prose"
        v-html="rendered"
      />
      <div
        v-else
        class="flex items-center justify-center h-full"
        style="color: var(--text-muted); font-size: 13px"
      >
        无内容可预览
      </div>
    </div>
  </div>
</template>