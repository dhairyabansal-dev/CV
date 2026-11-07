import { NextResponse } from "next/server";
import { ADMIN_COOKIE, createAdminSession, isSameOrigin } from "@/lib/admin-session";
import { allowRequest, getClientAddress } from "@/lib/rate-limit";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Request not allowed." }, { status: 403 });
  if (!allowRequest(`admin-login:${getClientAddress(request)}`, 8, 15 * 60 * 1000)) {
    return NextResponse.json({ error: "Too many sign-in attempts. Try again later." }, { status: 429 });
  }

  try {
    const length = Number(request.headers.get("content-length") ?? 0);
    if (length > 4096) return NextResponse.json({ error: "Invalid request." }, { status: 413 });
    const body: unknown = await request.json();
    if (!body || typeof body !== "object") return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    const { email, password } = body as { email?: unknown; password?: unknown };
    if (typeof email !== "string" || email.length > 320 || typeof password !== "string" || password.length < 8 || password.length > 256) {
      return NextResponse.json({ error: "Enter a valid email and password." }, { status: 400 });
    }

    const session = await createAdminSession(email.trim().toLowerCase(), password);
    if (!session) return NextResponse.json({ error: "Sign-in failed or this account is not an administrator." }, { status: 401 });

    const response = NextResponse.json({ ok: true });
    response.cookies.set(ADMIN_COOKIE, session.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: session.maxAge,
    });
    return response;
  } catch (error) {
    if (error instanceof Error && error.message === "SUPABASE_NOT_CONFIGURED") {
      return NextResponse.json({ error: "The CRM is not connected to Supabase yet." }, { status: 503 });
    }
    return NextResponse.json({ error: "Unable to sign in right now." }, { status: 500 });
  }
}
