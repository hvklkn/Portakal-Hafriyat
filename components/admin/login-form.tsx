"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, LogIn, Mail } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const loginSchema = z.object({
  email: z.string().email("Gecerli bir e-posta girin."),
  password: z.string().min(6, "Sifre en az 6 karakter olmalı.")
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formError, setFormError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  async function onSubmit(values: LoginFormValues) {
    setFormError(null);

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    });

    if (!response.ok) {
      const data = (await response.json().catch(() => null)) as {
        message?: string;
      } | null;
      setFormError(data?.message ?? "Giris yapılamadı.");
      return;
    }

    router.push(searchParams.get("next") ?? "/admin/dashboard");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5">
      <div className="grid gap-2">
        <Label htmlFor="email">E-posta</Label>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            placeholder="admin@portakalhafriyat.com"
            className="pl-10"
            {...register("email")}
          />
        </div>
        {errors.email ? (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        ) : null}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="password">Sifre</Label>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            className="pl-10"
            {...register("password")}
          />
        </div>
        {errors.password ? (
          <p className="text-sm text-destructive">{errors.password.message}</p>
        ) : null}
      </div>

      {formError ? (
        <p className="rounded-md border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {formError}
        </p>
      ) : null}

      <Button type="submit" disabled={isSubmitting}>
        <LogIn />
        Giris Yap
      </Button>
    </form>
  );
}
