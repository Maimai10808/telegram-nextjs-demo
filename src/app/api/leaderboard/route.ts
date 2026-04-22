import { NextResponse } from "next/server";

import { leaderboardEntries } from "@/mocks/leaderboard";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    entries: leaderboardEntries,
    refreshedAt: new Date().toISOString(),
  });
}
