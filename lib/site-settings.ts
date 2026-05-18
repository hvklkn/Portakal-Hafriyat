import "server-only";

import { prisma } from "@/lib/prisma";

export const SITE_SETTINGS_ID = "site_settings";

export type SiteSettings = {
  companyName: string;
  slogan: string | null;
  description: string;
  phone: string;
  email: string;
  address: string;
  whatsapp: string | null;
  googleMapsUrl: string | null;
  instagramUrl: string | null;
  facebookUrl: string | null;
  heroTitle: string | null;
  heroSubtitle: string | null;
  heroImageUrl: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  logoUrl: string | null;
};

export const fallbackSiteSettings: SiteSettings = {
  companyName: "Portakal Hafriyat",
  slogan: "Guvenilir hafriyat ve is makinesi cozumleri",
  description:
    "Altyapi, kazi, dolgu, nakliye ve saha hazirligi alanlarinda kurumsal hafriyat cozumleri.",
  phone: "+90 555 000 00 00",
  email: "info@portakalhafriyat.com",
  address: "Adana, Turkiye",
  whatsapp: process.env.NEXT_PUBLIC_COMPANY_WHATSAPP ?? "+905550000000",
  googleMapsUrl: null,
  instagramUrl: null,
  facebookUrl: null,
  heroTitle: "Guvenilir Hafriyat ve Is Makinesi Cozumleri",
  heroSubtitle:
    "Temel kazisi, hafriyat tasima, moloz tasima, dolgu isleri ve arazi duzenleme hizmetlerinde profesyonel cozumler sunuyoruz.",
  heroImageUrl: "/images/hero-excavation.png",
  seoTitle: "Portakal Hafriyat",
  seoDescription:
    "Adana ve cevresinde hafriyat, moloz tasima, dolgu ve is makinesi hizmetleri.",
  logoUrl: null
};

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!process.env.DATABASE_URL) {
    return fallbackSiteSettings;
  }

  try {
    const settings = await prisma.siteSetting.findUnique({
      where: { id: SITE_SETTINGS_ID },
      select: {
        companyName: true,
        slogan: true,
        description: true,
        phone: true,
        email: true,
        address: true,
        whatsapp: true,
        googleMapsUrl: true,
        instagramUrl: true,
        facebookUrl: true,
        heroTitle: true,
        heroSubtitle: true,
        heroImageUrl: true,
        seoTitle: true,
        seoDescription: true,
        logoUrl: true
      }
    });

    return settings ?? fallbackSiteSettings;
  } catch {
    return fallbackSiteSettings;
  }
}
