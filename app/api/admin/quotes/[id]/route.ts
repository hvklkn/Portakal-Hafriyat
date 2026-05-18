import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

import { quoteStatusUpdateSchema } from "@/lib/admin-quote-message-schema";
import { hasAdminSession } from "@/lib/admin-session";
import { prisma } from "@/lib/prisma";

type QuoteRouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, context: QuoteRouteContext) {
  const isAuthorized = await hasAdminSession();

  if (!isAuthorized) {
    return unauthorizedResponse();
  }

  if (!process.env.DATABASE_URL) {
    return databaseUnavailableResponse();
  }

  const { id } = await context.params;
  const body = await request.json().catch(() => null);
  const parsed = quoteStatusUpdateSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { message: "Durum bilgisi hatali." },
      { status: 422 }
    );
  }

  try {
    await prisma.quoteRequest.update({
      where: { id },
      data: { status: parsed.data.status }
    });

    return NextResponse.json({ message: "Talep durumu guncellendi." });
  } catch (error) {
    if (isRecordNotFound(error)) {
      return NextResponse.json(
        { message: "Guncellenecek talep bulunamadi." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Talep durumu guncellenemedi." },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: Request, context: QuoteRouteContext) {
  const isAuthorized = await hasAdminSession();

  if (!isAuthorized) {
    return unauthorizedResponse();
  }

  if (!process.env.DATABASE_URL) {
    return databaseUnavailableResponse();
  }

  const { id } = await context.params;

  try {
    await prisma.quoteRequest.delete({ where: { id } });

    return NextResponse.json({ message: "Talep basariyla silindi." });
  } catch (error) {
    if (isRecordNotFound(error)) {
      return NextResponse.json(
        { message: "Silinecek talep bulunamadi." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Talep silinemedi. Lutfen tekrar deneyin." },
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
