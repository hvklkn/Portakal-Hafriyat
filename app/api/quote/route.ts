import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/prisma";

const quoteSchema = z.object({
  fullName: z.string().min(2),
  phone: z.string().min(10),
  serviceType: z.string().min(2),
  city: z.string().min(2),
  district: z.string().min(2),
  description: z.string().min(10),
  imageUrl: z.string().url().optional().or(z.literal(""))
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = quoteSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { message: "Lütfen teklif formu alanlarını kontrol edin." },
      { status: 422 }
    );
  }

  if (!process.env.DATABASE_URL) {
    return NextResponse.json(
      { message: "Teklif kaydı için veritabanı bağlantısı yapılandırılmalı." },
      { status: 503 }
    );
  }

  const location = `${parsed.data.city} / ${parsed.data.district}`;
  const message = [
    parsed.data.description,
    parsed.data.imageUrl ? `Görsel URL: ${parsed.data.imageUrl}` : null
  ]
    .filter(Boolean)
    .join("\n\n");

  try {
    await prisma.quoteRequest.create({
      data: {
        name: parsed.data.fullName,
        phone: parsed.data.phone,
        location,
        serviceType: parsed.data.serviceType,
        message
      }
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { message: "Teklif talebi kaydedilemedi. Lütfen tekrar deneyin." },
      { status: 500 }
    );
  }
}
