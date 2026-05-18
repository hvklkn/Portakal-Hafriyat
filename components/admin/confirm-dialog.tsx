"use client";

import { AlertTriangle, Loader2, X } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ConfirmDialog({
  isOpen,
  title,
  description,
  confirmLabel = "Onayla",
  cancelLabel = "Vazgec",
  isPending = false,
  onConfirm,
  onCancel
}: {
  isOpen: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isPending?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center bg-graphite-950/60 p-4 backdrop-blur-sm">
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
        className="w-full max-w-md rounded-lg border border-border bg-background p-5 shadow-soft"
      >
        <div className="flex items-start justify-between gap-4">
          <span className="grid size-11 shrink-0 place-items-center rounded-md bg-signal-50 text-signal-800">
            <AlertTriangle className="size-5" />
          </span>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Dialogu kapat"
            disabled={isPending}
            onClick={onCancel}
          >
            <X />
          </Button>
        </div>
        <h2 id="confirm-dialog-title" className="mt-4 text-xl font-black">
          {title}
        </h2>
        <p
          id="confirm-dialog-description"
          className="mt-2 text-sm leading-6 text-muted-foreground"
        >
          {description}
        </p>
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            disabled={isPending}
            onClick={onCancel}
          >
            {cancelLabel}
          </Button>
          <Button
            type="button"
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            disabled={isPending}
            onClick={onConfirm}
          >
            {isPending ? <Loader2 className="animate-spin" /> : null}
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
