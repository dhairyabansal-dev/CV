type Entry = { count: number; resetAt: number };
const attempts = new Map<string, Entry>();

/**
 * Best-effort per-instance throttling for serverless deployments.
 * Use a shared edge/database rate limiter for a hard global limit.
 */
export function allowRequest(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const current = attempts.get(key);
  if (!current || current.resetAt <= now) {
    attempts.set(key, { count: 1, resetAt: now + windowMs });
    if (attempts.size > 5000) {
      for (const [candidate, entry] of attempts) {
        if (entry.resetAt <= now) attempts.delete(candidate);
      }
    }
    return true;
  }
  if (current.count >= limit) return false;
  current.count += 1;
  return true;
}

export function getClientAddress(request: Request): string {
  const forwarded = request.headers.get("x-vercel-forwarded-for") ?? request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}
