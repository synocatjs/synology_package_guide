// ============================================================
// src/hooks/useDocuments.ts
// Document management hook: CRUD, persistence, active doc state
// ============================================================

import { useState, useCallback, useEffect, useRef } from "react";
import type { MarkdownDocument, DocumentSortKey, SortDirection } from "@/types";
import {
  loadDocuments,
  saveDocuments,
  loadActiveDocId,
  saveActiveDocId,
  createDocument,
  updateDocumentContent,
  renameDocument,
} from "@/utils/storage";
import { countWords, countChars } from "@/utils/markdown";

export function useDocuments() {
  const [documents, setDocuments] = useState<MarkdownDocument[]>([]);
  const [activeDocId, setActiveDocId] = useState<string | null>(null);
  const [sortKey, setSortKey] = useState<DocumentSortKey>("updatedAt");
  const [sortDir, setSortDir] = useState<SortDirection>("desc");
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const docs = loadDocuments();
    const activeId = loadActiveDocId();

    if (docs.length === 0) {
      const defaultDoc = createDocument("欢迎使用 DSM Markdown Editor");
      defaultDoc.content = WELCOME_CONTENT;
      defaultDoc.wordCount = countWords(WELCOME_CONTENT);
      defaultDoc.charCount = countChars(WELCOME_CONTENT);
      setDocuments([defaultDoc]);
      setActiveDocId(defaultDoc.id);
      saveDocuments([defaultDoc]);
      saveActiveDocId(defaultDoc.id);
    } else {
      setDocuments(docs);
      const valid = docs.find((d) => d.id === activeId);
      const id = valid ? activeId! : docs[0].id;
      setActiveDocId(id);
    }
  }, []);

  // Persist whenever documents change (debounced)
  const persistDocuments = useCallback((docs: MarkdownDocument[]) => {
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      saveDocuments(docs);
    }, 300);
  }, []);

  // Getters
  const activeDocument = documents.find((d) => d.id === activeDocId) ?? null;

  const sortedDocuments = [...documents].sort((a, b) => {
    let cmp = 0;
    if (sortKey === "title") {
      cmp = a.title.localeCompare(b.title, "zh-CN");
    } else {
      cmp = a[sortKey] - b[sortKey];
    }
    return sortDir === "asc" ? cmp : -cmp;
  });

  // Actions
  const newDocument = useCallback(() => {
    const doc = createDocument();
    setDocuments((prev) => {
      const next = [doc, ...prev];
      persistDocuments(next);
      return next;
    });
    setActiveDocId(doc.id);
    saveActiveDocId(doc.id);
    return doc;
  }, [persistDocuments]);

  const selectDocument = useCallback((id: string) => {
    setActiveDocId(id);
    saveActiveDocId(id);
  }, []);

  const updateContent = useCallback(
    (id: string, content: string) => {
      const wc = countWords(content);
      const cc = countChars(content);
      setDocuments((prev) => {
        const next = prev.map((d) =>
          d.id === id ? updateDocumentContent(d, content, wc, cc) : d,
        );
        persistDocuments(next);
        return next;
      });
    },
    [persistDocuments],
  );

  const renameDoc = useCallback(
    (id: string, title: string) => {
      setDocuments((prev) => {
        const next = prev.map((d) =>
          d.id === id ? renameDocument(d, title) : d,
        );
        persistDocuments(next);
        return next;
      });
    },
    [persistDocuments],
  );

  const deleteDocument = useCallback(
    (id: string) => {
      setDocuments((prev) => {
        const next = prev.filter((d) => d.id !== id);
        persistDocuments(next);

        if (activeDocId === id) {
          const fallback = next[0];
          if (fallback) {
            setActiveDocId(fallback.id);
            saveActiveDocId(fallback.id);
          } else {
            const fresh = createDocument();
            setDocuments([fresh]);
            persistDocuments([fresh]);
            setActiveDocId(fresh.id);
            saveActiveDocId(fresh.id);
          }
        }
        return next;
      });
    },
    [activeDocId, persistDocuments],
  );

  const duplicateDocument = useCallback(
    (id: string) => {
      const src = documents.find((d) => d.id === id);
      if (!src) return;
      const copy = createDocument(`${src.title} (副本)`);
      copy.content = src.content;
      copy.wordCount = src.wordCount;
      copy.charCount = src.charCount;
      copy.tags = [...src.tags];
      setDocuments((prev) => {
        const next = [copy, ...prev];
        persistDocuments(next);
        return next;
      });
      setActiveDocId(copy.id);
      saveActiveDocId(copy.id);
    },
    [documents, persistDocuments],
  );

  const importDocument = useCallback(
    (title: string, content: string) => {
      const doc = createDocument(title);
      doc.content = content;
      doc.wordCount = countWords(content);
      doc.charCount = countChars(content);
      setDocuments((prev) => {
        const next = [doc, ...prev];
        persistDocuments(next);
        return next;
      });
      setActiveDocId(doc.id);
      saveActiveDocId(doc.id);
    },
    [persistDocuments],
  );

  const toggleSort = useCallback(
    (key: DocumentSortKey) => {
      if (key === sortKey) {
        setSortDir((d) => (d === "asc" ? "desc" : "asc"));
      } else {
        setSortKey(key);
        setSortDir("desc");
      }
    },
    [sortKey],
  );

  return {
    documents: sortedDocuments,
    activeDocument,
    activeDocId,
    sortKey,
    sortDir,
    newDocument,
    selectDocument,
    updateContent,
    renameDoc,
    deleteDocument,
    duplicateDocument,
    importDocument,
    toggleSort,
  };
}

// ---- Welcome content ----
const WELCOME_CONTENT = `# 欢迎使用 DSM Markdown Editor 🎉

这是一款专为 **Synology NAS (DS923+)** 开发的专业 Markdown 编辑器。

## ✨ 主要功能

- **实时预览** — 分栏模式下即时渲染
- **语法高亮** — 代码块支持多种编程语言
- **文档管理** — 多文档、自动保存
- **多格式导出** — 支持 \`.md\`、\`.html\`、\`.txt\`
- **快捷键** — 完整的键盘操作支持

## 📝 Markdown 示例

### 代码块

\`\`\`typescript
const greet = (name: string): string => {
  return \`Hello, \${name}!\`
}

console.log(greet('DSM'))
\`\`\`

### 任务列表

- [x] 创建项目结构
- [x] 实现 Markdown 解析
- [x] 添加语法高亮
- [ ] 发布到 Synology 套件中心

### 表格

| 功能 | 状态 | 备注 |
|------|------|------|
| 实时预览 | ✅ | 毫秒级渲染 |
| 自动保存 | ✅ | 2s 防抖 |
| 深色主题 | ✅ | GitHub 风格 |
| SPK 打包 | ✅ | pkgscripts-ng |

### 引用

> "好的工具让工作更高效。"
> — Synology

---

**开始写作**，享受流畅的 Markdown 编辑体验！
`;
