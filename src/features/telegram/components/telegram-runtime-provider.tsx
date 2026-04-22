"use client";

import {
  createContext,
  type PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { postEvent, retrieveLaunchParams } from "@tma.js/sdk";

import type { TelegramRuntimeState } from "@/types/telegram";

const initialState: TelegramRuntimeState = {
  isTelegram: false,
  initDataRaw: "",
  launchParams: null,
  startParam: null,
  platform: null,
  error: null,
};

const TelegramRuntimeContext = createContext<TelegramRuntimeState>(initialState);

function readTelegramRuntime(): TelegramRuntimeState {
  if (typeof window === "undefined") {
    return initialState;
  }

  try {
    const launchParams = retrieveLaunchParams();
    const normalized = launchParams as Record<string, unknown> & {
      initDataRaw?: string;
      startParam?: string;
      platform?: string;
    };

    return {
      isTelegram: true,
      initDataRaw: normalized.initDataRaw ?? "",
      launchParams: launchParams as Record<string, unknown>,
      startParam:
        typeof normalized.startParam === "string" ? normalized.startParam : null,
      platform: typeof normalized.platform === "string" ? normalized.platform : null,
      error: null,
    };
  } catch {
    return {
      ...initialState,
      error: "未检测到 Telegram Mini App 容器，请通过 Telegram 或 ngrok 域名打开。",
    };
  }
}

export function TelegramRuntimeProvider({ children }: PropsWithChildren) {
  const [runtime] = useState<TelegramRuntimeState>(() => readTelegramRuntime());

  useEffect(() => {
    if (!runtime.isTelegram) {
      return;
    }

    try {
      postEvent("web_app_ready");
      postEvent("web_app_expand");
    } catch {
      // Telegram bridge is optional during local browser preview.
    }
  }, [runtime.isTelegram]);

  const value = useMemo(() => runtime, [runtime]);

  return (
    <TelegramRuntimeContext.Provider value={value}>
      {children}
    </TelegramRuntimeContext.Provider>
  );
}

export function useTelegramRuntime() {
  return useContext(TelegramRuntimeContext);
}
