"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Eye,
  FolderKanban,
  GalleryHorizontalEnd,
  Gauge,
  LogOut,
  MessageSquare,
  MessageSquareQuote,
  Search,
  Settings,
  Wrench,
  X
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { title: "Dashboard", href: "/admin/dashboard", icon: Gauge },
  { title: "Site Ayarları", href: "/admin/settings", icon: Settings },
  { title: "Hizmetler", href: "/admin/services", icon: Wrench },
  { title: "Projeler", href: "/admin/projects", icon: FolderKanban },
  { title: "Galeri", href: "/admin/gallery", icon: GalleryHorizontalEnd },
  { title: "Teklif Talepleri", href: "/admin/quotes", icon: MessageSquareQuote },
  { title: "Mesajlar", href: "/admin/messages", icon: MessageSquare },
  { title: "SEO Ayarları", href: "/admin/seo", icon: Search }
];

type AdminSidebarProps = {
  companyName: string;
  isOpen?: boolean;
  onClose?: () => void;
};

export function AdminSidebar({
  companyName,
  isOpen = true,
  onClose
}: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-graphite-950/60 backdrop-blur-sm transition-opacity lg:hidden",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={onClose}
      />
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-white/10 bg-graphite-950 text-white transition-transform duration-200 lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between border-b border-white/10 p-5">
          <Link href="/admin/dashboard" className="flex items-center gap-3" onClick={onClose}>
            <span className="grid size-10 place-items-center rounded-md bg-primary text-sm font-black text-graphite-950">
              PH
            </span>
            <span>
              <span className="block text-sm font-black uppercase tracking-normal">
                {companyName}
              </span>
              <span className="mt-1 block text-xs text-white/55">
                Yönetim Paneli
              </span>
            </span>
          </Link>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10 lg:hidden"
            aria-label="Menüyü kapat"
            onClick={onClose}
          >
            <X />
          </Button>
        </div>

        <nav className="grid gap-1 p-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "focus-ring flex items-center gap-3 rounded-md px-3 py-3 text-sm font-semibold text-white/65 transition-colors hover:bg-white/10 hover:text-white",
                  isActive && "bg-primary text-graphite-950 hover:bg-primary hover:text-graphite-950"
                )}
                onClick={onClose}
              >
                <Icon
                  className={cn(
                    "size-4 text-primary",
                    isActive && "text-graphite-950"
                  )}
                />
                {item.title}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto grid gap-2 border-t border-white/10 p-4">
          <Button
            asChild
            variant="outline"
            className="justify-start border-white/15 bg-white/5 text-white hover:bg-white/10"
          >
            <Link href="/" target="_blank" rel="noreferrer">
              <Eye />
              Siteyi Gör
            </Link>
          </Button>
          <form action="/api/admin/logout" method="post">
            <Button
              type="submit"
              variant="outline"
              className="w-full justify-start border-white/15 bg-white/5 text-white hover:bg-white/10"
            >
              <LogOut />
              Çıkış Yap
            </Button>
          </form>
        </div>
      </aside>
    </>
  );
}
