import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/sections/page-hero";
import { ProjectCard } from "@/components/sections/project-card";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { getPublicProjects } from "@/lib/public-content";

export const metadata: Metadata = {
  title: "Tamamlanan İşler"
};

export default async function ProjectsPage() {
  const projects = await getPublicProjects();

  return (
    <>
      <PageHero
        eyebrow="Projeler"
        title="Tamamlanan İşler"
        description="Sahada tamamladığımız hafriyat, moloz taşıma ve arazi düzenleme çalışmalarından örnekler."
        breadcrumbs={[
          { label: "Ana Sayfa", href: "/" },
          { label: "Projeler" }
        ]}
      />

      <section className="py-16 sm:py-20">
        <Container>
          {projects.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="Henüz proje bulunmuyor"
              description="Proje kayıtları eklendiğinde bu alanda listelenecek."
            />
          )}
        </Container>
      </section>

      <section className="border-y border-border bg-muted py-16">
        <Container className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-normal text-signal-700">
              Teklif
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-normal">
              Sizin işiniz için de teklif alalım
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
              Konumu, işi ve zamanlamayı paylaşın; sahaya uygun planı hızlıca
              çıkaralım.
            </p>
          </div>
          <Button asChild size="lg">
            <Link href="/teklif-al">
              Teklif Al
              <ArrowRight />
            </Link>
          </Button>
        </Container>
      </section>
    </>
  );
}
