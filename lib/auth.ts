import "server-only";

import { SignJWT, jwtVerify } from "jose";

export const adminCookieName = "portakal_admin_session";

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET ?? "development-jwt-secret-change-me"
);

export type AdminSession = {
  email: string;
  role: "admin";
};

export async function createAdminToken(payload: AdminSession) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(secret);
}

export async function verifyAdminToken(token?: string) {
  if (!token) {
    return null;
  }

  try {
    const { payload } = await jwtVerify<AdminSession>(token, secret);
    if (payload.role !== "admin" || !payload.email) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}
