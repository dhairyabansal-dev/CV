import { NextResponse } from "next/server";
import { getPortfolioProjects } from "@/lib/github";

/**
 * Read-only, cached view of the portfolio's GitHub-derived project list.
 * All fetching/caching/classification logic lives in lib/github.ts —
 * this route is just a JSON-serializable window onto it, useful if a
 * client component or external consumer ever needs it without a full
 * page render.
 */
export const revalidate = 1800; // 30 minutes, matches lib/github.ts

export async function GET() {
  const { projects, isLive } = await getPortfolioProjects();
  return NextResponse.json({ projects, isLive });
}
