import { NextResponse } from "next/server";

import {
  normalizeOptionalValue,
  siteSettingsFormSchema
} from "@/lib/admin-settings-schema";
import { hasAdminSession } from "@/lib/admin-session";
import { prisma } from "@/lib/prisma";
import { SITE_SETTINGS_ID } from "@/lib/site-settings";

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
  const parsed = siteSettingsFormSchema.safeParse(body);

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
        companyName: values.companyName,
        slogan: normalizeOptionalValue(values.slogan),
        description: values.description,
        phone: values.phone,
        whatsapp: normalizeOptionalValue(values.whatsapp),
        email: values.email,
        address: values.address,
        googleMapsUrl: normalizeOptionalValue(values.googleMapsUrl),
        instagramUrl: normalizeOptionalValue(values.instagramUrl),
        facebookUrl: normalizeOptionalValue(values.facebookUrl),
        heroTitle: values.heroTitle,
        heroSubtitle: values.heroSubtitle,
        heroImageUrl: normalizeOptionalValue(values.heroImageUrl),
        seoTitle: normalizeOptionalValue(values.seoTitle),
        seoDescription: normalizeOptionalValue(values.seoDescription)
      },
      create: {
        id: SITE_SETTINGS_ID,
        singletonKey: 1,
        companyName: values.companyName,
        slogan: normalizeOptionalValue(values.slogan),
        description: values.description,
        phone: values.phone,
        whatsapp: normalizeOptionalValue(values.whatsapp),
        email: values.email,
        address: values.address,
        googleMapsUrl: normalizeOptionalValue(values.googleMapsUrl),
        instagramUrl: normalizeOptionalValue(values.instagramUrl),
        facebookUrl: normalizeOptionalValue(values.facebookUrl),
        heroTitle: values.heroTitle,
        heroSubtitle: values.heroSubtitle,
        heroImageUrl: normalizeOptionalValue(values.heroImageUrl),
        seoTitle: normalizeOptionalValue(values.seoTitle),
        seoDescription: normalizeOptionalValue(values.seoDescription),
        logoUrl: null
      }
    });

    return NextResponse.json({
      message: "Site ayarlari basariyla kaydedildi."
    });
  } catch {
    return NextResponse.json(
      { message: "Site ayarlari kaydedilemedi. Lutfen tekrar deneyin." },
      { status: 500 }
    );
  }
}
