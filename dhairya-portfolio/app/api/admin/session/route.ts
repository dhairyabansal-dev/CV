import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_TTL_SECONDS,
  adminSessionCookieOptions,
  createAdminSessionToken,
  isAdminAuthConfigured,
  verifyAdminPassword,
} from "@/lib/admin-auth";
import {
  clearFailedLogins,
  getLoginRateLimit,
  recordFailedLogin,
} from "@/lib/admin-rate-limit";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 2_048;
const NO_STORE = {
  "Cache-Control": "no-store, max-age=0",
  Pragma: "no-cache",
};

type BodyResult =
  | { ok: true; text: string }
  | { ok: false; tooLarge: boolean };

function json(body: unknown, status = 200, headers: Record<string, string> = {}) {
  return NextResponse.json(body, {
    status,
    headers: { ...NO_STORE, ...headers },
  });
}

function isSameOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  if (!origin || origin !== request.nextUrl.origin) return false;
  return request.headers.get("sec-fetch-site") !== "cross-site";
}

async function readLimitedBody(request: NextRequest): Promise<BodyResult> {
  const reader = request.body?.getReader();
  if (!reader) return { ok: false, tooLarge: false };

  const chunks: Uint8Array[] = [];
  let size = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      size += value.byteLength;
      if (size > MAX_BODY_BYTES) {
        await reader.cancel();
        return { ok: false, tooLarge: true };
      }

      chunks.push(value);
    }
  } catch {
    return { ok: false, tooLarge: false };
  } finally {
    try {
      reader.releaseLock();
    } catch {
      // The stream may already have been cancelled.
    }
  }

  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }

  try {
    return { ok: true, text: new TextDecoder("utf-8", { fatal: true }).decode(bytes) };
  } catch {
    return { ok: false, tooLarge: false };
  }
}

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) {
    return json({ error: "Cross-origin requests are not allowed." }, 403);
  }

  if (!isAdminAuthConfigured()) {
    return json(
      { error: "Admin access is not configured. Add ADMIN_PASSWORD and ADMIN_SESSION_SECRET to the Vercel project environment." },
      503,
    );
  }

  const rateLimit = getLoginRateLimit(request);
  if (rateLimit.limited) {
    return json(
      { error: "Too many failed sign-in attempts. Wait before trying again." },
      429,
      { "Retry-After": String(rateLimit.retryAfterSeconds) },
    );
  }

  if (request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json") {
    return json({ error: "Expected a JSON request." }, 415);
  }

  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    return json({ error: "Request is too large." }, 413);
  }

  const bodyResult = await readLimitedBody(request);
  if (!bodyResult.ok) {
    return json(
      { error: bodyResult.tooLarge ? "Request is too large." : "Invalid request body." },
      bodyResult.tooLarge ? 413 : 400,
    );
  }

  let body: unknown;
  try {
    body = JSON.parse(bodyResult.text);
  } catch {
    return json({ error: "Invalid request body." }, 400);
  }

  const password = body && typeof body === "object" && "password" in body
    ? (body as { password?: unknown }).password
    : undefined;

  if (typeof password !== "string" || password.length === 0 || password.length > 1024) {
    return json({ error: "Enter your admin password." }, 400);
  }

  if (!verifyAdminPassword(password)) {
    recordFailedLogin(request);
    return json({ error: "Incorrect password." }, 401);
  }

  clearFailedLogins(request);

  const expiresAt = Date.now() + ADMIN_SESSION_TTL_SECONDS * 1000;
  const response = json({ ok: true });
  response.cookies.set(
    ADMIN_SESSION_COOKIE,
    createAdminSessionToken(expiresAt),
    adminSessionCookieOptions(),
  );
  return response;
}

export async function DELETE(request: NextRequest) {
  if (!isSameOrigin(request)) {
    return json({ error: "Cross-origin requests are not allowed." }, 403);
  }

  const response = json({ ok: true });
  response.cookies.set(ADMIN_SESSION_COOKIE, "", {
    ...adminSessionCookieOptions(),
    maxAge: 0,
    expires: new Date(0),
  });
  return response;
}
