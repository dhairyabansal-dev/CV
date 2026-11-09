import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_SESSION_COOKIE = "dhairya_admin_session";
export const ADMIN_SESSION_TTL_SECONDS = 8 * 60 * 60;

const MIN_PASSWORD_LENGTH = 16;
const MIN_SECRET_LENGTH = 32;

export function isAdminAuthConfigured(): boolean {
  const password = process.env.ADMIN_PASSWORD ?? "";
  const secret = process.env.ADMIN_SESSION_SECRET ?? "";
  return password.length >= MIN_PASSWORD_LENGTH && secret.length >= MIN_SECRET_LENGTH;
}

export function verifyAdminPassword(candidate: string): boolean {
  const configured = process.env.ADMIN_PASSWORD ?? "";
  return isAdminAuthConfigured() && safeEqual(candidate, configured);
}

export function createAdminSessionToken(expiresAt: number): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < MIN_SECRET_LENGTH) {
    throw new Error("Admin session signing secret is not configured.");
  }

  const signature = createHmac("sha256", secret)
    .update(`dhairya-admin-session:${expiresAt}`)
    .digest("base64url");

  return `${expiresAt}.${signature}`;
}

export function verifyAdminSessionToken(token: string): boolean {
  if (!isAdminAuthConfigured()) return false;

  const [expiryText, signature, ...extra] = token.split(".");
  if (!expiryText || !signature || extra.length > 0) return false;

  const expiresAt = Number(expiryText);
  if (!Number.isSafeInteger(expiresAt) || expiresAt <= Date.now()) return false;

  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) return false;

  const expected = createHmac("sha256", secret)
    .update(`dhairya-admin-session:${expiresAt}`)
    .digest("base64url");

  return safeEqual(signature, expected);
}

export async function hasAdminSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  return token ? verifyAdminSessionToken(token) : false;
}

export function adminSessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    path: "/",
    maxAge: ADMIN_SESSION_TTL_SECONDS,
  };
}

function safeEqual(left: string, right: string): boolean {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) return false;
  return timingSafeEqual(leftBuffer, rightBuffer);
}
