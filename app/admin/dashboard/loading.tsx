import { AdminShell } from "@/components/admin/admin-shell";

const loadingSettings = {
  companyName: "Portakal Hafriyat"
};

function SkeletonBlock({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-graphite-200/70 ${className}`}
    />
  );
}

export default function AdminDashboardLoading() {
  return (
    <AdminShell
      settings={loadingSettings}
      pageTitle="Dashboard"
      pageDescription="Dashboard verileri yukleniyor."
    >
      <div className="grid gap-6 lg:gap-8">
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="rounded-lg border border-border bg-background p-5 shadow-line"
            >
              <SkeletonBlock className="h-4 w-32" />
              <SkeletonBlock className="mt-4 h-9 w-20" />
              <SkeletonBlock className="mt-4 h-3 w-full" />
              <SkeletonBlock className="mt-2 h-3 w-2/3" />
            </div>
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(360px,0.85fr)]">
          <div className="rounded-lg border border-border bg-background p-6 shadow-line">
            <SkeletonBlock className="h-6 w-48" />
            <div className="mt-6 grid gap-3">
              {Array.from({ length: 5 }).map((_, index) => (
                <SkeletonBlock key={index} className="h-12 w-full" />
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-border bg-background p-6 shadow-line">
            <SkeletonBlock className="h-6 w-36" />
            <div className="mt-6 grid gap-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <SkeletonBlock key={index} className="h-24 w-full" />
              ))}
            </div>
          </div>
        </section>
      </div>
    </AdminShell>
  );
}
