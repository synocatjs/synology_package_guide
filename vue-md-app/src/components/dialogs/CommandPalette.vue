<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import {
  TransitionRoot, TransitionChild,
  Dialog, DialogPanel, DialogOverlay,
} from '@headlessui/vue'
import {
  Search, FilePlus, Save, Download, FileCode, FileText,
  PenLine, Columns2, Eye, PanelLeft, Maximize2, SunMoon,
  Settings, Table, Heading1, SaveAll,
} from 'lucide-vue-next'

import { useEditorStore } from '@/stores/editor'
import { useCommands } from '@/composables/useCommands'
import type { Command } from '@/types'

const editorStore = useEditorStore()
const { commands } = useCommands()

const query      = ref('')
const focusedIdx = ref(0)
const inputEl    = ref<HTMLInputElement | null>(null)

// Icon map
const iconMap: Record<string, unknown> = {
  FilePlus, Save, SaveAll, Download, FileCode, FileText,
  PenLine, Columns2, Eye, PanelLeft, Maximize2, SunMoon,
  Search, Settings, Table, Heading1,
}

const categoryLabels: Record<string, string> = {
  file: '文件', edit: '编辑', view: '视图',
  format: '格式', insert: '插入', export: '导出', settings: '设置',
}

const filtered = computed<Command[]>(() => {
  const q = query.value.toLowerCase().trim()
  if (!q) return commands.value
  return commands.value.filter(
    c => c.label.toLowerCase().includes(q) || c.description?.toLowerCase().includes(q),
  )
})

const grouped = computed(() => {
  const groups: Record<string, Command[]> = {}
  filtered.value.forEach(cmd => {
  if (!groups[cmd.category]) groups[cmd.category] = []
groups[cmd.category]!.push(cmd)

  })
  return groups
})

// Flat list for keyboard nav
const flatList = computed(() => filtered.value)

function moveFocus(dir: 1 | -1) {
  const len = flatList.value.length
  if (!len) return
  focusedIdx.value = (focusedIdx.value + dir + len) % len
}

function runFocused() {
  const cmd = flatList.value[focusedIdx.value]
  if (cmd) run(cmd)
}

function run(cmd: Command) {
  editorStore.closeCommandPalette()
  query.value = ''
  focusedIdx.value = 0
  // Run after dialog closes
  setTimeout(() => cmd.action(), 50)
}

function isFocused(cmd: Command): boolean {
  return flatList.value[focusedIdx.value]?.id === cmd.id
}

watch(query, () => { focusedIdx.value = 0 })

watch(
  () => editorStore.showCommandPalette,
  async (open) => {
    if (open) {
      query.value = ''
      focusedIdx.value = 0
      await nextTick()
      inputEl.value?.focus()
    }
  },
)
</script>

<template>
  <TransitionRoot :show="editorStore.showCommandPalette" as="template">
    <Dialog
      class="fixed inset-0 z-[100]"
      @close="editorStore.closeCommandPalette()"
    >
      <!-- Backdrop -->
      <TransitionChild
        as="template"
        enter="duration-150 ease-out" enter-from="opacity-0" enter-to="opacity-100"
        leave="duration-100 ease-in"  leave-from="opacity-100" leave-to="opacity-0"
      >
        <div class="fixed inset-0" style="background: rgba(0,0,0,0.65); backdrop-filter: blur(4px)" />
      </TransitionChild>

      <!-- Panel -->
      <div class="fixed inset-0 flex items-start justify-center pt-28 px-4">
        <TransitionChild
          as="template"
          enter="duration-200 ease-out" enter-from="opacity-0 scale-95 -translate-y-2" enter-to="opacity-100 scale-100 translate-y-0"
          leave="duration-100 ease-in"  leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-95"
        >
          <DialogPanel
            class="w-full max-w-[560px] rounded-xl overflow-hidden"
            style="
              background: var(--bg-secondary);
              border: 1px solid var(--border-light);
              box-shadow: var(--shadow-modal);
            "
            @keydown.up.prevent="moveFocus(-1)"
            @keydown.down.prevent="moveFocus(1)"
            @keydown.enter.prevent="runFocused"
            @keydown.esc="editorStore.closeCommandPalette()"
          >
            <!-- Search input -->
            <div
              class="flex items-center gap-3 px-4 py-3"
              :style="{ borderBottom: '1px solid var(--border)' }"
            >
              <Search :size="16" :style="{ color: 'var(--text-muted)', flexShrink: 0 }" />
              <input
                ref="inputEl"
                v-model="query"
                class="flex-1 bg-transparent border-none outline-none text-sm font-display"
                :style="{ color: 'var(--text-primary)' }"
                placeholder="输入命令..."
              />
              <span class="kbd">ESC</span>
            </div>

            <!-- Command groups -->
            <div class="max-h-80 overflow-y-auto py-2">
              <template v-if="flatList.length === 0">
                <p class="text-center text-sm py-8" style="color: var(--text-muted)">无匹配命令</p>
              </template>

              <template v-for="(cmds, cat) in grouped" :key="cat">
                <p
                  class="px-4 pt-2 pb-1 text-[10px] font-bold uppercase tracking-wider"
                  style="color: var(--text-muted)"
                >
                  {{ categoryLabels[cat] ?? cat }}
                </p>
                <button
                  v-for="cmd in cmds"
                  :key="cmd.id"
                  class="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors duration-75"
                  :style="{
                    background: isFocused(cmd) ? 'var(--bg-hover)' : 'transparent',
                    color: 'var(--text-primary)',
                  }"
                  @click="run(cmd)"
                  @mouseenter="focusedIdx = flatList.indexOf(cmd)"
                >
                  <span style="color: var(--text-muted); flex-shrink: 0">
                    <component
                      :is="iconMap[cmd.icon ?? ''] ?? Search"
                      :size="15"
                    />
                  </span>
                  <span class="flex-1 text-sm font-medium font-display">{{ cmd.label }}</span>
                  <span v-if="cmd.description" class="text-xs" style="color: var(--text-muted)">
                    {{ cmd.description }}
                  </span>
                  <span v-if="cmd.kbd" class="kbd flex-shrink-0">{{ cmd.kbd }}</span>
                </button>
              </template>
            </div>

            <!-- Footer hint -->
            <div
              class="flex items-center gap-4 px-4 py-2 text-[10px]"
              :style="{ borderTop: '1px solid var(--border)', color: 'var(--text-muted)' }"
            >
              <span><kbd class="kbd">↑↓</kbd> 导航</span>
              <span><kbd class="kbd">↵</kbd> 执行</span>
              <span><kbd class="kbd">ESC</kbd> 关闭</span>
            </div>
          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>