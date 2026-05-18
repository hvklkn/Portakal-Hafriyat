import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

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
import type { HomeProject } from "@/lib/home-content";

export function FeaturedProjects({
  projects
}: {
  projects: HomeProject[];
}) {
  return (
    <section className="bg-background py-16 sm:py-20">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow="Projeler"
            title="Öne çıkan saha işleri"
            description="Farklı saha koşullarında tamamladığımız kazı, taşıma ve düzenleme çalışmalarından seçkiler."
          />
          <Button asChild variant="outline">
            <Link href="/projeler">
              Tüm Projeler
              <ArrowRight />
            </Link>
          </Button>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {projects.map((project, index) => (
            <Reveal key={project.slug} delay={index * 0.05}>
              <Card className="group h-full overflow-hidden hover:border-signal-300 hover:shadow-soft">
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-graphite-950/48 via-transparent to-transparent" />
                </div>
                <CardHeader>
                  <CardDescription className="inline-flex items-center gap-2">
                    <MapPin className="size-4 text-signal-600" />
                    {[project.district, project.location].filter(Boolean).join(" / ")}
                  </CardDescription>
                  <CardTitle>{project.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-6 text-muted-foreground">
                    {project.summary}
                  </p>
                  <Link
                    href="/projeler"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-signal-700 underline-offset-4 hover:underline"
                  >
                    Detayları İncele
                    <ArrowRight className="size-4" />
                  </Link>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
