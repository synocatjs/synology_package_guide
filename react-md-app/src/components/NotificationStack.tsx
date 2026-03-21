// ============================================================
// src/components/NotificationStack.tsx
// Toast notification display component
// ============================================================

import React from "react";
import { Transition } from "@headlessui/react";
import { CheckCircle, XCircle, AlertTriangle, Info, X } from "lucide-react";
import type { Notification } from "@/types";

interface NotificationStackProps {
  notifications: Notification[];
  onDismiss: (id: string) => void;
}

const ICONS = {
  success: <CheckCircle size={15} />,
  error: <XCircle size={15} />,
  warning: <AlertTriangle size={15} />,
  info: <Info size={15} />,
};

const COLORS = {
  success: "border-dsm-success/30 text-dsm-success",
  error: "border-dsm-danger/30 text-dsm-danger",
  warning: "border-dsm-warning/30 text-dsm-warning",
  info: "border-dsm-accent/30 text-dsm-accent",
};

const BG_COLORS = {
  success: "bg-dsm-success/10",
  error: "bg-dsm-danger/10",
  warning: "bg-dsm-warning/10",
  info: "bg-dsm-accent/10",
};

export function NotificationStack({
  notifications,
  onDismiss,
}: NotificationStackProps) {
  return (
    <div className="fixed bottom-8 right-4 z-[200] flex flex-col gap-2 pointer-events-none">
      {notifications.map((n) => (
        <Transition
          key={n.id}
          show={true}
          appear={true}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-x-4"
          enterTo="opacity-100 translate-x-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-x-0"
          leaveTo="opacity-0 translate-x-4"
        >
          <div
            className={[
              "flex items-center gap-3 px-3 py-2.5 rounded-lg border shadow-lg",
              "pointer-events-auto max-w-xs",
              BG_COLORS[n.type],
              COLORS[n.type],
              "border",
            ].join(" ")}
            style={{ borderColor: "inherit" }}
          >
            <span className="shrink-0">{ICONS[n.type]}</span>
            <p className="text-xs text-dsm-text flex-1">{n.message}</p>
            <button
              onClick={() => onDismiss(n.id)}
              className="shrink-0 opacity-60 hover:opacity-100 transition-opacity"
            >
              <X size={13} />
            </button>
          </div>
        </Transition>
      ))}
    </div>
  );
}
