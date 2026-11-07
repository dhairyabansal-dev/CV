import { NextResponse } from "next/server";
import { getAdminSession, isSameOrigin } from "@/lib/admin-session";

export const runtime = "nodejs";
const allowedStatuses = ["new", "reviewing", "approved", "declined", "completed"] as const;
type InquiryStatus = (typeof allowedStatuses)[number];

function supabaseConfig() {
  const url = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const key = process.env.SUPABASE_ANON_KEY;
  return url && key ? { url, key } : null;
}

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Administrator sign-in required." }, { status: 401 });
  const config = supabaseConfig();
  if (!config) return NextResponse.json({ error: "Supabase is not configured." }, { status: 503 });

  const response = await fetch(
    `${config.url}/rest/v1/inquiries?select=id,created_at,name,email,organization,type,subject,message,preferred_date,meeting_format,status&order=created_at.desc&limit=100`,
    { headers: { apikey: config.key, Authorization: `Bearer ${session.token}` }, cache: "no-store" },
  );
  if (!response.ok) {
    console.error("Admin inquiry fetch failed:", response.status);
    return NextResponse.json({ error: "Unable to load enquiries." }, { status: 502 });
  }
  return NextResponse.json({ inquiries: await response.json() }, { headers: { "Cache-Control": "private, no-store" } });
}

export async function PATCH(request: Request) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Request not allowed." }, { status: 403 });
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Administrator sign-in required." }, { status: 401 });
  const config = supabaseConfig();
  if (!config) return NextResponse.json({ error: "Supabase is not configured." }, { status: 503 });

  try {
    const length = Number(request.headers.get("content-length") ?? 0);
    if (length > 2048) return NextResponse.json({ error: "Invalid request." }, { status: 413 });
    const body: unknown = await request.json();
    if (!body || typeof body !== "object") return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    const { id, status } = body as { id?: unknown; status?: unknown };
    if (typeof id !== "string" || !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id) ||
        typeof status !== "string" || !allowedStatuses.includes(status as InquiryStatus)) {
      return NextResponse.json({ error: "Invalid enquiry or status." }, { status: 400 });
    }

    const response = await fetch(`${config.url}/rest/v1/inquiries?id=eq.${id}&select=id,status`, {
      method: "PATCH",
      headers: {
        apikey: config.key,
        Authorization: `Bearer ${session.token}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify({ status }),
      cache: "no-store",
    });
    if (!response.ok) {
      console.error("Admin inquiry update failed:", response.status);
      return NextResponse.json({ error: "Unable to update this enquiry." }, { status: 502 });
    }
    const updated = (await response.json()) as Array<{ id: string; status: InquiryStatus }>;
    if (!updated.length) return NextResponse.json({ error: "Enquiry not found or update not permitted." }, { status: 404 });
    return NextResponse.json({ inquiry: updated[0] }, { headers: { "Cache-Control": "private, no-store" } });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
