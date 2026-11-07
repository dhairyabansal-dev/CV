import { cookies } from "next/headers";

export const ADMIN_COOKIE = "__Host-portfolio_admin";
const SESSION_MAX_AGE = 60 * 60 * 4;

type SupabaseUser = {
  id: string;
  app_metadata?: { role?: string };
};

export async function createAdminSession(email: string, password: string) {
  const url = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error("SUPABASE_NOT_CONFIGURED");

  const response = await fetch(`${url}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: { apikey: key, "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    cache: "no-store",
  });
  if (!response.ok) return null;

  const result = (await response.json()) as {
    access_token?: string;
    expires_in?: number;
    user?: SupabaseUser;
  };
  if (!result.access_token || result.user?.app_metadata?.role !== "admin") return null;

  return {
    token: result.access_token,
    maxAge: Math.max(60, Math.min(result.expires_in ?? SESSION_MAX_AGE, SESSION_MAX_AGE)),
  };
}

export async function getAdminSession() {
  const url = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE)?.value;
  if (!token) return null;

  const response = await fetch(`${url}/auth/v1/user`, {
    headers: { apikey: key, Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!response.ok) return null;

  const user = (await response.json()) as SupabaseUser;
  if (user.app_metadata?.role !== "admin") return null;
  return { token, userId: user.id };
}

export function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return request.headers.get("sec-fetch-site") !== "cross-site";

  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (!host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}
