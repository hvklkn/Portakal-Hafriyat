"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Save, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";

import { AdminFormCard } from "@/components/admin/admin-form-card";
import { AdminFormField } from "@/components/admin/admin-form-field";
import { AdminImageUploadField } from "@/components/admin/admin-image-upload-field";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  createProjectSlug,
  projectFormSchema,
  type ProjectFormValues
} from "@/lib/admin-project-schema";

type ProjectFormProps = {
  mode: "create" | "edit";
  defaultValues: ProjectFormValues;
  projectId?: string;
  projectTitle?: string;
};

export function ProjectForm({
  mode,
  defaultValues,
  projectId,
  projectTitle
}: ProjectFormProps) {
  const router = useRouter();
  const [formError, setFormError] = useState<string | null>(null);
  const [isSlugManual, setIsSlugManual] = useState(mode === "edit");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues
  });
  const title = useWatch({ control, name: "title" }) ?? "";
  const coverImageUrl = useWatch({ control, name: "coverImageUrl" }) ?? "";

  useEffect(() => {
    if (isSlugManual) {
      return;
    }

    setValue("slug", createProjectSlug(title), {
      shouldDirty: true,
      shouldValidate: Boolean(title)
    });
  }, [isSlugManual, setValue, title]);

  async function onSubmit(values: ProjectFormValues) {
    setFormError(null);

    const endpoint =
      mode === "create"
        ? "/api/admin/projects"
        : `/api/admin/projects/${projectId}`;
    const response = await fetch(endpoint, {
      method: mode === "create" ? "POST" : "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    });
    const data = (await response.json().catch(() => null)) as {
      message?: string;
    } | null;

    if (!response.ok) {
      setFormError(
        data?.message ??
          "Proje kaydedilemedi. Lutfen alanlari kontrol edip tekrar deneyin."
      );
      return;
    }

    router.push(
      `/admin/projects?status=${mode === "create" ? "created" : "updated"}`
    );
    router.refresh();
  }

  async function deleteProject() {
    if (!projectId) {
      return;
    }

    setFormError(null);
    setIsDeleting(true);

    const response = await fetch(`/api/admin/projects/${projectId}`, {
      method: "DELETE"
    });
    const data = (await response.json().catch(() => null)) as {
      message?: string;
    } | null;

    setIsDeleting(false);

    if (!response.ok) {
      setFormError(data?.message ?? "Proje silinemedi.");
      return;
    }

    router.push("/admin/projects?status=deleted");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
      {formError ? (
        <p className="rounded-md border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm font-bold text-destructive">
          {formError}
        </p>
      ) : null}

      <AdminFormCard
        title={mode === "create" ? "Yeni Proje" : "Proje Bilgileri"}
        description="Public portfolyo sayfasinda gorunecek proje bilgileri."
      >
        <div className="grid gap-5 md:grid-cols-2">
          <AdminFormField label="Proje adi" error={errors.title?.message}>
            <Input {...register("title")} placeholder="Sarıçam Temel Kazısı" />
          </AdminFormField>
          <AdminFormField
            label="Slug"
            error={errors.slug?.message}
            hint="Basliktan otomatik uretilir, elle degistirilebilir."
          >
            <Input
              {...register("slug", { onChange: () => setIsSlugManual(true) })}
              placeholder="saricam-temel-kazisi"
            />
          </AdminFormField>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <AdminFormField label="Lokasyon" error={errors.location?.message}>
            <Input {...register("location")} placeholder="Adana / Sarıçam" />
          </AdminFormField>
          <AdminFormField label="Tarih" error={errors.date?.message}>
            <Input {...register("date")} placeholder="2026" />
          </AdminFormField>
        </div>

        <AdminFormField label="Aciklama" error={errors.description?.message}>
          <Textarea
            className="min-h-44"
            {...register("description")}
            placeholder="Proje kapsamini, yapilan isleri ve saha detaylarini yazin."
          />
        </AdminFormField>

        <input type="hidden" {...register("coverImageUrl")} />
        <AdminImageUploadField
          label="Kapak gorsel URL"
          value={coverImageUrl}
          error={errors.coverImageUrl?.message}
          hint="Dosya yukleyebilir veya manuel URL girebilirsiniz."
          onChange={(value) =>
            setValue("coverImageUrl", value, {
              shouldDirty: true,
              shouldValidate: true
            })
          }
        />

        <div className="grid gap-5 md:grid-cols-2">
          <AdminFormField label="Durum" error={errors.status?.message}>
            <select
              className="focus-ring h-11 rounded-md border border-input bg-background px-3 text-sm shadow-sm"
              {...register("status")}
            >
              <option value="PLANNED">Planlandı</option>
              <option value="IN_PROGRESS">Devam Ediyor</option>
              <option value="COMPLETED">Tamamlandı</option>
            </select>
          </AdminFormField>
          <label className="flex min-h-11 items-center gap-3 self-end rounded-md border border-border bg-muted/40 px-3 py-2 text-sm font-bold">
            <input
              type="checkbox"
              className="size-4 rounded border-input text-primary focus:ring-primary"
              {...register("isFeatured")}
            />
            Öne çıkan proje
          </label>
        </div>
      </AdminFormCard>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        {mode === "edit" ? (
          <Button
            type="button"
            variant="outline"
            className="text-destructive hover:border-destructive/30 hover:bg-destructive/10"
            onClick={() => setIsConfirmOpen(true)}
          >
            <Trash2 />
            Sil
          </Button>
        ) : (
          <span />
        )}
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/projects")}
          >
            Vazgec
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="animate-spin" /> : <Save />}
            Kaydet
          </Button>
        </div>
      </div>

      <ConfirmDialog
        isOpen={isConfirmOpen}
        title="Projeyi silmek istiyor musunuz?"
        description={`${projectTitle ?? "Bu proje"} silinecek. Bu islem geri alinamaz.`}
        confirmLabel="Sil"
        isPending={isDeleting}
        onCancel={() => setIsConfirmOpen(false)}
        onConfirm={deleteProject}
      />
    </form>
  );
}
