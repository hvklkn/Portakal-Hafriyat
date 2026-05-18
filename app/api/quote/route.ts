import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import {
  consumeRateLimit,
  createRateLimitKey
} from "@/lib/rate-limit";

const quoteSchema = z.object({
  fullName: z.string().trim().min(2).max(100),
  phone: z.string().trim().min(10).max(30),
  serviceType: z.string().trim().min(2).max(120),
  city: z.string().trim().min(2).max(80),
  district: z.string().trim().min(2).max(80),
  description: z.string().trim().min(10).max(2000),
  imageUrl: z.string().trim().max(1000).url().optional().or(z.literal("")),
  companyWebsite: z.string().max(1000).optional()
});

export async function POST(request: Request) {
  const rateLimit = consumeRateLimit({
    key: createRateLimitKey(request, "public-quote"),
    limit: 5,
    windowMs: 10 * 60 * 1000
  });

  if (!rateLimit.success) {
    return NextResponse.json(
      {
        message:
          "Çok kısa sürede fazla teklif talebi gönderildi. Lütfen birkaç dakika sonra tekrar deneyin."
      },
      {
        status: 429,
        headers: { "Retry-After": String(rateLimit.retryAfter) }
      }
    );
  }

  const body = await request.json().catch(() => null);
  const parsed = quoteSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { message: "Lütfen teklif formu alanlarını kontrol edin." },
      { status: 422 }
    );
  }

  if (parsed.data.companyWebsite?.trim()) {
    return NextResponse.json({ ok: true });
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
