"use client";

import { PropsWithChildren, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TonConnectUIProvider } from "@tonconnect/ui-react";

import { TelegramRuntimeProvider } from "@/features/telegram/components/telegram-runtime-provider";

export function Providers({ children }: PropsWithChildren) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 15_000,
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      }),
  );

  const manifestUrl = process.env.NEXT_PUBLIC_APP_URL
    ? `${process.env.NEXT_PUBLIC_APP_URL}/tonconnect-manifest.json`
    : "http://localhost:3000/tonconnect-manifest.json";
  const twaReturnUrl = process.env.NEXT_PUBLIC_APP_URL?.startsWith("http")
    ? (process.env.NEXT_PUBLIC_APP_URL as `${string}://${string}`)
    : undefined;

  return (
    <QueryClientProvider client={queryClient}>
      <TonConnectUIProvider
        manifestUrl={manifestUrl}
        actionsConfiguration={{
          twaReturnUrl,
        }}
      >
        <TelegramRuntimeProvider>{children}</TelegramRuntimeProvider>
      </TonConnectUIProvider>
    </QueryClientProvider>
  );
}
