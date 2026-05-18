import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";

import { AdminShell } from "@/components/admin/admin-shell";
import { MessagesManager } from "@/components/admin/messages-manager";
import { getAdminMessagesData } from "@/lib/admin-messages";
import { getAdminSession } from "@/lib/admin-session";
import { getSiteSettings } from "@/lib/site-settings";

export const metadata: Metadata = {
  title: "Admin Mesajlar"
};

export default async function AdminMessagesPage() {
  const [settings, session, messagesData] = await Promise.all([
    getSiteSettings(),
    getAdminSession(),
    getAdminMessagesData()
  ]);

  return (
    <AdminShell
      settings={settings}
      pageTitle="Mesajlar"
      pageDescription="Iletisim formundan gelen mesajlari okuyun, filtreleyin ve takip edin."
      adminEmail={session?.email}
    >
      <div className="grid gap-6">
        {messagesData.hasDatabaseError ? (
          <div
            role="alert"
            className="flex items-start gap-3 rounded-lg border border-signal-200 bg-signal-50 p-4 text-sm text-signal-900"
          >
            <AlertTriangle className="mt-0.5 size-5 shrink-0" />
            <div>
              <p className="font-black">Veritabani baglantisi kurulamadı.</p>
              <p className="mt-1 leading-6">
                Mesajlar su anda yuklenemiyor. Baglanti duzeldiginde kayitlar
                burada gorunecek.
              </p>
            </div>
          </div>
        ) : null}

        <MessagesManager messages={messagesData.messages} />
      </div>
    </AdminShell>
  );
}
