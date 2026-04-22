"use client";

import { PropsWithChildren, useMemo } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TonConnectUIProvider } from "@tonconnect/ui-react";

export function Providers({ children }: PropsWithChildren) {
  const queryClient = useMemo(() => new QueryClient(), []);

  const manifestUrl = process.env.NEXT_PUBLIC_APP_URL
    ? `${process.env.NEXT_PUBLIC_APP_URL}/tonconnect-manifest.json`
    : "http://localhost:3000/tonconnect-manifest.json";

  return (
    <QueryClientProvider client={queryClient}>
      <TonConnectUIProvider manifestUrl={manifestUrl}>
        {children}
      </TonConnectUIProvider>
    </QueryClientProvider>
  );
}
