"use client";

import { useMemo } from "react";
import { Skeleton, Tag } from "antd-mobile";

import { getTelegramDisplayName } from "@/features/telegram/services/telegram-auth";
import { useTelegramAuth } from "@/features/telegram/hooks/use-telegram-auth";
import { useTelegramRuntime } from "@/features/telegram/components/telegram-runtime-provider";
import { useWalletActions } from "@/features/wallet/hooks/use-wallet-actions";

export function ProfileOverview() {
  const runtime = useTelegramRuntime();
  const authQuery = useTelegramAuth();
  const wallet = useWalletActions();

  const debugData = useMemo(
    () => ({
      launchParams: runtime.launchParams,
      authResult: authQuery.data,
      walletConnected: wallet.isConnected,
      walletAddress: wallet.address,
      walletApp: wallet.wallet?.device.appName ?? null,
    }),
    [authQuery.data, runtime.launchParams, wallet.address, wallet.isConnected, wallet.wallet],
  );

  return (
    <section className="space-y-4">
      <div className="panel rounded-[28px] p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-sky-200/55">
              Account Center
            </p>
            <h1 className="mt-2 text-xl font-semibold text-white">Profile</h1>
          </div>
          <Tag color={authQuery.data?.verified ? "success" : "warning"}>
            {authQuery.data?.verified ? "AUTH OK" : "DEMO MODE"}
          </Tag>
        </div>

        <div className="mt-4 rounded-2xl border border-white/10 bg-black/10 p-4">
          <div className="text-xs text-slate-500">Telegram User</div>
          <div className="mt-2 text-lg font-semibold text-white">
            {getTelegramDisplayName(authQuery.data?.user ?? null)}
          </div>
          <div className="mt-2 text-sm text-slate-400">
            {runtime.isTelegram ? "Container detected" : "Browser fallback"}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-white/10 bg-black/10 p-3">
            <div className="text-xs text-slate-500">Telegram Auth</div>
            <div className="mt-2 text-base font-semibold text-white">
              {authQuery.isLoading ? "Checking..." : authQuery.data?.verified ? "Verified" : "Fallback"}
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/10 p-3">
            <div className="text-xs text-slate-500">Wallet</div>
            <div className="mt-2 text-base font-semibold text-white">
              {wallet.isConnected ? "Connected" : "Not Connected"}
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-white/10 bg-black/10 p-4">
          <div className="text-xs text-slate-500">TON Address</div>
          <div className="mt-2 break-all font-mono text-xs text-slate-200">
            {wallet.address || "No wallet address yet"}
          </div>
        </div>
      </div>

      <div className="panel rounded-[28px] p-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Debug Console</h2>
          {authQuery.isLoading ? <Skeleton animated style={{ "--width": "44px" }} /> : null}
        </div>
        <pre className="overflow-x-auto rounded-2xl bg-black/20 p-4 text-[11px] leading-5 text-slate-300">
          {JSON.stringify(debugData, null, 2)}
        </pre>
      </div>
    </section>
  );
}
