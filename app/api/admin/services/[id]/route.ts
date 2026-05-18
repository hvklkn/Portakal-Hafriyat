import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

import {
  normalizeOptionalString,
  serviceFormSchema
} from "@/lib/admin-service-schema";
import { hasAdminSession } from "@/lib/admin-session";
import { prisma } from "@/lib/prisma";

type ServiceRouteContext = {
  params: Promise<{ id: string }>;
};

export async function PUT(request: Request, context: ServiceRouteContext) {
  const isAuthorized = await hasAdminSession();

  if (!isAuthorized) {
    return unauthorizedResponse();
  }

  if (!process.env.DATABASE_URL) {
    return databaseUnavailableResponse();
  }

  const { id } = await context.params;
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
    await prisma.service.update({
      where: { id },
      data: {
        title: values.title,
        slug: values.slug,
        summary: values.shortDescription,
        description: values.description,
        imageUrl: normalizeOptionalString(values.imageUrl),
        icon: normalizeOptionalString(values.iconName),
        isPublished: values.isActive,
        sortOrder: values.displayOrder
      }
    });

    return NextResponse.json({
      message: "Hizmet basariyla guncellendi."
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        { message: "Bu slug ile kayitli baska bir hizmet var." },
        { status: 409 }
      );
    }

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json(
        { message: "Guncellenecek hizmet bulunamadi." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Hizmet guncellenemedi. Lutfen tekrar deneyin." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request, context: ServiceRouteContext) {
  const isAuthorized = await hasAdminSession();

  if (!isAuthorized) {
    return unauthorizedResponse();
  }

  if (!process.env.DATABASE_URL) {
    return databaseUnavailableResponse();
  }

  const { id } = await context.params;
  const body = (await request.json().catch(() => null)) as {
    isActive?: unknown;
  } | null;

  if (typeof body?.isActive !== "boolean") {
    return NextResponse.json(
      { message: "Durum bilgisi hatali." },
      { status: 422 }
    );
  }

  try {
    await prisma.service.update({
      where: { id },
      data: { isPublished: body.isActive }
    });

    return NextResponse.json({
      message: body.isActive
        ? "Hizmet aktif hale getirildi."
        : "Hizmet pasif hale getirildi."
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json(
        { message: "Durumu degistirilecek hizmet bulunamadi." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Hizmet durumu degistirilemedi." },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: Request, context: ServiceRouteContext) {
  const isAuthorized = await hasAdminSession();

  if (!isAuthorized) {
    return unauthorizedResponse();
  }

  if (!process.env.DATABASE_URL) {
    return databaseUnavailableResponse();
  }

  const { id } = await context.params;

  try {
    await prisma.service.delete({
      where: { id }
    });

    return NextResponse.json({
      message: "Hizmet basariyla silindi."
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json(
        { message: "Silinecek hizmet bulunamadi." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Hizmet silinemedi. Lutfen tekrar deneyin." },
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
