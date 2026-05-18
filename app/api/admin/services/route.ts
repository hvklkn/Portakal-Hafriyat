import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

import {
  normalizeOptionalString,
  serviceFormSchema
} from "@/lib/admin-service-schema";
import { hasAdminSession } from "@/lib/admin-session";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
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
  const parsed = serviceFormSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { message: "Form alanlarini kontrol edin." },
      { status: 422 }
    );
  }

  const values = parsed.data;

  try {
    const service = await prisma.service.create({
      data: {
        title: values.title,
        slug: values.slug,
        summary: values.shortDescription,
        description: values.description,
        imageUrl: normalizeOptionalString(values.imageUrl),
        icon: normalizeOptionalString(values.iconName),
        isPublished: values.isActive,
        sortOrder: values.displayOrder
      },
      select: { id: true }
    });

    return NextResponse.json(
      {
        id: service.id,
        message: "Hizmet basariyla olusturuldu."
      },
      { status: 201 }
    );
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        { message: "Bu slug ile kayitli bir hizmet zaten var." },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { message: "Hizmet olusturulamadi. Lutfen tekrar deneyin." },
      { status: 500 }
    );
  }
}
