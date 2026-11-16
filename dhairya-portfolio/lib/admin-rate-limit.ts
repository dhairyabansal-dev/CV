import { createHash } from "node:crypto";
import type { NextRequest } from "next/server";

const WINDOW_MS = 15 * 60 * 1000;
const MAX_FAILED_ATTEMPTS = 5;
const MAX_TRACKED_CLIENTS = 5_000;

type AttemptWindow = {
  count: number;
  resetAt: number;
};

// This is a best-effort per-instance guard. Serverless instances do not share memory;
// keep the Vercel Firewall rule documented as the distributed production control.
const attempts = new Map<string, AttemptWindow>();

function clientKey(request: NextRequest): string {
  const realIp = request.headers.get("x-real-ip")?.trim();
  const forwardedFor = request.headers.get("x-forwarded-for");
  const forwardedIp = forwardedFor?.split(",").map((value) => value.trim()).filter(Boolean).at(-1);
  const address = realIp || forwardedIp || "unknown";

  return createHash("sha256").update(address).digest("hex");
}

function prune(now: number): void {
  for (const [key, value] of attempts) {
    if (value.resetAt <= now) attempts.delete(key);
  }

  while (attempts.size > MAX_TRACKED_CLIENTS) {
    const oldestKey = attempts.keys().next().value;
    if (!oldestKey) break;
    attempts.delete(oldestKey);
  }
}

export function getLoginRateLimit(request: NextRequest, now = Date.now()) {
  prune(now);
  const current = attempts.get(clientKey(request));

  if (!current || current.count < MAX_FAILED_ATTEMPTS) {
    return { limited: false, retryAfterSeconds: 0 };
  }

  return {
    limited: true,
    retryAfterSeconds: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
  };
}

export function recordFailedLogin(request: NextRequest, now = Date.now()): void {
  prune(now);
  const key = clientKey(request);
  const current = attempts.get(key);

  if (!current || current.resetAt <= now) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return;
  }

  current.count += 1;
}

export function clearFailedLogins(request: NextRequest): void {
  attempts.delete(clientKey(request));
}
