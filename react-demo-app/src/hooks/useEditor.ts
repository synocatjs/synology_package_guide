// ============================================================
// src/hooks/useEditor.ts
// Editor interaction hook: cursor, selection, toolbar actions
// ============================================================

import { useRef, useCallback } from "react";
import type { ToolbarAction } from "@/types";
import {
  wrapSelection,
  insertAtCursor,
  buildTableTemplate,
} from "@/utils/markdown";
import { ACTION_SYNTAX } from "@/utils/shortcuts";

export interface EditorRef {
  textarea: HTMLTextAreaElement | null;
}

export function useEditor(content: string, onChange: (value: string) => void) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const focusTextarea = useCallback(() => {
    textareaRef.current?.focus();
  }, []);

  const getSelectionInfo = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return { start: 0, end: 0, selected: "" };
    return {
      start: el.selectionStart,
      end: el.selectionEnd,
      selected: el.value.slice(el.selectionStart, el.selectionEnd),
    };
  }, []);

  const setSelection = useCallback((start: number, end: number) => {
    const el = textareaRef.current;
    if (!el) return;
    requestAnimationFrame(() => {
      el.setSelectionRange(start, end);
    });
  }, []);

  const applyChange = useCallback(
    (newValue: string, selStart: number, selEnd: number) => {
      onChange(newValue);
      requestAnimationFrame(() => {
        const el = textareaRef.current;
        if (!el) return;
        el.focus();
        el.setSelectionRange(selStart, selEnd);
      });
    },
    [onChange],
  );

  // Handle Tab key inside textarea
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Tab") {
        e.preventDefault();
        const el = e.currentTarget;
        const { selectionStart: start, selectionEnd: end } = el;
        const indent = "  ";
        if (e.shiftKey) {
          // Dedent
          const before = content.slice(0, start);
          const lineStart = before.lastIndexOf("\n") + 1;
          const line = content.slice(lineStart);
          if (line.startsWith(indent)) {
            const newVal =
              content.slice(0, lineStart) +
              content.slice(lineStart + indent.length);
            applyChange(newVal, start - indent.length, end - indent.length);
          }
        } else {
          // Indent
          const result = insertAtCursor(content, start, indent);
          applyChange(result.value, result.selectionStart, result.selectionEnd);
        }
        return;
      }

      // Auto-close brackets and quotes
      const pairs: Record<string, string> = {
        "(": ")",
        "[": "]",
        "{": "}",
        '"': '"',
        "'": "'",
        "`": "`",
      };
      if (pairs[e.key]) {
        const el = e.currentTarget;
        const { selectionStart: start, selectionEnd: end } = el;
        if (start !== end) {
          // Wrap selection
          e.preventDefault();
          const result = wrapSelection(
            content,
            start,
            end,
            e.key,
            pairs[e.key],
          );
          applyChange(result.value, result.selectionStart, result.selectionEnd);
        }
      }
    },
    [content, applyChange],
  );

  // Toolbar action dispatcher
  const applyAction = useCallback(
    (action: ToolbarAction) => {
      const el = textareaRef.current;
      if (!el) return;

      const { selectionStart: start, selectionEnd: end } = el;

      // Special cases
      if (action === "table") {
        const table = buildTableTemplate(2, 3);
        const result = insertAtCursor(content, start, "\n" + table + "\n");
        applyChange(result.value, result.selectionStart, result.selectionEnd);
        return;
      }

      if (action === "undo") {
        document.execCommand("undo");
        return;
      }

      if (action === "redo") {
        document.execCommand("redo");
        return;
      }

      const syntax = ACTION_SYNTAX[action];
      if (!syntax) return;

      const selected = content.slice(start, end);
      const { before, after = "" } = syntax;

      if (syntax.block) {
        // Block-level: prefix current line
        const beforeCursor = content.slice(0, start);
        const lineStart = beforeCursor.lastIndexOf("\n") + 1;
        if (selected) {
          // Multi-line block prefix
          const lines = selected.split("\n");
          const prefixed = lines.map((l) => before + l).join("\n");
          const newVal =
            content.slice(0, start) + prefixed + content.slice(end);
          applyChange(newVal, start + before.length, start + prefixed.length);
        } else {
          const placeholder = syntax.placeholder || "";
          const insert = before + placeholder + after;
          const newVal =
            content.slice(0, lineStart) +
            insert +
            (lineStart < content.length ? "\n" : "") +
            content.slice(lineStart);
          applyChange(
            newVal,
            lineStart + before.length,
            lineStart + before.length + placeholder.length,
          );
        }
      } else {
        // Inline wrap
        if (selected) {
          const result = wrapSelection(content, start, end, before, after);
          applyChange(result.value, result.selectionStart, result.selectionEnd);
        } else {
          const placeholder = syntax.placeholder || "";
          const insert = before + placeholder + after;
          const result = insertAtCursor(content, start, insert);
          // Select placeholder
          applyChange(
            result.value,
            start + before.length,
            start + before.length + placeholder.length,
          );
        }
      }
    },
    [content, applyChange],
  );

  return {
    textareaRef,
    focusTextarea,
    getSelectionInfo,
    setSelection,
    handleKeyDown,
    applyAction,
  };
}
