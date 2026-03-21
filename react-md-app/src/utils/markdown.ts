// ============================================================
// src/utils/markdown.ts
// Markdown parsing with syntax highlighting via marked + highlight.js
// ============================================================

import { marked, type MarkedOptions } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";
import DOMPurify from "dompurify";

// Configure highlight.js integration
const highlightExtension = markedHighlight({
  emptyLangClass: "hljs",
  langPrefix: "hljs language-",
  highlight(code: string, lang: string) {
    const language = hljs.getLanguage(lang) ? lang : "plaintext";
    return hljs.highlight(code, { language }).value;
  },
});

// Configure marked with all options
marked.use(highlightExtension);
marked.use({
  gfm: true,
  breaks: true,
} as MarkedOptions);

// Custom renderer for extra features
const renderer = new marked.Renderer();

// Override link renderer to open in new tab
renderer.link = function ({ href, title, text }) {
  const titleAttr = title ? ` title="${title}"` : "";
  const isExternal =
    href && (href.startsWith("http://") || href.startsWith("https://"));
  const target = isExternal ? ' target="_blank" rel="noopener noreferrer"' : "";
  return `<a href="${href}"${titleAttr}${target}>${text}</a>`;
};

// Override checkbox renderer for task lists
renderer.listitem = function (item) {
  const { text, task, checked } = item;
  if (task) {
    const checkedAttr = checked ? " checked" : "";
    return `<li class="task-item"><input type="checkbox"${checkedAttr} disabled /><span>${text}</span></li>\n`;
  }
  return `<li>${text}</li>\n`;
};

marked.use({ renderer });

/**
 * Parse markdown string to sanitized HTML
 */
export function parseMarkdown(source: string): string {
  const rawHtml = marked.parse(source) as string;
  return DOMPurify.sanitize(rawHtml, {
    ADD_ATTR: ["target", "rel", "checked"],
    ADD_TAGS: ["input"],
  });
}

/**
 * Count words in a string (handles CJK characters)
 */
export function countWords(text: string): number {
  const cjk = (text.match(/[\u4e00-\u9fff\u3040-\u309f\u30a0-\u30ff]/g) || [])
    .length;
  const western = (text.match(/\b\w+\b/g) || []).length;
  return cjk + western;
}

/**
 * Count characters excluding whitespace
 */
export function countChars(text: string): number {
  return text.replace(/\s/g, "").length;
}

/**
 * Estimate reading time in minutes (200 wpm average)
 */
export function estimateReadingTime(text: string): number {
  const words = countWords(text);
  return Math.max(1, Math.ceil(words / 200));
}

/**
 * Extract heading outline from markdown
 */
export interface HeadingEntry {
  level: number;
  text: string;
  id: string;
}

export function extractHeadings(source: string): HeadingEntry[] {
  const headings: HeadingEntry[] = [];
  const regex = /^(#{1,6})\s+(.+)$/gm;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(source)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-\u4e00-\u9fff]/g, "");
    headings.push({ level, text, id });
  }
  return headings;
}

/**
 * Wrap selection with markdown syntax
 */
export interface WrapResult {
  value: string;
  selectionStart: number;
  selectionEnd: number;
}

export function wrapSelection(
  text: string,
  start: number,
  end: number,
  before: string,
  after: string = before,
): WrapResult {
  const selected = text.slice(start, end);
  const newText =
    text.slice(0, start) + before + selected + after + text.slice(end);
  return {
    value: newText,
    selectionStart: start + before.length,
    selectionEnd: end + before.length,
  };
}

/**
 * Insert text at cursor position
 */
export function insertAtCursor(
  text: string,
  pos: number,
  insertion: string,
): WrapResult {
  const newText = text.slice(0, pos) + insertion + text.slice(pos);
  return {
    value: newText,
    selectionStart: pos + insertion.length,
    selectionEnd: pos + insertion.length,
  };
}

/**
 * Insert markdown table template
 */
export function buildTableTemplate(rows: number, cols: number): string {
  const header = Array(cols).fill("标题").join(" | ");
  const separator = Array(cols).fill("---").join(" | ");
  const row = Array(cols).fill("内容").join(" | ");
  const rows_str = Array(rows).fill(`| ${row} |`).join("\n");
  return `| ${header} |\n| ${separator} |\n${rows_str}\n`;
}
