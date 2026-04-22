import { z } from "zod";

export const telegramAuthRequestSchema = z.object({
  initDataRaw: z.string().min(1, "Missing initDataRaw"),
});
