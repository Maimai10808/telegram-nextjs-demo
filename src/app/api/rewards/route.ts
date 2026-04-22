import { NextResponse } from "next/server";

import { rewardsSnapshot } from "@/mocks/rewards";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(rewardsSnapshot);
}
