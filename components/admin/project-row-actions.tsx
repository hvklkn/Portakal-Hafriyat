"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, Pencil, Star, Trash2 } from "lucide-react";
import { useState } from "react";

import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { Button } from "@/components/ui/button";

export function ProjectRowActions({
  id,
  title,
  isFeatured
}: {
  id: string;
  title: string;
  isFeatured: boolean;
}) {
  const router = useRouter();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<"featured" | "delete" | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  async function toggleFeatured() {
    setError(null);
    setPendingAction("featured");

    const response = await fetch(`/api/admin/projects/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isFeatured: !isFeatured })
    });
    const data = (await response.json().catch(() => null)) as {
      message?: string;
    } | null;

    setPendingAction(null);

    if (!response.ok) {
      setError(data?.message ?? "Proje durumu degistirilemedi.");
      return;
    }

    router.push("/admin/projects?status=featured");
    router.refresh();
  }

  async function deleteProject() {
    setError(null);
    setPendingAction("delete");

    const response = await fetch(`/api/admin/projects/${id}`, {
      method: "DELETE"
    });
    const data = (await response.json().catch(() => null)) as {
      message?: string;
    } | null;

    setPendingAction(null);

    if (!response.ok) {
      setError(data?.message ?? "Proje silinemedi.");
      return;
    }

    setIsConfirmOpen(false);
    router.push("/admin/projects?status=deleted");
    router.refresh();
  }

  return (
    <div className="grid gap-2">
      <div className="flex flex-wrap gap-2">
        <Button asChild variant="outline" size="sm">
          <Link href={`/admin/projects/${id}/edit`}>
            <Pencil />
            Düzenle
          </Link>
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={Boolean(pendingAction)}
          onClick={toggleFeatured}
        >
          {pendingAction === "featured" ? (
            <Loader2 className="animate-spin" />
          ) : (
            <Star />
          )}
          {isFeatured ? "Kaldır" : "Öne çıkar"}
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
        title="Projeyi silmek istiyor musunuz?"
        description={`${title} projesi silinecek. Bu islem geri alinamaz.`}
        confirmLabel="Sil"
        isPending={pendingAction === "delete"}
        onCancel={() => setIsConfirmOpen(false)}
        onConfirm={deleteProject}
      />
    </div>
  );
}
