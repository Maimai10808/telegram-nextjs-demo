"use client";

import { useMemo, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Toast } from "antd-mobile";
import { ZodError } from "zod";

import { tradeOrderInputSchema } from "@/schemas/trade";
import { useTradeStore } from "@/stores/trade-store";
import { createMockTradeOrder, estimateTradePayout } from "@/features/trade/services/trade-service";
import { useTradeQuote } from "@/features/trade/hooks/use-trade-quote";

type FieldErrors = Partial<Record<"amount", string>>;

export function useTradePanel() {
  const { form, orders, setField, addOrder } = useTradeStore();
  const quoteQuery = useTradeQuote();
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const projectedPayout = useMemo(() => {
    const amount = Number(form.amount);

    return Number.isFinite(amount) && amount > 0
      ? estimateTradePayout(amount, form.expiryMinutes)
      : 0;
  }, [form.amount, form.expiryMinutes]);

  const mutation = useMutation({
    mutationFn: async () => {
      const parsed = tradeOrderInputSchema.parse({
        symbol: form.symbol,
        direction: form.direction,
        amount: form.amount,
        expiryMinutes: form.expiryMinutes,
      });

      return createMockTradeOrder(parsed, quoteQuery.data?.price ?? 6.18);
    },
    onSuccess: (order) => {
      addOrder(order);
      setFieldErrors({});
      Toast.show({
        content: "Mock order created",
      });
    },
    onError: (error) => {
      if (error instanceof ZodError) {
        const amountError = error.issues.find((issue) => issue.path[0] === "amount");
        setFieldErrors({
          amount: amountError?.message,
        });
        return;
      }

      Toast.show({
        content: error instanceof Error ? error.message : "下单失败",
      });
    },
  });

  return {
    form,
    orders,
    setField,
    fieldErrors,
    projectedPayout,
    quoteQuery,
    submitOrder: mutation.mutateAsync,
    isSubmitting: mutation.isPending,
  };
}
