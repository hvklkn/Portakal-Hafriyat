import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, FolderKanban, Plus } from "lucide-react";

import { AdminEmptyState } from "@/components/admin/admin-empty-state";
import { AdminShell } from "@/components/admin/admin-shell";
import { AdminProjectStatusBadge } from "@/components/admin/admin-status-badge";
import {
  AdminTable,
  AdminTableCell,
  AdminTableHead,
  AdminTableHeader,
  AdminTableRow
} from "@/components/admin/admin-table";
import { ProjectRowActions } from "@/components/admin/project-row-actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { getAdminProjectsList } from "@/lib/admin-projects";
import { getAdminSession } from "@/lib/admin-session";
import { getSiteSettings } from "@/lib/site-settings";

export const metadata: Metadata = {
  title: "Admin Projeler"
};

type AdminProjectsPageProps = {
  searchParams?: Promise<{ status?: string }>;
};

const dateFormatter = new Intl.DateTimeFormat("tr-TR", {
  dateStyle: "medium",
  timeStyle: "short"
});

const statusMessages: Record<string, string> = {
  created: "Proje basariyla olusturuldu.",
  updated: "Proje basariyla guncellendi.",
  deleted: "Proje basariyla silindi.",
  featured: "Proje one cikan durumu guncellendi."
};

export default async function AdminProjectsPage({
  searchParams
}: AdminProjectsPageProps) {
  const resolvedSearchParams = await searchParams;
  const [settings, session, projectsData] = await Promise.all([
    getSiteSettings(),
    getAdminSession(),
    getAdminProjectsList()
  ]);
  const successMessage = resolvedSearchParams?.status
    ? statusMessages[resolvedSearchParams.status]
    : null;

  return (
    <AdminShell
      settings={settings}
      pageTitle="Projeler"
      pageDescription="Tamamlanan isleri, proje durumlarini ve one cikanlari yonetin."
      adminEmail={session?.email}
    >
      <div className="grid gap-6">
        {successMessage ? (
          <p className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-800">
            {successMessage}
          </p>
        ) : null}

        {projectsData.hasDatabaseError ? (
          <ErrorAlert message="Proje listesi su anda yuklenemiyor. Baglanti duzeldiginde kayitlar otomatik olarak gorunecek." />
        ) : null}

        <Card>
          <CardHeader className="flex flex-row items-start justify-between gap-4">
            <div>
              <CardTitle>Proje listesi</CardTitle>
              <CardDescription>
                Public projeler sayfasinda gorunen portfolyo kayitlari.
              </CardDescription>
            </div>
            <Button asChild>
              <Link href="/admin/projects/new">
                <Plus />
                Yeni Proje
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {projectsData.projects.length > 0 ? (
              <AdminTable>
                <AdminTableHead>
                  <tr>
                    <AdminTableHeader>Proje adı</AdminTableHeader>
                    <AdminTableHeader>Slug</AdminTableHeader>
                    <AdminTableHeader>Lokasyon</AdminTableHeader>
                    <AdminTableHeader>Durum</AdminTableHeader>
                    <AdminTableHeader>Öne çıkan</AdminTableHeader>
                    <AdminTableHeader>Tarih</AdminTableHeader>
                    <AdminTableHeader>Güncellenme</AdminTableHeader>
                    <AdminTableHeader>Aksiyonlar</AdminTableHeader>
                  </tr>
                </AdminTableHead>
                <tbody>
                  {projectsData.projects.map((project) => (
                    <AdminTableRow key={project.id}>
                      <AdminTableCell className="font-black">
                        {project.title}
                      </AdminTableCell>
                      <AdminTableCell className="font-mono text-xs text-muted-foreground">
                        {project.slug}
                      </AdminTableCell>
                      <AdminTableCell>{project.location ?? "-"}</AdminTableCell>
                      <AdminTableCell>
                        <AdminProjectStatusBadge status={project.status} />
                      </AdminTableCell>
                      <AdminTableCell>
                        <span className="inline-flex rounded-full border border-border bg-muted px-3 py-1 text-xs font-bold">
                          {project.isFeatured ? "Evet" : "Hayır"}
                        </span>
                      </AdminTableCell>
                      <AdminTableCell>{project.date ?? "-"}</AdminTableCell>
                      <AdminTableCell className="whitespace-nowrap text-muted-foreground">
                        {dateFormatter.format(project.updatedAt)}
                      </AdminTableCell>
                      <AdminTableCell>
                        <ProjectRowActions
                          id={project.id}
                          title={project.title}
                          isFeatured={project.isFeatured}
                        />
                      </AdminTableCell>
                    </AdminTableRow>
                  ))}
                </tbody>
              </AdminTable>
            ) : (
              <AdminEmptyState
                title="Henuz proje yok"
                description="Ilk proje kaydini ekleyerek portfolyo sayfasini yonetmeye baslayin."
                icon={FolderKanban}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </AdminShell>
  );
}

function ErrorAlert({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className="flex items-start gap-3 rounded-lg border border-signal-200 bg-signal-50 p-4 text-sm text-signal-900"
    >
      <AlertTriangle className="mt-0.5 size-5 shrink-0" />
      <div>
        <p className="font-black">Veritabani baglantisi kurulamadı.</p>
        <p className="mt-1 leading-6">{message}</p>
      </div>
    </div>
  );
}
