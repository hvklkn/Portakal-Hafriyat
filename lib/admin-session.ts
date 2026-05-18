import "server-only";

import { cookies } from "next/headers";

import { adminCookieName, verifyAdminToken } from "@/lib/auth";

export async function getAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(adminCookieName)?.value;

  return verifyAdminToken(token);
}

export async function hasAdminSession() {
  const session = await getAdminSession();

  return Boolean(session);
}
