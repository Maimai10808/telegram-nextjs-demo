import { z } from "zod";

export const tradeDirectionSchema = z.enum(["UP", "DOWN"]);

export const tradeExpirySchema = z.union([
  z.literal(1),
  z.literal(5),
  z.literal(15),
]);

export const tradeOrderInputSchema = z.object({
  symbol: z.string().min(1).default("TON/USDT"),
  direction: tradeDirectionSchema,
  amount: z.coerce.number().min(1, "Minimum order size is 1 TON").max(250),
  expiryMinutes: tradeExpirySchema,
});
