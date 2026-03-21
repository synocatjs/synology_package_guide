<script setup lang="ts">
import {
  TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle,
} from '@headlessui/vue'
import { X, Settings } from 'lucide-vue-next'
import { useEditorStore } from '@/stores/editor'
import type { EditorSettings } from '@/types'

const editorStore = useEditorStore()

function update<K extends keyof EditorSettings>(key: K, value: EditorSettings[K]) {
  editorStore.updateSettings({ [key]: value })
}
</script>

<template>
  <TransitionRoot :show="editorStore.showSettings" as="template">
    <Dialog class="fixed inset-0 z-[100]" @close="editorStore.showSettings = false">
      <!-- Backdrop -->
      <TransitionChild
        as="template"
        enter="duration-150" enter-from="opacity-0" enter-to="opacity-100"
        leave="duration-100" leave-from="opacity-100" leave-to="opacity-0"
      >
        <div class="fixed inset-0" style="background: rgba(0,0,0,0.5)" />
      </TransitionChild>

      <!-- Drawer from right -->
      <div class="fixed inset-y-0 right-0 flex">
        <TransitionChild
          as="template"
          enter="duration-250 ease-out" enter-from="translate-x-full" enter-to="translate-x-0"
          leave="duration-200 ease-in"  leave-from="translate-x-0" leave-to="translate-x-full"
        >
          <DialogPanel
            class="w-80 flex flex-col h-full overflow-y-auto"
            style="background: var(--bg-secondary); border-left: 1px solid var(--border)"
          >
            <!-- Header -->
            <div
              class="flex items-center gap-3 px-5 py-4 flex-shrink-0"
              :style="{ borderBottom: '1px solid var(--border)' }"
            >
              <Settings :size="16" :style="{ color: 'var(--accent)' }" />
              <DialogTitle class="flex-1 font-display font-bold text-sm" style="color: var(--text-primary)">
                编辑器设置
              </DialogTitle>
              <button class="tb-btn" @click="editorStore.showSettings = false">
                <X :size="14" />
              </button>
            </div>

            <!-- Settings groups -->
            <div class="flex-1 p-5 space-y-6 text-sm">

              <!-- Appearance -->
              <section>
                <h3 class="text-[10px] font-bold uppercase tracking-wider mb-3" style="color: var(--text-muted)">外观</h3>
                <div class="space-y-4">
                  <!-- Theme -->
                  <div class="flex items-center justify-between">
                    <span style="color: var(--text-secondary)">主题</span>
                    <div class="flex rounded-md overflow-hidden" style="border: 1px solid var(--border)">
                      <button
                        v-for="t in ['dark', 'light']"
                        :key="t"
                        class="px-3 py-1 text-xs font-semibold font-display transition-colors"
                        :style="{
                          background: editorStore.settings.theme === t ? 'var(--accent)' : 'transparent',
                          color: editorStore.settings.theme === t ? 'white' : 'var(--text-secondary)',
                        }"
                        @click="update('theme', t as 'dark' | 'light')"
                      >{{ t === 'dark' ? '暗色' : '亮色' }}</button>
                    </div>
                  </div>

                  <!-- Font size -->
                  <div class="flex items-center justify-between">
                    <span style="color: var(--text-secondary)">字号</span>
                    <div class="flex items-center gap-2">
                      <button
                        class="tb-btn"
                        style="width:24px;height:24px;font-size:14px"
                        @click="update('fontSize', Math.max(10, editorStore.settings.fontSize - 1))"
                      >−</button>
                      <span class="font-mono text-xs w-8 text-center" style="color: var(--text-primary)">
                        {{ editorStore.settings.fontSize }}
                      </span>
                      <button
                        class="tb-btn"
                        style="width:24px;height:24px;font-size:14px"
                        @click="update('fontSize', Math.min(20, editorStore.settings.fontSize + 1))"
                      >+</button>
                    </div>
                  </div>

                  <!-- Line height -->
                  <div class="flex items-center justify-between">
                    <span style="color: var(--text-secondary)">行高</span>
                    <select
                      class="field text-xs"
                      style="height:28px;width:90px;padding:0 8px"
                      :value="editorStore.settings.lineHeight"
                      @change="update('lineHeight', parseFloat(($event.target as HTMLSelectElement).value))"
                    >
                      <option value="1.4">紧凑 1.4</option>
                      <option value="1.6">标准 1.6</option>
                      <option value="1.7">舒适 1.7</option>
                      <option value="2.0">宽松 2.0</option>
                    </select>
                  </div>

                  <!-- Tab size -->
                  <div class="flex items-center justify-between">
                    <span style="color: var(--text-secondary)">缩进宽度</span>
                    <select
                      class="field text-xs"
                      style="height:28px;width:90px;padding:0 8px"
                      :value="editorStore.settings.tabSize"
                      @change="update('tabSize', parseInt(($event.target as HTMLSelectElement).value))"
                    >
                      <option value="2">2 空格</option>
                      <option value="4">4 空格</option>
                    </select>
                  </div>
                </div>
              </section>

              <!-- Editor behavior -->
              <section>
                <h3 class="text-[10px] font-bold uppercase tracking-wider mb-3" style="color: var(--text-muted)">编辑器行为</h3>
                <div class="space-y-3">
                  <label
                    v-for="{ key, label } in [
                      { key: 'wordWrap',       label: '自动换行' },
                      { key: 'showLineNumbers', label: '显示行号' },
                      { key: 'spellCheck',     label: '拼写检查' },
                      { key: 'autoSave',       label: '自动保存' },
                    ]"
                    :key="key"
                    class="flex items-center justify-between cursor-pointer"
                  >
                    <span style="color: var(--text-secondary)">{{ label }}</span>
                    <button
                      class="relative inline-flex h-5 w-9 rounded-full transition-colors duration-200 flex-shrink-0"
                      :style="{
                        background: editorStore.settings[key as keyof typeof editorStore.settings] ? 'var(--accent)' : 'var(--border)',
                      }"
                      @click="update(key as keyof EditorSettings, !editorStore.settings[key as keyof typeof editorStore.settings] as any)"
                    >
                      <span
                        class="absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white transition-transform duration-200"
                        :style="{
                          transform: editorStore.settings[key as keyof typeof editorStore.settings] ? 'translateX(16px)' : 'translateX(0)',
                        }"
                      />
                    </button>
                  </label>
                </div>
              </section>

              <!-- Auto save delay -->
              <section v-if="editorStore.settings.autoSave">
                <h3 class="text-[10px] font-bold uppercase tracking-wider mb-3" style="color: var(--text-muted)">自动保存延迟</h3>
                <div class="flex items-center gap-3">
                  <input
                    type="range"
                    min="500"
                    max="5000"
                    step="500"
                    :value="editorStore.settings.autoSaveDelay"
                    class="flex-1"
                    style="accent-color: var(--accent)"
                    @input="update('autoSaveDelay', parseInt(($event.target as HTMLInputElement).value))"
                  />
                  <span class="text-xs font-mono w-14 text-right" style="color: var(--text-secondary)">
                    {{ editorStore.settings.autoSaveDelay / 1000 }}s
                  </span>
                </div>
              </section>

              <!-- About -->
              <section>
                <h3 class="text-[10px] font-bold uppercase tracking-wider mb-3" style="color: var(--text-muted)">关于</h3>
                <div class="rounded-lg p-3 text-xs space-y-1" style="background: var(--bg-elevated); color: var(--text-muted)">
                  <p><span style="color: var(--text-secondary)">版本</span> 1.0.0-0001</p>
                  <p><span style="color: var(--text-secondary)">平台</span> Synology DSM 7</p>
                  <p><span style="color: var(--text-secondary)">框架</span> Vue 3 + TypeScript</p>
                  <p><span style="color: var(--text-secondary)">协议</span> MIT License</p>
                </div>
              </section>
            </div>
          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>