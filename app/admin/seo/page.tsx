import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";

import { AdminShell } from "@/components/admin/admin-shell";
import { SeoForm } from "@/components/admin/seo-form";
import { getAdminSeoData } from "@/lib/admin-seo";
import { getAdminSession } from "@/lib/admin-session";
import { getSiteSettings } from "@/lib/site-settings";

export const metadata: Metadata = {
  title: "Admin SEO Ayarlari"
};

export default async function AdminSeoPage() {
  const [settings, session, seoData] = await Promise.all([
    getSiteSettings(),
    getAdminSession(),
    getAdminSeoData()
  ]);

  return (
    <AdminShell
      settings={settings}
      pageTitle="SEO Ayarlari"
      pageDescription="Ana sayfa SEO metinleri ve LocalBusiness bilgilerini yonetin."
      adminEmail={session?.email}
    >
      <div className="grid gap-6">
        {seoData.hasDatabaseError ? (
          <div
            role="alert"
            className="flex items-start gap-3 rounded-lg border border-signal-200 bg-signal-50 p-4 text-sm text-signal-900"
          >
            <AlertTriangle className="mt-0.5 size-5 shrink-0" />
            <div>
              <p className="font-black">Veritabani baglantisi kurulamadı.</p>
              <p className="mt-1 leading-6">
                Form fallback degerlerle acildi. Kaydetme icin veritabani
                baglantisinin aktif olmasi gerekir.
              </p>
            </div>
          </div>
        ) : null}

        <SeoForm defaultValues={seoData.values} />
      </div>
    </AdminShell>
  );
}
