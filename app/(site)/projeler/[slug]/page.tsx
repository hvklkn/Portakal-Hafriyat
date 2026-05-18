import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";

import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/sections/page-hero";
import { ProjectCard } from "@/components/sections/project-card";
import { QuoteCTA } from "@/components/sections/quote-cta";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  getPublicProjectBySlug,
  getSimilarProjects
} from "@/lib/public-content";
import { getSiteSettings } from "@/lib/site-settings";

type ProjectDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { project } = await getPublicProjectBySlug(slug);

  if (!project) {
    return {
      title: "Proje bulunamadı"
    };
  }

  return {
    title: project.title,
    description: project.summary
  };
}

export default async function ProjectDetailPage({
  params
}: ProjectDetailPageProps) {
  const { slug } = await params;
  const [{ project, galleryImages }, similarProjects, settings] =
    await Promise.all([
      getPublicProjectBySlug(slug),
      getSimilarProjects(slug),
      getSiteSettings()
    ]);

  if (!project) {
    notFound();
  }

  return (
    <>
      <PageHero
        eyebrow="Proje Detayı"
        title={project.title}
        description={project.summary}
        breadcrumbs={[
          { label: "Ana Sayfa", href: "/" },
          { label: "Projeler", href: "/projeler" },
          { label: project.title }
        ]}
      />

      <section className="py-16 sm:py-20">
        <Container className="grid gap-8">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border border-border bg-background p-5 shadow-line">
              <MapPin className="size-5 text-signal-600" />
              <p className="mt-3 text-sm font-semibold text-muted-foreground">
                Lokasyon
              </p>
              <p className="mt-1 font-black">
                {[project.district, project.location].filter(Boolean).join(" / ")}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-background p-5 shadow-line">
              <CalendarDays className="size-5 text-signal-600" />
              <p className="mt-3 text-sm font-semibold text-muted-foreground">
                Tarih
              </p>
              <p className="mt-1 font-black">{project.year ?? "Belirtilmedi"}</p>
            </div>
            <div className="rounded-lg border border-border bg-background p-5 shadow-line">
              <p className="text-sm font-semibold text-muted-foreground">
                Durum
              </p>
              <StatusBadge status={project.status} className="mt-3" />
            </div>
          </div>

          <div className="relative aspect-[16/9] overflow-hidden rounded-lg border border-border bg-muted shadow-soft">
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>

          <article className="rounded-lg border border-border bg-background p-6 shadow-line">
            <h2 className="text-2xl font-black tracking-normal">
              Proje açıklaması
            </h2>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              {project.description ?? project.summary}
            </p>
          </article>

          {galleryImages.length > 0 ? (
            <section>
              <h2 className="text-2xl font-black tracking-normal">
                Proje galerisi
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {galleryImages.map((image, index) => (
                  <div
                    key={`${image.title}-${index}`}
                    className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border bg-muted"
                  >
                    <Image
                      src={image.imageUrl}
                      alt={image.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {similarProjects.length > 0 ? (
            <section>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm font-bold uppercase tracking-normal text-signal-700">
                    Diğer işler
                  </p>
                  <h2 className="mt-2 text-2xl font-black tracking-normal">
                    Benzer projeler
                  </h2>
                </div>
                <Button asChild variant="outline">
                  <Link href="/projeler">
                    Tüm Projeler
                    <ArrowRight />
                  </Link>
                </Button>
              </div>
              <div className="mt-6 grid gap-5 md:grid-cols-3">
                {similarProjects.map((item) => (
                  <ProjectCard key={item.slug} project={item} />
                ))}
              </div>
            </section>
          ) : null}
        </Container>
      </section>

      <QuoteCTA settings={settings} />
    </>
  );
}
