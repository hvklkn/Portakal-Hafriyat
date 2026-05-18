import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import {
  consumeRateLimit,
  createRateLimitKey
} from "@/lib/rate-limit";

const contactSchema = z.object({
  fullName: z.string().trim().min(2).max(100),
  phone: z.string().trim().max(30).optional(),
  email: z.string().trim().email().max(160),
  subject: z.string().trim().max(160).optional(),
  message: z.string().trim().min(10).max(2000),
  companyWebsite: z.string().max(1000).optional()
});

export async function POST(request: Request) {
  const rateLimit = consumeRateLimit({
    key: createRateLimitKey(request, "public-contact"),
    limit: 5,
    windowMs: 10 * 60 * 1000
  });

  if (!rateLimit.success) {
    return NextResponse.json(
      {
        message:
          "Çok kısa sürede fazla mesaj gönderildi. Lütfen birkaç dakika sonra tekrar deneyin."
      },
      {
        status: 429,
        headers: { "Retry-After": String(rateLimit.retryAfter) }
      }
    );
  }

  const body = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { message: "Lütfen form alanlarını kontrol edin." },
      { status: 422 }
    );
  }

  if (parsed.data.companyWebsite?.trim()) {
    return NextResponse.json({ ok: true });
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
