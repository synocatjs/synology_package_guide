<script setup lang="ts">
import { computed } from 'vue'
import { useFilesStore } from '@/stores/files'
import { useEditorStore } from '@/stores/editor'
import { computeStats } from '@/utils/markdown'

const filesStore  = useFilesStore()
const editorStore = useEditorStore()

const stats = computed(() => {
  const content = filesStore.currentFile?.content ?? ''
  return computeStats(content)
})

const savedStatus = computed(() => {
  const f = filesStore.currentFile
  if (!f) return { label: '无文档', color: 'var(--text-muted)' }
  return f.saved
    ? { label: '已保存', color: 'var(--status-green)' }
    : { label: '未保存', color: 'var(--status-yellow)' }
})
</script>

<template>
  <footer
    class="flex items-center gap-4 px-4 flex-shrink-0 font-mono text-[11px] font-semibold"
    :style="{
      height: 'var(--statusbar-h)',
      background: 'var(--accent)',
      color: 'rgba(255,255,255,0.88)',
    }"
  >
    <!-- Saved status -->
    <div class="flex items-center gap-1.5">
      <span
        class="w-1.5 h-1.5 rounded-full flex-shrink-0"
        :style="{ background: savedStatus.color }"
      />
      {{ savedStatus.label }}
    </div>

    <span style="opacity: 0.4">|</span>

    <template v-if="filesStore.currentFile">
      <span>第 {{ editorStore.cursorLine }} 行, 第 {{ editorStore.cursorCol }} 列</span>
      <span style="opacity: 0.4">|</span>
      <span>{{ stats.lines }} 行</span>
      <span>{{ stats.words }} 字</span>
      <span>{{ stats.chars }} 字符</span>
    </template>

    <div class="ml-auto flex items-center gap-4">
      <template v-if="filesStore.currentFile">
        <span>约 {{ stats.readingMinutes }} 分钟阅读</span>
        <span style="opacity: 0.4">|</span>
      </template>
      <span>DSM 7 · Markdown · UTF-8</span>
      <span>Vue 3 + TypeScript</span>
    </div>
  </footer>
</template>