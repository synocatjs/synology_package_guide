<script setup lang="ts">
import {
  PanelLeft, Save, Download, FileCode, FileText,
  Search, SunMoon, Maximize2, Minimize2, Terminal,
  Bold, Italic, Strikethrough, Code, Heading1, Heading2, Heading3,
  List, ListOrdered, Quote, Link, Image, Table, Minus, CheckSquare,
  Eye, PenLine, Columns2, FilePlus, Settings,
} from 'lucide-vue-next'

import AppTooltip from '@/components/ui/AppTooltip.vue'
import { useFilesStore } from '@/stores/files'
import { useEditorStore } from '@/stores/editor'
import { exportMarkdown, exportHTML, exportText } from '@/utils/export'
import { renderMarkdown } from '@/utils/markdown'

const props = defineProps<{
  onFormat: (before: string, after: string, placeholder: string) => void
  onInsert: (text: string) => void
}>()

const filesStore  = useFilesStore()
const editorStore = useEditorStore()

// Icon map for dynamic rendering
const iconComponents: Record<string, unknown> = {
  Bold, Italic, Strikethrough, Code,
  Heading1, Heading2, Heading3,
  List, ListOrdered, Quote, Link, Image,
}

// Format button groups
const formatBtns = [
  { icon: Bold,          label: 'Bold',   kbd: 'Ctrl+B', before: '**', after: '**', placeholder: '粗体' },
  { icon: Italic,        label: 'Italic', kbd: 'Ctrl+I', before: '*',  after: '*',  placeholder: '斜体' },
  { icon: Strikethrough, label: '删除线',  kbd: '',       before: '~~', after: '~~', placeholder: '删除线' },
  { icon: Code,          label: '行内代码', kbd: '',      before: '`',  after: '`',  placeholder: 'code' },
]
const headingBtns = [
  { icon: Heading1, label: '一级标题', before: '# ',   after: '', placeholder: '标题' },
  { icon: Heading2, label: '二级标题', before: '## ',  after: '', placeholder: '标题' },
  { icon: Heading3, label: '三级标题', before: '### ', after: '', placeholder: '标题' },
]
const listBtns = [
  { icon: List,        label: '无序列表', before: '- ',  after: '', placeholder: '列表项' },
  { icon: ListOrdered, label: '有序列表', before: '1. ', after: '', placeholder: '列表项' },
  { icon: Quote,       label: '引用',     before: '> ', after: '', placeholder: '引用内容' },
  { icon: Link,        label: '链接',     before: '[',  after: '](https://)', placeholder: '链接文字' },
  { icon: Image,       label: '图片',     before: '![', after: '](https://)', placeholder: '图片描述' },
]
const insertBtns = [
  { icon: Table,       label: '插入表格',    text: '\n\n| 列1 | 列2 | 列3 |\n|------|------|------|\n| 数据 | 数据 | 数据 |\n\n' },
  { icon: CheckSquare, label: '任务列表',    text: '\n\n- [ ] 任务一\n- [ ] 任务二\n- [x] 已完成\n\n' },
  { icon: Minus,       label: '分隔线',     text: '\n\n---\n\n' },
  { icon: FileCode,    label: '代码块',     text: '\n\n```typescript\n// code\n```\n\n' },
]

function doSave() {
  const f = filesStore.currentFile
  if (!f) return
  filesStore.saveFile(f.id)
  editorStore.notify({ type: 'success', title: '已保存', message: f.name })
}

function doExportMd()   { const f = filesStore.currentFile; if (f) exportMarkdown(f.content, f.name) }
function doExportHtml() { const f = filesStore.currentFile; if (f) exportHTML(f.content, renderMarkdown(f.content), f.name) }
function doExportTxt()  { const f = filesStore.currentFile; if (f) exportText(f.content, f.name) }
</script>

<template>
  <header
    class="flex items-center gap-1 px-2 flex-shrink-0 overflow-x-auto"
    :style="{
      height: 'var(--toolbar-h)',
      background: 'var(--bg-secondary)',
      borderBottom: '1px solid var(--border)',
    }"
  >
    <!-- Sidebar toggle -->
    <div class="flex items-center gap-0.5 pr-2" style="border-right: 1px solid var(--border)">
      <AppTooltip text="侧边栏 (Ctrl+B)">
        <button
          class="tb-btn"
          :class="{ active: editorStore.settings.sidebarOpen }"
          @click="editorStore.toggleSidebar()"
        >
          <PanelLeft :size="15" />
        </button>
      </AppTooltip>
      <AppTooltip text="新建文档 (Ctrl+N)">
        <button class="tb-btn" @click="filesStore.newFile()">
          <FilePlus :size="15" />
        </button>
      </AppTooltip>
    </div>

    <!-- Format: bold / italic / strike / code -->
    <div class="flex items-center gap-0.5 px-2" style="border-right: 1px solid var(--border)">
      <AppTooltip v-for="btn in formatBtns" :key="btn.label" :text="`${btn.label} ${btn.kbd}`">
        <button
          class="tb-btn"
          :disabled="!filesStore.currentFile"
          @click="onFormat(btn.before, btn.after, btn.placeholder)"
        >
          <component :is="btn.icon" :size="14" />
        </button>
      </AppTooltip>
    </div>

    <!-- Headings -->
    <div class="flex items-center gap-0.5 px-2" style="border-right: 1px solid var(--border)">
      <AppTooltip v-for="btn in headingBtns" :key="btn.label" :text="btn.label">
        <button
          class="tb-btn"
          :disabled="!filesStore.currentFile"
          @click="onFormat(btn.before, btn.after, btn.placeholder)"
        >
          <component :is="btn.icon" :size="14" />
        </button>
      </AppTooltip>
    </div>

    <!-- Lists / links -->
    <div class="flex items-center gap-0.5 px-2" style="border-right: 1px solid var(--border)">
      <AppTooltip v-for="btn in listBtns" :key="btn.label" :text="btn.label">
        <button
          class="tb-btn"
          :disabled="!filesStore.currentFile"
          @click="onFormat(btn.before, btn.after, btn.placeholder)"
        >
          <component :is="btn.icon" :size="14" />
        </button>
      </AppTooltip>
    </div>

    <!-- Insert templates -->
    <div class="flex items-center gap-0.5 px-2" style="border-right: 1px solid var(--border)">
      <AppTooltip v-for="btn in insertBtns" :key="btn.label" :text="btn.label">
        <button
          class="tb-btn"
          :disabled="!filesStore.currentFile"
          @click="onInsert(btn.text)"
        >
          <component :is="btn.icon" :size="14" />
        </button>
      </AppTooltip>
    </div>

    <!-- Title -->
    <div class="flex-1 min-w-0 text-center px-4">
      <p class="text-xs font-semibold truncate font-display" style="color: var(--text-secondary)">
        <span v-if="filesStore.currentFile">
          {{ filesStore.currentFile.name }}
          <span v-if="!filesStore.currentFile.saved" style="color: var(--status-yellow)">●</span>
        </span>
        <span v-else style="color: var(--text-muted)">未打开文档</span>
      </p>
    </div>

    <!-- Actions: save / export / search / settings -->
    <div class="flex items-center gap-0.5 px-2" style="border-left: 1px solid var(--border)">
      <AppTooltip text="保存 (Ctrl+S)">
        <button class="tb-btn" :disabled="!filesStore.currentFile" @click="doSave">
          <Save :size="14" />
        </button>
      </AppTooltip>
      <AppTooltip text="导出 Markdown">
        <button class="tb-btn" :disabled="!filesStore.currentFile" @click="doExportMd">
          <Download :size="14" />
        </button>
      </AppTooltip>
      <AppTooltip text="导出 HTML">
        <button class="tb-btn" :disabled="!filesStore.currentFile" @click="doExportHtml">
          <FileCode :size="14" />
        </button>
      </AppTooltip>
      <AppTooltip text="导出纯文本">
        <button class="tb-btn" :disabled="!filesStore.currentFile" @click="doExportTxt">
          <FileText :size="14" />
        </button>
      </AppTooltip>
    </div>

    <!-- View & UX controls -->
    <div class="flex items-center gap-0.5 px-2" style="border-left: 1px solid var(--border)">
      <AppTooltip text="查找 (Ctrl+F)">
        <button class="tb-btn" :class="{ active: editorStore.showSearch }" @click="editorStore.toggleSearch()">
          <Search :size="14" />
        </button>
      </AppTooltip>
      <AppTooltip text="设置 (Ctrl+,)">
        <button class="tb-btn" :class="{ active: editorStore.showSettings }" @click="editorStore.showSettings = true">
          <Settings :size="14" />
        </button>
      </AppTooltip>
      <AppTooltip text="切换主题">
        <button class="tb-btn" @click="editorStore.toggleTheme()">
          <SunMoon :size="14" />
        </button>
      </AppTooltip>
      <AppTooltip text="专注模式 (F11)">
        <button class="tb-btn" :class="{ active: editorStore.settings.focusMode }" @click="editorStore.toggleFocusMode()">
          <component :is="editorStore.settings.focusMode ? Minimize2 : Maximize2" :size="14" />
        </button>
      </AppTooltip>
      <AppTooltip text="命令面板 (Ctrl+P)">
        <button class="tb-btn" @click="editorStore.openCommandPalette()">
          <Terminal :size="14" />
        </button>
      </AppTooltip>
    </div>

    <!-- View mode switcher -->
    <div
      class="flex items-center rounded-md p-0.5 ml-1 gap-0.5 flex-shrink-0"
      style="background: var(--bg-elevated)"
    >
      <AppTooltip v-for="{ mode, icon, label } in [
        { mode: 'edit',    icon: PenLine,  label: '编辑' },
        { mode: 'split',   icon: Columns2, label: '分栏' },
        { mode: 'preview', icon: Eye,      label: '预览' },
      ]" :key="mode" :text="label">
        <button
          class="flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-semibold font-display transition-all duration-100"
          :style="{
            background: editorStore.settings.viewMode === mode ? 'var(--bg-secondary)' : 'transparent',
            color: editorStore.settings.viewMode === mode ? 'var(--text-primary)' : 'var(--text-muted)',
            boxShadow: editorStore.settings.viewMode === mode ? '0 1px 4px rgba(0,0,0,0.25)' : 'none',
          }"
          @click="editorStore.setViewMode(mode as any)"
        >
          <component :is="icon" :size="12" />
          {{ label }}
        </button>
      </AppTooltip>
    </div>
  </header>
</template>