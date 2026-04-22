export const dynamic = "force-dynamic";

import { GET as handleGet } from "@/app/api/rewards/route";

export async function GET() {
  return handleGet();
}
