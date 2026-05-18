import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { GalleryGrid } from "@/components/sections/gallery-grid";
import { PageHero } from "@/components/sections/page-hero";
import { EmptyState } from "@/components/ui/empty-state";
import { getPublicGalleryImages } from "@/lib/public-content";
import { createPageMetadata } from "@/lib/seo";
import { getSiteSettings } from "@/lib/site-settings";

const pageDescription =
  "Tamamlanan işler, makine parkı ve saha çalışmalarından görüntüler.";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  return createPageMetadata({
    settings,
    title: "Saha Galerisi",
    description: pageDescription,
    path: "/galeri"
  });
}

export default async function GalleryPage() {
  const images = await getPublicGalleryImages();

  return (
    <>
      <PageHero
        eyebrow="Galeri"
        title="Saha Galerisi"
        description={pageDescription}
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
