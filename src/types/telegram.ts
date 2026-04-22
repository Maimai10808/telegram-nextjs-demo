export type TelegramUserProfile = {
  id: number;
  firstName?: string;
  lastName?: string;
  username?: string;
  languageCode?: string;
  isPremium?: boolean;
  allowsWriteToPm?: boolean;
  photoUrl?: string;
};

export type TelegramRuntimeState = {
  isTelegram: boolean;
  initDataRaw: string;
  launchParams: Record<string, unknown> | null;
  startParam: string | null;
  platform: string | null;
  error: string | null;
};

export type TelegramAuthResponse = {
  ok: boolean;
  verified: boolean;
  warning?: string | null;
  user: TelegramUserProfile | null;
  authDate: string | null;
  startParam: string | null;
  hashPresent: boolean;
  error?: string;
};
