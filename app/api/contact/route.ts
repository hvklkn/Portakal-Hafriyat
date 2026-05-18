import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/prisma";

const contactSchema = z.object({
  fullName: z.string().min(2),
  phone: z.string().optional(),
  email: z.string().email(),
  subject: z.string().optional(),
  message: z.string().min(10)
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { message: "Lütfen form alanlarını kontrol edin." },
      { status: 422 }
    );
  }

  if (!process.env.DATABASE_URL) {
    return NextResponse.json(
      { message: "Mesaj kaydı için veritabanı bağlantısı yapılandırılmalı." },
      { status: 503 }
    );
  }

  try {
    await prisma.contactMessage.create({
      data: {
        name: parsed.data.fullName,
        phone: parsed.data.phone || null,
        email: parsed.data.email,
        subject: parsed.data.subject || null,
        message: parsed.data.message
      }
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { message: "Mesaj kaydedilemedi. Lütfen tekrar deneyin." },
      { status: 500 }
    );
  }
}
