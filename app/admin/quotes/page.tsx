import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";

import { AdminShell } from "@/components/admin/admin-shell";
import { QuoteRequestsManager } from "@/components/admin/quote-requests-manager";
import { getAdminQuotesData } from "@/lib/admin-quotes";
import { getAdminSession } from "@/lib/admin-session";
import { getSiteSettings } from "@/lib/site-settings";

export const metadata: Metadata = {
  title: "Admin Teklifler"
};

export default async function AdminQuotesPage() {
  const [settings, session, quotesData] = await Promise.all([
    getSiteSettings(),
    getAdminSession(),
    getAdminQuotesData()
  ]);

  return (
    <AdminShell
      settings={settings}
      pageTitle="Teklif Talepleri"
      pageDescription="Gelen teklif taleplerini filtreleyin, durumlarini guncelleyin ve takip edin."
      adminEmail={session?.email}
    >
      <div className="grid gap-6">
        {quotesData.hasDatabaseError ? (
          <div
            role="alert"
            className="flex items-start gap-3 rounded-lg border border-signal-200 bg-signal-50 p-4 text-sm text-signal-900"
          >
            <AlertTriangle className="mt-0.5 size-5 shrink-0" />
            <div>
              <p className="font-black">Veritabani baglantisi kurulamadı.</p>
              <p className="mt-1 leading-6">
                Teklif talepleri su anda yuklenemiyor. Baglanti duzeldiginde
                kayitlar burada gorunecek.
              </p>
            </div>
          </div>
        ) : null}

        <QuoteRequestsManager
          quotes={quotesData.quotes}
          serviceTypes={quotesData.serviceTypes}
        />
      </div>
    </AdminShell>
  );
}
