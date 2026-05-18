"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { AdminFormCard } from "@/components/admin/admin-form-card";
import { AdminFormField } from "@/components/admin/admin-form-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  seoSettingsFormSchema,
  type SeoSettingsFormValues
} from "@/lib/admin-seo-schema";

export function SeoForm({
  defaultValues
}: {
  defaultValues: SeoSettingsFormValues;
}) {
  const router = useRouter();
  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<SeoSettingsFormValues>({
    resolver: zodResolver(seoSettingsFormSchema),
    defaultValues
  });

  async function onSubmit(values: SeoSettingsFormValues) {
    setStatus(null);

    const response = await fetch("/api/admin/seo", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    });
    const data = (await response.json().catch(() => null)) as {
      message?: string;
    } | null;

    if (!response.ok) {
      setStatus({
        type: "error",
        message: data?.message ?? "SEO ayarlari kaydedilemedi."
      });
      return;
    }

    setStatus({
      type: "success",
      message: data?.message ?? "SEO ayarlari kaydedildi."
    });
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
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

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="grid gap-6">
          <AdminFormCard
            title="Ana Sayfa SEO"
            description="Arama sonuclarinda ve sosyal paylasimlarda one cikacak metinler."
          >
            <AdminFormField label="SEO basligi" error={errors.seoTitle?.message}>
              <Input
                {...register("seoTitle")}
                placeholder="Portakal Hafriyat"
              />
            </AdminFormField>
            <AdminFormField
              label="SEO aciklamasi"
              error={errors.seoDescription?.message}
            >
              <Textarea
                {...register("seoDescription")}
                placeholder="Adana ve cevresinde hafriyat, moloz tasima ve is makinesi hizmetleri."
              />
            </AdminFormField>
          </AdminFormCard>

          <AdminFormCard
            title="LocalBusiness Bilgileri"
            description="Yerel arama gorunurlugu icin temel firma verileri."
          >
            <div className="grid gap-5 md:grid-cols-2">
              <AdminFormField
                label="Firma adi"
                error={errors.companyName?.message}
              >
                <Input {...register("companyName")} />
              </AdminFormField>
              <AdminFormField label="Telefon" error={errors.phone?.message}>
                <Input {...register("phone")} />
              </AdminFormField>
              <AdminFormField label="WhatsApp" error={errors.whatsapp?.message}>
                <Input {...register("whatsapp")} />
              </AdminFormField>
              <AdminFormField
                label="Google Maps URL"
                error={errors.googleMapsUrl?.message}
              >
                <Input {...register("googleMapsUrl")} />
              </AdminFormField>
              <AdminFormField
                label="Instagram URL"
                error={errors.instagramUrl?.message}
              >
                <Input {...register("instagramUrl")} />
              </AdminFormField>
              <AdminFormField
                label="Facebook URL"
                error={errors.facebookUrl?.message}
              >
                <Input {...register("facebookUrl")} />
              </AdminFormField>
            </div>
            <AdminFormField label="Adres" error={errors.address?.message}>
              <Textarea {...register("address")} />
            </AdminFormField>
          </AdminFormCard>
        </div>

        <aside className="h-fit rounded-lg border border-border bg-background p-5 shadow-line">
          <p className="text-sm font-black uppercase tracking-normal text-signal-800">
            SEO Önizleme
          </p>
          <dl className="mt-5 grid gap-4 text-sm">
            <Info label="Ana sayfa SEO başlığı" value={defaultValues.seoTitle} />
            <Info
              label="Ana sayfa SEO açıklaması"
              value={defaultValues.seoDescription}
            />
            <Info label="Firma adı" value={defaultValues.companyName} />
            <Info label="Telefon" value={defaultValues.phone} />
            <Info label="Adres" value={defaultValues.address} />
          </dl>
        </aside>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          <Save />
          {isSubmitting ? "Kaydediliyor..." : "Kaydet"}
        </Button>
      </div>
    </form>
  );
}

function Info({ label, value }: { label: string; value?: string }) {
  return (
    <div className="rounded-md border border-border bg-muted/35 p-3">
      <dt className="text-xs font-black uppercase tracking-normal text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-1 leading-6">{value || "-"}</dd>
    </div>
  );
}
