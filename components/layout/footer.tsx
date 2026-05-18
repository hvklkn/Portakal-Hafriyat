import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { publicNavItems } from "@/lib/constants";
import type { SiteSettings } from "@/lib/site-settings";

type FooterProps = {
  settings: SiteSettings;
};

export function Footer({ settings }: FooterProps) {
  const phoneHref = `tel:${settings.phone.replaceAll(" ", "")}`;

  return (
    <footer className="border-t border-border bg-graphite-950 text-white">
      <Container className="grid gap-10 py-12 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-md bg-primary text-sm font-black text-graphite-950">
            PH
          </span>
            <span className="text-base font-black uppercase tracking-normal">
              {settings.companyName}
            </span>
          </Link>
          <p className="mt-5 max-w-md text-sm leading-6 text-white/68">
            Planlı saha operasyonu, guclu ekipman parkı ve kurumsal is
            disipliniyle hafriyat projeleriniz icin guvenilir cozum ortağı.
          </p>
          <Button asChild className="mt-6" size="sm">
            <Link href="/teklif-al">Teklif Al</Link>
          </Button>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-normal text-white">
            Sayfalar
          </h2>
          <div className="mt-4 grid gap-3">
            {publicNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-white/68 transition-colors hover:text-primary"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-normal text-white">
            Iletisim
          </h2>
          <div className="mt-4 grid gap-3 text-sm text-white/68">
            <a
              href={phoneHref}
              className="flex items-center gap-2 hover:text-primary"
            >
              <Phone className="size-4" />
              {settings.phone}
            </a>
            <a
              href={`mailto:${settings.email}`}
              className="flex items-center gap-2 hover:text-primary"
            >
              <Mail className="size-4" />
              {settings.email}
            </a>
            <span className="flex items-center gap-2">
              <MapPin className="size-4" />
              {settings.address}
            </span>
          </div>
        </div>
      </Container>
      <div className="border-t border-white/10 py-5">
        <Container className="flex flex-col gap-2 text-xs text-white/50 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {settings.companyName}. Tum hakları
            saklıdır.
          </p>
          <Link href="/admin/login" className="hover:text-primary">
            Admin
          </Link>
        </Container>
      </div>
    </footer>
  );
}
