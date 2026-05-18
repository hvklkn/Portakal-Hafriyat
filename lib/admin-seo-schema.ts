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

export const seoSettingsFormSchema = z.object({
  seoTitle: optionalText(70),
  seoDescription: optionalText(170),
  companyName: z
    .string()
    .trim()
    .min(2, "Firma adi en az 2 karakter olmali.")
    .max(120, "Firma adi en fazla 120 karakter olabilir."),
  address: z
    .string()
    .trim()
    .min(5, "Adres en az 5 karakter olmali.")
    .max(500, "Adres en fazla 500 karakter olabilir."),
  phone: z
    .string()
    .trim()
    .min(5, "Telefon en az 5 karakter olmali.")
    .max(40, "Telefon en fazla 40 karakter olabilir."),
  whatsapp: optionalText(40),
  googleMapsUrl: optionalUrl,
  instagramUrl: optionalUrl,
  facebookUrl: optionalUrl
});

export type SeoSettingsFormValues = z.infer<typeof seoSettingsFormSchema>;

export function normalizeSeoOptionalValue(value?: string | null) {
  const normalized = value?.trim();

  return normalized ? normalized : null;
}
