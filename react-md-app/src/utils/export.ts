// ============================================================
// src/utils/export.ts
// File export helpers: Markdown, HTML, Plain Text
// ============================================================

import type { ExportFormat, MarkdownDocument } from "@/types";
import { parseMarkdown } from "./markdown";

const HTML_TEMPLATE = (
  title: string,
  body: string,
  styles: string,
) => `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(title)}</title>
  <style>
    ${styles}
  </style>
</head>
<body>
  <article class="markdown-body">
    ${body}
  </article>
</body>
</html>`;

const EXPORT_CSS = `
  *, *::before, *::after { box-sizing: border-box; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-size: 16px;
    line-height: 1.7;
    color: #1f2328;
    background: #fff;
    margin: 0;
    padding: 2rem;
  }
  .markdown-body {
    max-width: 800px;
    margin: 0 auto;
  }
  h1,h2,h3,h4,h5,h6 {
    font-weight: 600;
    line-height: 1.3;
    margin-top: 1.5em;
    margin-bottom: 0.5em;
    color: #0d1117;
  }
  h1 { font-size: 2em; border-bottom: 1px solid #d0d7de; padding-bottom: 0.3em; }
  h2 { font-size: 1.5em; border-bottom: 1px solid #d0d7de; padding-bottom: 0.3em; }
  code {
    font-family: 'JetBrains Mono', 'Fira Code', monospace;
    font-size: 0.875em;
    background: #f6f8fa;
    padding: 0.2em 0.4em;
    border-radius: 4px;
  }
  pre {
    background: #f6f8fa;
    padding: 1em;
    border-radius: 8px;
    overflow-x: auto;
  }
  pre code { background: none; padding: 0; }
  blockquote {
    border-left: 4px solid #d0d7de;
    margin: 0;
    padding-left: 1em;
    color: #57606a;
  }
  table { border-collapse: collapse; width: 100%; }
  th, td { border: 1px solid #d0d7de; padding: 0.5em 1em; }
  th { background: #f6f8fa; font-weight: 600; }
  a { color: #0969da; }
  img { max-width: 100%; }
  hr { border: none; border-top: 1px solid #d0d7de; }
`;

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function stripMarkdown(text: string): string {
  return text
    .replace(/#{1,6}\s+/g, "")
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .replace(/~~(.+?)~~/g, "$1")
    .replace(/`(.+?)`/g, "$1")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/\[(.+?)\]\(.+?\)/g, "$1")
    .replace(/!\[.+?\]\(.+?\)/g, "")
    .replace(/^\s*[-*+]\s+/gm, "")
    .replace(/^\s*\d+\.\s+/gm, "")
    .replace(/^\s*>\s+/gm, "")
    .replace(/\|.+/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function triggerDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportDocument(
  doc: MarkdownDocument,
  format: ExportFormat,
): void {
  const safeName = doc.title.replace(/[/\\?%*:|"<>]/g, "-");

  switch (format) {
    case "md": {
      const blob = new Blob([doc.content], {
        type: "text/markdown;charset=utf-8",
      });
      triggerDownload(blob, `${safeName}.md`);
      break;
    }
    case "html": {
      const body = parseMarkdown(doc.content);
      const html = HTML_TEMPLATE(doc.title, body, EXPORT_CSS);
      const blob = new Blob([html], { type: "text/html;charset=utf-8" });
      triggerDownload(blob, `${safeName}.html`);
      break;
    }
    case "txt": {
      const plain = stripMarkdown(doc.content);
      const blob = new Blob([plain], { type: "text/plain;charset=utf-8" });
      triggerDownload(blob, `${safeName}.txt`);
      break;
    }
  }
}

export function importMarkdownFile(): Promise<{
  title: string;
  content: string;
}> {
  return new Promise((resolve, reject) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".md,.markdown,.txt";
    input.onchange = () => {
      const file = input.files?.[0];
      if (!file) {
        reject(new Error("No file selected"));
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        const title = file.name.replace(/\.(md|markdown|txt)$/i, "");
        resolve({ title, content });
      };
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsText(file);
    };
    input.click();
  });
}
