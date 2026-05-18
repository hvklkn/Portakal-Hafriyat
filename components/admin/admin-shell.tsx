"use client";

import { useState } from "react";

import { AdminHeader } from "@/components/admin/admin-header";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import type { SiteSettings } from "@/lib/site-settings";

type AdminShellProps = {
  children: React.ReactNode;
  settings: Pick<SiteSettings, "companyName">;
  pageTitle?: string;
  pageDescription?: string;
  adminEmail?: string;
};

export function AdminShell({
  children,
  settings,
  pageTitle = "Admin Paneli",
  pageDescription = "Site içeriklerini ve gelen talepleri yönetin.",
  adminEmail
}: AdminShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-muted">
      <AdminSidebar
        companyName={settings.companyName}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="lg:pl-72">
        <AdminHeader
          title={pageTitle}
          description={pageDescription}
          adminEmail={adminEmail}
          onMenuClick={() => setIsSidebarOpen(true)}
        />
        <main className="container py-6 lg:py-8">{children}</main>
      </div>
    </div>
  );
}
