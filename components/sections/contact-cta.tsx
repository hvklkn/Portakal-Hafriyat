import Link from "next/link";
import { ArrowRight, MapPin, MessageCircle, Phone } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { getPhoneHref, getWhatsAppHref } from "@/lib/contact-links";
import type { SiteSettings } from "@/lib/site-settings";

export function ContactCTA({ settings }: { settings: SiteSettings }) {
  const phoneHref = getPhoneHref(settings.phone);
  const whatsappHref = getWhatsAppHref(settings.whatsapp);

  return (
    <section className="bg-background py-16 pb-28 sm:py-20 md:pb-20">
      <Container>
        <div className="rounded-lg border border-border bg-background p-5 shadow-soft sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-normal text-signal-700">
                İletişim
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-normal">
                Saha ihtiyacınızı birlikte netleştirelim
              </h2>
            </div>
            <Button asChild size="lg">
              <Link href="/teklif-al">
                Teklif Al
                <ArrowRight />
              </Link>
            </Button>
          </div>

          <div className="mt-8 grid gap-3 md:grid-cols-3">
            <a
              href={phoneHref}
              className="flex items-center gap-3 rounded-lg border border-border bg-muted/60 p-4 transition-colors hover:border-signal-300"
            >
              <Phone className="size-5 text-signal-600" />
              <span className="text-sm font-bold">{settings.phone}</span>
            </a>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-lg border border-border bg-muted/60 p-4 transition-colors hover:border-signal-300"
            >
              <MessageCircle className="size-5 text-signal-600" />
              <span className="text-sm font-bold">WhatsApp</span>
            </a>
            <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/60 p-4">
              <MapPin className="size-5 text-signal-600" />
              <span className="text-sm font-bold">{settings.address}</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
