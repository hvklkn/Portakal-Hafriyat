import "server-only";

import type { SeoSettingsFormValues } from "@/lib/admin-seo-schema";
import { getFallbackSettingsFormValues } from "@/lib/admin-settings";
import { prisma } from "@/lib/prisma";
import { SITE_SETTINGS_ID } from "@/lib/site-settings";

export type AdminSeoData = {
  values: SeoSettingsFormValues;
  hasDatabaseError: boolean;
};

export function getFallbackSeoValues(): SeoSettingsFormValues {
  const fallback = getFallbackSettingsFormValues();

  return {
    seoTitle: fallback.seoTitle,
    seoDescription: fallback.seoDescription,
    companyName: fallback.companyName,
    address: fallback.address,
    phone: fallback.phone,
    whatsapp: fallback.whatsapp,
    googleMapsUrl: fallback.googleMapsUrl,
    instagramUrl: fallback.instagramUrl,
    facebookUrl: fallback.facebookUrl
  };
}

export async function getAdminSeoData(): Promise<AdminSeoData> {
  const fallbackValues = getFallbackSeoValues();

  if (!process.env.DATABASE_URL) {
    return { values: fallbackValues, hasDatabaseError: true };
  }

  try {
    const settings = await prisma.siteSetting.findUnique({
      where: { id: SITE_SETTINGS_ID },
      select: {
        seoTitle: true,
        seoDescription: true,
        companyName: true,
        address: true,
        phone: true,
        whatsapp: true,
        googleMapsUrl: true,
        instagramUrl: true,
        facebookUrl: true
      }
    });

    return {
      values: settings
        ? {
            seoTitle: settings.seoTitle ?? "",
            seoDescription: settings.seoDescription ?? "",
            companyName: settings.companyName,
            address: settings.address,
            phone: settings.phone,
            whatsapp: settings.whatsapp ?? "",
            googleMapsUrl: settings.googleMapsUrl ?? "",
            instagramUrl: settings.instagramUrl ?? "",
            facebookUrl: settings.facebookUrl ?? ""
          }
        : fallbackValues,
      hasDatabaseError: false
    };
  } catch {
    return { values: fallbackValues, hasDatabaseError: true };
  }
}
