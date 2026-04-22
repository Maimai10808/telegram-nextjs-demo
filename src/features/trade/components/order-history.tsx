"use client";

import { Empty } from "antd-mobile";

import { useTradeStore } from "@/stores/trade-store";

export function OrderHistory() {
  const orders = useTradeStore((state) => state.orders);

  if (!orders.length) {
    return (
      <section className="panel mt-4 rounded-[28px] p-4">
        <div className="mb-4">
          <p className="text-xs uppercase tracking-[0.24em] text-sky-200/55">
            Local Orders
          </p>
          <h2 className="mt-2 text-lg font-semibold text-white">Order Stream</h2>
        </div>
        <div className="rounded-2xl border border-dashed border-white/10 bg-black/10 py-8">
          <Empty
            description={
              <span className="text-sm text-slate-400">
                下单后会在这里生成本地 mock 订单记录
              </span>
            }
          />
        </div>
      </section>
    );
  }

  return (
    <section className="panel mt-4 rounded-[28px] p-4">
      <div className="mb-4">
        <p className="text-xs uppercase tracking-[0.24em] text-sky-200/55">
          Local Orders
        </p>
        <h2 className="mt-2 text-lg font-semibold text-white">Order Stream</h2>
      </div>

      <div className="space-y-3">
        {orders.map((order) => (
          <div
            key={order.id}
            className="rounded-2xl border border-white/10 bg-black/10 p-4"
          >
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-white">
                {order.symbol} {order.direction}
              </div>
              <div className="rounded-full bg-sky-400/10 px-2.5 py-1 text-xs text-sky-200">
                {order.status}
              </div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3 text-sm text-slate-300">
              <div>Amount: {order.amount} TON</div>
              <div>Expiry: {order.expiryMinutes}m</div>
              <div>Entry: ${order.entryPrice.toFixed(3)}</div>
              <div>Payout: {order.estimatedPayout.toFixed(2)} TON</div>
            </div>
            <div className="mt-3 text-xs text-slate-500">
              {new Date(order.createdAt).toLocaleString("zh-CN")}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
