// ============================================================
// src/utils/shortcuts.ts
// Keyboard shortcut definitions and dispatcher
// ============================================================

import type { KeyboardShortcut, ToolbarAction } from "@/types";

export const KEYBOARD_SHORTCUTS: KeyboardShortcut[] = [
  // File operations
  { key: "n", ctrl: true, action: "new-doc", description: "新建文档" },
  { key: "s", ctrl: true, action: "save", description: "保存文档" },
  { key: "o", ctrl: true, action: "open", description: "打开文件" },

  // View
  { key: "1", ctrl: true, action: "mode-editor", description: "仅编辑器" },
  { key: "2", ctrl: true, action: "mode-split", description: "分栏视图" },
  { key: "3", ctrl: true, action: "mode-preview", description: "仅预览" },

  // Formatting
  { key: "b", ctrl: true, action: "bold", description: "加粗" },
  { key: "i", ctrl: true, action: "italic", description: "斜体" },
  { key: "k", ctrl: true, action: "link", description: "插入链接" },
  { key: "`", ctrl: true, action: "code", description: "行内代码" },

  // Search
  { key: "f", ctrl: true, action: "search", description: "查找" },
  { key: "h", ctrl: true, action: "replace", description: "查找替换" },

  // Misc
  { key: "/", ctrl: true, action: "shortcuts", description: "快捷键帮助" },
  {
    key: "p",
    ctrl: true,
    shift: true,
    action: "command-palette",
    description: "命令面板",
  },
];

export type ShortcutAction = string;

export interface ParsedShortcut {
  ctrl: boolean;
  shift: boolean;
  alt: boolean;
  key: string;
}

export function matchesShortcut(
  e: KeyboardEvent,
  shortcut: KeyboardShortcut,
): boolean {
  const ctrl = shortcut.ctrl ?? false;
  const shift = shortcut.shift ?? false;
  const alt = shortcut.alt ?? false;
  return (
    e.ctrlKey === ctrl &&
    e.metaKey === ctrl && // macOS compat: treat Cmd same as Ctrl
    e.shiftKey === shift &&
    e.altKey === alt &&
    e.key.toLowerCase() === shortcut.key.toLowerCase()
  );
}

// Map toolbar actions to markdown syntax
export const ACTION_SYNTAX: Partial<
  Record<
    ToolbarAction,
    { before: string; after?: string; block?: boolean; placeholder?: string }
  >
> = {
  bold: { before: "**", after: "**", placeholder: "粗体文字" },
  italic: { before: "_", after: "_", placeholder: "斜体文字" },
  strikethrough: { before: "~~", after: "~~", placeholder: "删除线" },
  code: { before: "`", after: "`", placeholder: "代码" },
  codeblock: {
    before: "```\n",
    after: "\n```",
    block: true,
    placeholder: "代码块",
  },
  heading1: { before: "# ", block: true, placeholder: "标题一" },
  heading2: { before: "## ", block: true, placeholder: "标题二" },
  heading3: { before: "### ", block: true, placeholder: "标题三" },
  quote: { before: "> ", block: true, placeholder: "引用内容" },
  unorderedList: { before: "- ", block: true, placeholder: "列表项" },
  orderedList: { before: "1. ", block: true, placeholder: "列表项" },
  taskList: { before: "- [ ] ", block: true, placeholder: "待办事项" },
  link: { before: "[", after: "](url)", placeholder: "链接文字" },
  image: { before: "![", after: "](url)", placeholder: "图片描述" },
  hr: { before: "\n---\n", block: true, placeholder: "" },
};

export function formatShortcutDisplay(s: KeyboardShortcut): string {
  const parts: string[] = [];
  if (s.ctrl) parts.push("Ctrl");
  if (s.shift) parts.push("Shift");
  if (s.alt) parts.push("Alt");
  parts.push(s.key.toUpperCase());
  return parts.join("+");
}
