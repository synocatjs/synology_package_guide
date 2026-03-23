// ============================================================
// src/types/index.ts
// Central type definitions for DSM Markdown Editor
// ============================================================

// ----- Document / File -----
export interface MarkdownDocument {
  id: string;
  title: string;
  content: string;
  createdAt: number;
  updatedAt: number;
  tags: string[];
  wordCount: number;
  charCount: number;
}

export type DocumentSortKey = "updatedAt" | "createdAt" | "title";
export type SortDirection = "asc" | "desc";

// ----- Editor State -----
export type EditorMode = "split" | "editor" | "preview";
export type EditorTheme = "dark" | "light";

export interface EditorSettings {
  mode: EditorMode;
  theme: EditorTheme;
  fontSize: number;
  lineHeight: number;
  tabSize: number;
  wordWrap: boolean;
  showLineNumbers: boolean;
  syncScroll: boolean;
  autosave: boolean;
  autosaveInterval: number; // ms
  spellCheck: boolean;
  vimMode: boolean;
}

// ----- Toolbar Actions -----
export type ToolbarAction =
  | "bold"
  | "italic"
  | "strikethrough"
  | "code"
  | "codeblock"
  | "heading1"
  | "heading2"
  | "heading3"
  | "quote"
  | "unorderedList"
  | "orderedList"
  | "taskList"
  | "link"
  | "image"
  | "table"
  | "hr"
  | "undo"
  | "redo";

export interface ToolbarItem {
  action: ToolbarAction;
  label: string;
  icon: string;
  shortcut?: string;
  separator?: boolean;
}

// ----- Search / Replace -----
export interface SearchState {
  query: string;
  replace: string;
  isOpen: boolean;
  caseSensitive: boolean;
  useRegex: boolean;
  matchCount: number;
  currentMatch: number;
}

// ----- Status Bar -----
export interface EditorStats {
  wordCount: number;
  charCount: number;
  lineCount: number;
  selectionLength: number;
  cursorLine: number;
  cursorCol: number;
  readingTime: number; // minutes
}

// ----- Notifications -----
export type NotificationType = "success" | "error" | "warning" | "info";

export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  duration?: number;
}

// ----- Export -----
export type ExportFormat = "md" | "html" | "txt";

// ----- Keyboard Shortcuts -----
export interface KeyboardShortcut {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  action: string;
  description: string;
}

// ----- pkgscripts-ng / SPK Manifest -----
export interface SpkInfo {
  package: string;
  version: string;
  arch: string[];
  description: string;
  displayname: string;
  maintainer: string;
  maintainerUrl: string;
  distributor: string;
  distributorUrl: string;
  supportUrl: string;
  thirdparty: boolean;
  dsmuidir: string;
  dsmappname: string;
  icon: string;
  adminProtocol: string;
  adminPort: number;
  adminUrl: string;
}

// ----- File System (Synology DSM) -----
export interface FileEntry {
  name: string;
  path: string;
  isDir: boolean;
  size?: number;
  modified?: number;
  extension?: string;
}
