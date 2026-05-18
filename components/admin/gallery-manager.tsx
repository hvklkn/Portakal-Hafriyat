"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";

import { AdminEmptyState } from "@/components/admin/admin-empty-state";
import { AdminFormField } from "@/components/admin/admin-form-field";
import { AdminImageUploadField } from "@/components/admin/admin-image-upload-field";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type {
  AdminGalleryImage,
  AdminGalleryProjectOption
} from "@/lib/admin-gallery";
import {
  galleryCategories,
  galleryImageFormSchema,
  type GalleryImageFormValues
} from "@/lib/admin-gallery-schema";

type GalleryManagerProps = {
  images: AdminGalleryImage[];
  projects: AdminGalleryProjectOption[];
};

export function GalleryManager({ images, projects }: GalleryManagerProps) {
  const router = useRouter();
  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AdminGalleryImage | null>(
    null
  );
  const [isDeleting, setIsDeleting] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<GalleryImageFormValues>({
    resolver: zodResolver(galleryImageFormSchema),
    defaultValues: {
      title: "",
      imageUrl: "",
      category: "İş Makineleri",
      projectId: ""
    }
  });
  const imageUrl = useWatch({ control, name: "imageUrl" }) ?? "";

  async function onSubmit(values: GalleryImageFormValues) {
    setStatus(null);

    const response = await fetch("/api/admin/gallery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    });
    const data = (await response.json().catch(() => null)) as {
      message?: string;
    } | null;

    if (!response.ok) {
      setStatus({
        type: "error",
        message: data?.message ?? "Gorsel eklenemedi."
      });
      return;
    }

    setStatus({
      type: "success",
      message: data?.message ?? "Gorsel basariyla eklendi."
    });
    reset();
    router.refresh();
  }

  async function deleteImage() {
    if (!deleteTarget) {
      return;
    }

    setStatus(null);
    setIsDeleting(true);

    const response = await fetch(`/api/admin/gallery/${deleteTarget.id}`, {
      method: "DELETE"
    });
    const data = (await response.json().catch(() => null)) as {
      message?: string;
    } | null;

    setIsDeleting(false);

    if (!response.ok) {
      setStatus({
        type: "error",
        message: data?.message ?? "Gorsel silinemedi."
      });
      return;
    }

    setDeleteTarget(null);
    setStatus({
      type: "success",
      message: data?.message ?? "Gorsel basariyla silindi."
    });
    router.refresh();
  }

  return (
    <div className="grid gap-6">
      {status ? (
        <p
          className={
            status.type === "success"
              ? "rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-800"
              : "rounded-md border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm font-bold text-destructive"
          }
        >
          {status.message}
        </p>
      ) : null}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-lg border border-border bg-background p-5 shadow-line"
      >
        <div className="mb-5">
          <h2 className="text-lg font-black">Yeni Görsel Ekle</h2>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            Yerel path veya harici gorsel URL kullanabilirsiniz.
          </p>
        </div>
        <div className="grid gap-5 lg:grid-cols-4">
          <AdminFormField label="Baslik" error={errors.title?.message}>
            <Input {...register("title")} placeholder="Saha çalışması" />
          </AdminFormField>
          <div className="lg:col-span-3">
            <input type="hidden" {...register("imageUrl")} />
            <AdminImageUploadField
              label="Gorsel URL"
              value={imageUrl}
              error={errors.imageUrl?.message}
              hint="Cloudinary yukleme yapilandirilmadiysa manuel URL ile devam edebilirsiniz."
              onChange={(value) =>
                setValue("imageUrl", value, {
                  shouldDirty: true,
                  shouldValidate: true
                })
              }
            />
          </div>
          <AdminFormField label="Kategori" error={errors.category?.message}>
            <select
              className="focus-ring h-11 rounded-md border border-input bg-background px-3 text-sm shadow-sm"
              {...register("category")}
            >
              {galleryCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </AdminFormField>
          <AdminFormField label="Proje" error={errors.projectId?.message}>
            <select
              className="focus-ring h-11 rounded-md border border-input bg-background px-3 text-sm shadow-sm"
              {...register("projectId")}
            >
              <option value="">Proje yok</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.title}
                </option>
              ))}
            </select>
          </AdminFormField>
        </div>
        <div className="mt-5 flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="animate-spin" /> : <Plus />}
            Görsel Ekle
          </Button>
        </div>
      </form>

      {images.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {images.map((image) => (
            <article
              key={image.id}
              className="overflow-hidden rounded-lg border border-border bg-background shadow-line"
            >
              <div className="relative aspect-[4/3] bg-muted">
                <Image
                  src={image.imageUrl}
                  alt={image.title}
                  fill
                  unoptimized
                  sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="grid gap-3 p-4">
                <div>
                  <h3 className="font-black">{image.title}</h3>
                  <p className="mt-1 text-xs font-bold text-signal-800">
                    {image.category}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {image.projectTitle ?? "Proje baglantisi yok"}
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="w-fit text-destructive hover:border-destructive/30 hover:bg-destructive/10"
                  onClick={() => setDeleteTarget(image)}
                >
                  <Trash2 />
                  Sil
                </Button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <AdminEmptyState
          title="Henuz galeri gorseli yok"
          description="Saha, makine ve proje gorsellerini ekleyerek galeriyi doldurun."
        />
      )}

      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        title="Gorseli silmek istiyor musunuz?"
        description={`${deleteTarget?.title ?? "Bu gorsel"} galeriden silinecek.`}
        confirmLabel="Sil"
        isPending={isDeleting}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={deleteImage}
      />
    </div>
  );
}
