"use client";

import { useEffect, useMemo, useState } from "react";
import { retrieveLaunchParams } from "@tma.js/sdk";
import {
  TonConnectButton,
  useTonAddress,
  useTonWallet,
} from "@tonconnect/ui-react";

type TelegramAuthResponse = {
  ok: boolean;
  user?: {
    id?: number;
    firstName?: string;
    lastName?: string;
    username?: string;
    languageCode?: string;
    isPremium?: boolean;
    allowsWriteToPm?: boolean;
    photoUrl?: string;
  } | null;
  authDate?: string | null;
  startParam?: string | null;
  error?: string;
};

export default function HomePage() {
  const wallet = useTonWallet();
  const walletAddress = useTonAddress();

  const [initDataRaw, setInitDataRaw] = useState("");
  const [launchError, setLaunchError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [authResult, setAuthResult] = useState<TelegramAuthResponse | null>(
    null,
  );

  useEffect(() => {
    try {
      const lp = retrieveLaunchParams();

      // 某些环境下字段名可能是 initDataRaw，也可能需要从 initData 拿原始值。
      // 这里先优先取 initDataRaw；如果没有，就给空字符串。
      const raw = (lp as { initDataRaw?: string }).initDataRaw ?? "";
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setInitDataRaw(raw);
      setLaunchError("");
    } catch (error) {
      console.error(error);
      setLaunchError(
        "Launch params not found. You are probably opening this page outside Telegram.",
      );
    }
  }, []);

  async function handleVerifyTelegramAuth() {
    if (!initDataRaw) {
      setAuthResult({
        ok: false,
        error: "Missing initDataRaw. Open the page inside Telegram Mini App.",
      });
      return;
    }

    setAuthLoading(true);
    setAuthResult(null);

    try {
      const res = await fetch("/api/telegram/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ initDataRaw }),
      });

      const data: TelegramAuthResponse = await res.json();
      setAuthResult(data);
    } catch (error) {
      console.error(error);
      setAuthResult({
        ok: false,
        error: "Request failed while verifying Telegram auth.",
      });
    } finally {
      setAuthLoading(false);
    }
  }

  const telegramUserLabel = useMemo(() => {
    if (!authResult?.ok || !authResult.user) return "Not verified";

    const firstName = authResult.user.firstName ?? "";
    const lastName = authResult.user.lastName ?? "";
    const username = authResult.user.username
      ? `@${authResult.user.username}`
      : "";

    return (
      [firstName, lastName].filter(Boolean).join(" ") ||
      username ||
      "Verified user"
    );
  }, [authResult]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl md:p-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Telegram Mini App + TON Demo
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Minimal starter: Telegram auth verification + TON wallet connect
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
              <h2 className="mb-4 text-base font-semibold text-slate-900">
                TON Wallet
              </h2>

              <div className="mb-4 rounded-xl bg-white p-3">
                <TonConnectButton />
              </div>

              <div className="space-y-3 text-sm text-slate-700">
                <div className="rounded-xl bg-white p-3">
                  <p className="text-xs text-slate-500">Wallet app</p>
                  <p className="mt-1 font-medium">
                    {wallet?.device.appName ?? "Not connected"}
                  </p>
                </div>

                <div className="rounded-xl bg-white p-3">
                  <p className="text-xs text-slate-500">Wallet address</p>
                  <p className="mt-1 break-all font-medium">
                    {walletAddress || "Not connected"}
                  </p>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
              <h2 className="mb-4 text-base font-semibold text-slate-900">
                Telegram Auth
              </h2>

              <div className="space-y-3 text-sm text-slate-700">
                <div className="rounded-xl bg-white p-3">
                  <p className="text-xs text-slate-500">Launch params status</p>
                  <p className="mt-1 font-medium">
                    {launchError ? "Unavailable" : "Loaded"}
                  </p>
                </div>

                <div className="rounded-xl bg-white p-3">
                  <p className="text-xs text-slate-500">initDataRaw</p>
                  <p className="mt-1 break-all font-medium">
                    {initDataRaw ? "Present" : "Missing"}
                  </p>
                </div>

                <div className="rounded-xl bg-white p-3">
                  <p className="text-xs text-slate-500">Telegram user</p>
                  <p className="mt-1 font-medium">{telegramUserLabel}</p>
                </div>

                {launchError && (
                  <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-amber-700">
                    {launchError}
                  </div>
                )}

                <button
                  onClick={handleVerifyTelegramAuth}
                  disabled={authLoading}
                  className="w-full rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 disabled:opacity-50"
                >
                  {authLoading ? "Verifying..." : "Verify Telegram Auth"}
                </button>
              </div>
            </section>
          </div>

          <section className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
            <h2 className="mb-4 text-base font-semibold text-slate-900">
              Verification Result
            </h2>

            <div className="rounded-2xl bg-slate-950 p-4 text-sm text-slate-100">
              <pre className="overflow-x-auto whitespace-pre-wrap break-all">
                {JSON.stringify(authResult, null, 2)}
              </pre>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
