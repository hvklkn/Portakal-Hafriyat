import { Construction, Gauge, Settings2, Shovel, Truck } from "lucide-react";

import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/sections/section-header";
import { Reveal } from "@/components/ui/reveal";

const fleet = [
  {
    title: "Ekskavatör",
    description: "Temel kazısı, kanal açma ve yüksek hacimli kazı işleri.",
    icon: Shovel
  },
  {
    title: "Kamyon",
    description: "Hafriyat, moloz ve dolgu malzemesi nakliyesi.",
    icon: Truck
  },
  {
    title: "Kepçe",
    description: "Yükleme, saha düzenleme ve hızlı müdahale işleri.",
    icon: Construction
  },
  {
    title: "Mini yükleyici",
    description: "Dar alan, iç saha ve hassas yükleme operasyonları.",
    icon: Settings2
  },
  {
    title: "Silindir / sıkıştırma ekipmanı",
    description: "Dolgu, yol hazırlığı ve zemin sıkıştırma çalışmaları.",
    icon: Gauge
  }
];

export function FleetSection() {
  return (
    <section className="bg-graphite-950 py-16 text-white sm:py-20">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          <SectionHeader
            eyebrow="Makine parkı"
            title="İşin ölçeğine göre doğru ekipman"
            description="Saha koşuluna uygun makine seçimi, hem süreyi hem maliyeti kontrol altında tutar."
            className="[&_h2]:text-white [&_p:last-child]:text-white/66"
          />

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {fleet.map((item, index) => {
              const Icon = item.icon;

              return (
                <Reveal key={item.title} delay={index * 0.04}>
                  <article className="h-full rounded-lg border border-white/10 bg-white/5 p-5 transition-colors hover:border-primary/45 hover:bg-white/8">
                    <div className="grid size-11 place-items-center rounded-md bg-primary text-graphite-950">
                      <Icon className="size-5" />
                    </div>
                    <h3 className="mt-5 text-lg font-bold tracking-normal">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-white/66">
                      {item.description}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
