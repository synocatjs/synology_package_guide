// ============================================================
// src/App.tsx
// Root application component — wires all modules together
// ============================================================

import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from "react";
import { Toolbar } from "@/components/Toolbar";
import { Sidebar } from "@/components/Sidebar";
import { EditorPane } from "@/components/EditorPane";
import { PreviewPane } from "@/components/PreviewPane";
import { StatusBar } from "@/components/StatusBar";
import { NotificationStack } from "@/components/NotificationStack";
import { SettingsPanel } from "@/components/SettingsPanel";
import { ShortcutsHelp } from "@/components/ShortcutsHelp";
import { useDocuments } from "@/hooks/useDocuments";
import { useEditor } from "@/hooks/useEditor";
import {
  useSettings,
  useNotifications,
  useSearchReplace,
} from "@/hooks/useSettings";
import { exportDocument, importMarkdownFile } from "@/utils/export";
import { countWords, countChars, estimateReadingTime } from "@/utils/markdown";
import { KEYBOARD_SHORTCUTS } from "@/utils/shortcuts";
import type { EditorMode, ToolbarAction, ExportFormat } from "@/types";

export default function App() {
  // ----- Core state -----
  const { settings, updateSetting, resetSettings } = useSettings();
  const { notifications, success, error, dismiss } = useNotifications();
  const {
    documents,
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
  } = useDocuments();

  // ----- UI state -----
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(true);
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ----- Editor -----
  const content = activeDocument?.content ?? "";

  const handleContentChange = useCallback(
    (value: string) => {
      if (!activeDocId) return;
      setIsSaved(false);
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
      const delay = settings.autosave ? settings.autosaveInterval : 0;
      saveTimeoutRef.current = setTimeout(() => {
        updateContent(activeDocId, value);
        setIsSaved(true);
      }, delay || 300);
    },
    [activeDocId, updateContent, settings.autosave, settings.autosaveInterval],
  );

  // Sync active doc content locally so editor is responsive
  const [localContent, setLocalContent] = useState(content);
  useEffect(() => {
    setLocalContent(activeDocument?.content ?? "");
  }, [activeDocument?.id]); // only reset on doc switch, not on every save

  const handleChange = useCallback(
    (value: string) => {
      setLocalContent(value);
      handleContentChange(value);
    },
    [handleContentChange],
  );

  const { textareaRef, handleKeyDown, applyAction } = useEditor(
    localContent,
    handleChange,
  );

  // ----- Search / Replace -----
  const searchCtx = useSearchReplace(localContent, handleChange);

  // ----- Scroll sync -----
  const [editorScrollRatio, setEditorScrollRatio] = useState(0);
  const [previewScrollRatio, setPreviewScrollRatio] = useState(0);

  const handleEditorScroll = useCallback(
    (e: React.UIEvent<HTMLTextAreaElement>) => {
      const el = e.currentTarget;
      const ratio =
        el.scrollTop / Math.max(1, el.scrollHeight - el.clientHeight);
      setEditorScrollRatio(ratio);
    },
    [],
  );

  // ----- Stats -----
  const stats = useMemo(() => {
    const el = textareaRef.current;
    const cursorLine = el
      ? localContent.slice(0, el.selectionStart).split("\n").length
      : 1;
    const cursorCol = el
      ? el.selectionStart -
        localContent.lastIndexOf("\n", el.selectionStart - 1)
      : 1;
    const selectionLength = el ? el.selectionEnd - el.selectionStart : 0;
    return {
      wordCount: countWords(localContent),
      charCount: countChars(localContent),
      lineCount: (localContent.match(/\n/g) || []).length + 1,
      selectionLength,
      cursorLine,
      cursorCol,
      readingTime: estimateReadingTime(localContent),
    };
  }, [localContent, textareaRef]);

  // ----- Toolbar handlers -----
  const handleAction = useCallback(
    (action: ToolbarAction) => {
      applyAction(action);
    },
    [applyAction],
  );

  const handleExport = useCallback(
    (format: ExportFormat) => {
      if (!activeDocument) return;
      exportDocument(activeDocument, format);
      success(`已导出为 .${format} 格式`);
    },
    [activeDocument, success],
  );

  const handleImport = useCallback(async () => {
    try {
      const { title, content: importedContent } = await importMarkdownFile();
      importDocument(title, importedContent);
      success(`已导入: ${title}`);
    } catch (e) {
      if (e instanceof Error && e.message !== "No file selected") {
        error("导入失败，请检查文件格式");
      }
    }
  }, [importDocument, success, error]);

  const handleThemeToggle = useCallback(() => {
    const next = settings.theme === "dark" ? "light" : "dark";
    updateSetting("theme", next);
  }, [settings.theme, updateSetting]);

  // ----- Theme class -----
  useEffect(() => {
    const root = document.documentElement;
    if (settings.theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [settings.theme]);

  // ----- Global keyboard shortcuts -----
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Don't intercept when user types in inputs/textareas (except our own)
      const tag = (e.target as HTMLElement).tagName;
      const isInput =
        tag === "INPUT" ||
        (tag === "TEXTAREA" && e.target !== textareaRef.current);
      if (isInput) return;

      for (const sc of KEYBOARD_SHORTCUTS) {
        const ctrl = sc.ctrl ?? false;
        const shift = sc.shift ?? false;
        const alt = sc.alt ?? false;
        const ctrlMatch = e.ctrlKey === ctrl || e.metaKey === ctrl;
        if (
          ctrlMatch &&
          e.shiftKey === shift &&
          e.altKey === alt &&
          e.key.toLowerCase() === sc.key.toLowerCase()
        ) {
          e.preventDefault();
          switch (sc.action) {
            case "new-doc":
              newDocument();
              break;
            case "save":
              if (activeDocId) {
                updateContent(activeDocId, localContent);
                setIsSaved(true);
                success("已保存");
              }
              break;
            case "open":
              handleImport();
              break;
            case "mode-editor":
              updateSetting("mode", "editor");
              break;
            case "mode-split":
              updateSetting("mode", "split");
              break;
            case "mode-preview":
              updateSetting("mode", "preview");
              break;
            case "bold":
              applyAction("bold");
              break;
            case "italic":
              applyAction("italic");
              break;
            case "link":
              applyAction("link");
              break;
            case "code":
              applyAction("code");
              break;
            case "search":
              searchCtx.open();
              break;
            case "replace":
              searchCtx.open();
              break;
            case "shortcuts":
              setShortcutsOpen(true);
              break;
            case "command-palette":
              setShortcutsOpen(true);
              break;
          }
          return;
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [
    activeDocId,
    localContent,
    newDocument,
    updateContent,
    updateSetting,
    applyAction,
    handleImport,
    searchCtx,
    success,
    textareaRef,
  ]);

  // ----- Mode -----
  const mode: EditorMode = settings.mode;
  const showEditor = mode === "editor" || mode === "split";
  const showPreview = mode === "preview" || mode === "split";

  return (
    <div
      className={[
        "flex flex-col h-screen overflow-hidden font-sans antialiased",
        settings.theme === "dark"
          ? "bg-dsm-bg text-dsm-text"
          : "bg-gray-50 text-gray-900",
      ].join(" ")}
    >
      {/* Toolbar */}
      <Toolbar
        onAction={handleAction}
        mode={mode}
        theme={settings.theme}
        onModeChange={(m) => updateSetting("mode", m)}
        onThemeToggle={handleThemeToggle}
        onExport={handleExport}
        onImport={handleImport}
        onSearch={searchCtx.open}
        onSettings={() => setSettingsOpen(true)}
        docTitle={activeDocument?.title ?? "无标题"}
        isSaved={isSaved}
      />

      {/* Main area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          documents={documents}
          activeDocId={activeDocId}
          sortKey={sortKey}
          sortDir={sortDir}
          onSelect={selectDocument}
          onNew={newDocument}
          onRename={renameDoc}
          onDelete={deleteDocument}
          onDuplicate={duplicateDocument}
          onToggleSort={toggleSort}
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen((v) => !v)}
        />

        {/* Editor + Preview */}
        <div className="flex flex-1 overflow-hidden divide-x divide-dsm-border">
          {showEditor && (
            <EditorPane
              content={localContent}
              settings={settings}
              textareaRef={textareaRef}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              search={searchCtx.search}
              onSearchQuery={searchCtx.setQuery}
              onSearchReplace={searchCtx.setReplace}
              onSearchToggle={searchCtx.toggle}
              onReplaceOne={searchCtx.replaceOne}
              onReplaceAll={searchCtx.replaceAll}
              onSearchClose={searchCtx.close}
            />
          )}

          {showPreview && (
            <PreviewPane
              content={localContent}
              syncScroll={settings.syncScroll}
              editorScrollRatio={showEditor ? editorScrollRatio : undefined}
              onScrollRatio={showEditor ? setPreviewScrollRatio : undefined}
              showOutline={mode === "preview"}
            />
          )}
        </div>
      </div>

      {/* Status bar */}
      <StatusBar stats={stats} isEditorMode={showEditor} />

      {/* Modals */}
      <SettingsPanel
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        settings={settings}
        onUpdate={updateSetting}
        onReset={resetSettings}
      />
      <ShortcutsHelp
        isOpen={shortcutsOpen}
        onClose={() => setShortcutsOpen(false)}
      />

      {/* Notifications */}
      <NotificationStack notifications={notifications} onDismiss={dismiss} />
    </div>
  );
}
