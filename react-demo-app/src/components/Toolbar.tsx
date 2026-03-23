// ============================================================
// src/components/Toolbar.tsx
// Markdown formatting toolbar with HeadlessUI tooltips
// ============================================================

import React from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  CodeSquare,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  List,
  ListOrdered,
  ListTodo,
  Link,
  Image,
  Table,
  Minus,
  Undo2,
  Redo2,
  ChevronDown,
  Eye,
  Columns2,
  PenLine,
  Download,
  Upload,
  FileText,
  Globe,
  FileDown,
  Settings,
  Search,
  Moon,
  Sun,
} from "lucide-react";
import type {
  ToolbarAction,
  EditorMode,
  EditorTheme,
  ExportFormat,
} from "@/types";

interface ToolbarProps {
  onAction: (action: ToolbarAction) => void;
  mode: EditorMode;
  theme: EditorTheme;
  onModeChange: (mode: EditorMode) => void;
  onThemeToggle: () => void;
  onExport: (format: ExportFormat) => void;
  onImport: () => void;
  onSearch: () => void;
  onSettings: () => void;
  docTitle: string;
  isSaved: boolean;
}

// ----- Tooltip wrapper -----
interface TooltipBtnProps {
  onClick: () => void;
  title: string;
  shortcut?: string;
  children: React.ReactNode;
  active?: boolean;
  className?: string;
}

function TooltipBtn({
  onClick,
  title,
  shortcut,
  children,
  active,
  className = "",
}: TooltipBtnProps) {
  return (
    <div className="relative group">
      <button
        onMouseDown={(e) => {
          e.preventDefault(); // don't steal textarea focus
          onClick();
        }}
        className={[
          "flex items-center justify-center w-8 h-8 rounded transition-all duration-150",
          "text-dsm-muted hover:text-dsm-text hover:bg-white/5",
          active ? "text-dsm-accent bg-dsm-accent/10" : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        aria-label={title}
      >
        {children}
      </button>
      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150">
        <div className="bg-gray-900 border border-dsm-border rounded px-2 py-1 text-xs text-dsm-text whitespace-nowrap shadow-lg">
          {title}
          {shortcut && (
            <span className="ml-2 text-dsm-muted font-mono">{shortcut}</span>
          )}
        </div>
      </div>
    </div>
  );
}

// ----- Divider -----
function Divider() {
  return <div className="w-px h-5 bg-dsm-border mx-1" />;
}

// ----- Mode Toggle -----
interface ModeButtonProps {
  active: boolean;
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}

function ModeButton({ active, onClick, label, children }: ModeButtonProps) {
  return (
    <button
      onMouseDown={(e) => {
        e.preventDefault();
        onClick();
      }}
      aria-label={label}
      className={[
        "flex items-center gap-1.5 px-2.5 h-7 rounded text-xs font-medium transition-all duration-150",
        active
          ? "bg-dsm-accent/15 text-dsm-accent border border-dsm-accent/30"
          : "text-dsm-muted hover:text-dsm-text hover:bg-white/5 border border-transparent",
      ].join(" ")}
    >
      {children}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}

export function Toolbar({
  onAction,
  mode,
  theme,
  onModeChange,
  onThemeToggle,
  onExport,
  onImport,
  onSearch,
  onSettings,
  docTitle,
  isSaved,
}: ToolbarProps) {
  const iconSize = 15;

  return (
    <div className="flex flex-col border-b border-dsm-border bg-dsm-surface">
      {/* Top row: title + view controls */}
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-dsm-border/50">
        <div className="flex items-center gap-2 min-w-0">
          <FileText size={13} className="text-dsm-accent shrink-0" />
          <span className="text-sm font-medium text-dsm-text truncate max-w-[200px]">
            {docTitle}
          </span>
          <span
            className={[
              "text-xs px-1.5 py-0.5 rounded-full",
              isSaved
                ? "bg-dsm-success/10 text-dsm-success"
                : "bg-dsm-warning/10 text-dsm-warning animate-pulse-soft",
            ].join(" ")}
          >
            {isSaved ? "已保存" : "保存中…"}
          </span>
        </div>

        {/* View mode toggles */}
        <div className="flex items-center gap-1">
          <ModeButton
            active={mode === "editor"}
            onClick={() => onModeChange("editor")}
            label="编辑"
          >
            <PenLine size={12} />
          </ModeButton>
          <ModeButton
            active={mode === "split"}
            onClick={() => onModeChange("split")}
            label="分栏"
          >
            <Columns2 size={12} />
          </ModeButton>
          <ModeButton
            active={mode === "preview"}
            onClick={() => onModeChange("preview")}
            label="预览"
          >
            <Eye size={12} />
          </ModeButton>
        </div>
      </div>

      {/* Bottom row: formatting tools */}
      <div className="flex items-center gap-0.5 px-2 py-1 overflow-x-auto scrollbar-thin">
        {/* History */}
        <TooltipBtn
          onClick={() => onAction("undo")}
          title="撤销"
          shortcut="Ctrl+Z"
        >
          <Undo2 size={iconSize} />
        </TooltipBtn>
        <TooltipBtn
          onClick={() => onAction("redo")}
          title="重做"
          shortcut="Ctrl+Y"
        >
          <Redo2 size={iconSize} />
        </TooltipBtn>

        <Divider />

        {/* Headings */}
        <TooltipBtn onClick={() => onAction("heading1")} title="标题 1">
          <Heading1 size={iconSize} />
        </TooltipBtn>
        <TooltipBtn onClick={() => onAction("heading2")} title="标题 2">
          <Heading2 size={iconSize} />
        </TooltipBtn>
        <TooltipBtn onClick={() => onAction("heading3")} title="标题 3">
          <Heading3 size={iconSize} />
        </TooltipBtn>

        <Divider />

        {/* Inline formatting */}
        <TooltipBtn
          onClick={() => onAction("bold")}
          title="粗体"
          shortcut="Ctrl+B"
        >
          <Bold size={iconSize} />
        </TooltipBtn>
        <TooltipBtn
          onClick={() => onAction("italic")}
          title="斜体"
          shortcut="Ctrl+I"
        >
          <Italic size={iconSize} />
        </TooltipBtn>
        <TooltipBtn onClick={() => onAction("strikethrough")} title="删除线">
          <Strikethrough size={iconSize} />
        </TooltipBtn>
        <TooltipBtn
          onClick={() => onAction("code")}
          title="行内代码"
          shortcut="Ctrl+`"
        >
          <Code size={iconSize} />
        </TooltipBtn>
        <TooltipBtn onClick={() => onAction("codeblock")} title="代码块">
          <CodeSquare size={iconSize} />
        </TooltipBtn>

        <Divider />

        {/* Blocks */}
        <TooltipBtn onClick={() => onAction("quote")} title="引用">
          <Quote size={iconSize} />
        </TooltipBtn>
        <TooltipBtn onClick={() => onAction("unorderedList")} title="无序列表">
          <List size={iconSize} />
        </TooltipBtn>
        <TooltipBtn onClick={() => onAction("orderedList")} title="有序列表">
          <ListOrdered size={iconSize} />
        </TooltipBtn>
        <TooltipBtn onClick={() => onAction("taskList")} title="任务列表">
          <ListTodo size={iconSize} />
        </TooltipBtn>

        <Divider />

        {/* Inserts */}
        <TooltipBtn
          onClick={() => onAction("link")}
          title="插入链接"
          shortcut="Ctrl+K"
        >
          <Link size={iconSize} />
        </TooltipBtn>
        <TooltipBtn onClick={() => onAction("image")} title="插入图片">
          <Image size={iconSize} />
        </TooltipBtn>
        <TooltipBtn onClick={() => onAction("table")} title="插入表格">
          <Table size={iconSize} />
        </TooltipBtn>
        <TooltipBtn onClick={() => onAction("hr")} title="分隔线">
          <Minus size={iconSize} />
        </TooltipBtn>

        <Divider />

        {/* Search */}
        <TooltipBtn onClick={onSearch} title="查找替换" shortcut="Ctrl+F">
          <Search size={iconSize} />
        </TooltipBtn>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Export dropdown */}
        <Menu as="div" className="relative">
          <Menu.Button
            as="div"
            className="flex items-center gap-1 px-2 h-7 rounded text-xs text-dsm-muted hover:text-dsm-text hover:bg-white/5 cursor-pointer transition-colors"
          >
            <Download size={13} />
            <span className="hidden sm:inline">导出</span>
            <ChevronDown size={11} />
          </Menu.Button>
          <Transition
            enter="transition ease-out duration-100"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 top-full mt-1 w-44 bg-dsm-surface border border-dsm-border rounded-lg shadow-xl z-50 py-1 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => onExport("md")}
                    className={`flex items-center gap-2.5 w-full px-3 py-2 text-sm ${active ? "bg-white/5 text-dsm-text" : "text-dsm-muted"}`}
                  >
                    <FileDown size={13} />
                    Markdown (.md)
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => onExport("html")}
                    className={`flex items-center gap-2.5 w-full px-3 py-2 text-sm ${active ? "bg-white/5 text-dsm-text" : "text-dsm-muted"}`}
                  >
                    <Globe size={13} />
                    HTML (.html)
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => onExport("txt")}
                    className={`flex items-center gap-2.5 w-full px-3 py-2 text-sm ${active ? "bg-white/5 text-dsm-text" : "text-dsm-muted"}`}
                  >
                    <FileText size={13} />
                    纯文本 (.txt)
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>

        <TooltipBtn onClick={onImport} title="导入文件">
          <Upload size={iconSize} />
        </TooltipBtn>

        <Divider />

        {/* Theme toggle */}
        <TooltipBtn
          onClick={onThemeToggle}
          title={theme === "dark" ? "切换亮色" : "切换暗色"}
        >
          {theme === "dark" ? (
            <Sun size={iconSize} />
          ) : (
            <Moon size={iconSize} />
          )}
        </TooltipBtn>

        {/* Settings */}
        <TooltipBtn onClick={onSettings} title="设置">
          <Settings size={iconSize} />
        </TooltipBtn>
      </div>
    </div>
  );
}
