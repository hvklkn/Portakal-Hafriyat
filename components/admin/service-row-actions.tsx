"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, Pencil, Power, Trash2 } from "lucide-react";
import { useState } from "react";

import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { Button } from "@/components/ui/button";

export function ServiceRowActions({
  id,
  title,
  isActive
}: {
  id: string;
  title: string;
  isActive: boolean;
}) {
  const router = useRouter();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<"toggle" | "delete" | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  async function toggleService() {
    setError(null);
    setPendingAction("toggle");

    const response = await fetch(`/api/admin/services/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !isActive })
    });
    const data = (await response.json().catch(() => null)) as {
      message?: string;
    } | null;

    setPendingAction(null);

    if (!response.ok) {
      setError(data?.message ?? "Hizmet durumu degistirilemedi.");
      return;
    }

    router.push("/admin/services?status=toggled");
    router.refresh();
  }

  async function deleteService() {
    setError(null);
    setPendingAction("delete");

    const response = await fetch(`/api/admin/services/${id}`, {
      method: "DELETE"
    });
    const data = (await response.json().catch(() => null)) as {
      message?: string;
    } | null;

    setPendingAction(null);

    if (!response.ok) {
      setError(data?.message ?? "Hizmet silinemedi.");
      return;
    }

    setIsConfirmOpen(false);
    router.push("/admin/services?status=deleted");
    router.refresh();
  }

  return (
    <div className="grid gap-2">
      <div className="flex flex-wrap gap-2">
        <Button asChild variant="outline" size="sm">
          <Link href={`/admin/services/${id}/edit`}>
            <Pencil />
            Düzenle
          </Link>
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={Boolean(pendingAction)}
          onClick={toggleService}
        >
          {pendingAction === "toggle" ? (
            <Loader2 className="animate-spin" />
          ) : (
            <Power />
          )}
          {isActive ? "Pasif yap" : "Aktif yap"}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="text-destructive hover:border-destructive/30 hover:bg-destructive/10"
          disabled={Boolean(pendingAction)}
          onClick={() => setIsConfirmOpen(true)}
        >
          <Trash2 />
          Sil
        </Button>
      </div>

      {error ? (
        <p className="text-xs font-bold text-destructive" role="alert">
          {error}
        </p>
      ) : null}

      <ConfirmDialog
        isOpen={isConfirmOpen}
        title="Hizmeti silmek istiyor musunuz?"
        description={`${title} hizmeti silinecek. Bu islem geri alinamaz.`}
        confirmLabel="Sil"
        isPending={pendingAction === "delete"}
        onCancel={() => setIsConfirmOpen(false)}
        onConfirm={deleteService}
      />
    </div>
  );
}
