import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

import {
  createProjectSummary,
  normalizeOptionalProjectValue,
  projectFormSchema
} from "@/lib/admin-project-schema";
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
  const parsed = projectFormSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { message: "Form alanlarini kontrol edin." },
      { status: 422 }
    );
  }

  const values = parsed.data;

  try {
    const project = await prisma.project.create({
      data: {
        title: values.title,
        slug: values.slug,
        location: normalizeOptionalProjectValue(values.location),
        year: normalizeOptionalProjectValue(values.date),
        summary: createProjectSummary(values.description),
        description: values.description,
        imageUrl: normalizeOptionalProjectValue(values.coverImageUrl),
        status: values.status,
        isFeatured: values.isFeatured,
        isPublished: true
      },
      select: { id: true }
    });

    return NextResponse.json(
      { id: project.id, message: "Proje basariyla olusturuldu." },
      { status: 201 }
    );
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        { message: "Bu slug ile kayitli bir proje zaten var." },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { message: "Proje olusturulamadi. Lutfen tekrar deneyin." },
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
