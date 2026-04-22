import { create } from "zustand";

import type { TradeFormDraft, TradeOrder } from "@/types/trade";

const initialForm: TradeFormDraft = {
  symbol: "TON/USDT",
  direction: "UP",
  amount: "25",
  expiryMinutes: 5,
};

type TradeStore = {
  form: TradeFormDraft;
  orders: TradeOrder[];
  setField: <K extends keyof TradeFormDraft>(
    key: K,
    value: TradeFormDraft[K],
  ) => void;
  addOrder: (order: TradeOrder) => void;
  resetForm: () => void;
};

export const useTradeStore = create<TradeStore>((set) => ({
  form: initialForm,
  orders: [],
  setField: (key, value) =>
    set((state) => ({
      form: {
        ...state.form,
        [key]: value,
      },
    })),
  addOrder: (order) =>
    set((state) => ({
      orders: [order, ...state.orders].slice(0, 8),
    })),
  resetForm: () => set({ form: initialForm }),
}));
