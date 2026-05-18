"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";

import { AdminFormCard } from "@/components/admin/admin-form-card";
import { AdminFormField } from "@/components/admin/admin-form-field";
import { AdminImageUploadField } from "@/components/admin/admin-image-upload-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  siteSettingsFormSchema,
  type SiteSettingsFormValues
} from "@/lib/admin-settings-schema";

type FormStatus = {
  type: "success" | "error";
  message: string;
} | null;

export function SettingsForm({
  defaultValues
}: {
  defaultValues: SiteSettingsFormValues;
}) {
  const router = useRouter();
  const [status, setStatus] = useState<FormStatus>(null);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<SiteSettingsFormValues>({
    resolver: zodResolver(siteSettingsFormSchema),
    defaultValues
  });
  const heroImageUrl = useWatch({ control, name: "heroImageUrl" }) ?? "";

  async function onSubmit(values: SiteSettingsFormValues) {
    setStatus(null);

    const response = await fetch("/api/admin/settings", {
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
        message:
          data?.message ??
          "Site ayarlari kaydedilemedi. Lutfen tekrar deneyin."
      });
      return;
    }

    setStatus({
      type: "success",
      message: data?.message ?? "Site ayarlari basariyla kaydedildi."
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

      <AdminFormCard
        title="Genel Bilgiler"
        description="Firma kimligi, iletisim kanallari ve harita baglantilari."
      >
        <div className="grid gap-5 md:grid-cols-2">
          <AdminFormField label="Firma adi" error={errors.companyName?.message}>
            <Input {...register("companyName")} placeholder="Portakal Hafriyat" />
          </AdminFormField>
          <AdminFormField label="Slogan" error={errors.slogan?.message}>
            <Input
              {...register("slogan")}
              placeholder="Guvenilir hafriyat cozumleri"
            />
          </AdminFormField>
        </div>

        <AdminFormField label="Aciklama" error={errors.description?.message}>
          <Textarea
            {...register("description")}
            placeholder="Firma hakkinda kisa kurumsal aciklama"
          />
        </AdminFormField>

        <div className="grid gap-5 md:grid-cols-2">
          <AdminFormField label="Telefon" error={errors.phone?.message}>
            <Input {...register("phone")} placeholder="+90 555 000 00 00" />
          </AdminFormField>
          <AdminFormField label="WhatsApp" error={errors.whatsapp?.message}>
            <Input {...register("whatsapp")} placeholder="+905550000000" />
          </AdminFormField>
          <AdminFormField label="E-posta" error={errors.email?.message}>
            <Input
              type="email"
              {...register("email")}
              placeholder="info@portakalhafriyat.com"
            />
          </AdminFormField>
          <AdminFormField
            label="Google Maps URL"
            error={errors.googleMapsUrl?.message}
          >
            <Input
              {...register("googleMapsUrl")}
              placeholder="https://maps.google.com/..."
            />
          </AdminFormField>
        </div>

        <AdminFormField label="Adres" error={errors.address?.message}>
          <Textarea {...register("address")} placeholder="Adana, Turkiye" />
        </AdminFormField>

        <div className="grid gap-5 md:grid-cols-2">
          <AdminFormField
            label="Instagram URL"
            error={errors.instagramUrl?.message}
          >
            <Input
              {...register("instagramUrl")}
              placeholder="https://instagram.com/..."
            />
          </AdminFormField>
          <AdminFormField
            label="Facebook URL"
            error={errors.facebookUrl?.message}
          >
            <Input
              {...register("facebookUrl")}
              placeholder="https://facebook.com/..."
            />
          </AdminFormField>
        </div>
      </AdminFormCard>

      <AdminFormCard
        title="Hero Alanı"
        description="Ana sayfa ust alaninda kullanilacak baslik ve gorsel icerigi."
      >
        <AdminFormField label="Hero basligi" error={errors.heroTitle?.message}>
          <Input
            {...register("heroTitle")}
            placeholder="Guvenilir Hafriyat ve Is Makinesi Cozumleri"
          />
        </AdminFormField>
        <AdminFormField
          label="Hero aciklamasi"
          error={errors.heroSubtitle?.message}
        >
          <Textarea
            {...register("heroSubtitle")}
            placeholder="Temel kazisi, hafriyat tasima ve saha duzenleme..."
          />
        </AdminFormField>
        <input type="hidden" {...register("heroImageUrl")} />
        <AdminImageUploadField
          label="Hero gorsel URL"
          value={heroImageUrl}
          error={errors.heroImageUrl?.message}
          hint="Yerel gorsel icin /images/hero-excavation.png gibi path kullanabilirsiniz."
          onChange={(value) =>
            setValue("heroImageUrl", value, {
              shouldDirty: true,
              shouldValidate: true
            })
          }
        />
      </AdminFormCard>

      <AdminFormCard
        title="SEO Ayarları"
        description="Arama motorlari ve sosyal paylasimlarda kullanilacak temel metinler."
      >
        <AdminFormField label="SEO basligi" error={errors.seoTitle?.message}>
          <Input {...register("seoTitle")} placeholder="Portakal Hafriyat" />
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

      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          <Save />
          {isSubmitting ? "Kaydediliyor..." : "Kaydet"}
        </Button>
      </div>
    </form>
  );
}
