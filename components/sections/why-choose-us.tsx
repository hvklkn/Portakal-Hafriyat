import { CircleDollarSign, Clock3, HardHat, Truck } from "lucide-react";

import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/sections/section-header";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";

const reasons = [
  {
    title: "Deneyimli saha ekibi",
    description:
      "İşin zeminini, erişimini ve zamanlamasını sahada okuyabilen profesyonel ekip.",
    icon: HardHat
  },
  {
    title: "Güçlü makine ve araç filosu",
    description:
      "Kazı, yükleme, taşıma ve sıkıştırma için doğru ekipmanı doğru zamanda sahaya alırız.",
    icon: Truck
  },
  {
    title: "Zamanında teslim",
    description:
      "Keşif, planlama ve günlük saha akışı net olduğu için iş programı korunur.",
    icon: Clock3
  },
  {
    title: "Şeffaf fiyatlandırma",
    description:
      "İş kapsamı, lokasyon, metraj ve ekipman ihtiyacına göre anlaşılır teklif sunarız.",
    icon: CircleDollarSign
  }
];

export function WhyChooseUs() {
  return (
    <section className="border-y border-border bg-muted py-16 sm:py-20">
      <Container>
        <SectionHeader
          eyebrow="Neden biz"
          title="Sahada güven veren, masada net konuşan iş ortağı"
          description="Hafriyat işi hız ister; ama hızın yanında plan, güvenlik ve temiz teslim de gerekir."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;

            return (
              <Reveal key={reason.title} delay={index * 0.04}>
                <Card className="h-full bg-background/92 hover:border-signal-300 hover:shadow-soft">
                  <CardHeader>
                    <div className="mb-4 grid size-11 place-items-center rounded-md bg-primary text-graphite-950">
                      <Icon className="size-5" />
                    </div>
                    <CardTitle>{reason.title}</CardTitle>
                    <CardDescription>{reason.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
