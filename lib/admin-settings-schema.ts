import { z } from "zod";

const optionalText = (maxLength: number) =>
  z
    .string()
    .trim()
    .max(maxLength, `En fazla ${maxLength} karakter olabilir.`)
    .optional()
    .or(z.literal(""));

const optionalUrl = z
  .string()
  .trim()
  .max(500, "En fazla 500 karakter olabilir.")
  .refine(
    (value) =>
      !value ||
      value.startsWith("/") ||
      value.startsWith("https://") ||
      value.startsWith("http://"),
    "Gecerli bir URL veya / ile baslayan yerel path girin."
  )
  .optional()
  .or(z.literal(""));

export const siteSettingsFormSchema = z.object({
  companyName: z
    .string()
    .trim()
    .min(2, "Firma adi en az 2 karakter olmali.")
    .max(120, "Firma adi en fazla 120 karakter olabilir."),
  slogan: optionalText(160),
  description: z
    .string()
    .trim()
    .min(10, "Aciklama en az 10 karakter olmali.")
    .max(700, "Aciklama en fazla 700 karakter olabilir."),
  phone: z
    .string()
    .trim()
    .min(5, "Telefon en az 5 karakter olmali.")
    .max(40, "Telefon en fazla 40 karakter olabilir."),
  whatsapp: optionalText(40),
  email: z
    .string()
    .trim()
    .email("Gecerli bir e-posta adresi girin.")
    .max(160, "E-posta en fazla 160 karakter olabilir."),
  address: z
    .string()
    .trim()
    .min(5, "Adres en az 5 karakter olmali.")
    .max(500, "Adres en fazla 500 karakter olabilir."),
  googleMapsUrl: optionalUrl,
  instagramUrl: optionalUrl,
  facebookUrl: optionalUrl,
  heroTitle: z
    .string()
    .trim()
    .min(5, "Hero basligi en az 5 karakter olmali.")
    .max(120, "Hero basligi en fazla 120 karakter olabilir."),
  heroSubtitle: z
    .string()
    .trim()
    .min(10, "Hero aciklamasi en az 10 karakter olmali.")
    .max(360, "Hero aciklamasi en fazla 360 karakter olabilir."),
  heroImageUrl: optionalUrl,
  seoTitle: optionalText(70),
  seoDescription: optionalText(170)
});

export type SiteSettingsFormValues = z.infer<typeof siteSettingsFormSchema>;

export function normalizeOptionalValue(value?: string | null) {
  const normalized = value?.trim();

  return normalized ? normalized : null;
}
