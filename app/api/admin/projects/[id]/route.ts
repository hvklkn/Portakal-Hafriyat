import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

import {
  createProjectSummary,
  normalizeOptionalProjectValue,
  projectFormSchema
} from "@/lib/admin-project-schema";
import { hasAdminSession } from "@/lib/admin-session";
import { prisma } from "@/lib/prisma";

type ProjectRouteContext = {
  params: Promise<{ id: string }>;
};

export async function PUT(request: Request, context: ProjectRouteContext) {
  const isAuthorized = await hasAdminSession();

  if (!isAuthorized) {
    return unauthorizedResponse();
  }

  if (!process.env.DATABASE_URL) {
    return databaseUnavailableResponse();
  }

  const { id } = await context.params;
  const body = await request.json().catch(() => null);
  const parsed = projectFormSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { message: "Form alanlarini kontrol edin." },
      { status: 422 }
    );
  }

  const values = parsed.data;

  try {
    await prisma.project.update({
      where: { id },
      data: {
        title: values.title,
        slug: values.slug,
        location: normalizeOptionalProjectValue(values.location),
        year: normalizeOptionalProjectValue(values.date),
        summary: createProjectSummary(values.description),
        description: values.description,
        imageUrl: normalizeOptionalProjectValue(values.coverImageUrl),
        status: values.status,
        isFeatured: values.isFeatured
      }
    });

    return NextResponse.json({ message: "Proje basariyla guncellendi." });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        { message: "Bu slug ile kayitli baska bir proje var." },
        { status: 409 }
      );
    }

    if (isRecordNotFound(error)) {
      return NextResponse.json(
        { message: "Guncellenecek proje bulunamadi." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Proje guncellenemedi. Lutfen tekrar deneyin." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request, context: ProjectRouteContext) {
  const isAuthorized = await hasAdminSession();

  if (!isAuthorized) {
    return unauthorizedResponse();
  }

  if (!process.env.DATABASE_URL) {
    return databaseUnavailableResponse();
  }

  const { id } = await context.params;
  const body = (await request.json().catch(() => null)) as {
    isFeatured?: unknown;
  } | null;

  if (typeof body?.isFeatured !== "boolean") {
    return NextResponse.json(
      { message: "One cikan bilgisi hatali." },
      { status: 422 }
    );
  }

  try {
    await prisma.project.update({
      where: { id },
      data: { isFeatured: body.isFeatured }
    });

    return NextResponse.json({
      message: body.isFeatured
        ? "Proje one cikanlara eklendi."
        : "Proje one cikanlardan kaldirildi."
    });
  } catch (error) {
    if (isRecordNotFound(error)) {
      return NextResponse.json(
        { message: "Durumu degistirilecek proje bulunamadi." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Proje durumu degistirilemedi." },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: Request, context: ProjectRouteContext) {
  const isAuthorized = await hasAdminSession();

  if (!isAuthorized) {
    return unauthorizedResponse();
  }

  if (!process.env.DATABASE_URL) {
    return databaseUnavailableResponse();
  }

  const { id } = await context.params;

  try {
    await prisma.project.delete({ where: { id } });

    return NextResponse.json({ message: "Proje basariyla silindi." });
  } catch (error) {
    if (isRecordNotFound(error)) {
      return NextResponse.json(
        { message: "Silinecek proje bulunamadi." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Proje silinemedi. Lutfen tekrar deneyin." },
      { status: 500 }
    );
  }
}

function isRecordNotFound(error: unknown) {
  return (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2025"
  );
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
