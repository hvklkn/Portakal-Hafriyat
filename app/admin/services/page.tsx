import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, MessageSquareQuote, Plus } from "lucide-react";

import { AdminEmptyState } from "@/components/admin/admin-empty-state";
import { AdminShell } from "@/components/admin/admin-shell";
import { AdminServiceStatusBadge } from "@/components/admin/admin-status-badge";
import {
  AdminTable,
  AdminTableCell,
  AdminTableHead,
  AdminTableHeader,
  AdminTableRow
} from "@/components/admin/admin-table";
import { ServiceRowActions } from "@/components/admin/service-row-actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { getAdminServicesList } from "@/lib/admin-services";
import { getAdminSession } from "@/lib/admin-session";
import { getSiteSettings } from "@/lib/site-settings";

export const metadata: Metadata = {
  title: "Admin Hizmetler"
};

type AdminServicesPageProps = {
  searchParams?: Promise<{ status?: string }>;
};

const dateFormatter = new Intl.DateTimeFormat("tr-TR", {
  dateStyle: "medium",
  timeStyle: "short"
});

const statusMessages: Record<string, string> = {
  created: "Hizmet basariyla olusturuldu.",
  updated: "Hizmet basariyla guncellendi.",
  deleted: "Hizmet basariyla silindi.",
  toggled: "Hizmet durumu guncellendi."
};

export default async function AdminServicesPage({
  searchParams
}: AdminServicesPageProps) {
  const resolvedSearchParams = await searchParams;
  const [settings, session, servicesData] = await Promise.all([
    getSiteSettings(),
    getAdminSession(),
    getAdminServicesList()
  ]);
  const successMessage = resolvedSearchParams?.status
    ? statusMessages[resolvedSearchParams.status]
    : null;

  return (
    <AdminShell
      settings={settings}
      pageTitle="Hizmetler"
      pageDescription="Hizmetleri listeleyin, duzenleyin ve yayin durumlarini yonetin."
      adminEmail={session?.email}
    >
      <div className="grid gap-6">
        {successMessage ? (
          <p className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-800">
            {successMessage}
          </p>
        ) : null}

        {servicesData.hasDatabaseError ? (
          <div
            role="alert"
            className="flex items-start gap-3 rounded-lg border border-signal-200 bg-signal-50 p-4 text-sm text-signal-900"
          >
            <AlertTriangle className="mt-0.5 size-5 shrink-0" />
            <div>
              <p className="font-black">Veritabani baglantisi kurulamadı.</p>
              <p className="mt-1 leading-6">
                Hizmet listesi su anda yuklenemiyor. Baglanti duzeldiginde
                kayitlar otomatik olarak gorunecek.
              </p>
            </div>
          </div>
        ) : null}

        <Card>
          <CardHeader className="flex flex-row items-start justify-between gap-4">
            <div>
              <CardTitle>Hizmet listesi</CardTitle>
              <CardDescription>
                Public sitede gorunen hizmet kartlarini buradan yonetin.
              </CardDescription>
            </div>
            <Button asChild>
              <Link href="/admin/services/new">
                <Plus />
                Yeni Hizmet
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {servicesData.services.length > 0 ? (
              <AdminTable>
                <AdminTableHead>
                  <tr>
                    <AdminTableHeader>Hizmet adi</AdminTableHeader>
                    <AdminTableHeader>Slug</AdminTableHeader>
                    <AdminTableHeader>Durum</AdminTableHeader>
                    <AdminTableHeader>Sira</AdminTableHeader>
                    <AdminTableHeader>Guncellenme tarihi</AdminTableHeader>
                    <AdminTableHeader>Aksiyonlar</AdminTableHeader>
                  </tr>
                </AdminTableHead>
                <tbody>
                  {servicesData.services.map((service) => (
                    <AdminTableRow key={service.id}>
                      <AdminTableCell className="font-black">
                        {service.title}
                      </AdminTableCell>
                      <AdminTableCell className="font-mono text-xs text-muted-foreground">
                        {service.slug}
                      </AdminTableCell>
                      <AdminTableCell>
                        <AdminServiceStatusBadge isActive={service.isActive} />
                      </AdminTableCell>
                      <AdminTableCell>{service.displayOrder}</AdminTableCell>
                      <AdminTableCell className="whitespace-nowrap text-muted-foreground">
                        {dateFormatter.format(service.updatedAt)}
                      </AdminTableCell>
                      <AdminTableCell>
                        <ServiceRowActions
                          id={service.id}
                          title={service.title}
                          isActive={service.isActive}
                        />
                      </AdminTableCell>
                    </AdminTableRow>
                  ))}
                </tbody>
              </AdminTable>
            ) : (
              <AdminEmptyState
                title="Henuz hizmet yok"
                description="Ilk hizmet kaydini ekleyerek public hizmetler sayfasini yonetmeye baslayin."
                icon={MessageSquareQuote}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </AdminShell>
  );
}
