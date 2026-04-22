"use client";

import { Button, List, Tag } from "antd-mobile";
import { TonConnectButton } from "@tonconnect/ui-react";

import { useWalletActions } from "@/features/wallet/hooks/use-wallet-actions";

export function WalletSummaryCard() {
  const { wallet, address, isConnected, isSendingDemoTx, sendDemoTransfer } =
    useWalletActions();

  return (
    <section className="panel rounded-[28px] p-4">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-sky-200/55">
            TON Wallet
          </p>
          <h2 className="mt-2 text-lg font-semibold text-white">
            Wallet Access
          </h2>
        </div>
        <Tag color={isConnected ? "success" : "default"}>
          {isConnected ? "Connected" : "Idle"}
        </Tag>
      </div>

      <div className="rounded-2xl border border-white/10 bg-black/10 p-3">
        <TonConnectButton />
      </div>

      <List className="mt-3">
        <List.Item extra={wallet?.device.appName ?? "Not connected"}>
          Wallet App
        </List.Item>
        <List.Item
          description={
            <span className="font-mono text-[11px] text-slate-300">
              {address || "Connect a wallet to reveal address"}
            </span>
          }
        >
          Wallet Address
        </List.Item>
      </List>

      <Button
        className="mt-3"
        block
        color="primary"
        loading={isSendingDemoTx}
        disabled={!isConnected}
        onClick={sendDemoTransfer}
      >
        Send 0.02 TON Demo Tx
      </Button>
      <p className="mt-2 text-xs leading-5 text-slate-400">
        交易逻辑已封装到 wallet service
      </p>
    </section>
  );
}
