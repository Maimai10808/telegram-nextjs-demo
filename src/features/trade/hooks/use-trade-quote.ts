"use client";

import { useQuery } from "@tanstack/react-query";

import { apiGet } from "@/lib/api-client";
import type { PriceQuote } from "@/types/trade";

export function useTradeQuote(symbol = "TON_USDT") {
  return useQuery({
    queryKey: ["price-quote", symbol],
    queryFn: () => apiGet<PriceQuote>(`/api/price?symbol=${symbol}`),
    refetchInterval: 10_000,
  });
}
