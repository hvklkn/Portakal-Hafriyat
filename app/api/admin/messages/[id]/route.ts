import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

import { messageReadUpdateSchema } from "@/lib/admin-quote-message-schema";
import { hasAdminSession } from "@/lib/admin-session";
import { prisma } from "@/lib/prisma";

type MessageRouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, context: MessageRouteContext) {
  const isAuthorized = await hasAdminSession();

  if (!isAuthorized) {
    return unauthorizedResponse();
  }

  if (!process.env.DATABASE_URL) {
    return databaseUnavailableResponse();
  }

  const { id } = await context.params;
  const body = await request.json().catch(() => null);
  const parsed = messageReadUpdateSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { message: "Okunma bilgisi hatali." },
      { status: 422 }
    );
  }

  try {
    await prisma.contactMessage.update({
      where: { id },
      data: {
        isRead: parsed.data.isRead,
        readAt: parsed.data.isRead ? new Date() : null
      }
    });

    return NextResponse.json({ message: "Mesaj durumu guncellendi." });
  } catch (error) {
    if (isRecordNotFound(error)) {
      return NextResponse.json(
        { message: "Guncellenecek mesaj bulunamadi." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Mesaj durumu guncellenemedi." },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: Request, context: MessageRouteContext) {
  const isAuthorized = await hasAdminSession();

  if (!isAuthorized) {
    return unauthorizedResponse();
  }

  if (!process.env.DATABASE_URL) {
    return databaseUnavailableResponse();
  }

  const { id } = await context.params;

  try {
    await prisma.contactMessage.delete({ where: { id } });

    return NextResponse.json({ message: "Mesaj basariyla silindi." });
  } catch (error) {
    if (isRecordNotFound(error)) {
      return NextResponse.json(
        { message: "Silinecek mesaj bulunamadi." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Mesaj silinemedi. Lutfen tekrar deneyin." },
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
