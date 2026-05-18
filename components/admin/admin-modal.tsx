"use client";

import { X } from "lucide-react";

import { Button } from "@/components/ui/button";

export function AdminModal({
  isOpen,
  title,
  children,
  onClose
}: {
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[75] grid place-items-center bg-graphite-950/60 p-4 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="admin-modal-title"
        className="max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-lg border border-border bg-background shadow-soft"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-border bg-background p-5">
          <h2 id="admin-modal-title" className="text-xl font-black">
            {title}
          </h2>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Pencereyi kapat"
            onClick={onClose}
          >
            <X />
          </Button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}
