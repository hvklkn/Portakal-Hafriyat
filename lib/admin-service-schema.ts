import { z } from "zod";

export const serviceFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, "Hizmet adi en az 2 karakter olmali.")
    .max(140, "Hizmet adi en fazla 140 karakter olabilir."),
  slug: z
    .string()
    .trim()
    .min(2, "Slug en az 2 karakter olmali.")
    .max(160, "Slug en fazla 160 karakter olabilir.")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug sadece kucuk harf, rakam ve tire icerebilir."
    ),
  shortDescription: z
    .string()
    .trim()
    .min(10, "Kisa aciklama en az 10 karakter olmali.")
    .max(260, "Kisa aciklama en fazla 260 karakter olabilir."),
  description: z
    .string()
    .trim()
    .min(20, "Detay aciklama en az 20 karakter olmali.")
    .max(3000, "Detay aciklama en fazla 3000 karakter olabilir."),
  imageUrl: z
    .string()
    .trim()
    .max(500, "Gorsel URL en fazla 500 karakter olabilir.")
    .refine(
      (value) =>
        !value ||
        value.startsWith("/") ||
        value.startsWith("https://") ||
        value.startsWith("http://"),
      "Gecerli bir URL veya / ile baslayan yerel path girin."
    )
    .optional()
    .or(z.literal("")),
  iconName: z
    .string()
    .trim()
    .max(80, "Ikon adi en fazla 80 karakter olabilir.")
    .optional()
    .or(z.literal("")),
  isActive: z.boolean(),
  displayOrder: z.coerce
    .number({
      invalid_type_error: "Sira sayisal olmalı."
    })
    .int("Sira tam sayi olmali.")
    .min(0, "Sira 0 veya daha buyuk olmali.")
    .max(9999, "Sira en fazla 9999 olabilir.")
});

export type ServiceFormValues = z.infer<typeof serviceFormSchema>;

export function createSlug(value: string) {
  return value
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replaceAll("ı", "i")
    .replaceAll("ğ", "g")
    .replaceAll("ü", "u")
    .replaceAll("ş", "s")
    .replaceAll("ö", "o")
    .replaceAll("ç", "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

export function normalizeOptionalString(value?: string | null) {
  const normalized = value?.trim();

  return normalized ? normalized : null;
}
