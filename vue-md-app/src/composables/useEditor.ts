
// ============================================================
// DSM Markdown Editor — useEditor Composable
// Core text-manipulation & format-insertion logic
// ============================================================

import { computed, nextTick, ref } from 'vue'
import { useFilesStore } from '@/stores/files'
import { useEditorStore } from '@/stores/editor'
import type { FormatButton, InsertTemplate } from '@/types'

export function useEditor(textareaRef: ReturnType<typeof ref<HTMLTextAreaElement | null>>) {
  const filesStore = useFilesStore()
  const editorStore = useEditorStore()

  // ---- Format buttons config ----
  const formatButtons: FormatButton[] = [
    { id: 'bold',   label: '加粗',   kbd: 'Ctrl+B', before: '**', after: '**', placeholder: '粗体文字', icon: 'Bold' },
    { id: 'italic', label: '斜体',   kbd: 'Ctrl+I', before: '*',  after: '*',  placeholder: '斜体文字', icon: 'Italic' },
    { id: 'strike', label: '删除线', kbd: '',        before: '~~', after: '~~', placeholder: '删除文字', icon: 'Strikethrough' },
    { id: 'code',   label: '行内代码', kbd: '',      before: '`',  after: '`',  placeholder: '代码',     icon: 'Code' },
    { id: 'h1',     label: '一级标题', kbd: '',      before: '# ', after: '',   placeholder: '标题',     icon: 'Heading1' },
    { id: 'h2',     label: '二级标题', kbd: '',      before: '## ', after: '',  placeholder: '标题',     icon: 'Heading2' },
    { id: 'h3',     label: '三级标题', kbd: '',      before: '### ', after: '', placeholder: '标题',     icon: 'Heading3' },
    { id: 'ul',     label: '无序列表', kbd: '',      before: '- ', after: '',   placeholder: '列表项',   icon: 'List' },
    { id: 'ol',     label: '有序列表', kbd: '',      before: '1. ', after: '',  placeholder: '列表项',   icon: 'ListOrdered' },
    { id: 'quote',  label: '引用',    kbd: '',       before: '> ', after: '',   placeholder: '引用内容', icon: 'Quote' },
    { id: 'link',   label: '链接',    kbd: '',       before: '[',  after: '](https://)', placeholder: '链接文字', icon: 'Link' },
    { id: 'image',  label: '图片',    kbd: '',       before: '![', after: '](https://)', placeholder: '图片描述', icon: 'Image' },
  ]

  const insertTemplates: InsertTemplate[] = [
    {
      id: 'table',
      label: '插入表格',
      icon: 'Table',
      content: '\n\n| 列1 | 列2 | 列3 |\n|------|------|------|\n| 数据 | 数据 | 数据 |\n| 数据 | 数据 | 数据 |\n\n',
    },
    {
      id: 'codeblock',
      label: '代码块',
      icon: 'FileCode',
      content: '\n\n```typescript\n// 代码\n```\n\n',
    },
    {
      id: 'hr',
      label: '分隔线',
      icon: 'Minus',
      content: '\n\n---\n\n',
    },
    {
      id: 'task',
      label: '任务列表',
      icon: 'CheckSquare',
      content: '\n\n- [ ] 待办事项\n- [ ] 待办事项\n- [x] 已完成\n\n',
    },
    {
      id: 'frontmatter',
      label: 'Front Matter',
      icon: 'FileText',
      content: '---\ntitle: 标题\ndate: ' + new Date().toISOString().slice(0, 10) + '\ntags: []\n---\n\n',
    },
  ]

  // ---- Core insert operation ----
  function insertFormat(before: string, after: string, placeholder: string) {
    const ta = textareaRef.value
    const file = filesStore.currentFile
    if (!ta || !file) return

    const start = ta.selectionStart
    const end   = ta.selectionEnd
    const selected = file.content.slice(start, end) || placeholder

    const newContent =
      file.content.slice(0, start) +
      before + selected + after +
      file.content.slice(end)

    filesStore.updateContent(file.id, newContent)

    nextTick(() => {
      ta.focus()
      ta.setSelectionRange(
        start + before.length,
        start + before.length + selected.length,
      )
    })
  }

  function insertRaw(text: string) {
    const ta = textareaRef.value
    const file = filesStore.currentFile
    if (!ta || !file) return

    const pos = ta.selectionStart
    const newContent = file.content.slice(0, pos) + text + file.content.slice(pos)
    filesStore.updateContent(file.id, newContent)

    nextTick(() => {
      ta.focus()
      const newPos = pos + text.length
      ta.setSelectionRange(newPos, newPos)
    })
  }

  function applyFormat(btn: FormatButton) {
    insertFormat(btn.before, btn.after, btn.placeholder)
  }

  function applyTemplate(t: InsertTemplate) {
    insertRaw(t.content)
  }

  // ---- Smart Enter (continue lists) ----
  function handleEnter(e: KeyboardEvent) {
    const ta = textareaRef.value
    const file = filesStore.currentFile
    if (!ta || !file) return

    const content = file.content
    const pos = ta.selectionStart
    const lineStart = content.lastIndexOf('\n', pos - 1) + 1
    const currentLine = content.slice(lineStart, pos)

    // Match bullet or numbered list
    const bulletMatch    = currentLine.match(/^(\s*)([-*+])\s/)
    const numberedMatch  = currentLine.match(/^(\s*)(\d+)\.\s/)
    const taskMatch      = currentLine.match(/^(\s*)([-*+])\s\[[ x]\]\s/)

    const isEmpty = currentLine.trim() === ''
    const isEmptyBullet   = bulletMatch   && currentLine.slice(bulletMatch[0].length).trim() === ''
    const isEmptyNumbered = numberedMatch && currentLine.slice(numberedMatch[0].length).trim() === ''

    if (isEmptyBullet || isEmptyNumbered) {
      // Break out of list
      e.preventDefault()
      const before = content.slice(0, lineStart)
      const after  = content.slice(pos)
      filesStore.updateContent(file.id, before + '\n' + after)
      nextTick(() => ta.setSelectionRange(before.length + 1, before.length + 1))
      return
    }

    if (taskMatch) {
      e.preventDefault()
      const indent = taskMatch[1]
      const bullet = taskMatch[2]
      insertRaw('\n' + indent + bullet + ' [ ] ')
      return
    }

    if (bulletMatch) {
      e.preventDefault()
      insertRaw('\n' + bulletMatch[1] + bulletMatch[2] + ' ')
      return
    }

    if (numberedMatch) {
      e.preventDefault()
   const nextNum = (parseInt(numberedMatch[2] ?? '0') + 1)

      insertRaw('\n' + numberedMatch[1] + nextNum + '. ')
      return
    }
  }

  // ---- Tab handling ----
  function handleTab(e: KeyboardEvent) {
    e.preventDefault()
    const ta = textareaRef.value
    const file = filesStore.currentFile
    if (!ta || !file) return

    const tabStr = ' '.repeat(useEditorStore().settings.tabSize)
    if (e.shiftKey) {
      // Unindent: remove leading spaces from current line
      const pos = ta.selectionStart
      const lineStart = file.content.lastIndexOf('\n', pos - 1) + 1
      const line = file.content.slice(lineStart)
      const toRemove = line.match(/^ +/)?.[0]?.slice(0, useEditorStore().settings.tabSize) ?? ''
      if (toRemove) {
        const newContent = file.content.slice(0, lineStart) + file.content.slice(lineStart + toRemove.length)
        filesStore.updateContent(file.id, newContent)
        nextTick(() => ta.setSelectionRange(pos - toRemove.length, pos - toRemove.length))
      }
    } else {
      insertRaw(tabStr)
    }
  }

  // ---- Cursor tracking ----
  function trackCursor(e: Event) {
    const ta = e.target as HTMLTextAreaElement
    const file = filesStore.currentFile
    if (!ta || !file) return

    const pos = ta.selectionStart
    const before = file.content.slice(0, pos)
    const lines = before.split('\n')
   editorStore.updateCursor(lines.length, lines[lines.length - 1]!.length + 1)

  }

  return {
    formatButtons,
    insertTemplates,
    insertFormat,
    insertRaw,
    applyFormat,
    applyTemplate,
    handleEnter,
    handleTab,
    trackCursor,
  }
}