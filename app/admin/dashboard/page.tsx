import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  FolderCheck,
  FolderKanban,
  GalleryHorizontalEnd,
  Images,
  MessageSquare,
  MessageSquareQuote,
  Plus,
  Settings,
  Wrench
} from "lucide-react";

import { AdminEmptyState } from "@/components/admin/admin-empty-state";
import { AdminQuickAction } from "@/components/admin/admin-quick-action";
import { AdminShell } from "@/components/admin/admin-shell";
import { AdminStatCard } from "@/components/admin/admin-stat-card";
import {
  AdminQuoteStatusBadge,
  AdminReadStatusBadge
} from "@/components/admin/admin-status-badge";
import {
  AdminTable,
  AdminTableCell,
  AdminTableHead,
  AdminTableHeader,
  AdminTableRow
} from "@/components/admin/admin-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { getAdminDashboardData } from "@/lib/admin-dashboard";
import { getAdminSession } from "@/lib/admin-session";
import { getSiteSettings } from "@/lib/site-settings";

export const metadata: Metadata = {
  title: "Dashboard"
};

const dateFormatter = new Intl.DateTimeFormat("tr-TR", {
  dateStyle: "medium",
  timeStyle: "short"
});

function formatDate(date: Date) {
  return dateFormatter.format(date);
}

function summarize(value: string, maxLength = 116) {
  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, maxLength).trim()}...`;
}

export default async function AdminDashboardPage() {
  const [settings, session, dashboardData] = await Promise.all([
    getSiteSettings(),
    getAdminSession(),
    getAdminDashboardData()
  ]);

  const statCards = [
    {
      title: "Toplam teklif talebi",
      value: dashboardData.stats.totalQuotes,
      description: "Teklif formundan gelen tum kayitlar.",
      icon: MessageSquareQuote
    },
    {
      title: "Yeni talepler",
      value: dashboardData.stats.newQuotes,
      description: "Henuz aksiyon bekleyen talepler.",
      icon: AlertTriangle
    },
    {
      title: "Yayindaki hizmet",
      value: dashboardData.stats.publishedServices,
      description: "Public sitede gorunen aktif hizmetler.",
      icon: Wrench
    },
    {
      title: "Tamamlanan proje",
      value: dashboardData.stats.completedProjects,
      description: "Portfolyoda tamamlandi olarak isaretlenen isler.",
      icon: FolderCheck
    },
    {
      title: "Okunmamis mesaj",
      value: dashboardData.stats.unreadMessages,
      description: "Iletisim formundan gelen yeni mesajlar.",
      icon: MessageSquare
    },
    {
      title: "Galeri gorseli",
      value: dashboardData.stats.galleryImages,
      description: "Saha galerisi icin kayitli medya sayisi.",
      icon: Images
    }
  ];

  const quickActions = [
    {
      title: "Site Ayarlarini Duzenle",
      description: "Telefon, adres, WhatsApp ve genel firma bilgileri.",
      href: "/admin/settings",
      icon: Settings
    },
    {
      title: "Yeni Hizmet Ekle",
      description: "Hizmet katalogunu genisletmek icin ilgili alana git.",
      href: "/admin/services",
      icon: Plus
    },
    {
      title: "Proje Ekle",
      description: "Tamamlanan isleri portfolyoya eklemeye hazirlan.",
      href: "/admin/projects",
      icon: FolderKanban
    },
    {
      title: "Galeriye Gorsel Ekle",
      description: "Saha ve makine gorsellerini yonet.",
      href: "/admin/gallery",
      icon: GalleryHorizontalEnd
    },
    {
      title: "Teklif Taleplerini Gor",
      description: "Gelen talepleri durumlarina gore takip et.",
      href: "/admin/quotes",
      icon: MessageSquareQuote
    }
  ];

  return (
    <AdminShell
      settings={settings}
      pageTitle="Dashboard"
      pageDescription="Gelen talepleri, mesajlari ve yayin durumlarini tek ekrandan takip edin."
      adminEmail={session?.email}
    >
      <div className="grid gap-6 lg:gap-8">
        {dashboardData.hasDatabaseError ? (
          <div
            role="alert"
            className="flex items-start gap-3 rounded-lg border border-signal-200 bg-signal-50 p-4 text-sm text-signal-900"
          >
            <AlertTriangle className="mt-0.5 size-5 shrink-0" />
            <div>
              <p className="font-black">Veritabani baglantisi kurulamadı.</p>
              <p className="mt-1 leading-6">
                Dashboard bos durumla calisiyor. Baglanti duzeldiginde gercek
                kayitlar otomatik olarak burada gorunecek.
              </p>
            </div>
          </div>
        ) : null}

        <section
          aria-label="Dashboard ozetleri"
          className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
        >
          {statCards.map((stat) => (
            <AdminStatCard key={stat.title} {...stat} />
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(360px,0.85fr)]">
          <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-start justify-between gap-4">
              <div>
                <CardTitle>Son teklif talepleri</CardTitle>
                <CardDescription>
                  En yeni talepler ve operasyon durumu.
                </CardDescription>
              </div>
              <Link
                href="/admin/quotes"
                className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-signal-800 hover:text-graphite-950"
              >
                Tumu
                <ArrowRight className="size-4" />
              </Link>
            </CardHeader>
            <CardContent>
              {dashboardData.recentQuotes.length > 0 ? (
                <AdminTable>
                  <AdminTableHead>
                    <tr>
                      <AdminTableHeader>Musteri</AdminTableHeader>
                      <AdminTableHeader>Telefon</AdminTableHeader>
                      <AdminTableHeader>Hizmet</AdminTableHeader>
                      <AdminTableHeader>Konum</AdminTableHeader>
                      <AdminTableHeader>Durum</AdminTableHeader>
                      <AdminTableHeader>Tarih</AdminTableHeader>
                      <AdminTableHeader>Aksiyon</AdminTableHeader>
                    </tr>
                  </AdminTableHead>
                  <tbody>
                    {dashboardData.recentQuotes.map((quote) => (
                      <AdminTableRow key={quote.id}>
                        <AdminTableCell className="font-bold">
                          {quote.customer}
                        </AdminTableCell>
                        <AdminTableCell>{quote.phone}</AdminTableCell>
                        <AdminTableCell>{quote.service}</AdminTableCell>
                        <AdminTableCell>{quote.location}</AdminTableCell>
                        <AdminTableCell>
                          <AdminQuoteStatusBadge status={quote.status} />
                        </AdminTableCell>
                        <AdminTableCell className="whitespace-nowrap text-muted-foreground">
                          {formatDate(quote.createdAt)}
                        </AdminTableCell>
                        <AdminTableCell>
                          <Link
                            href="/admin/quotes"
                            className="font-bold text-signal-800 hover:text-graphite-950"
                          >
                            Detay
                          </Link>
                        </AdminTableCell>
                      </AdminTableRow>
                    ))}
                  </tbody>
                </AdminTable>
              ) : (
                <AdminEmptyState
                  title="Henuz teklif talebi yok"
                  description="Teklif formundan gelen talepler burada listelenecek."
                  icon={MessageSquareQuote}
                />
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-start justify-between gap-4">
              <div>
                <CardTitle>Son mesajlar</CardTitle>
                <CardDescription>
                  Iletisim formundan gelen son mesajlar.
                </CardDescription>
              </div>
              <Link
                href="/admin/messages"
                className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-signal-800 hover:text-graphite-950"
              >
                Tumu
                <ArrowRight className="size-4" />
              </Link>
            </CardHeader>
            <CardContent>
              {dashboardData.recentMessages.length > 0 ? (
                <div className="grid gap-3">
                  {dashboardData.recentMessages.map((message) => (
                    <article
                      key={message.id}
                      className="rounded-lg border border-border bg-muted/35 p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h3 className="truncate text-sm font-black">
                            {message.name}
                          </h3>
                          <p className="mt-1 text-xs font-medium text-muted-foreground">
                            {message.phone ?? "Telefon belirtilmedi"}
                          </p>
                        </div>
                        <AdminReadStatusBadge isRead={message.isRead} />
                      </div>
                      <p className="mt-3 text-sm leading-6 text-muted-foreground">
                        {summarize(message.message)}
                      </p>
                      <p className="mt-3 text-xs font-bold text-muted-foreground">
                        {formatDate(message.createdAt)}
                      </p>
                    </article>
                  ))}
                </div>
              ) : (
                <AdminEmptyState
                  title="Henuz mesaj yok"
                  description="Iletisim formundan gelen mesajlar burada gorunecek."
                  icon={MessageSquare}
                />
              )}
            </CardContent>
          </Card>
        </section>

        <section aria-labelledby="quick-actions-title">
          <div className="mb-4">
            <h2
              id="quick-actions-title"
              className="text-xl font-black tracking-normal"
            >
              Hizli aksiyonlar
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Sitenin en sik yonetilen alanlarina tek tikla ulasin.
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
            {quickActions.map((action) => (
              <AdminQuickAction key={action.title} {...action} />
            ))}
          </div>
        </section>
      </div>
    </AdminShell>
  );
}
