import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";

import { GalleryManager } from "@/components/admin/gallery-manager";
import { AdminShell } from "@/components/admin/admin-shell";
import { getAdminGalleryData } from "@/lib/admin-gallery";
import { getAdminSession } from "@/lib/admin-session";
import { getSiteSettings } from "@/lib/site-settings";

export const metadata: Metadata = {
  title: "Admin Galeri"
};

export default async function AdminGalleryPage() {
  const [settings, session, galleryData] = await Promise.all([
    getSiteSettings(),
    getAdminSession(),
    getAdminGalleryData()
  ]);

  return (
    <AdminShell
      settings={settings}
      pageTitle="Galeri"
      pageDescription="Saha, makine ve proje gorsellerini yonetin."
      adminEmail={session?.email}
    >
      <div className="grid gap-6">
        {galleryData.hasDatabaseError ? (
          <div
            role="alert"
            className="flex items-start gap-3 rounded-lg border border-signal-200 bg-signal-50 p-4 text-sm text-signal-900"
          >
            <AlertTriangle className="mt-0.5 size-5 shrink-0" />
            <div>
              <p className="font-black">Veritabani baglantisi kurulamadı.</p>
              <p className="mt-1 leading-6">
                Galeri kayitlari su anda yuklenemiyor. Baglanti duzeldiginde
                gorseller burada gorunecek.
              </p>
            </div>
          </div>
        ) : null}

        <GalleryManager
          images={galleryData.images}
          projects={galleryData.projects}
        />
      </div>
    </AdminShell>
  );
}
