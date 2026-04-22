export const dynamic = "force-dynamic";

import { POST as handlePost } from "@/app/api/telegram/auth/route";

export async function POST(request: Parameters<typeof handlePost>[0]) {
  return handlePost(request);
}
