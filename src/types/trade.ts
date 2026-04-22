export type TradeDirection = "UP" | "DOWN";

export type TradeExpiry = 1 | 5 | 15;

export type TradeFormDraft = {
  symbol: string;
  direction: TradeDirection;
  amount: string;
  expiryMinutes: TradeExpiry;
};

export type TradeOrderInput = {
  symbol: string;
  direction: TradeDirection;
  amount: number;
  expiryMinutes: TradeExpiry;
};

export type TradeOrder = TradeOrderInput & {
  id: string;
  createdAt: string;
  entryPrice: number;
  estimatedPayout: number;
  status: "PENDING" | "WON" | "LOST";
};

export type PriceQuote = {
  symbol: string;
  price: number;
  change24h: number;
  updatedAt: string;
};
