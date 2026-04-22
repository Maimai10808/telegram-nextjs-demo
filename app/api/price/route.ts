export const dynamic = "force-dynamic";

import { GET as handleGet } from "@/app/api/price/route";

export async function GET(request: Parameters<typeof handleGet>[0]) {
  return handleGet(request);
}
