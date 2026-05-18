import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";

import { Container } from "@/components/layout/container";
import { EnhancedQuoteForm } from "@/components/sections/enhanced-quote-form";
import { PageHero } from "@/components/sections/page-hero";
import { Card, CardContent } from "@/components/ui/card";
import { getPublicServices } from "@/lib/public-content";
import { createPageMetadata } from "@/lib/seo";
import { getSiteSettings } from "@/lib/site-settings";

const pageDescription =
  "İşin türünü, konumunu ve ihtiyacınızı paylaşın; en kısa sürede size dönüş yapalım.";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  return createPageMetadata({
    settings,
    title: "Hızlı Teklif Al",
    description: pageDescription,
    path: "/teklif-al"
  });
}

const benefits = [
  "Yerinde keşif planı",
  "Net iş kapsamı",
  "Uygun ekipman seçimi",
  "Hızlı geri dönüş"
];

export default async function QuotePage() {
  const [services, settings] = await Promise.all([
    getPublicServices(),
    getSiteSettings()
  ]);

  return (
    <>
      <PageHero
        eyebrow="Teklif"
        title="Hızlı Teklif Al"
        description={pageDescription}
        breadcrumbs={[
          { label: "Ana Sayfa", href: "/" },
          { label: "Teklif Al" }
        ]}
      />

      <section className="py-16 sm:py-20">
        <Container className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          <aside className="rounded-lg border border-border bg-muted p-6">
            <p className="text-sm font-bold uppercase tracking-normal text-signal-700">
              Süreç
            </p>
            <h2 className="mt-2 text-2xl font-black tracking-normal">
              Talebinizi hızlıca netleştirelim
            </h2>
            <div className="mt-6 grid gap-3">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-3">
                  <CheckCircle2 className="size-5 text-signal-600" />
                  <span className="text-sm font-bold">{benefit}</span>
                </div>
              ))}
            </div>
          </aside>

          <Card className="shadow-soft">
            <CardContent className="p-6">
              <EnhancedQuoteForm
                services={services.map((service) => ({
                  title: service.title,
                  slug: service.slug
                }))}
                whatsapp={settings.whatsapp}
              />
            </CardContent>
          </Card>
        </Container>
      </section>
    </>
  );
}
