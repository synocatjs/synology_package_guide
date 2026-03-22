
// ============================================================
// DSM Markdown Editor — Export Utilities
// ============================================================

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export function exportMarkdown(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' })
  downloadBlob(blob, filename)
}

export function exportHTML(content: string, rendered: string, filename: string): void {
  const html = buildHTMLDocument(content, rendered, filename)
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' })
  downloadBlob(blob, filename.replace(/\.md$/, '.html'))
}

export function exportText(content: string, filename: string): void {
  const text = content
    .replace(/#{1,6}\s/g, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
  downloadBlob(blob, filename.replace(/\.md$/, '.txt'))
}

function buildHTMLDocument(content: string, rendered: string, title: string): string {
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHTML(title.replace(/\.md$/, ''))}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Lora:ital,wght@0,400;0,600;1,400&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
  <style>
    :root {
      --bg: #0d0f14;
      --surface: #13151c;
      --border: #2a2f42;
      --text: #e8eaf0;
      --text-dim: #8891aa;
      --accent: #5b8af5;
      --purple: #a87dfc;
      --code-bg: #1a1d27;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: var(--bg);
      color: var(--text);
      font-family: 'Lora', Georgia, serif;
      font-size: 16px;
      line-height: 1.8;
      padding: 48px 24px;
    }
    .container { max-width: 760px; margin: 0 auto; }
    .meta {
      font-family: 'Syne', sans-serif;
      font-size: 12px;
      color: var(--text-dim);
      letter-spacing: 0.5px;
      text-transform: uppercase;
      border-bottom: 1px solid var(--border);
      padding-bottom: 16px;
      margin-bottom: 40px;
    }
    h1,h2,h3,h4,h5,h6 { font-family:'Syne',sans-serif; font-weight:800; line-height:1.3; margin:1.8em 0 0.6em; color:var(--text); }
    h1 { font-size:2.2em; border-bottom:2px solid var(--border); padding-bottom:0.4em; margin-top:0; }
    h2 { font-size:1.6em; } h3 { font-size:1.3em; }
    p { margin-bottom:1.2em; color:var(--text-dim); }
    a { color:var(--accent); text-decoration:none; border-bottom:1px solid transparent; transition:border-color 0.15s; }
    a:hover { border-color:var(--accent); }
    code { font-family:'JetBrains Mono',monospace; font-size:0.85em; background:var(--code-bg); color:var(--purple); padding:2px 7px; border-radius:4px; border:1px solid var(--border); }
    pre { background:var(--surface)!important; border:1px solid var(--border); border-radius:8px; padding:20px; overflow-x:auto; margin:1.2em 0; }
    pre code { background:none; border:none; padding:0; color:inherit; }
    blockquote { border-left:3px solid var(--accent); padding:10px 20px; background:rgba(91,138,245,0.06); border-radius:0 6px 6px 0; margin:1.2em 0; font-style:italic; color:var(--text-dim); }
    ul,ol { padding-left:24px; margin:1em 0; }
    li { margin-bottom:6px; color:var(--text-dim); }
    table { width:100%; border-collapse:collapse; margin:1.2em 0; font-size:14px; }
    th { background:var(--surface); border:1px solid var(--border); padding:10px 14px; text-align:left; font-family:'Syne',sans-serif; font-size:11px; text-transform:uppercase; letter-spacing:0.5px; color:var(--text-dim); }
    td { border:1px solid var(--border); padding:10px 14px; }
    tr:hover td { background:var(--code-bg); }
    img { max-width:100%; border-radius:8px; }
    hr { border:none; border-top:1px solid var(--border); margin:2.5em 0; }
    .hljs { background:transparent!important; }
  </style>
</head>
<body>
  <div class="container">
    <div class="meta">DSM Markdown Editor · 导出于 ${new Date().toLocaleString('zh-CN')} · ${title}</div>
    ${rendered}
  </div>
</body>
</html>`
}

function escapeHTML(str: string): string {
  return str.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] ?? c))
}