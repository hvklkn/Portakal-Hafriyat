"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import type { PublicGalleryImage } from "@/lib/public-content";
import { cn } from "@/lib/utils";

const categories = [
  "Tümü",
  "Temel Kazısı",
  "Hafriyat Taşıma",
  "Moloz Taşıma",
  "Dolgu İşleri",
  "Arazi Düzenleme",
  "İş Makineleri"
];

export function GalleryGrid({ images }: { images: PublicGalleryImage[] }) {
  const [activeCategory, setActiveCategory] = useState("Tümü");
  const filteredImages = useMemo(
    () =>
      activeCategory === "Tümü"
        ? images
        : images.filter((image) => image.category === activeCategory),
    [activeCategory, images]
  );

  return (
    <div className="grid gap-8">
      <div className="flex gap-2 overflow-x-auto pb-1">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={cn(
              "focus-ring shrink-0 rounded-full border px-4 py-2 text-sm font-bold transition-colors",
              activeCategory === category
                ? "border-primary bg-primary text-graphite-950"
                : "border-border bg-background text-muted-foreground hover:border-signal-300 hover:text-foreground"
            )}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredImages.map((image, index) => (
          <figure
            key={`${image.title}-${index}`}
            className="group relative overflow-hidden rounded-lg border border-border bg-muted shadow-line"
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
            <figcaption className="absolute inset-x-0 bottom-0 translate-y-3 bg-gradient-to-t from-graphite-950/92 to-transparent p-4 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
              <p className="text-sm font-black text-white">{image.title}</p>
              <p className="mt-1 text-xs font-semibold text-primary">
                {image.category}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
