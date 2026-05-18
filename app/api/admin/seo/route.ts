import { NextResponse } from "next/server";

import {
  normalizeSeoOptionalValue,
  seoSettingsFormSchema
} from "@/lib/admin-seo-schema";
import { hasAdminSession } from "@/lib/admin-session";
import { prisma } from "@/lib/prisma";
import { fallbackSiteSettings, SITE_SETTINGS_ID } from "@/lib/site-settings";

export async function PUT(request: Request) {
  const isAuthorized = await hasAdminSession();

  if (!isAuthorized) {
    return NextResponse.json(
      { message: "Bu islem icin admin oturumu gerekli." },
      { status: 401 }
    );
  }

  if (!process.env.DATABASE_URL) {
    return NextResponse.json(
      { message: "Veritabani baglantisi bulunamadi." },
      { status: 503 }
    );
  }

  const body = await request.json().catch(() => null);
  const parsed = seoSettingsFormSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { message: "Form alanlarini kontrol edin." },
      { status: 422 }
    );
  }

  const values = parsed.data;

  try {
    await prisma.siteSetting.upsert({
      where: { id: SITE_SETTINGS_ID },
      update: {
        seoTitle: normalizeSeoOptionalValue(values.seoTitle),
        seoDescription: normalizeSeoOptionalValue(values.seoDescription),
        companyName: values.companyName,
        address: values.address,
        phone: values.phone,
        whatsapp: normalizeSeoOptionalValue(values.whatsapp),
        googleMapsUrl: normalizeSeoOptionalValue(values.googleMapsUrl),
        instagramUrl: normalizeSeoOptionalValue(values.instagramUrl),
        facebookUrl: normalizeSeoOptionalValue(values.facebookUrl)
      },
      create: {
        id: SITE_SETTINGS_ID,
        singletonKey: 1,
        companyName: values.companyName,
        description: fallbackSiteSettings.description,
        phone: values.phone,
        email: fallbackSiteSettings.email,
        address: values.address,
        whatsapp: normalizeSeoOptionalValue(values.whatsapp),
        googleMapsUrl: normalizeSeoOptionalValue(values.googleMapsUrl),
        instagramUrl: normalizeSeoOptionalValue(values.instagramUrl),
        facebookUrl: normalizeSeoOptionalValue(values.facebookUrl),
        heroTitle: fallbackSiteSettings.heroTitle,
        heroSubtitle: fallbackSiteSettings.heroSubtitle,
        heroImageUrl: fallbackSiteSettings.heroImageUrl,
        seoTitle: normalizeSeoOptionalValue(values.seoTitle),
        seoDescription: normalizeSeoOptionalValue(values.seoDescription)
      }
    });

    return NextResponse.json({ message: "SEO ayarlari kaydedildi." });
  } catch {
    return NextResponse.json(
      { message: "SEO ayarlari kaydedilemedi. Lutfen tekrar deneyin." },
      { status: 500 }
    );
  }
}
