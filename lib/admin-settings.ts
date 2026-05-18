import "server-only";

import type { SiteSettingsFormValues } from "@/lib/admin-settings-schema";
import { prisma } from "@/lib/prisma";
import { fallbackSiteSettings, SITE_SETTINGS_ID } from "@/lib/site-settings";

export type AdminSettingsData = {
  values: SiteSettingsFormValues;
  hasDatabaseError: boolean;
};

export function getFallbackSettingsFormValues(): SiteSettingsFormValues {
  return {
    companyName: fallbackSiteSettings.companyName,
    slogan: fallbackSiteSettings.slogan ?? "",
    description: fallbackSiteSettings.description,
    phone: fallbackSiteSettings.phone,
    whatsapp: fallbackSiteSettings.whatsapp ?? "",
    email: fallbackSiteSettings.email,
    address: fallbackSiteSettings.address,
    googleMapsUrl: fallbackSiteSettings.googleMapsUrl ?? "",
    instagramUrl: fallbackSiteSettings.instagramUrl ?? "",
    facebookUrl: fallbackSiteSettings.facebookUrl ?? "",
    heroTitle: fallbackSiteSettings.heroTitle ?? "",
    heroSubtitle: fallbackSiteSettings.heroSubtitle ?? "",
    heroImageUrl: fallbackSiteSettings.heroImageUrl ?? "",
    seoTitle: fallbackSiteSettings.seoTitle ?? "",
    seoDescription: fallbackSiteSettings.seoDescription ?? ""
  };
}

export async function getAdminSettingsData(): Promise<AdminSettingsData> {
  const fallbackValues = getFallbackSettingsFormValues();

  if (!process.env.DATABASE_URL) {
    return {
      values: fallbackValues,
      hasDatabaseError: true
    };
  }

  try {
    const settings = await prisma.siteSetting.findUnique({
      where: { id: SITE_SETTINGS_ID },
      select: {
        companyName: true,
        slogan: true,
        description: true,
        phone: true,
        whatsapp: true,
        email: true,
        address: true,
        googleMapsUrl: true,
        instagramUrl: true,
        facebookUrl: true,
        heroTitle: true,
        heroSubtitle: true,
        heroImageUrl: true,
        seoTitle: true,
        seoDescription: true
      }
    });

    if (!settings) {
      return {
        values: fallbackValues,
        hasDatabaseError: false
      };
    }

    return {
      values: {
        companyName: settings.companyName,
        slogan: settings.slogan ?? "",
        description: settings.description,
        phone: settings.phone,
        whatsapp: settings.whatsapp ?? "",
        email: settings.email,
        address: settings.address,
        googleMapsUrl: settings.googleMapsUrl ?? "",
        instagramUrl: settings.instagramUrl ?? "",
        facebookUrl: settings.facebookUrl ?? "",
        heroTitle: settings.heroTitle ?? fallbackValues.heroTitle,
        heroSubtitle: settings.heroSubtitle ?? fallbackValues.heroSubtitle,
        heroImageUrl: settings.heroImageUrl ?? fallbackValues.heroImageUrl,
        seoTitle: settings.seoTitle ?? "",
        seoDescription: settings.seoDescription ?? ""
      },
      hasDatabaseError: false
    };
  } catch {
    return {
      values: fallbackValues,
      hasDatabaseError: true
    };
  }
}
