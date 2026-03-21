// ============================================================
// src/hooks/useSettings.ts
// Editor settings hook with persistence
// ============================================================

import { useState, useCallback } from "react";
import type { EditorSettings } from "@/types";
import { loadSettings, saveSettings } from "@/utils/storage";

export function useSettings() {
  const [settings, setSettings] = useState<EditorSettings>(() =>
    loadSettings(),
  );

  const updateSetting = useCallback(
    <K extends keyof EditorSettings>(key: K, value: EditorSettings[K]) => {
      setSettings((prev) => {
        const next = { ...prev, [key]: value };
        saveSettings(next);
        return next;
      });
    },
    [],
  );

  const resetSettings = useCallback(() => {
    const defaults = loadSettings();
    setSettings(defaults);
    saveSettings(defaults);
  }, []);

  return { settings, updateSetting, resetSettings };
}

// ============================================================
// src/hooks/useNotifications.ts
// Toast notification system
// ============================================================

import { useRef } from "react";
import type { Notification, NotificationType } from "@/types";

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const timerRefs = useRef<Map<string, ReturnType<typeof setTimeout>>>(
    new Map(),
  );

  const dismiss = useCallback((id: string) => {
    const timer = timerRefs.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timerRefs.current.delete(id);
    }
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const notify = useCallback(
    (message: string, type: NotificationType = "info", duration = 3000) => {
      const id = `notif-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
      const notif: Notification = { id, type, message, duration };

      setNotifications((prev) => [...prev.slice(-4), notif]);

      if (duration > 0) {
        const timer = setTimeout(() => dismiss(id), duration);
        timerRefs.current.set(id, timer);
      }

      return id;
    },
    [dismiss],
  );

  const success = useCallback(
    (msg: string, duration?: number) => notify(msg, "success", duration),
    [notify],
  );
  const error = useCallback(
    (msg: string, duration?: number) => notify(msg, "error", duration),
    [notify],
  );
  const warning = useCallback(
    (msg: string, duration?: number) => notify(msg, "warning", duration),
    [notify],
  );
  const info = useCallback(
    (msg: string, duration?: number) => notify(msg, "info", duration),
    [notify],
  );

  return { notifications, notify, success, error, warning, info, dismiss };
}

// ============================================================
// src/hooks/useSearchReplace.ts
// Find & replace state management
// ============================================================

import type { SearchState } from "@/types";

const DEFAULT_SEARCH: SearchState = {
  query: "",
  replace: "",
  isOpen: false,
  caseSensitive: false,
  useRegex: false,
  matchCount: 0,
  currentMatch: 0,
};

export function useSearchReplace(
  content: string,
  onChange: (v: string) => void,
) {
  const [state, setSearchState] = useState<SearchState>(DEFAULT_SEARCH);

  const open = useCallback(
    () => setSearchState((s) => ({ ...s, isOpen: true })),
    [],
  );
  const close = useCallback(
    () => setSearchState((s) => ({ ...s, isOpen: false })),
    [],
  );

  const setQuery = useCallback(
    (query: string) => {
      setSearchState((s) => {
        try {
          const flags = s.caseSensitive ? "g" : "gi";
          const pattern = s.useRegex
            ? query
            : query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
          const regex = new RegExp(pattern, flags);
          const matchCount = query ? (content.match(regex) || []).length : 0;
          return {
            ...s,
            query,
            matchCount,
            currentMatch: matchCount > 0 ? 1 : 0,
          };
        } catch {
          return { ...s, query, matchCount: 0, currentMatch: 0 };
        }
      });
    },
    [content],
  );

  const setReplace = useCallback(
    (replace: string) => setSearchState((s) => ({ ...s, replace })),
    [],
  );

  const toggle = useCallback(
    (key: "caseSensitive" | "useRegex") =>
      setSearchState((s) => ({ ...s, [key]: !s[key] })),
    [],
  );

  const replaceOne = useCallback(() => {
    if (!state.query) return;
    try {
      const flags = state.caseSensitive ? "" : "i";
      const pattern = state.useRegex
        ? state.query
        : state.query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(pattern, flags);
      const newContent = content.replace(regex, state.replace);
      onChange(newContent);
    } catch {
      /* noop */
    }
  }, [state, content, onChange]);

  const replaceAll = useCallback(() => {
    if (!state.query) return;
    try {
      const flags = state.caseSensitive ? "g" : "gi";
      const pattern = state.useRegex
        ? state.query
        : state.query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(pattern, flags);
      const newContent = content.replace(regex, state.replace);
      onChange(newContent);
    } catch {
      /* noop */
    }
  }, [state, content, onChange]);

  return {
    search: state,
    open,
    close,
    setQuery,
    setReplace,
    toggle,
    replaceOne,
    replaceAll,
  };
}
