import { tradeOrderInputSchema } from "@/schemas/trade";
import type { TradeExpiry, TradeOrder, TradeOrderInput } from "@/types/trade";

const payoutRateMap: Record<TradeExpiry, number> = {
  1: 1.38,
  5: 1.62,
  15: 1.88,
};

export function estimateTradePayout(
  amount: number,
  expiryMinutes: TradeExpiry,
) {
  return Number((amount * payoutRateMap[expiryMinutes]).toFixed(2));
}

export async function createMockTradeOrder(
  input: TradeOrderInput,
  marketPrice: number,
): Promise<TradeOrder> {
  const payload = tradeOrderInputSchema.parse(input);

  await new Promise((resolve) => {
    setTimeout(resolve, 450);
  });

  return {
    ...payload,
    id: `ord_${Math.random().toString(36).slice(2, 10)}`,
    createdAt: new Date().toISOString(),
    entryPrice: marketPrice,
    estimatedPayout: estimateTradePayout(payload.amount, payload.expiryMinutes),
    status: "PENDING",
  };
}
