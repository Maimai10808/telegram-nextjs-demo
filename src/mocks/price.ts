import type { PriceQuote } from "@/types/trade";

export function createMockPriceQuote(symbol = "TON/USDT"): PriceQuote {
  const base = 6.18;
  const drift = Math.sin(Date.now() / 120_000) * 0.18;
  const price = Number((base + drift).toFixed(3));

  return {
    symbol,
    price,
    change24h: Number((1.8 + drift * 2).toFixed(2)),
    updatedAt: new Date().toISOString(),
  };
}
