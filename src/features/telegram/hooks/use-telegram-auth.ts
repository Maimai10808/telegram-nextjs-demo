"use client";

import { useQuery } from "@tanstack/react-query";

import { useTelegramRuntime } from "@/features/telegram/components/telegram-runtime-provider";
import { verifyTelegramAuth } from "@/features/telegram/services/telegram-auth";

export function useTelegramAuth() {
  const runtime = useTelegramRuntime();

  return useQuery({
    queryKey: ["telegram-auth", runtime.initDataRaw],
    enabled: Boolean(runtime.initDataRaw),
    queryFn: () => verifyTelegramAuth(runtime.initDataRaw),
  });
}
