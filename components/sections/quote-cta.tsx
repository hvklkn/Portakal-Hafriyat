import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { getWhatsAppHref } from "@/lib/contact-links";
import type { SiteSettings } from "@/lib/site-settings";

export function QuoteCTA({ settings }: { settings: SiteSettings }) {
  const whatsappHref = getWhatsAppHref(
    settings.whatsapp,
    "Merhaba, hafriyat işim için hızlı teklif almak istiyorum."
  );

  return (
    <section className="bg-muted py-16 sm:py-20">
      <Container>
        <div className="rounded-lg border border-border bg-graphite-950 p-6 text-white shadow-soft sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-normal text-primary">
                Teklif
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-normal sm:text-4xl">
                Hafriyat işiniz için hızlı teklif alın
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-white/68">
                İşin konumunu ve ihtiyacınızı paylaşın, en kısa sürede size
                dönüş yapalım.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <Button asChild size="lg">
                <Link href="/teklif-al">
                  Teklif Formu
                  <ArrowRight />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white/18 bg-white/8 text-white hover:bg-white/15"
              >
                <a href={whatsappHref} target="_blank" rel="noreferrer">
                  <MessageCircle />
                  WhatsApp’tan Yaz
                </a>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
