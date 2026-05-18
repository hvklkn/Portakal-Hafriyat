import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";

import { AdminShell } from "@/components/admin/admin-shell";
import { SettingsForm } from "@/components/admin/settings-form";
import { getAdminSession } from "@/lib/admin-session";
import { getAdminSettingsData } from "@/lib/admin-settings";
import { getSiteSettings } from "@/lib/site-settings";

export const metadata: Metadata = {
  title: "Admin Ayarlar"
};

export default async function AdminSettingsPage() {
  const [settings, session, settingsData] = await Promise.all([
    getSiteSettings(),
    getAdminSession(),
    getAdminSettingsData()
  ]);

  return (
    <AdminShell
      settings={settings}
      pageTitle="Site Ayarlari"
      pageDescription="Firma bilgileri, hero alani ve SEO metinlerini yonetin."
      adminEmail={session?.email}
    >
      <div className="grid gap-6">
        {settingsData.hasDatabaseError ? (
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

        <SettingsForm defaultValues={settingsData.values} />
      </div>
    </AdminShell>
  );
}
