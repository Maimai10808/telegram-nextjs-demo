import { apiPost } from "@/lib/api-client";
import type { TelegramAuthResponse, TelegramUserProfile } from "@/types/telegram";

export async function verifyTelegramAuth(initDataRaw: string) {
  return apiPost<TelegramAuthResponse, { initDataRaw: string }>(
    "/api/telegram/auth",
    {
      initDataRaw,
    },
  );
}

export function getTelegramDisplayName(user: TelegramUserProfile | null) {
  if (!user) {
    return "Guest Viewer";
  }

  const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ").trim();

  return fullName || (user.username ? `@${user.username}` : `UID ${user.id}`);
}
