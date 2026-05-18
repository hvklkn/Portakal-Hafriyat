"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { MessageCircle, Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getWhatsAppHref } from "@/lib/contact-links";

const quoteSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Ad soyad en az 2 karakter olmalı.")
    .max(100, "Ad soyad en fazla 100 karakter olabilir."),
  phone: z
    .string()
    .trim()
    .min(10, "Telefon numarası eksik görünüyor.")
    .max(30, "Telefon en fazla 30 karakter olabilir."),
  serviceType: z
    .string()
    .trim()
    .min(2, "Hizmet türü seçin.")
    .max(120, "Hizmet türü en fazla 120 karakter olabilir."),
  city: z
    .string()
    .trim()
    .min(2, "Şehir gerekli.")
    .max(80, "Şehir en fazla 80 karakter olabilir."),
  district: z
    .string()
    .trim()
    .min(2, "İlçe gerekli.")
    .max(80, "İlçe en fazla 80 karakter olabilir."),
  description: z
    .string()
    .trim()
    .min(10, "Açıklama en az 10 karakter olmalı.")
    .max(2000, "Açıklama en fazla 2000 karakter olabilir."),
  imageUrl: z
    .string()
    .trim()
    .max(1000, "Görsel URL en fazla 1000 karakter olabilir.")
    .url("Geçerli bir URL girin.")
    .optional()
    .or(z.literal("")),
  companyWebsite: z.string().max(1000).optional()
});

type QuoteFormValues = z.infer<typeof quoteSchema>;

type EnhancedQuoteFormProps = {
  services: Array<{ title: string; slug: string }>;
  whatsapp?: string | null;
};

export function EnhancedQuoteForm({
  services,
  whatsapp
}: EnhancedQuoteFormProps) {
  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [submittedValues, setSubmittedValues] = useState<QuoteFormValues | null>(
    null
  );
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      serviceType: services[0]?.title ?? "",
      city: "",
      district: "",
      description: "",
      imageUrl: "",
      companyWebsite: ""
    }
  });

  async function onSubmit(values: QuoteFormValues) {
    setStatus(null);
    setSubmittedValues(null);

    const response = await fetch("/api/quote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    });

    if (!response.ok) {
      const data = (await response.json().catch(() => null)) as {
        message?: string;
      } | null;
      setStatus({
        type: "error",
        message:
          data?.message ?? "Teklif talebi gönderilemedi. Lütfen tekrar deneyin."
      });
      return;
    }

    setStatus({
      type: "success",
      message: "Teşekkürler. Teklif talebiniz alındı."
    });
    setSubmittedValues(values);
    reset({
      fullName: "",
      phone: "",
      serviceType: services[0]?.title ?? "",
      city: "",
      district: "",
      description: "",
      imageUrl: "",
      companyWebsite: ""
    });
  }

  const whatsappHref = submittedValues
    ? getWhatsAppHref(
        whatsapp,
        `Merhaba, hafriyat hizmeti için teklif almak istiyorum.\n\nAd Soyad: ${submittedValues.fullName}\nTelefon: ${submittedValues.phone}\nHizmet: ${submittedValues.serviceType}\nKonum: ${submittedValues.city} / ${submittedValues.district}\nAçıklama: ${submittedValues.description}`
      )
    : null;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="relative grid gap-5">
      <div
        className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden"
        aria-hidden="true"
      >
        <label htmlFor="quote-company-website">Website</label>
        <input
          id="quote-company-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("companyWebsite")}
        />
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Ad Soyad" error={errors.fullName?.message}>
          <Input placeholder="Adınız soyadınız" {...register("fullName")} />
        </Field>
        <Field label="Telefon" error={errors.phone?.message}>
          <Input placeholder="+90 5..." {...register("phone")} />
        </Field>
      </div>
      <Field label="Hizmet Türü" error={errors.serviceType?.message}>
        <select
          className="focus-ring h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm"
          {...register("serviceType")}
        >
          {services.map((service) => (
            <option key={service.slug} value={service.title}>
              {service.title}
            </option>
          ))}
        </select>
      </Field>
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Şehir" error={errors.city?.message}>
          <Input placeholder="Adana" {...register("city")} />
        </Field>
        <Field label="İlçe" error={errors.district?.message}>
          <Input placeholder="Sarıçam" {...register("district")} />
        </Field>
      </div>
      <Field label="Açıklama" error={errors.description?.message}>
        <Textarea
          placeholder="İşin türünü, yaklaşık metrajı, saha durumunu ve zamanlamayı yazın."
          {...register("description")}
        />
      </Field>
      <Field label="Görsel URL" error={errors.imageUrl?.message}>
        <Input
          placeholder="Varsa saha görseli veya dosya URL’si"
          {...register("imageUrl")}
        />
      </Field>

      {status ? (
        <p
          className={
            status.type === "success"
              ? "rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800"
              : "rounded-md border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive"
          }
        >
          {status.message}
        </p>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button type="submit" disabled={isSubmitting}>
          Talep Gönder
          <Send />
        </Button>
        {whatsappHref ? (
          <Button asChild variant="outline">
            <a href={whatsappHref} target="_blank" rel="noreferrer">
              <MessageCircle />
              WhatsApp ile Gönder
            </a>
          </Button>
        ) : null}
      </div>
    </form>
  );
}

function Field({
  label,
  error,
  children
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <Label>{label}</Label>
      {children}
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
    </div>
  );
}
