import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import { Container } from "@/components/layout/container";
import { ContactForm } from "@/components/sections/contact-form";
import { ContactInfoCard } from "@/components/sections/contact-info-card";
import { PageHero } from "@/components/sections/page-hero";
import { Card, CardContent } from "@/components/ui/card";
import { getPhoneHref, getWhatsAppHref } from "@/lib/contact-links";
import { createPageMetadata } from "@/lib/seo";
import { getSiteSettings } from "@/lib/site-settings";

const pageDescription =
  "Hafriyat ve iş makinesi ihtiyaçlarınız için bizimle iletişime geçin.";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  return createPageMetadata({
    settings,
    title: "İletişim",
    description: pageDescription,
    path: "/iletisim"
  });
}

export default async function ContactPage() {
  const settings = await getSiteSettings();
  const phoneHref = getPhoneHref(settings.phone);
  const whatsappHref = getWhatsAppHref(settings.whatsapp);
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    settings.address
  )}`;

  return (
    <>
      <PageHero
        eyebrow="İletişim"
        title="İletişim"
        description={pageDescription}
        breadcrumbs={[
          { label: "Ana Sayfa", href: "/" },
          { label: "İletişim" }
        ]}
      />

      <section className="py-16 sm:py-20">
        <Container className="grid gap-8 lg:grid-cols-[0.86fr_1.14fr]">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <ContactInfoCard
              title="Telefon"
              value={settings.phone}
              href={phoneHref}
              icon={Phone}
            />
            <ContactInfoCard
              title="WhatsApp"
              value="Hızlı mesaj gönder"
              href={whatsappHref}
              icon={MessageCircle}
            />
            <ContactInfoCard
              title="E-posta"
              value={settings.email}
              href={`mailto:${settings.email}`}
              icon={Mail}
            />
            <ContactInfoCard
              title="Adres"
              value={settings.address}
              href={mapsHref}
              icon={MapPin}
            />
          </div>

          <Card className="shadow-soft">
            <CardContent className="p-6">
              <div className="mb-6">
                <p className="text-sm font-bold uppercase tracking-normal text-signal-700">
                  Mesaj gönder
                </p>
                <h2 className="mt-2 text-2xl font-black tracking-normal">
                  Saha ihtiyacınızı paylaşın
                </h2>
              </div>
              <ContactForm />
            </CardContent>
          </Card>
        </Container>
      </section>

      <section className="border-y border-border bg-muted py-12">
        <Container>
          <a
            href={mapsHref}
            target="_blank"
            rel="noreferrer"
            className="block rounded-lg border border-border bg-background p-6 shadow-line transition-colors hover:border-signal-300"
          >
            <p className="text-sm font-bold uppercase tracking-normal text-signal-700">
              Harita
            </p>
            <h2 className="mt-2 text-2xl font-black tracking-normal">
              Google Maps üzerinden konumu aç
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              {settings.address}
            </p>
          </a>
        </Container>
      </section>
    </>
  );
}
