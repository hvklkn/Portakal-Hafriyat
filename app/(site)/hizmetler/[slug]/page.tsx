import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";

import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/sections/page-hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPhoneHref, getWhatsAppHref } from "@/lib/contact-links";
import { getPublicServiceBySlug } from "@/lib/public-content";
import { getSiteSettings } from "@/lib/site-settings";

type ServiceDetailPageProps = {
  params: Promise<{ slug: string }>;
};

const processSteps = [
  "İhtiyaç ve konum bilgisi alınır",
  "Yerinde keşif yapılır",
  "Uygun makine ve ekip planlanır",
  "İş güvenli şekilde tamamlanır"
];

export async function generateMetadata({
  params
}: ServiceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getPublicServiceBySlug(slug);

  if (!service) {
    return {
      title: "Hizmet bulunamadı"
    };
  }

  return {
    title: service.title,
    description: service.summary
  };
}

export default async function ServiceDetailPage({
  params
}: ServiceDetailPageProps) {
  const { slug } = await params;
  const [service, settings] = await Promise.all([
    getPublicServiceBySlug(slug),
    getSiteSettings()
  ]);

  if (!service) {
    notFound();
  }

  const phoneHref = getPhoneHref(settings.phone);
  const whatsappHref = getWhatsAppHref(settings.whatsapp);

  return (
    <>
      <PageHero
        eyebrow="Hizmet Detayı"
        title={service.title}
        description={service.summary}
        breadcrumbs={[
          { label: "Ana Sayfa", href: "/" },
          { label: "Hizmetler", href: "/hizmetler" },
          { label: service.title }
        ]}
      />

      <section className="py-16 sm:py-20">
        <Container className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
          <article className="grid gap-8">
            <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-border bg-muted shadow-line">
              <Image
                src={service.imageUrl}
                alt={service.title}
                fill
                sizes="(min-width: 1024px) 68vw, 100vw"
                className="object-cover"
              />
            </div>

            <div className="rounded-lg border border-border bg-background p-6 shadow-line">
              <h2 className="text-2xl font-black tracking-normal">
                Hizmet kapsamı
              </h2>
              <p className="mt-4 text-base leading-8 text-muted-foreground">
                {service.description}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-black tracking-normal">
                Bu hizmette süreç nasıl ilerler?
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {processSteps.map((step, index) => (
                  <div
                    key={step}
                    className="rounded-lg border border-border bg-background p-5 shadow-line"
                  >
                    <span className="grid size-10 place-items-center rounded-md bg-primary text-sm font-black text-graphite-950">
                      {index + 1}
                    </span>
                    <p className="mt-4 text-sm font-bold leading-6">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </article>

          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Hızlı iletişim</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3">
              <Button asChild variant="outline" className="justify-start">
                <a href={phoneHref}>
                  <Phone />
                  {settings.phone}
                </a>
              </Button>
              <Button asChild variant="outline" className="justify-start">
                <a href={whatsappHref} target="_blank" rel="noreferrer">
                  <MessageCircle />
                  WhatsApp
                </a>
              </Button>
              <Button asChild>
                <Link href="/teklif-al">
                  Teklif Al
                  <ArrowRight />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </Container>
      </section>
    </>
  );
}
