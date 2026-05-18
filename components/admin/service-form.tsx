"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";

import { AdminFormCard } from "@/components/admin/admin-form-card";
import { AdminFormField } from "@/components/admin/admin-form-field";
import { AdminImageUploadField } from "@/components/admin/admin-image-upload-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  createSlug,
  serviceFormSchema,
  type ServiceFormValues
} from "@/lib/admin-service-schema";

type ServiceFormProps = {
  mode: "create" | "edit";
  defaultValues: ServiceFormValues;
  serviceId?: string;
};

type FormStatus = {
  type: "error";
  message: string;
} | null;

export function ServiceForm({
  mode,
  defaultValues,
  serviceId
}: ServiceFormProps) {
  const router = useRouter();
  const [status, setStatus] = useState<FormStatus>(null);
  const [isSlugManual, setIsSlugManual] = useState(mode === "edit");
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceFormSchema),
    defaultValues
  });
  const title = useWatch({ control, name: "title" }) ?? "";
  const imageUrl = useWatch({ control, name: "imageUrl" }) ?? "";

  useEffect(() => {
    if (isSlugManual) {
      return;
    }

    setValue("slug", createSlug(title), {
      shouldDirty: true,
      shouldValidate: Boolean(title)
    });
  }, [isSlugManual, setValue, title]);

  async function onSubmit(values: ServiceFormValues) {
    setStatus(null);

    const endpoint =
      mode === "create"
        ? "/api/admin/services"
        : `/api/admin/services/${serviceId}`;
    const response = await fetch(endpoint, {
      method: mode === "create" ? "POST" : "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    });
    const data = (await response.json().catch(() => null)) as {
      message?: string;
    } | null;

    if (!response.ok) {
      setStatus({
        type: "error",
        message:
          data?.message ??
          "Hizmet kaydedilemedi. Lutfen alanlari kontrol edip tekrar deneyin."
      });
      return;
    }

    router.push(
      `/admin/services?status=${mode === "create" ? "created" : "updated"}`
    );
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
      {status ? (
        <p className="rounded-md border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm font-bold text-destructive">
          {status.message}
        </p>
      ) : null}

      <AdminFormCard
        title={mode === "create" ? "Yeni Hizmet" : "Hizmet Bilgileri"}
        description="Public sitede gorunecek hizmet karti ve detay sayfasi bilgileri."
      >
        <div className="grid gap-5 md:grid-cols-2">
          <AdminFormField label="Hizmet adi" error={errors.title?.message}>
            <Input {...register("title")} placeholder="Temel Kazisi" />
          </AdminFormField>
          <AdminFormField
            label="Slug"
            error={errors.slug?.message}
            hint="Basliktan otomatik uretilir, gerekirse elle degistirilebilir."
          >
            <Input
              {...register("slug", {
                onChange: () => setIsSlugManual(true)
              })}
              placeholder="temel-kazisi"
            />
          </AdminFormField>
        </div>

        <AdminFormField
          label="Kisa aciklama"
          error={errors.shortDescription?.message}
        >
          <Textarea
            {...register("shortDescription")}
            placeholder="Konut ve ticari yapilar icin kontrollu temel kazisi."
          />
        </AdminFormField>

        <AdminFormField
          label="Detay aciklama"
          error={errors.description?.message}
        >
          <Textarea
            className="min-h-44"
            {...register("description")}
            placeholder="Hizmet kapsamını, sureci ve avantajları detaylandırın."
          />
        </AdminFormField>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <input type="hidden" {...register("imageUrl")} />
            <AdminImageUploadField
              label="Gorsel URL"
              value={imageUrl}
              error={errors.imageUrl?.message}
              hint="Dosya yukleyebilir veya manuel URL girebilirsiniz."
              onChange={(value) =>
                setValue("imageUrl", value, {
                  shouldDirty: true,
                  shouldValidate: true
                })
              }
            />
          </div>
          <AdminFormField
            label="Ikon adi"
            error={errors.iconName?.message}
            hint="Ornek: Shovel, Truck, Construction, Layers3"
          >
            <Input {...register("iconName")} placeholder="Construction" />
          </AdminFormField>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <AdminFormField label="Sira" error={errors.displayOrder?.message}>
            <Input
              type="number"
              min={0}
              {...register("displayOrder", { valueAsNumber: true })}
            />
          </AdminFormField>
          <label className="flex min-h-11 items-center gap-3 self-end rounded-md border border-border bg-muted/40 px-3 py-2 text-sm font-bold">
            <input
              type="checkbox"
              className="size-4 rounded border-input text-primary focus:ring-primary"
              {...register("isActive")}
            />
            Aktif olarak yayinda olsun
          </label>
        </div>
      </AdminFormCard>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/services")}
        >
          Vazgec
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          <Save />
          {isSubmitting ? "Kaydediliyor..." : "Kaydet"}
        </Button>
      </div>
    </form>
  );
}
