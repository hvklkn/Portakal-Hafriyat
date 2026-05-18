import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import { LoginForm } from "@/components/admin/login-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { getSiteSettings } from "@/lib/site-settings";

export const metadata: Metadata = {
  title: "Admin Giris"
};

export default async function AdminLoginPage() {
  const settings = await getSiteSettings();

  return (
    <main className="grid min-h-screen place-items-center bg-muted px-4 py-12">
      <div className="w-full max-w-md">
        <Link href="/" className="mx-auto mb-6 flex w-fit items-center gap-3">
          <span className="grid size-10 place-items-center rounded-md bg-accent text-sm font-black text-primary">
            PH
          </span>
          <span className="text-sm font-black uppercase tracking-normal">
            {settings.companyName}
          </span>
        </Link>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Admin Paneli</CardTitle>
            <CardDescription>
              Icerik yonetimi icin yonetici hesabınızla giris yapın.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense>
              <LoginForm />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
