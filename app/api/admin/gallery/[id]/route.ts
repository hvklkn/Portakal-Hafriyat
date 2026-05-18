import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

import { hasAdminSession } from "@/lib/admin-session";
import { prisma } from "@/lib/prisma";

type GalleryRouteContext = {
  params: Promise<{ id: string }>;
};

export async function DELETE(_request: Request, context: GalleryRouteContext) {
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

  const { id } = await context.params;

  try {
    await prisma.galleryImage.delete({ where: { id } });

    return NextResponse.json({ message: "Gorsel basariyla silindi." });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json(
        { message: "Silinecek gorsel bulunamadi." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Gorsel silinemedi. Lutfen tekrar deneyin." },
      { status: 500 }
    );
  }
}
