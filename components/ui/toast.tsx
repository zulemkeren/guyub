"use client";

import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { CheckCircle2, XCircle, Info, X, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

export type ToastVariant = "success" | "error" | "info" | "warning";

interface Toast {
  id: string;
  title: string;
  description?: string;
  variant: ToastVariant;
}

interface ToastContextType {
  toasts: Toast[];
  show: (t: Omit<Toast, "id">) => void;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const show = useCallback((t: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { ...t, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((x) => x.id !== id));
    }, 4000);
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((x) => x.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, show, dismiss }}>
      {children}
      <ToastViewport />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

function ToastViewport() {
  const { toasts, dismiss } = useToast();

  return (
    <div className="pointer-events-none fixed bottom-0 right-0 z-50 flex w-full max-w-sm flex-col gap-2 p-4 sm:bottom-4 sm:right-4">
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onDismiss={() => dismiss(t.id)} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: () => void }) {
  const config = {
    success: { Icon: CheckCircle2, cls: "border-guyub-200 bg-white", iconCls: "text-guyub-600" },
    error: { Icon: XCircle, cls: "border-red-200 bg-white", iconCls: "text-red-600" },
    info: { Icon: Info, cls: "border-blue-200 bg-white", iconCls: "text-blue-600" },
    warning: { Icon: AlertTriangle, cls: "border-amber-200 bg-white", iconCls: "text-amber-600" },
  }[toast.variant];

  const { Icon } = config;

  return (
    <div
      className={cn(
        "pointer-events-auto flex items-start gap-3 rounded-2xl border p-4 shadow-warm-lg animate-slide-in-right",
        config.cls
      )}
      role="status"
    >
      <Icon className={cn("mt-0.5 h-4 w-4 shrink-0", config.iconCls)} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-earth-900">{toast.title}</p>
        {toast.description && (
          <p className="mt-1 text-xs text-earth-600">{toast.description}</p>
        )}
      </div>
      <button
        type="button"
        onClick={onDismiss}
        className="rounded-md p-0.5 text-earth-400 transition-colors hover:bg-earth-100 hover:text-earth-700"
        aria-label="Tutup"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
