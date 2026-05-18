import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { GalleryGrid } from "@/components/sections/gallery-grid";
import { PageHero } from "@/components/sections/page-hero";
import { EmptyState } from "@/components/ui/empty-state";
import { getPublicGalleryImages } from "@/lib/public-content";

export const metadata: Metadata = {
  title: "Saha Galerisi"
};

export default async function GalleryPage() {
  const images = await getPublicGalleryImages();

  return (
    <>
      <PageHero
        eyebrow="Galeri"
        title="Saha Galerisi"
        description="Tamamlanan işler, makine parkı ve saha çalışmalarından görüntüler."
        breadcrumbs={[
          { label: "Ana Sayfa", href: "/" },
          { label: "Galeri" }
        ]}
      />

      <section className="py-16 sm:py-20">
        <Container>
          {images.length > 0 ? (
            <GalleryGrid images={images} />
          ) : (
            <EmptyState
              title="Henüz galeri görseli yok"
              description="Galeri kayıtları eklendiğinde bu alanda listelenecek."
            />
          )}
        </Container>
      </section>
    </>
  );
}
