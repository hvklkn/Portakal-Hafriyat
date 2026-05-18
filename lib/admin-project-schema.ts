import { z } from "zod";

import { createSlug } from "@/lib/admin-service-schema";

export const projectStatuses = ["PLANNED", "IN_PROGRESS", "COMPLETED"] as const;

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

export const projectFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, "Proje adi en az 2 karakter olmali.")
    .max(160, "Proje adi en fazla 160 karakter olabilir."),
  slug: z
    .string()
    .trim()
    .min(2, "Slug en az 2 karakter olmali.")
    .max(180, "Slug en fazla 180 karakter olabilir.")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug sadece kucuk harf, rakam ve tire icerebilir."
    ),
  location: optionalText(180),
  description: z
    .string()
    .trim()
    .min(20, "Aciklama en az 20 karakter olmali.")
    .max(3000, "Aciklama en fazla 3000 karakter olabilir."),
  date: optionalText(40),
  coverImageUrl: optionalUrl,
  status: z.enum(projectStatuses),
  isFeatured: z.boolean()
});

export type ProjectFormValues = z.infer<typeof projectFormSchema>;
export type ProjectStatusValue = (typeof projectStatuses)[number];

export function createProjectSlug(value: string) {
  return createSlug(value);
}

export function normalizeOptionalProjectValue(value?: string | null) {
  const normalized = value?.trim();

  return normalized ? normalized : null;
}

export function createProjectSummary(description: string) {
  const normalized = description.trim().replace(/\s+/g, " ");

  return normalized.length > 180
    ? `${normalized.slice(0, 177).trim()}...`
    : normalized;
}
