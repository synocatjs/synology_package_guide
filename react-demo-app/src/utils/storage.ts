// ============================================================
// src/utils/storage.ts
// LocalStorage persistence layer for documents and settings
// ============================================================

import type { MarkdownDocument, EditorSettings } from "@/types";

const KEYS = {
  DOCUMENTS: "dsm-md-editor:documents",
  ACTIVE_DOC: "dsm-md-editor:active-doc",
  SETTINGS: "dsm-md-editor:settings",
};

// ----- Documents -----

export function loadDocuments(): MarkdownDocument[] {
  try {
    const raw = localStorage.getItem(KEYS.DOCUMENTS);
    if (!raw) return [];
    return JSON.parse(raw) as MarkdownDocument[];
  } catch {
    return [];
  }
}

export function saveDocuments(docs: MarkdownDocument[]): void {
  try {
    localStorage.setItem(KEYS.DOCUMENTS, JSON.stringify(docs));
  } catch (e) {
    console.error("[Storage] Failed to save documents:", e);
  }
}

export function loadActiveDocId(): string | null {
  return localStorage.getItem(KEYS.ACTIVE_DOC);
}

export function saveActiveDocId(id: string): void {
  localStorage.setItem(KEYS.ACTIVE_DOC, id);
}

// ----- Settings -----

export const DEFAULT_SETTINGS: EditorSettings = {
  mode: "split",
  theme: "dark",
  fontSize: 14,
  lineHeight: 1.6,
  tabSize: 2,
  wordWrap: true,
  showLineNumbers: false,
  syncScroll: true,
  autosave: true,
  autosaveInterval: 2000,
  spellCheck: false,
  vimMode: false,
};

export function loadSettings(): EditorSettings {
  try {
    const raw = localStorage.getItem(KEYS.SETTINGS);
    if (!raw) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) } as EditorSettings;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings: EditorSettings): void {
  try {
    localStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
  } catch (e) {
    console.error("[Storage] Failed to save settings:", e);
  }
}

// ----- Document CRUD helpers -----

export function createDocument(title = "新文档"): MarkdownDocument {
  const now = Date.now();
  return {
    id: `doc-${now}-${Math.random().toString(36).slice(2, 8)}`,
    title,
    content: `# ${title}\n\n在此开始写作...\n`,
    createdAt: now,
    updatedAt: now,
    tags: [],
    wordCount: 0,
    charCount: 0,
  };
}

export function updateDocumentContent(
  doc: MarkdownDocument,
  content: string,
  wordCount: number,
  charCount: number,
): MarkdownDocument {
  return {
    ...doc,
    content,
    wordCount,
    charCount,
    updatedAt: Date.now(),
  };
}

export function renameDocument(
  doc: MarkdownDocument,
  title: string,
): MarkdownDocument {
  return { ...doc, title, updatedAt: Date.now() };
}
