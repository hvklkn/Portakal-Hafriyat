import { NextResponse, type NextRequest } from "next/server";

const adminCookieName = "portakal_admin_session";

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET ?? "development-jwt-secret-change-me"
);

function base64UrlToBytes(value: string) {
  const base64 = value.replaceAll("-", "+").replaceAll("_", "/");
  const padded = base64.padEnd(
    base64.length + ((4 - (base64.length % 4)) % 4),
    "="
  );
  const binary = atob(padded);

  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

function bytesToBase64Url(bytes: ArrayBuffer) {
  const binary = String.fromCharCode(...new Uint8Array(bytes));

  return btoa(binary)
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replaceAll("=", "");
}

function timingSafeEqual(a: string, b: string) {
  if (a.length !== b.length) {
    return false;
  }

  let result = 0;
  for (let index = 0; index < a.length; index += 1) {
    result |= a.charCodeAt(index) ^ b.charCodeAt(index);
  }

  return result === 0;
}

async function createSignature(data: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    secret,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  return bytesToBase64Url(
    await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(data))
  );
}

async function hasValidAdminToken(token?: string) {
  if (!token) {
    return false;
  }

  try {
    const [headerSegment, payloadSegment, signature] = token.split(".");
    if (!headerSegment || !payloadSegment || !signature) {
      return false;
    }

    const header = JSON.parse(
      new TextDecoder().decode(base64UrlToBytes(headerSegment))
    ) as { alg?: string };

    if (header.alg !== "HS256") {
      return false;
    }

    const expectedSignature = await createSignature(
      `${headerSegment}.${payloadSegment}`
    );

    if (!timingSafeEqual(signature, expectedSignature)) {
      return false;
    }

    const payload = JSON.parse(
      new TextDecoder().decode(base64UrlToBytes(payloadSegment))
    ) as { exp?: number; role?: string };
    const now = Math.floor(Date.now() / 1000);

    return payload.role === "admin" && (!payload.exp || payload.exp > now);
  } catch {
    return false;
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin") || pathname === "/admin/login") {
    return NextResponse.next();
  }

  const token = request.cookies.get(adminCookieName)?.value;
  const isValid = await hasValidAdminToken(token);

  if (isValid) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/admin/login", request.url);
  loginUrl.searchParams.set("next", pathname);

  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*"]
};
