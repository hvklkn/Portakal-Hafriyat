import type { Metadata } from "next";

import { AdminShell } from "@/components/admin/admin-shell";
import { ProjectForm } from "@/components/admin/project-form";
import { emptyProjectFormValues } from "@/lib/admin-projects";
import { getAdminSession } from "@/lib/admin-session";
import { getSiteSettings } from "@/lib/site-settings";

export const metadata: Metadata = {
  title: "Yeni Proje"
};

export default async function NewProjectPage() {
  const [settings, session] = await Promise.all([
    getSiteSettings(),
    getAdminSession()
  ]);

  return (
    <AdminShell
      settings={settings}
      pageTitle="Yeni Proje"
      pageDescription="Public portfolyo sayfasinda yayinlanacak yeni proje kaydi olusturun."
      adminEmail={session?.email}
    >
      <ProjectForm mode="create" defaultValues={emptyProjectFormValues} />
    </AdminShell>
  );
}
