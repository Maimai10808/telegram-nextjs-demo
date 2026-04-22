import { NextRequest, NextResponse } from "next/server";

import { createMockPriceQuote } from "@/mocks/price";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const symbol = request.nextUrl.searchParams.get("symbol") ?? "TON_USDT";

  return NextResponse.json(createMockPriceQuote(symbol.replace("_", "/")));
}
