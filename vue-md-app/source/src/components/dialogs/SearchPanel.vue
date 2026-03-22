<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { Search, X, ChevronUp, ChevronDown } from 'lucide-vue-next'
import { useEditorStore } from '@/stores/editor'
import { useFilesStore } from '@/stores/files'

const editorStore = useEditorStore()
const filesStore  = useFilesStore()
const inputEl     = ref<HTMLInputElement | null>(null)

const count = computed(() => {
  const q = editorStore.searchQuery.trim()
  if (!q || !filesStore.currentFile) return 0
  try {
    const re = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi')
    return (filesStore.currentFile.content.match(re) ?? []).length
  } catch { return 0 }
})

function close() {
  editorStore.searchQuery = ''
  editorStore.showSearch  = false
}

watch(
  () => editorStore.showSearch,
  async (v) => { if (v) { await nextTick(); inputEl.value?.focus() } },
)
</script>

<template>
  <Transition name="slide-down">
    <div
      v-if="editorStore.showSearch"
      class="flex items-center gap-2 px-3 py-2 flex-shrink-0"
      :style="{
        background: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border)',
      }"
    >
      <Search :size="13" :style="{ color: 'var(--text-muted)', flexShrink: 0 }" />

      <input
        ref="inputEl"
        v-model="editorStore.searchQuery"
        class="field flex-1 text-xs"
        style="height: 28px; padding: 0 10px"
        placeholder="查找内容..."
        @keydown.esc="close"
      />

      <span class="text-[11px] whitespace-nowrap" style="color: var(--text-muted)">
        <template v-if="editorStore.searchQuery">
          {{ count }} 处匹配
        </template>
      </span>

      <div class="flex items-center gap-0.5">
        <button class="tb-btn" style="width:26px;height:26px" title="上一处">
          <ChevronUp :size="13" />
        </button>
        <button class="tb-btn" style="width:26px;height:26px" title="下一处">
          <ChevronDown :size="13" />
        </button>
        <button class="tb-btn" style="width:26px;height:26px" title="关闭" @click="close">
          <X :size="13" />
        </button>
      </div>
    </div>
  </Transition>
</template>