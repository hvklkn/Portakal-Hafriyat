"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const contactSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Ad soyad en az 2 karakter olmalı.")
    .max(100, "Ad soyad en fazla 100 karakter olabilir."),
  phone: z
    .string()
    .trim()
    .max(30, "Telefon en fazla 30 karakter olabilir.")
    .optional(),
  email: z
    .string()
    .trim()
    .email("Geçerli bir e-posta girin.")
    .max(160, "E-posta en fazla 160 karakter olabilir."),
  subject: z
    .string()
    .trim()
    .max(160, "Konu en fazla 160 karakter olabilir.")
    .optional(),
  message: z
    .string()
    .trim()
    .min(10, "Mesaj en az 10 karakter olmalı.")
    .max(2000, "Mesaj en fazla 2000 karakter olabilir."),
  companyWebsite: z.string().max(1000).optional()
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      subject: "",
      message: "",
      companyWebsite: ""
    }
  });

  async function onSubmit(values: ContactFormValues) {
    setStatus(null);
    const response = await fetch("/api/contact", {
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
        message: data?.message ?? "Mesaj gönderilemedi. Lütfen tekrar deneyin."
      });
      return;
    }

    setStatus({
      type: "success",
      message: "Mesajınız alındı. En kısa sürede dönüş yapacağız."
    });
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="relative grid gap-5">
      <div
        className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden"
        aria-hidden="true"
      >
        <label htmlFor="contact-company-website">Website</label>
        <input
          id="contact-company-website"
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
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="E-posta" error={errors.email?.message}>
          <Input type="email" placeholder="ornek@mail.com" {...register("email")} />
        </Field>
        <Field label="Konu" error={errors.subject?.message}>
          <Input placeholder="Teklif, keşif, bilgi..." {...register("subject")} />
        </Field>
      </div>
      <Field label="Mesaj" error={errors.message?.message}>
        <Textarea
          placeholder="İhtiyacınızı, konumu ve zamanlamayı kısaca yazın."
          {...register("message")}
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

      <Button type="submit" className="w-full sm:w-fit" disabled={isSubmitting}>
        Gönder
        <Send />
      </Button>
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
