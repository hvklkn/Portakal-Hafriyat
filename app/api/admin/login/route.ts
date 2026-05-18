import { NextResponse } from "next/server";
import { compare } from "bcryptjs";
import { z } from "zod";

import { adminCookieName, createAdminToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  checkRateLimit,
  clearRateLimit,
  consumeRateLimit,
  createRateLimitKey
} from "@/lib/rate-limit";

const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(160),
  password: z.string().min(6).max(200)
});

export async function POST(request: Request) {
  const rateLimitKey = createRateLimitKey(request, "admin-login");
  const currentLimit = checkRateLimit({
    key: rateLimitKey,
    limit: 5,
    windowMs: 10 * 60 * 1000
  });

  if (!currentLimit.success) {
    return NextResponse.json(
      {
        message:
          "Çok fazla başarısız giriş denemesi yapıldı. Lütfen birkaç dakika sonra tekrar deneyin."
      },
      {
        status: 429,
        headers: { "Retry-After": String(currentLimit.retryAfter) }
      }
    );
  }

  const body = await request.json().catch(() => null);
  const parsed = loginSchema.safeParse(body);

  if (!parsed.success) {
    consumeRateLimit({
      key: rateLimitKey,
      limit: 5,
      windowMs: 10 * 60 * 1000
    });

    return NextResponse.json(
      { message: "E-posta veya sifre formatı hatalı." },
      { status: 422 }
    );
  }

  try {
    const email = parsed.data.email;
    const adminUser = await prisma.adminUser.findUnique({
      where: { email }
    });

    if (!adminUser?.isActive) {
      consumeRateLimit({
        key: rateLimitKey,
        limit: 5,
        windowMs: 10 * 60 * 1000
      });

      return NextResponse.json(
        { message: "E-posta veya sifre hatalı." },
        { status: 401 }
      );
    }

    const isPasswordValid = await compare(
      parsed.data.password,
      adminUser.passwordHash
    );

    if (!isPasswordValid) {
      consumeRateLimit({
        key: rateLimitKey,
        limit: 5,
        windowMs: 10 * 60 * 1000
      });

      return NextResponse.json(
        { message: "E-posta veya sifre hatalı." },
        { status: 401 }
      );
    }

    await prisma.adminUser.update({
      where: { id: adminUser.id },
      data: { lastLoginAt: new Date() }
    });

    clearRateLimit(rateLimitKey);

    const token = await createAdminToken({
      email: adminUser.email,
      role: "admin"
    });

    const response = NextResponse.json({ ok: true });
    response.cookies.set(adminCookieName, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 8
    });

    return response;
  } catch {
    return NextResponse.json(
      { message: "Giriş şu anda tamamlanamadı. Lütfen tekrar deneyin." },
      { status: 500 }
    );
  }
}
