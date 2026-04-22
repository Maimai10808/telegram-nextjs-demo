"use client";

import { useState } from "react";
import { Toast } from "antd-mobile";
import {
  useTonAddress,
  useTonConnectUI,
  useTonWallet,
} from "@tonconnect/ui-react";

import { buildDemoTonTransfer } from "@/features/wallet/services/ton-transactions";

export function useWalletActions() {
  const wallet = useTonWallet();
  const address = useTonAddress();
  const [tonConnectUI] = useTonConnectUI();
  const [isSendingDemoTx, setIsSendingDemoTx] = useState(false);

  const sendDemoTransfer = async () => {
    if (!wallet) {
      Toast.show({
        content: "请先连接 TON 钱包",
      });
      return;
    }

    try {
      setIsSendingDemoTx(true);
      await tonConnectUI.sendTransaction(buildDemoTonTransfer());
      Toast.show({
        content: "已拉起钱包签名，这笔交易仅用于 demo 演示。",
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "钱包签名流程已取消或失败";
      Toast.show({
        content: message,
      });
    } finally {
      setIsSendingDemoTx(false);
    }
  };

  return {
    wallet,
    address,
    isConnected: Boolean(wallet),
    isSendingDemoTx,
    sendDemoTransfer,
  };
}
