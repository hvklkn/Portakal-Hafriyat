import { NextResponse } from "next/server";
import { compare } from "bcryptjs";
import { z } from "zod";

import { adminCookieName, createAdminToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = loginSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { message: "E-posta veya sifre formatı hatalı." },
      { status: 422 }
    );
  }

  const email = parsed.data.email.trim().toLowerCase();
  const adminUser = await prisma.adminUser.findUnique({
    where: { email }
  });

  if (!adminUser?.isActive) {
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
    return NextResponse.json(
      { message: "E-posta veya sifre hatalı." },
      { status: 401 }
    );
  }

  await prisma.adminUser.update({
    where: { id: adminUser.id },
    data: { lastLoginAt: new Date() }
  });

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
}
