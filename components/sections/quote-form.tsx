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

const quoteSchema = z.object({
  name: z.string().min(2, "Ad soyad en az 2 karakter olmalı."),
  phone: z.string().min(10, "Telefon numarası eksik gorunuyor."),
  location: z.string().min(2, "Proje lokasyonu gerekli."),
  serviceType: z.string().min(2, "Hizmet tipi gerekli."),
  message: z.string().min(10, "Kısa bir proje acıklaması yazın.")
});

type QuoteFormValues = z.infer<typeof quoteSchema>;

export function QuoteForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      name: "",
      phone: "",
      location: "",
      serviceType: "",
      message: ""
    }
  });

  function onSubmit() {
    setIsSubmitted(true);
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5">
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Ad Soyad" error={errors.name?.message}>
          <Input placeholder="Adınız soyadınız" {...register("name")} />
        </Field>
        <Field label="Telefon" error={errors.phone?.message}>
          <Input placeholder="+90 5..." {...register("phone")} />
        </Field>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Lokasyon" error={errors.location?.message}>
          <Input placeholder="Il / ilce" {...register("location")} />
        </Field>
        <Field label="Hizmet Tipi" error={errors.serviceType?.message}>
          <Input
            placeholder="Kazı, dolgu, nakliye..."
            {...register("serviceType")}
          />
        </Field>
      </div>
      <Field label="Proje Detayı" error={errors.message?.message}>
        <Textarea
          placeholder="Saha, metraj, zamanlama veya ihtiyacınızı kısaca yazın."
          {...register("message")}
        />
      </Field>

      {isSubmitted ? (
        <p className="rounded-md border border-signal-200 bg-signal-50 px-4 py-3 text-sm font-medium text-signal-800">
          Talep alındı. CRUD ve mail entegrasyonu sonraki adımda bağlanmaya hazır.
        </p>
      ) : null}

      <Button type="submit" className="w-full sm:w-fit" disabled={isSubmitting}>
        Gonder
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
