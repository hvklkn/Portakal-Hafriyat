import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/sections/section-header";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import type { HomeGalleryImage } from "@/lib/home-content";

export function GalleryPreview({
  images
}: {
  images: HomeGalleryImage[];
}) {
  return (
    <section className="bg-background py-16 sm:py-20">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow="Galeri"
            title="Sahadan kısa bir görünüm"
            description="Makine, ekip ve operasyon akışını gösteren sade bir galeri ön izlemesi."
          />
          <Button asChild variant="outline">
            <Link href="/galeri">
              Galeriye Git
              <ArrowRight />
            </Link>
          </Button>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image, index) => (
            <Reveal key={`${image.title}-${index}`} delay={index * 0.035}>
              <Link
                href="/galeri"
                className="group relative block overflow-hidden rounded-lg border border-border bg-muted shadow-line"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={image.imageUrl}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 translate-y-3 bg-gradient-to-t from-graphite-950/88 to-transparent p-4 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="text-sm font-bold text-white">{image.title}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
