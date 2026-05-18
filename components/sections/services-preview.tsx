import Link from "next/link";
import {
  ArrowRight,
  Construction,
  Layers3,
  Shovel,
  Truck
} from "lucide-react";

import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/sections/section-header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import type { HomeService } from "@/lib/home-content";

const serviceIcons = {
  Construction,
  Layers3,
  Shovel,
  Truck
};

export function ServicesPreview({ services }: { services: HomeService[] }) {
  return (
    <section className="bg-background py-16 sm:py-20">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow="Hizmetler"
            title="Hafriyat işleriniz için uçtan uca saha çözümleri"
            description="Kazıdan nakliyeye, dolgu işlerinden arazi düzenlemeye kadar ihtiyaç duyduğunuz operasyonları tek merkezden planlıyoruz."
          />
          <Button asChild variant="outline">
            <Link href="/hizmetler">
              Tüm Hizmetler
              <ArrowRight />
            </Link>
          </Button>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => {
            const Icon =
              serviceIcons[service.icon as keyof typeof serviceIcons] ??
              Construction;

            return (
              <Reveal key={service.slug} delay={index * 0.035}>
                <Card className="group h-full overflow-hidden hover:border-signal-300 hover:shadow-soft">
                  <CardHeader>
                    <div className="mb-4 grid size-11 place-items-center rounded-md bg-graphite-950 text-primary transition-transform duration-200 group-hover:-translate-y-1">
                      <Icon className="size-5" />
                    </div>
                    <CardTitle>{service.title}</CardTitle>
                    <CardDescription>{service.summary}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link
                      href="/hizmetler"
                      className="inline-flex items-center gap-2 text-sm font-bold text-signal-700 underline-offset-4 hover:underline"
                    >
                      Detaylı İncele
                      <ArrowRight className="size-4" />
                    </Link>
                  </CardContent>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
