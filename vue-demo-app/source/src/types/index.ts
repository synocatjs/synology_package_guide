// ============================================================
// DSM Markdown Editor — Core Type Definitions
// ============================================================

export interface MarkdownFile {
  id: string
  name: string
  content: string
  saved: boolean
  createdAt: string
  modifiedAt: string
  tags: string[]
  wordCount: number
}

export type ViewMode = 'edit' | 'split' | 'preview'
export type Theme = 'dark' | 'light'
export type SortBy = 'modified' | 'created' | 'name'

export interface EditorSettings {
  theme: Theme
  viewMode: ViewMode
  sidebarOpen: boolean
  focusMode: boolean
  fontSize: number
  lineHeight: number
  wordWrap: boolean
  showLineNumbers: boolean
  autoSave: boolean
  autoSaveDelay: number // ms
  spellCheck: boolean
  sortBy: SortBy
  tabSize: number
}

export interface Command {
  id: string
  label: string
  description?: string
  icon?: string
  kbd?: string
  category: CommandCategory
  action: () => void
}

export type CommandCategory =
  | 'file'
  | 'edit'
  | 'view'
  | 'format'
  | 'insert'
  | 'export'
  | 'settings'

export interface SearchResult {
  lineNumber: number
  lineContent: string
  matchStart: number
  matchEnd: number
}

export interface FormatButton {
  id: string
  label: string
  kbd?: string
  before: string
  after: string
  placeholder: string
  icon: string
}

export interface InsertTemplate {
  id: string
  label: string
  icon: string
  content: string
}

// DSM package notification payload
export interface DSMNotification {
  type: 'info' | 'success' | 'warning' | 'error'
  title: string
  message: string
  duration?: number
}

// Editor cursor position
export interface CursorPosition {
  line: number
  column: number
  offset: number
}

// Statistics
export interface DocumentStats {
  words: number
  chars: number
  lines: number
  readingMinutes: number
  paragraphs: number
}