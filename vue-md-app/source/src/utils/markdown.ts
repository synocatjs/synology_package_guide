// ============================================================
// DSM Markdown Editor — Markdown Rendering Utilities
// ============================================================

import { marked, type RendererObject } from 'marked'
import hljs from 'highlight.js'

// Custom renderer for DSM integration
const renderer: RendererObject = {
  code({ text, lang }) {
    const language = lang && hljs.getLanguage(lang) ? lang : 'plaintext'
    const highlighted = hljs.highlight(text, { language }).value
    return `<pre><code class="hljs language-${language}">${highlighted}</code></pre>`
  },
  // Open external links in new tab (important for DSM webview)
  link({ href, title, text }) {
    const isExternal = href?.startsWith('http') || href?.startsWith('//')
    const target = isExternal ? ' target="_blank" rel="noopener noreferrer"' : ''
    const titleAttr = title ? ` title="${title}"` : ''
    return `<a href="${href}"${titleAttr}${target}>${text}</a>`
  },
}

marked.use({
  renderer,
  gfm: true,
  breaks: true,
})

export function renderMarkdown(content: string): string {
  try {
    return marked.parse(content) as string
  } catch (e) {
    console.error('[DSM-MDE] Markdown render error:', e)
    return `<p class="render-error">渲染错误: ${String(e)}</p>`
  }
}

export function computeStats(content: string) {
  const lines = content.split('\n').length
  const chars = content.length
  // Chinese + Latin word count
  const words = content
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]+`/g, '')
    .split(/[\s\n\r]+/)
    .filter(Boolean).length
  const paragraphs = content.split(/\n\n+/).filter(p => p.trim()).length
  const readingMinutes = Math.max(1, Math.ceil(words / 200))
  return { lines, chars, words, paragraphs, readingMinutes }
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export function sanitizeFilename(name: string): string {
  return name.endsWith('.md') ? name : `${name}.md`
}