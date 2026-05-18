import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Clock3, MessageCircle } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { getWhatsAppHref } from "@/lib/contact-links";
import type { SiteSettings } from "@/lib/site-settings";

const heroStats = [
  { value: "10+", label: "Yıllık Tecrübe", className: "left-4 top-4" },
  { value: "500+", label: "Tamamlanan İş", className: "right-4 top-1/2" },
  { value: "7/24", label: "Hızlı Destek", className: "bottom-4 left-8" }
];

export function HeroSection({ settings }: { settings: SiteSettings }) {
  const whatsappHref = getWhatsAppHref(settings.whatsapp);

  return (
    <section className="relative isolate overflow-hidden bg-graphite-950 text-white">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.055)_1px,transparent_1px)] bg-[size:44px_44px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(245,158,11,0.20),transparent_32%),linear-gradient(135deg,rgba(11,13,16,0.96),rgba(23,26,31,0.88)_52%,rgba(11,13,16,1))]" />

      <Container className="relative grid min-h-[calc(100svh-4rem)] gap-12 py-14 sm:py-18 lg:grid-cols-[0.96fr_1.04fr] lg:items-center lg:py-20">
        <Reveal className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-3 py-1 text-xs font-semibold text-white/76 backdrop-blur">
            <BadgeCheck className="size-4 text-primary" />
            Kurumsal saha operasyonu
          </div>
          <h1 className="mt-6 text-4xl font-black leading-tight tracking-normal sm:text-5xl lg:text-6xl">
            Güvenilir Hafriyat ve İş Makinesi Çözümleri
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/72 sm:text-lg">
            Temel kazısı, hafriyat taşıma, moloz taşıma, dolgu işleri ve arazi
            düzenleme hizmetlerinde hızlı, güvenilir ve profesyonel çözümler
            sunuyoruz.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/teklif-al">
                Teklif Al
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
                WhatsApp ile Ulaş
              </a>
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="relative">
          <div className="relative overflow-hidden rounded-lg border border-white/14 bg-white/8 p-2 shadow-soft backdrop-blur">
            <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-graphite-900 sm:aspect-[5/4] lg:aspect-[4/3]">
              <Image
                src="/images/hero-excavation.png"
                alt="Hafriyat sahasında iş makinesi ve kamyon"
                fill
                priority
                sizes="(min-width: 1024px) 48vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-graphite-950/45 via-transparent to-transparent" />
            </div>
          </div>

          {heroStats.map((stat) => (
            <div
              key={stat.label}
              className={`absolute ${stat.className} hidden min-w-36 rounded-lg border border-white/16 bg-graphite-950/82 p-4 text-white shadow-soft backdrop-blur sm:block`}
            >
              <p className="text-2xl font-black text-primary">{stat.value}</p>
              <p className="mt-1 text-xs font-semibold text-white/72">
                {stat.label}
              </p>
            </div>
          ))}

          <div className="mt-4 grid grid-cols-3 gap-2 sm:hidden">
            {heroStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg border border-white/12 bg-white/8 p-3"
              >
                <p className="text-lg font-black text-primary">{stat.value}</p>
                <p className="mt-1 text-[11px] font-semibold text-white/70">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-xs font-semibold text-white/42 lg:flex">
          <Clock3 className="size-4 text-primary" />
          Yerinde keşif, net planlama, zamanında teslim
        </div>
      </Container>
    </section>
  );
}
