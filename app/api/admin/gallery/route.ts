import { NextResponse } from "next/server";

import {
  createGallerySlug,
  galleryImageFormSchema,
  normalizeGalleryProjectId
} from "@/lib/admin-gallery-schema";
import { hasAdminSession } from "@/lib/admin-session";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const isAuthorized = await hasAdminSession();

  if (!isAuthorized) {
    return unauthorizedResponse();
  }

  if (!process.env.DATABASE_URL) {
    return databaseUnavailableResponse();
  }

  const body = await request.json().catch(() => null);
  const parsed = galleryImageFormSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { message: "Form alanlarini kontrol edin." },
      { status: 422 }
    );
  }

  const values = parsed.data;

  try {
    await prisma.galleryImage.create({
      data: {
        title: values.title,
        slug: createGallerySlug(values.title),
        imageUrl: values.imageUrl,
        alt: values.category,
        projectId: normalizeGalleryProjectId(values.projectId),
        provider: "local"
      }
    });

    return NextResponse.json(
      { message: "Gorsel basariyla eklendi." },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { message: "Gorsel eklenemedi. Lutfen tekrar deneyin." },
      { status: 500 }
    );
  }
}

function unauthorizedResponse() {
  return NextResponse.json(
    { message: "Bu islem icin admin oturumu gerekli." },
    { status: 401 }
  );
}

function databaseUnavailableResponse() {
  return NextResponse.json(
    { message: "Veritabani baglantisi bulunamadi." },
    { status: 503 }
  );
}
