"use client";

import { Button, Input, Selector, Skeleton, Tag } from "antd-mobile";

import { useTradePanel } from "@/features/trade/hooks/use-trade-panel";
import { cn } from "@/lib/cn";

const directionOptions = [
  { label: "UP", value: "UP" },
  { label: "DOWN", value: "DOWN" },
] as const;

const expiryOptions = [
  { label: "1m", value: 1 },
  { label: "5m", value: 5 },
  { label: "15m", value: 15 },
];

export function TradePanel() {
  const {
    form,
    setField,
    fieldErrors,
    projectedPayout,
    quoteQuery,
    submitOrder,
    isSubmitting,
  } = useTradePanel();

  return (
    <section className="panel rounded-[28px] p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-sky-200/55">
            Quick Option
          </p>
          <h2 className="mt-2 text-lg font-semibold text-white">One Tap Trade</h2>
        </div>
        <Tag color="primary">{form.symbol}</Tag>
      </div>

      <div className="mt-4 rounded-2xl border border-white/10 bg-black/10 p-3">
        {quoteQuery.isLoading ? (
          <Skeleton animated style={{ "--width": "100%", "--height": "60px" }} />
        ) : (
          <div className="flex items-end justify-between">
            <div>
              <div className="text-xs text-slate-400">Spot Price</div>
              <div className="mt-2 text-3xl font-semibold text-white">
                ${quoteQuery.data?.price.toFixed(3) ?? "6.180"}
              </div>
            </div>
            <div
              className={cn(
                "rounded-full px-3 py-1 text-xs font-semibold",
                (quoteQuery.data?.change24h ?? 0) >= 0
                  ? "bg-emerald-400/15 text-emerald-200"
                  : "bg-rose-400/15 text-rose-200",
              )}
            >
              24h {(quoteQuery.data?.change24h ?? 0) >= 0 ? "+" : ""}
              {quoteQuery.data?.change24h ?? 0}%
            </div>
          </div>
        )}
      </div>

      <div className="mt-4">
        <div className="mb-2 text-sm font-medium text-slate-200">Direction</div>
        <Selector
          columns={2}
          value={[form.direction]}
          options={directionOptions.map((option) => ({
            ...option,
            className: "min-h-[44px]",
          }))}
          onChange={(value) => {
            if (value[0] === "UP" || value[0] === "DOWN") {
              setField("direction", value[0]);
            }
          }}
        />
      </div>

      <div className="mt-4">
        <div className="mb-2 text-sm font-medium text-slate-200">Amount</div>
        <div className="rounded-2xl border border-white/10 bg-black/10 px-4 py-2">
          <Input
            type="number"
            value={form.amount}
            onChange={(value) => {
              setField("amount", value);
            }}
            placeholder="Input TON amount"
          />
        </div>
        {fieldErrors.amount ? (
          <p className="mt-2 text-xs text-rose-300">{fieldErrors.amount}</p>
        ) : null}
      </div>

      <div className="mt-4">
        <div className="mb-2 text-sm font-medium text-slate-200">Expiry</div>
        <Selector
          columns={3}
          value={[form.expiryMinutes]}
          options={expiryOptions}
          onChange={(value) => {
            const expiry = value[0];
            if (expiry === 1 || expiry === 5 || expiry === 15) {
              setField("expiryMinutes", expiry);
            }
          }}
        />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
          <div className="text-xs text-slate-400">Estimated Payout</div>
          <div className="mt-2 text-xl font-semibold text-white">
            {projectedPayout.toFixed(2)} TON
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
          <div className="text-xs text-slate-400">Return Multiple</div>
          <div className="mt-2 text-xl font-semibold text-white">
            {Number(form.amount) > 0
              ? `${(projectedPayout / Number(form.amount)).toFixed(2)}x`
              : "--"}
          </div>
        </div>
      </div>

      <Button
        className="mt-4"
        block
        color="primary"
        loading={isSubmitting}
        onClick={() => {
          void submitOrder();
        }}
      >
        Place Order
      </Button>
    </section>
  );
}
