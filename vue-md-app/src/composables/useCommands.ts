
// ============================================================
// DSM Markdown Editor — useCommands Composable
// Central command registry powering the Command Palette
// ============================================================

import { computed } from 'vue'
import { useFilesStore } from '@/stores/files'
import { useEditorStore } from '@/stores/editor'
import { exportMarkdown, exportHTML, exportText } from '@/utils/export'
import { renderMarkdown } from '@/utils/markdown'
import type { Command } from '@/types'

export function useCommands() {
  const filesStore  = useFilesStore()
  const editorStore = useEditorStore()

  const commands = computed<Command[]>(() => [
    // ── File ──
    {
      id: 'file.new',
      label: '新建文档',
      description: '创建一个新的 Markdown 文档',
      icon: 'FilePlus',
      kbd: 'Ctrl+N',
      category: 'file',
      action: () => filesStore.newFile(),
    },
    {
      id: 'file.save',
      label: '保存当前文档',
      icon: 'Save',
      kbd: 'Ctrl+S',
      category: 'file',
      action: () => {
        const f = filesStore.currentFile
        if (f) {
          filesStore.saveFile(f.id)
          editorStore.notify({ type: 'success', title: '已保存', message: f.name })
        }
      },
    },
    {
      id: 'file.saveAll',
      label: '保存所有文档',
      icon: 'SaveAll',
      kbd: 'Ctrl+Shift+S',
      category: 'file',
      action: () => {
        filesStore.saveAll()
        editorStore.notify({ type: 'success', title: '全部已保存', message: `${filesStore.files.length} 个文档` })
      },
    },
    // ── Export ──
    {
      id: 'export.md',
      label: '导出为 Markdown (.md)',
      icon: 'Download',
      category: 'export',
      action: () => {
        const f = filesStore.currentFile
        if (f) exportMarkdown(f.content, f.name)
      },
    },
    {
      id: 'export.html',
      label: '导出为 HTML (.html)',
      icon: 'FileCode',
      category: 'export',
      action: () => {
        const f = filesStore.currentFile
        if (f) exportHTML(f.content, renderMarkdown(f.content), f.name)
      },
    },
    {
      id: 'export.txt',
      label: '导出为纯文本 (.txt)',
      icon: 'FileText',
      category: 'export',
      action: () => {
        const f = filesStore.currentFile
        if (f) exportText(f.content, f.name)
      },
    },
    // ── View ──
    {
      id: 'view.edit',
      label: '切换到编辑模式',
      icon: 'PenLine',
      category: 'view',
      action: () => editorStore.setViewMode('edit'),
    },
    {
      id: 'view.split',
      label: '切换到分栏模式',
      icon: 'Columns2',
      kbd: 'Ctrl+\\',
      category: 'view',
      action: () => editorStore.setViewMode('split'),
    },
    {
      id: 'view.preview',
      label: '切换到预览模式',
      icon: 'Eye',
      category: 'view',
      action: () => editorStore.setViewMode('preview'),
    },
    {
      id: 'view.sidebar',
      label: '切换侧边栏',
      icon: 'PanelLeft',
      kbd: 'Ctrl+B',
      category: 'view',
      action: () => editorStore.toggleSidebar(),
    },
    {
      id: 'view.focus',
      label: '切换专注模式',
      icon: 'Maximize2',
      kbd: 'F11',
      category: 'view',
      action: () => editorStore.toggleFocusMode(),
    },
    {
      id: 'view.theme',
      label: '切换明暗主题',
      icon: 'SunMoon',
      category: 'view',
      action: () => editorStore.toggleTheme(),
    },
    // ── Edit ──
    {
      id: 'edit.search',
      label: '查找文本',
      icon: 'Search',
      kbd: 'Ctrl+F',
      category: 'edit',
      action: () => editorStore.toggleSearch(),
    },
    {
      id: 'edit.settings',
      label: '打开设置',
      icon: 'Settings',
      kbd: 'Ctrl+,',
      category: 'settings',
      action: () => { editorStore.showSettings = true },
    },
    // ── Format ──
    {
      id: 'format.h1',
      label: '插入一级标题',
      icon: 'Heading1',
      category: 'format',
      action: () => { /* triggered via editor ref */ },
    },
    {
      id: 'format.table',
      label: '插入表格',
      icon: 'Table',
      category: 'insert',
      action: () => { /* triggered via editor ref */ },
    },
  ])

  function runCommand(id: string) {
    const cmd = commands.value.find(c => c.id === id)
    cmd?.action()
  }

  return { commands, runCommand }
}