import type { Metadata } from "next";
import { AlertTriangle, FolderKanban } from "lucide-react";

import { AdminEmptyState } from "@/components/admin/admin-empty-state";
import { AdminShell } from "@/components/admin/admin-shell";
import { ProjectForm } from "@/components/admin/project-form";
import { getAdminProjectForEdit } from "@/lib/admin-projects";
import { getAdminSession } from "@/lib/admin-session";
import { getSiteSettings } from "@/lib/site-settings";

type EditProjectPageProps = {
  params: Promise<{ id: string }>;
};

export const metadata: Metadata = {
  title: "Proje Duzenle"
};

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  const { id } = await params;
  const [settings, session, projectData] = await Promise.all([
    getSiteSettings(),
    getAdminSession(),
    getAdminProjectForEdit(id)
  ]);

  return (
    <AdminShell
      settings={settings}
      pageTitle="Proje Duzenle"
      pageDescription="Proje bilgilerini, durumunu ve one cikan ayarini guncelleyin."
      adminEmail={session?.email}
    >
      <div className="grid gap-6">
        {projectData.hasDatabaseError ? (
          <div
            role="alert"
            className="flex items-start gap-3 rounded-lg border border-signal-200 bg-signal-50 p-4 text-sm text-signal-900"
          >
            <AlertTriangle className="mt-0.5 size-5 shrink-0" />
            <div>
              <p className="font-black">Veritabani baglantisi kurulamadı.</p>
              <p className="mt-1 leading-6">
                Proje bilgileri su anda yuklenemiyor. Baglantiyi kontrol edip
                tekrar deneyin.
              </p>
            </div>
          </div>
        ) : null}

        {projectData.project ? (
          <ProjectForm
            mode="edit"
            projectId={projectData.project.id}
            projectTitle={projectData.project.title}
            defaultValues={projectData.project}
          />
        ) : (
          <AdminEmptyState
            title="Proje bulunamadi"
            description="Duzenlemek istediginiz proje silinmis veya erisilemiyor olabilir."
            icon={FolderKanban}
          />
        )}
      </div>
    </AdminShell>
  );
}
