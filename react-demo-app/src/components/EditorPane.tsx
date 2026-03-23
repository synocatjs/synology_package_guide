// ============================================================
// src/components/EditorPane.tsx
// Textarea-based editor with line numbers and search bar
// ============================================================

import React, { useEffect, useRef, useCallback } from "react";
import {
  X,
  ChevronUp,
  ChevronDown,
  Replace,
  CaseSensitive,
  Code2,
} from "lucide-react";
import type { EditorSettings, SearchState } from "@/types";

interface EditorPaneProps {
  content: string;
  settings: EditorSettings;
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
  onChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onScroll?: (e: React.UIEvent<HTMLTextAreaElement>) => void;
  search: SearchState;
  onSearchQuery: (q: string) => void;
  onSearchReplace: (r: string) => void;
  onSearchToggle: (key: "caseSensitive" | "useRegex") => void;
  onReplaceOne: () => void;
  onReplaceAll: () => void;
  onSearchClose: () => void;
}

// Highlight search matches inside textarea overlay (cosmetic highlight)
// We use a simple approach: a transparent overlay div with highlighted text
function SearchBar({
  search,
  onQuery,
  onReplace,
  onToggle,
  onReplaceOne,
  onReplaceAll,
  onClose,
}: {
  search: SearchState;
  onQuery: (q: string) => void;
  onReplace: (r: string) => void;
  onToggle: (key: "caseSensitive" | "useRegex") => void;
  onReplaceOne: () => void;
  onReplaceAll: () => void;
  onClose: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (search.isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [search.isOpen]);

  if (!search.isOpen) return null;

  return (
    <div className="absolute top-0 right-0 z-30 bg-dsm-surface border border-dsm-border rounded-bl-xl shadow-2xl p-3 w-80 animate-fade-in">
      <div className="flex flex-col gap-2">
        {/* Find row */}
        <div className="flex items-center gap-1.5">
          <div className="flex-1 flex items-center gap-1 bg-dsm-bg border border-dsm-border rounded px-2 py-1 focus-within:border-dsm-accent/60 transition-colors">
            <input
              ref={inputRef}
              value={search.query}
              onChange={(e) => onQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Escape") onClose();
                if (e.key === "Enter") onReplaceOne();
              }}
              placeholder="查找…"
              className="flex-1 bg-transparent text-xs text-dsm-text placeholder-dsm-muted focus:outline-none"
            />
            <span className="text-xs text-dsm-muted shrink-0">
              {search.matchCount > 0
                ? `${search.currentMatch}/${search.matchCount}`
                : search.query
                  ? "0 结果"
                  : ""}
            </span>
          </div>
          {/* Toggle buttons */}
          <button
            onClick={() => onToggle("caseSensitive")}
            title="区分大小写"
            className={`p-1 rounded transition-colors ${search.caseSensitive ? "bg-dsm-accent/20 text-dsm-accent" : "text-dsm-muted hover:text-dsm-text hover:bg-white/5"}`}
          >
            <CaseSensitive size={14} />
          </button>
          <button
            onClick={() => onToggle("useRegex")}
            title="正则表达式"
            className={`p-1 rounded transition-colors ${search.useRegex ? "bg-dsm-accent/20 text-dsm-accent" : "text-dsm-muted hover:text-dsm-text hover:bg-white/5"}`}
          >
            <Code2 size={14} />
          </button>
          <button
            onClick={onClose}
            className="p-1 rounded text-dsm-muted hover:text-dsm-text hover:bg-white/5"
          >
            <X size={14} />
          </button>
        </div>

        {/* Replace row */}
        <div className="flex items-center gap-1.5">
          <div className="flex-1 flex items-center gap-1 bg-dsm-bg border border-dsm-border rounded px-2 py-1 focus-within:border-dsm-accent/60 transition-colors">
            <input
              value={search.replace}
              onChange={(e) => onReplace(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Escape") onClose();
              }}
              placeholder="替换为…"
              className="flex-1 bg-transparent text-xs text-dsm-text placeholder-dsm-muted focus:outline-none"
            />
          </div>
          <button
            onClick={onReplaceOne}
            title="替换一个"
            className="p-1 rounded text-dsm-muted hover:text-dsm-text hover:bg-white/5 transition-colors"
          >
            <Replace size={14} />
          </button>
          <button
            onClick={onReplaceAll}
            title="全部替换"
            className="px-2 py-1 text-xs rounded bg-dsm-accent/20 text-dsm-accent hover:bg-dsm-accent/30 transition-colors whitespace-nowrap"
          >
            全替换
          </button>
        </div>
      </div>
    </div>
  );
}

export function EditorPane({
  content,
  settings,
  textareaRef,
  onChange,
  onKeyDown,
  onScroll,
  search,
  onSearchQuery,
  onSearchReplace,
  onSearchToggle,
  onReplaceOne,
  onReplaceAll,
  onSearchClose,
}: EditorPaneProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Compute line numbers
  const lineCount = (content.match(/\n/g) || []).length + 1;
  const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1);

  const fontSize = settings.fontSize;
  const lineHeight = settings.lineHeight;

  const textareaStyle: React.CSSProperties = {
    fontSize: `${fontSize}px`,
    lineHeight: lineHeight,
    tabSize: settings.tabSize,
    whiteSpace: settings.wordWrap ? "pre-wrap" : "pre",
    overflowWrap: settings.wordWrap ? "break-word" : "normal",
  };

  const lineNumStyle: React.CSSProperties = {
    fontSize: `${fontSize}px`,
    lineHeight: lineHeight,
  };

  return (
    <div ref={containerRef} className="relative flex flex-1 overflow-hidden">
      {/* Search overlay */}
      <SearchBar
        search={search}
        onQuery={onSearchQuery}
        onReplace={onSearchReplace}
        onToggle={onSearchToggle}
        onReplaceOne={onReplaceOne}
        onReplaceAll={onReplaceAll}
        onClose={onSearchClose}
      />

      {/* Line numbers */}
      {settings.showLineNumbers && (
        <div
          className="select-none text-right bg-dsm-surface/50 border-r border-dsm-border/50 overflow-hidden"
          style={{
            ...lineNumStyle,
            minWidth: "3rem",
            padding: "1rem 0.5rem 1rem 0",
          }}
          aria-hidden="true"
        >
          {lineNumbers.map((n) => (
            <div
              key={n}
              className="text-dsm-muted/40 font-mono leading-[inherit]"
            >
              {n}
            </div>
          ))}
        </div>
      )}

      {/* Textarea */}
      <textarea
        ref={textareaRef as React.RefObject<HTMLTextAreaElement>}
        value={content}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        onScroll={onScroll}
        spellCheck={settings.spellCheck}
        className={[
          "flex-1 bg-transparent text-dsm-text font-mono",
          "resize-none outline-none border-none",
          "p-4 overflow-auto scrollbar-thin",
          "selection:bg-dsm-accent/25",
          "placeholder-dsm-muted/30",
        ].join(" ")}
        style={textareaStyle}
        placeholder="开始写作…"
        aria-label="Markdown 编辑器"
        autoCorrect="off"
        autoCapitalize="off"
      />
    </div>
  );
}
