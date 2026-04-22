import { Address, beginCell, toNano } from "@ton/core";
import type { SendTransactionRequest } from "@tonconnect/sdk";

export const DEMO_TON_RECEIVER =
  "UQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJKZ";

export function buildDemoTonTransfer(address?: string): SendTransactionRequest {
  Address.parse(address ?? DEMO_TON_RECEIVER);

  const payload = beginCell()
    .storeUint(0, 32)
    .storeStringTail("TON options demo ping")
    .endCell()
    .toBoc()
    .toString("base64");

  return {
    validUntil: Math.floor(Date.now() / 1000) + 5 * 60,
    messages: [
      {
        address: address ?? DEMO_TON_RECEIVER,
        amount: toNano("0.02").toString(),
        payload,
      },
    ],
  };
}
