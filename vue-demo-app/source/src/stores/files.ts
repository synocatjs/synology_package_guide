
// ============================================================
// DSM Markdown Editor — Files Store (Pinia)
// ============================================================

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { MarkdownFile, SortBy } from '@/types'
import { readStorage, writeStorage, FILES_KEY } from '@/utils/storage'
import { generateId, sanitizeFilename, computeStats } from '@/utils/markdown'

const WELCOME_CONTENT = `# DSM Markdown Editor

欢迎使用基于 **Synology DSM 7** 开发规范构建的 Markdown 编辑器。

## 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Vue 3 | ^3.4 | 响应式 UI 框架 |
| TypeScript | ^5.3 | 类型安全 |
| Pinia | ^2.1 | 状态管理 |
| Vue Router | ^4.3 | 路由 |
| Tailwind CSS | ^3.4 | 原子化样式 |
| Headless UI | ^1.7 | 无障碍组件 |
| Lucide Vue | ^0.363 | 图标库 |
| marked.js | ^11.1 | Markdown 渲染 |
| highlight.js | ^11.9 | 代码高亮 |
| VueUse | ^10.7 | 组合式工具 |

## 快捷键

| 操作 | 快捷键 |
|------|--------|
| 命令面板 | \`Ctrl+P\` |
| 保存 | \`Ctrl+S\` |
| 新建 | \`Ctrl+N\` |
| 加粗 | \`Ctrl+B\` |
| 斜体 | \`Ctrl+I\` |
| 查找 | \`Ctrl+F\` |
| 专注模式 | \`F11\` |

## DSM 集成

\`\`\`typescript
// conf/privilege — DSM 7 必须以 package 权限运行
const privilege = {
  defaults: { 'run-as': 'package' }
}
\`\`\`

> 基于 Synology DSM 7 Package Developer Guide 构建，遵循完整包开发生命周期规范。
`

function makeFile(name = '新文档.md', content = ''): MarkdownFile {
  const stats = computeStats(content)
  return {
    id: generateId(),
    name: sanitizeFilename(name),
    content,
    saved: true,
    createdAt: new Date().toISOString(),
    modifiedAt: new Date().toISOString(),
    tags: [],
    wordCount: stats.words,
  }
}

export const useFilesStore = defineStore('files', () => {
  // ---- State ----
  const files = ref<MarkdownFile[]>([])
  const currentId = ref<string | null>(null)
  const sortBy = ref<SortBy>('modified')

  // ---- Getters ----
  const currentFile = computed(() =>
    files.value.find(f => f.id === currentId.value) ?? null
  )

  const sortedFiles = computed(() => {
    return [...files.value].sort((a, b) => {
      if (sortBy.value === 'name') return a.name.localeCompare(b.name)
      if (sortBy.value === 'created') return b.createdAt.localeCompare(a.createdAt)
      return b.modifiedAt.localeCompare(a.modifiedAt)
    })
  })

  const hasUnsaved = computed(() => files.value.some(f => !f.saved))

  // ---- Actions ----
  function init() {
    const stored = readStorage<MarkdownFile[]>(FILES_KEY, [])
    if (stored.length > 0) {
      files.value = stored
     currentId.value = stored[0]!.id

    } else {
      const welcome = makeFile('欢迎使用.md', WELCOME_CONTENT)
      files.value = [welcome]
      currentId.value = welcome.id
      persist()
    }
  }

  function newFile(name?: string): string {
    const f = makeFile(name)
    f.saved = false
    files.value.unshift(f)
    currentId.value = f.id
    return f.id
  }

  function openFile(id: string) {
    if (files.value.some(f => f.id === id)) {
      currentId.value = id
    }
  }

  function updateContent(id: string, content: string) {
    const f = files.value.find(f => f.id === id)
    if (!f) return
    f.content = content
    f.saved = false
    f.modifiedAt = new Date().toISOString()
    const stats = computeStats(content)
    f.wordCount = stats.words
  }

  function renameFile(id: string, name: string) {
    const f = files.value.find(f => f.id === id)
    if (!f) return
    f.name = sanitizeFilename(name)
    f.modifiedAt = new Date().toISOString()
    persist()
  }

  function saveFile(id: string) {
    const f = files.value.find(f => f.id === id)
    if (!f) return
    f.saved = true
    f.modifiedAt = new Date().toISOString()
    persist()
  }

  function saveAll() {
    const now = new Date().toISOString()
    files.value.forEach(f => { f.saved = true; f.modifiedAt = now })
    persist()
  }

  function deleteFile(id: string): boolean {
    const idx = files.value.findIndex(f => f.id === id)
    if (idx === -1) return false
    files.value.splice(idx, 1)
    if (currentId.value === id) {
      currentId.value = files.value[0]?.id ?? null
    }
    persist()
    return true
  }

  function importFile(name: string, content: string) {
    const f = makeFile(name, content)
    files.value.unshift(f)
    currentId.value = f.id
    persist()
    return f.id
  }

  function persist() {
    writeStorage(FILES_KEY, files.value)
  }

  function setSortBy(sort: SortBy) {
    sortBy.value = sort
  }

  return {
    files,
    currentId,
    sortBy,
    currentFile,
    sortedFiles,
    hasUnsaved,
    init,
    newFile,
    openFile,
    updateContent,
    renameFile,
    saveFile,
    saveAll,
    deleteFile,
    importFile,
    persist,
    setSortBy,
  }
})