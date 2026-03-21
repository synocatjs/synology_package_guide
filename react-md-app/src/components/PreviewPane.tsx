// ============================================================
// src/components/PreviewPane.tsx
// Rendered HTML preview with scroll sync support
// ============================================================

import React, { useRef, useEffect, useCallback } from "react";
import { parseMarkdown, extractHeadings } from "@/utils/markdown";
import type { HeadingEntry } from "@/utils/markdown";

interface PreviewPaneProps {
  content: string;
  syncScroll: boolean;
  editorScrollRatio?: number;
  onScrollRatio?: (ratio: number) => void;
  showOutline?: boolean;
}

// ----- Outline Panel -----
interface OutlineProps {
  headings: HeadingEntry[];
}

function OutlinePanel({ headings }: OutlineProps) {
  if (headings.length === 0) return null;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="absolute top-0 right-0 w-48 bg-dsm-surface/95 border-l border-b border-dsm-border rounded-bl-xl z-10 max-h-80 overflow-y-auto scrollbar-thin">
      <div className="px-3 py-2 border-b border-dsm-border/50">
        <span className="text-xs font-semibold text-dsm-muted uppercase tracking-wider">
          大纲
        </span>
      </div>
      <nav className="py-1">
        {headings.map((h, i) => (
          <button
            key={i}
            onClick={() => scrollTo(h.id)}
            className="w-full text-left px-3 py-1 text-xs text-dsm-muted hover:text-dsm-text hover:bg-white/5 transition-colors truncate"
            style={{ paddingLeft: `${(h.level - 1) * 8 + 12}px` }}
          >
            {h.text}
          </button>
        ))}
      </nav>
    </div>
  );
}

export function PreviewPane({
  content,
  syncScroll,
  editorScrollRatio,
  onScrollRatio,
  showOutline = false,
}: PreviewPaneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isSyncingRef = useRef(false);

  const html = parseMarkdown(content);
  const headings = extractHeadings(content);

  // Sync scroll: editor → preview
  useEffect(() => {
    if (!syncScroll || editorScrollRatio === undefined) return;
    const el = containerRef.current;
    if (!el) return;
    isSyncingRef.current = true;
    el.scrollTop = editorScrollRatio * (el.scrollHeight - el.clientHeight);
    setTimeout(() => {
      isSyncingRef.current = false;
    }, 50);
  }, [editorScrollRatio, syncScroll]);

  // Sync scroll: preview → editor
  const handleScroll = useCallback(() => {
    if (!syncScroll || !onScrollRatio || isSyncingRef.current) return;
    const el = containerRef.current;
    if (!el) return;
    const ratio = el.scrollTop / Math.max(1, el.scrollHeight - el.clientHeight);
    onScrollRatio(ratio);
  }, [syncScroll, onScrollRatio]);

  return (
    <div className="relative flex-1 overflow-hidden">
      {showOutline && <OutlinePanel headings={headings} />}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="h-full overflow-y-auto scrollbar-thin px-6 py-6"
      >
        <div
          className="markdown-preview max-w-3xl mx-auto"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
}
