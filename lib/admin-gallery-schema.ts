import { z } from "zod";

import { createSlug } from "@/lib/admin-service-schema";

export const galleryCategories = [
  "Temel Kazısı",
  "Hafriyat Taşıma",
  "Moloz Taşıma",
  "Dolgu İşleri",
  "Arazi Düzenleme",
  "İş Makineleri"
] as const;

export const galleryImageFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, "Gorsel basligi en az 2 karakter olmali.")
    .max(140, "Gorsel basligi en fazla 140 karakter olabilir."),
  imageUrl: z
    .string()
    .trim()
    .min(1, "Gorsel URL zorunlu.")
    .max(500, "Gorsel URL en fazla 500 karakter olabilir.")
    .refine(
      (value) =>
        value.startsWith("/") ||
        value.startsWith("https://") ||
        value.startsWith("http://"),
      "Gecerli bir URL veya / ile baslayan yerel path girin."
    ),
  category: z.enum(galleryCategories),
  projectId: z.string().optional().or(z.literal(""))
});

export type GalleryImageFormValues = z.infer<typeof galleryImageFormSchema>;

export function createGallerySlug(title: string) {
  return `${createSlug(title)}-${Date.now().toString(36)}`;
}

export function normalizeGalleryProjectId(value?: string | null) {
  const normalized = value?.trim();

  return normalized ? normalized : null;
}
