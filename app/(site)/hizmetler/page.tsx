import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/sections/page-hero";
import { QuoteCTA } from "@/components/sections/quote-cta";
import { ServiceCard } from "@/components/sections/service-card";
import { EmptyState } from "@/components/ui/empty-state";
import { getPublicServices } from "@/lib/public-content";
import { getSiteSettings } from "@/lib/site-settings";

export const metadata: Metadata = {
  title: "Hafriyat Hizmetlerimiz"
};

export default async function ServicesPage() {
  const [services, settings] = await Promise.all([
    getPublicServices(),
    getSiteSettings()
  ]);

  return (
    <>
      <PageHero
        eyebrow="Hizmetler"
        title="Hafriyat Hizmetlerimiz"
        description="Temel kazısından moloz taşımaya, dolgu işlerinden arazi düzenlemeye kadar ihtiyaçlarınıza uygun profesyonel çözümler sunuyoruz."
        breadcrumbs={[
          { label: "Ana Sayfa", href: "/" },
          { label: "Hizmetler" }
        ]}
      />

      <section className="py-16 sm:py-20">
        <Container>
          {services.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {services.map((service) => (
                <ServiceCard key={service.slug} service={service} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="Henüz hizmet bulunmuyor"
              description="Hizmet kayıtları eklendiğinde bu alanda listelenecek."
            />
          )}
        </Container>
      </section>

      <QuoteCTA settings={settings} />
    </>
  );
}
