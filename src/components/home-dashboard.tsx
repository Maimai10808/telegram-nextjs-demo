"use client";

import Link from "next/link";
import { Button, Skeleton, Tag } from "antd-mobile";

import { TelegramStatusBanner } from "@/features/telegram/components/telegram-status-banner";
import { useTelegramAuth } from "@/features/telegram/hooks/use-telegram-auth";
import { getTelegramDisplayName } from "@/features/telegram/services/telegram-auth";
import { useWalletActions } from "@/features/wallet/hooks/use-wallet-actions";
import { useTradeQuote } from "@/features/trade/hooks/use-trade-quote";
import { WalletSummaryCard } from "@/features/wallet/components/wallet-summary-card";

export function HomeDashboard() {
  const authQuery = useTelegramAuth();
  const wallet = useWalletActions();
  const quote = useTradeQuote();

  return (
    <div className="space-y-4">
      <TelegramStatusBanner />

      <section className="panel overflow-hidden rounded-[32px] p-5">
        <div className="text-xs uppercase tracking-[0.28em] text-sky-200/55">
          Telegram Mini App
        </div>
        <h1 className="mt-3 text-[28px] font-semibold leading-9 text-white">
          TON 轻量期权交易 Demo
        </h1>
        <p className="mt-3 max-w-[280px] text-sm leading-6 text-slate-300">
          展示 Telegram 容器接入、TON
          钱包连接、服务端身份校验、轻量交易面板和增长模块。
        </p>

        <div className="mt-4 flex items-center gap-2">
          <Tag color="primary">
            {authQuery.data?.verified ? "Telegram Verified" : "Preview Mode"}
          </Tag>
          <Tag color={wallet.isConnected ? "success" : "default"}>
            {wallet.isConnected ? "Wallet Ready" : "Wallet Pending"}
          </Tag>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <Link href="/trade" prefetch>
            <Button block color="primary">
              Start Trade
            </Button>
          </Link>
          <Link href="/leaderboard" prefetch>
            <Button block fill="outline">
              View Board
            </Button>
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3">
        <div className="panel rounded-[24px] p-4">
          <div className="text-xs text-slate-500">Current User</div>
          <div className="mt-2 text-base font-semibold text-white">
            {authQuery.isLoading
              ? "Loading..."
              : getTelegramDisplayName(authQuery.data?.user ?? null)}
          </div>
          <div className="mt-2 text-xs text-slate-400">
            {authQuery.data?.verified ? "server verified" : "browser preview"}
          </div>
        </div>

        <div className="panel rounded-[24px] p-4">
          <div className="text-xs text-slate-500">TON Spot</div>
          {quote.isLoading ? (
            <Skeleton
              animated
              style={{ "--width": "80%", "--height": "24px" }}
            />
          ) : (
            <>
              <div className="mt-2 text-base font-semibold text-white">
                ${quote.data?.price.toFixed(3)}
              </div>
              <div className="mt-2 text-xs text-emerald-200">
                24h {quote.data?.change24h}%
              </div>
            </>
          )}
        </div>
      </section>

      <WalletSummaryCard />
    </div>
  );
}
