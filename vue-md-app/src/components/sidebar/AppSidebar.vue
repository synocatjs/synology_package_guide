<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { FilePlus, FileText, Trash2, Clock, AlignLeft } from 'lucide-vue-next'
import { useFilesStore } from '@/stores/files'
import { useEditorStore } from '@/stores/editor'
import type { SortBy } from '@/types'

const filesStore  = useFilesStore()
const editorStore = useEditorStore()

const renamingId    = ref<string | null>(null)
const renameInputEl = ref<HTMLInputElement | null>(null)

// 添加鼠标事件处理函数
const handleMouseEnter = (event: MouseEvent, fileId: string) => {
  if (filesStore.currentId !== fileId) {
    const target = event.currentTarget as HTMLElement
    target.style.background = 'var(--bg-hover)'
  }
}

const handleMouseLeave = (event: MouseEvent, fileId: string) => {
  if (filesStore.currentId !== fileId) {
    const target = event.currentTarget as HTMLElement
    target.style.background = 'transparent'
  }
}

function startRename(id: string) {
  renamingId.value = id
  nextTick(() => {
    renameInputEl.value?.select()
    renameInputEl.value?.focus()
  })
}

function finishRename(id: string, value: string) {
  if (value.trim()) filesStore.renameFile(id, value.trim())
  renamingId.value = null
}

function handleKeydownRename(e: KeyboardEvent, id: string, value: string) {
  if (e.key === 'Enter') finishRename(id, value)
  if (e.key === 'Escape') renamingId.value = null
}

function confirmDelete(id: string) {
  if (window.confirm('确认删除此文档？')) {
    filesStore.deleteFile(id)
    editorStore.notify({ type: 'info', title: '已删除', message: '' })
  }
}

function formatTime(iso: string): string {
  const d    = new Date(iso)
  const now  = new Date()
  const diff = (now.getTime() - d.getTime()) / 1000
  if (diff < 60)    return '刚刚'
  if (diff < 3600)  return `${Math.floor(diff / 60)} 分前`
  if (diff < 86400) return `${Math.floor(diff / 3600)} 时前`
  return d.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })
}

const sortOptions: { value: SortBy; label: string }[] = [
  { value: 'modified', label: '按修改时间' },
  { value: 'created',  label: '按创建时间' },
  { value: 'name',     label: '按名称' },
]
</script>

<template>
  <aside
    class="flex flex-col h-full overflow-hidden transition-[width] duration-300 ease-in-out flex-shrink-0"
    :style="{
      width: editorStore.settings.sidebarOpen ? 'var(--sidebar-w)' : '0',
      background: 'var(--bg-secondary)',
      borderRight: '1px solid var(--border)',
    }"
  >
    <!-- Logo bar -->
    <div
      class="flex items-center gap-2.5 px-4 flex-shrink-0"
      :style="{ height: 'var(--toolbar-h)', borderBottom: '1px solid var(--border)' }"
    >
      <div
        class="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 font-display font-black text-sm text-white"
        style="background: var(--accent); letter-spacing: -0.5px"
      >
        M↓
      </div>
      <span class="font-display font-bold text-sm whitespace-nowrap" style="color: var(--text-primary)">
        MD Editor
      </span>
      <span
        class="ml-auto text-[10px] font-bold uppercase tracking-wider whitespace-nowrap"
        style="color: var(--text-muted)"
      >
        DSM 7
      </span>
    </div>

    <!-- New file button -->
    <div class="px-2 pt-2 pb-1 flex-shrink-0">
      <button
        class="w-full flex items-center gap-2 px-3 py-2 rounded-md text-xs font-semibold transition-colors duration-100"
        style="color: var(--text-secondary); border: 1px dashed var(--border)"
        @click="filesStore.newFile()"
        @mouseenter="($event.currentTarget as HTMLElement).style.cssText += ';background:var(--accent-dim);color:var(--accent);border-color:var(--accent)'"
        @mouseleave="($event.currentTarget as HTMLElement).style.cssText = ';color:var(--text-secondary);border:1px dashed var(--border);background:transparent'"
      >
        <FilePlus :size="13" />
        新建文档
      </button>
    </div>

    <!-- Sort controls -->
    <div class="px-3 pb-1 flex items-center gap-1 flex-shrink-0">
      <span class="text-[10px] font-bold uppercase tracking-wider" style="color: var(--text-muted)">
        文档 ({{ filesStore.files.length }})
      </span>
      <div class="ml-auto flex items-center gap-0.5">
        <button
          v-for="opt in sortOptions"
          :key="opt.value"
          class="text-[10px] px-1.5 py-0.5 rounded transition-colors"
          :style="{
            color: filesStore.sortBy === opt.value ? 'var(--accent)' : 'var(--text-muted)',
            background: filesStore.sortBy === opt.value ? 'var(--accent-dim)' : 'transparent',
          }"
          :title="opt.label"
          @click="filesStore.setSortBy(opt.value)"
        >
          {{ opt.value === 'modified' ? '时' : opt.value === 'created' ? '建' : 'A' }}
        </button>
      </div>
    </div>

    <!-- File list -->
    <div class="flex-1 overflow-y-auto px-1.5 pb-3 space-y-0.5">
      <!-- Empty state -->
      <div
        v-if="filesStore.files.length === 0"
        class="flex flex-col items-center justify-center h-32 gap-2"
        style="color: var(--text-muted)"
      >
        <FileText :size="28" style="opacity: 0.3" />
        <p class="text-xs">暂无文档</p>
      </div>

      <!-- File item -->
      <div
        v-for="file in filesStore.sortedFiles"
        :key="file.id"
        class="group flex items-center gap-2 px-2.5 py-2 rounded-md cursor-pointer transition-colors duration-100 overflow-hidden"
        :style="{
          background: filesStore.currentId === file.id ? 'var(--accent-dim)' : 'transparent',
          color: filesStore.currentId === file.id ? 'var(--accent)' : 'var(--text-secondary)',
        }"
        @click="filesStore.openFile(file.id)"
        @dblclick="startRename(file.id)"
        @mouseenter="handleMouseEnter($event, file.id)"
        @mouseleave="handleMouseLeave($event, file.id)"
      >
        <FileText :size="13" class="flex-shrink-0 opacity-60" />

        <!-- Name / rename input -->
        <div class="flex-1 min-w-0">
          <input
            v-if="renamingId === file.id"
            ref="renameInputEl"
            :value="file.name"
            class="w-full text-xs px-1 py-0.5 rounded outline-none"
            style="background: var(--bg-active); border: 1px solid var(--accent); color: var(--text-primary); font-family: var(--font-mono)"
            @blur="finishRename(file.id, ($event.target as HTMLInputElement).value)"
            @keydown="e => handleKeydownRename(e, file.id, (e.target as HTMLInputElement).value)"
            @click.stop
          />
          <p v-else class="text-xs font-medium truncate" style="font-family: theme('fontFamily.display')">
            {{ file.name }}
            <span v-if="!file.saved" class="ml-1" style="color: var(--status-yellow)">●</span>
          </p>
          <p class="text-[10px] mt-0.5 flex items-center gap-1" style="color: var(--text-muted)">
            <Clock :size="9" />
            {{ formatTime(file.modifiedAt) }}
            <span class="ml-1">{{ file.wordCount }} 字</span>
          </p>
        </div>

        <!-- Delete button (visible on hover) -->
        <button
          class="flex-shrink-0 p-1 rounded opacity-0 group-hover:opacity-60 hover:!opacity-100 transition-opacity"
          style="color: var(--status-red)"
          @click.stop="confirmDelete(file.id)"
          title="删除文档"
        >
          <Trash2 :size="12" />
        </button>
      </div>
    </div>
  </aside>
</template>