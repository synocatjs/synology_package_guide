// ============================================================
// src/components/StatusBar.tsx
// Bottom status bar: cursor position, word count, reading time
// ============================================================

import React from "react";
import { Clock, Type, Hash, MousePointer2 } from "lucide-react";
import type { EditorStats } from "@/types";

interface StatusBarProps {
  stats: EditorStats;
  isEditorMode: boolean;
}

interface StatItemProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}

function StatItem({ icon, label, value }: StatItemProps) {
  return (
    <div className="flex items-center gap-1.5 text-dsm-muted" title={label}>
      <span className="opacity-60">{icon}</span>
      <span className="text-xs tabular-nums">{value}</span>
    </div>
  );
}

export function StatusBar({ stats, isEditorMode }: StatusBarProps) {
  return (
    <div className="flex items-center justify-between px-4 py-1 border-t border-dsm-border bg-dsm-surface/80 backdrop-blur-sm shrink-0">
      {/* Left: cursor position (only in editor) */}
      <div className="flex items-center gap-4">
        {isEditorMode && (
          <StatItem
            icon={<MousePointer2 size={11} />}
            label="光标位置"
            value={`${stats.cursorLine}:${stats.cursorCol}`}
          />
        )}
        {stats.selectionLength > 0 && (
          <span className="text-xs text-dsm-accent">
            已选 {stats.selectionLength} 字符
          </span>
        )}
      </div>

      {/* Right: doc stats */}
      <div className="flex items-center gap-4">
        <StatItem
          icon={<Type size={11} />}
          label="字数"
          value={`${stats.wordCount} 字`}
        />
        <StatItem
          icon={<Hash size={11} />}
          label="字符数"
          value={`${stats.charCount} 字符`}
        />
        <StatItem
          icon={<Clock size={11} />}
          label="阅读时长"
          value={`${stats.readingTime} 分钟`}
        />
        <span className="text-xs text-dsm-muted/50">{stats.lineCount} 行</span>
      </div>
    </div>
  );
}
