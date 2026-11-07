import { NextResponse } from "next/server";
import { allowRequest, getClientAddress } from "@/lib/rate-limit";
import { isSameOrigin } from "@/lib/admin-session";

export const runtime = "nodejs";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const meetingFormats = ["Google Meet", "Phone", "In person", "No preference"];

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Request not allowed." }, { status: 403 });
  if (!allowRequest(`public-inquiry:${getClientAddress(request)}`, 5, 10 * 60 * 1000)) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }

  try {
    const length = Number(request.headers.get("content-length") ?? 0);
    if (length > 12_000) return NextResponse.json({ error: "Request is too large." }, { status: 413 });
    const body: unknown = await request.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }
    const input = body as Record<string, unknown>;
    if (typeof input.companyWebsite === "string" && input.companyWebsite.trim()) return NextResponse.json({ ok: true });

    const clean = (value: unknown, max: number) =>
      typeof value === "string" ? value.replace(/[\u0000-\u001f\u007f]/g, " ").trim().slice(0, max) : "";
    const name = clean(input.name, 100);
    const email = clean(input.email, 320).toLowerCase();
    const organization = clean(input.organization, 120);
    const type = clean(input.type, 20);
    const subject = clean(input.subject, 160);
    const message = typeof input.message === "string" ? input.message.trim() : "";
    const preferredDate = input.preferredDate === "" || input.preferredDate == null ? null : clean(input.preferredDate, 10);
    const meetingFormat = input.meetingFormat == null || input.meetingFormat === "" ? null : clean(input.meetingFormat, 40);

    if (name.length < 2 || !emailPattern.test(email) || !["service", "meeting"].includes(type) ||
        subject.length < 2 || message.length < 10 || message.length > 5000 ||
        (preferredDate !== null && !/^\d{4}-\d{2}-\d{2}$/.test(preferredDate)) ||
        (meetingFormat !== null && !meetingFormats.includes(meetingFormat))) {
      return NextResponse.json({ error: "Please check the required fields and try again." }, { status: 400 });
    }

    const url = process.env.SUPABASE_URL?.replace(/\/$/, "");
    const key = process.env.SUPABASE_ANON_KEY;
    if (!url || !key) {
      return NextResponse.json({ error: "The request portal is not connected yet. Please email dhairyabansal090@gmail.com directly for now." }, { status: 503 });
    }

    const response = await fetch(`${url}/rest/v1/inquiries`, {
      method: "POST",
      headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json", Prefer: "return=minimal" },
      body: JSON.stringify({
        name, email, organization: organization || null, type, subject, message,
        preferred_date: preferredDate, meeting_format: meetingFormat,
      }),
      cache: "no-store",
    });
    if (!response.ok) {
      console.error("Inquiry storage failed:", response.status, await response.text());
      return NextResponse.json({ error: "We couldn't save your request. Please try again or email directly." }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request. Please refresh and try again." }, { status: 400 });
  }
}
