import type { Metadata } from "next";

import { AdminShell } from "@/components/admin/admin-shell";
import { ServiceForm } from "@/components/admin/service-form";
import { emptyServiceFormValues } from "@/lib/admin-services";
import { getAdminSession } from "@/lib/admin-session";
import { getSiteSettings } from "@/lib/site-settings";

export const metadata: Metadata = {
  title: "Yeni Hizmet"
};

export default async function NewServicePage() {
  const [settings, session] = await Promise.all([
    getSiteSettings(),
    getAdminSession()
  ]);

  return (
    <AdminShell
      settings={settings}
      pageTitle="Yeni Hizmet"
      pageDescription="Public sitede yayinlanacak yeni bir hizmet kaydi olusturun."
      adminEmail={session?.email}
    >
      <ServiceForm mode="create" defaultValues={emptyServiceFormValues} />
    </AdminShell>
  );
}
