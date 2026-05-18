import type { Metadata } from "next";
import { AlertTriangle, Wrench } from "lucide-react";

import { AdminEmptyState } from "@/components/admin/admin-empty-state";
import { AdminShell } from "@/components/admin/admin-shell";
import { ServiceForm } from "@/components/admin/service-form";
import { getAdminServiceForEdit } from "@/lib/admin-services";
import { getAdminSession } from "@/lib/admin-session";
import { getSiteSettings } from "@/lib/site-settings";

type EditServicePageProps = {
  params: Promise<{ id: string }>;
};

export const metadata: Metadata = {
  title: "Hizmet Duzenle"
};

export default async function EditServicePage({ params }: EditServicePageProps) {
  const { id } = await params;
  const [settings, session, serviceData] = await Promise.all([
    getSiteSettings(),
    getAdminSession(),
    getAdminServiceForEdit(id)
  ]);

  return (
    <AdminShell
      settings={settings}
      pageTitle="Hizmet Duzenle"
      pageDescription="Hizmet bilgilerini, yayin durumunu ve siralamasini guncelleyin."
      adminEmail={session?.email}
    >
      <div className="grid gap-6">
        {serviceData.hasDatabaseError ? (
          <div
            role="alert"
            className="flex items-start gap-3 rounded-lg border border-signal-200 bg-signal-50 p-4 text-sm text-signal-900"
          >
            <AlertTriangle className="mt-0.5 size-5 shrink-0" />
            <div>
              <p className="font-black">Veritabani baglantisi kurulamadı.</p>
              <p className="mt-1 leading-6">
                Hizmet bilgileri su anda yuklenemiyor. Baglantiyi kontrol edip
                tekrar deneyin.
              </p>
            </div>
          </div>
        ) : null}

        {serviceData.service ? (
          <ServiceForm
            mode="edit"
            serviceId={serviceData.service.id}
            defaultValues={serviceData.service}
          />
        ) : (
          <AdminEmptyState
            title="Hizmet bulunamadi"
            description="Duzenlemek istediginiz hizmet silinmis veya erisilemiyor olabilir."
            icon={Wrench}
          />
        )}
      </div>
    </AdminShell>
  );
}
