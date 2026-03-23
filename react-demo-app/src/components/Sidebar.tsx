// ============================================================
// src/components/Sidebar.tsx
// Document list sidebar with search, sort, CRUD actions
// ============================================================

import React, { useState, useCallback, useRef, useEffect } from "react";
import { Menu, Transition, Dialog } from "@headlessui/react";
import {
  FilePlus,
  Search,
  MoreVertical,
  Edit3,
  Trash2,
  Copy,
  Clock,
  AlignLeft,
  ChevronUp,
  ChevronDown,
  PanelLeftClose,
  PanelLeft,
  FileText,
} from "lucide-react";
import type { MarkdownDocument, DocumentSortKey, SortDirection } from "@/types";

interface SidebarProps {
  documents: MarkdownDocument[];
  activeDocId: string | null;
  sortKey: DocumentSortKey;
  sortDir: SortDirection;
  onSelect: (id: string) => void;
  onNew: () => void;
  onRename: (id: string, title: string) => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
  onToggleSort: (key: DocumentSortKey) => void;
  isOpen: boolean;
  onToggle: () => void;
}

function formatDate(ts: number): string {
  const d = new Date(ts);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return "刚刚";
  if (diffMin < 60) return `${diffMin} 分钟前`;
  const diffH = Math.floor(diffMin / 60);
  if (diffH < 24) return `${diffH} 小时前`;
  const diffD = Math.floor(diffH / 24);
  if (diffD < 7) return `${diffD} 天前`;
  return d.toLocaleDateString("zh-CN", { month: "short", day: "numeric" });
}

// ----- Rename Dialog -----
interface RenameDialogProps {
  isOpen: boolean;
  currentTitle: string;
  onClose: () => void;
  onConfirm: (title: string) => void;
}

function RenameDialog({
  isOpen,
  currentTitle,
  onClose,
  onConfirm,
}: RenameDialogProps) {
  const [value, setValue] = useState(currentTitle);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setValue(currentTitle);
      setTimeout(() => inputRef.current?.select(), 50);
    }
  }, [isOpen, currentTitle]);

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (trimmed) onConfirm(trimmed);
    onClose();
  };

  return (
    <Transition show={isOpen} as={React.Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        <Transition.Child
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        </Transition.Child>
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            enter="ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="bg-dsm-surface border border-dsm-border rounded-xl shadow-2xl p-5 w-80">
              <Dialog.Title className="text-sm font-semibold text-dsm-text mb-3">
                重命名文档
              </Dialog.Title>
              <input
                ref={inputRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSubmit();
                  if (e.key === "Escape") onClose();
                }}
                className="w-full bg-dsm-bg border border-dsm-border rounded-lg px-3 py-2 text-sm text-dsm-text focus:outline-none focus:border-dsm-accent transition-colors"
                placeholder="文档标题"
              />
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={onClose}
                  className="px-3 py-1.5 text-xs text-dsm-muted hover:text-dsm-text transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-3 py-1.5 text-xs bg-dsm-accent text-white rounded-md hover:bg-dsm-accent/80 transition-colors"
                >
                  确认
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

// ----- Delete Confirm Dialog -----
interface DeleteDialogProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  onConfirm: () => void;
}

function DeleteDialog({
  isOpen,
  title,
  onClose,
  onConfirm,
}: DeleteDialogProps) {
  return (
    <Transition show={isOpen} as={React.Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        <Transition.Child
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        </Transition.Child>
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            enter="ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
          >
            <Dialog.Panel className="bg-dsm-surface border border-dsm-border rounded-xl shadow-2xl p-5 w-72">
              <Dialog.Title className="text-sm font-semibold text-dsm-text mb-2">
                删除文档
              </Dialog.Title>
              <p className="text-xs text-dsm-muted mb-4">
                确定删除{" "}
                <span className="text-dsm-text font-medium">"{title}"</span>
                ？此操作不可撤销。
              </p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={onClose}
                  className="px-3 py-1.5 text-xs text-dsm-muted hover:text-dsm-text transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={() => {
                    onConfirm();
                    onClose();
                  }}
                  className="px-3 py-1.5 text-xs bg-dsm-danger text-white rounded-md hover:bg-dsm-danger/80 transition-colors"
                >
                  删除
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

// ----- Doc Item -----
interface DocItemProps {
  doc: MarkdownDocument;
  isActive: boolean;
  onSelect: () => void;
  onRename: (title: string) => void;
  onDelete: () => void;
  onDuplicate: () => void;
}

function DocItem({
  doc,
  isActive,
  onSelect,
  onRename,
  onDelete,
  onDuplicate,
}: DocItemProps) {
  const [renameOpen, setRenameOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <>
      <div
        onClick={onSelect}
        className={[
          "group relative flex items-start gap-2 px-3 py-2.5 cursor-pointer rounded-lg mx-2 transition-all duration-150",
          isActive
            ? "bg-dsm-accent/10 border border-dsm-accent/20"
            : "hover:bg-white/5 border border-transparent",
        ].join(" ")}
      >
        <FileText
          size={13}
          className={`mt-0.5 shrink-0 ${isActive ? "text-dsm-accent" : "text-dsm-muted"}`}
        />
        <div className="flex-1 min-w-0">
          <p
            className={`text-sm font-medium truncate ${isActive ? "text-dsm-text" : "text-dsm-muted group-hover:text-dsm-text"}`}
          >
            {doc.title}
          </p>
          <p className="text-xs text-dsm-muted mt-0.5 flex items-center gap-1">
            <Clock size={10} />
            {formatDate(doc.updatedAt)}
            {doc.wordCount > 0 && (
              <>
                <span className="mx-1">·</span>
                {doc.wordCount} 字
              </>
            )}
          </p>
        </div>

        {/* Context menu */}
        <Menu as="div" className="relative shrink-0">
          <Menu.Button
            as="button"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            className="opacity-0 group-hover:opacity-100 p-0.5 rounded hover:bg-white/10 text-dsm-muted hover:text-dsm-text transition-all"
            aria-label="文档操作"
          >
            <MoreVertical size={13} />
          </Menu.Button>
          <Transition
            enter="transition ease-out duration-100"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 top-full mt-1 w-36 bg-dsm-surface border border-dsm-border rounded-lg shadow-xl z-50 py-1 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setRenameOpen(true);
                    }}
                    className={`flex items-center gap-2 w-full px-3 py-1.5 text-xs ${active ? "bg-white/5 text-dsm-text" : "text-dsm-muted"}`}
                  >
                    <Edit3 size={12} /> 重命名
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDuplicate();
                    }}
                    className={`flex items-center gap-2 w-full px-3 py-1.5 text-xs ${active ? "bg-white/5 text-dsm-text" : "text-dsm-muted"}`}
                  >
                    <Copy size={12} /> 复制
                  </button>
                )}
              </Menu.Item>
              <div className="border-t border-dsm-border/50 my-1" />
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteOpen(true);
                    }}
                    className={`flex items-center gap-2 w-full px-3 py-1.5 text-xs ${active ? "bg-dsm-danger/10 text-dsm-danger" : "text-dsm-danger/70"}`}
                  >
                    <Trash2 size={12} /> 删除
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>

      <RenameDialog
        isOpen={renameOpen}
        currentTitle={doc.title}
        onClose={() => setRenameOpen(false)}
        onConfirm={onRename}
      />
      <DeleteDialog
        isOpen={deleteOpen}
        title={doc.title}
        onClose={() => setDeleteOpen(false)}
        onConfirm={onDelete}
      />
    </>
  );
}

// ----- Main Sidebar -----
export function Sidebar({
  documents,
  activeDocId,
  sortKey,
  sortDir,
  onSelect,
  onNew,
  onRename,
  onDelete,
  onDuplicate,
  onToggleSort,
  isOpen,
  onToggle,
}: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = searchQuery.trim()
    ? documents.filter(
        (d) =>
          d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          d.content.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : documents;

  const SortIcon = useCallback(
    ({ k }: { k: DocumentSortKey }) => {
      if (sortKey !== k) return null;
      return sortDir === "asc" ? (
        <ChevronUp size={10} />
      ) : (
        <ChevronDown size={10} />
      );
    },
    [sortKey, sortDir],
  );

  if (!isOpen) {
    return (
      <div className="flex flex-col items-center w-10 border-r border-dsm-border bg-dsm-surface py-2 gap-2">
        <button
          onClick={onToggle}
          className="p-1.5 rounded hover:bg-white/5 text-dsm-muted hover:text-dsm-text transition-colors"
          title="展开侧边栏"
        >
          <PanelLeft size={16} />
        </button>
        <button
          onClick={onNew}
          className="p-1.5 rounded hover:bg-white/5 text-dsm-muted hover:text-dsm-text transition-colors"
          title="新建文档"
        >
          <FilePlus size={16} />
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-56 border-r border-dsm-border bg-dsm-surface shrink-0">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2.5 border-b border-dsm-border/50">
        <span className="text-xs font-semibold text-dsm-muted uppercase tracking-wider">
          文档
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={onNew}
            className="p-1 rounded hover:bg-white/5 text-dsm-muted hover:text-dsm-accent transition-colors"
            title="新建文档 (Ctrl+N)"
          >
            <FilePlus size={14} />
          </button>
          <button
            onClick={onToggle}
            className="p-1 rounded hover:bg-white/5 text-dsm-muted hover:text-dsm-text transition-colors"
            title="收起侧边栏"
          >
            <PanelLeftClose size={14} />
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="px-2 py-2 border-b border-dsm-border/50">
        <div className="flex items-center gap-2 bg-dsm-bg rounded-lg px-2 py-1.5 border border-dsm-border/50 focus-within:border-dsm-accent/50 transition-colors">
          <Search size={12} className="text-dsm-muted shrink-0" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜索文档…"
            className="flex-1 bg-transparent text-xs text-dsm-text placeholder-dsm-muted focus:outline-none"
          />
        </div>
      </div>

      {/* Sort controls */}
      <div className="flex items-center gap-1 px-3 py-1.5 border-b border-dsm-border/50">
        <span className="text-xs text-dsm-muted mr-1">排序：</span>
        <button
          onClick={() => onToggleSort("updatedAt")}
          className={`flex items-center gap-0.5 text-xs px-1.5 py-0.5 rounded transition-colors ${sortKey === "updatedAt" ? "text-dsm-accent" : "text-dsm-muted hover:text-dsm-text"}`}
        >
          <Clock size={10} />
          时间
          <SortIcon k="updatedAt" />
        </button>
        <button
          onClick={() => onToggleSort("title")}
          className={`flex items-center gap-0.5 text-xs px-1.5 py-0.5 rounded transition-colors ${sortKey === "title" ? "text-dsm-accent" : "text-dsm-muted hover:text-dsm-text"}`}
        >
          <AlignLeft size={10} />
          名称
          <SortIcon k="title" />
        </button>
      </div>

      {/* Doc list */}
      <div className="flex-1 overflow-y-auto py-1.5 scrollbar-thin">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-dsm-muted">
            <FileText size={24} className="mb-2 opacity-30" />
            <p className="text-xs">{searchQuery ? "无搜索结果" : "暂无文档"}</p>
          </div>
        ) : (
          filtered.map((doc) => (
            <DocItem
              key={doc.id}
              doc={doc}
              isActive={doc.id === activeDocId}
              onSelect={() => onSelect(doc.id)}
              onRename={(title) => onRename(doc.id, title)}
              onDelete={() => onDelete(doc.id)}
              onDuplicate={() => onDuplicate(doc.id)}
            />
          ))
        )}
      </div>

      {/* Footer stats */}
      <div className="px-3 py-2 border-t border-dsm-border/50 text-xs text-dsm-muted">
        {documents.length} 篇文档
      </div>
    </div>
  );
}
