"use client";

import { NoticeBar, Tag } from "antd-mobile";

import { useTelegramAuth } from "@/features/telegram/hooks/use-telegram-auth";
import { useTelegramRuntime } from "@/features/telegram/components/telegram-runtime-provider";

export function TelegramStatusBanner() {
  const runtime = useTelegramRuntime();
  const authQuery = useTelegramAuth();

  if (runtime.isTelegram && authQuery.data?.verified) {
    return (
      <div className="mb-4 flex items-center justify-between rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3">
        <div>
          <div className="text-sm font-semibold text-emerald-100">
            Telegram Auth Verified
          </div>
          <div className="mt-1 text-xs text-emerald-100/70">
            initData 已通过服务端校验，可以直接演示容器接入链路。
          </div>
        </div>
        <Tag color="success">LIVE</Tag>
      </div>
    );
  }

  if (runtime.isTelegram && authQuery.data?.warning) {
    return (
      <NoticeBar
        className="mb-4 rounded-2xl"
        color="alert"
        content={authQuery.data.warning}
      />
    );
  }

  if (!runtime.isTelegram) {
    return (
      <NoticeBar
        className="mb-4 rounded-2xl"
        color="info"
        content="当前是浏览器预览模式。Telegram 用户态和 initData 校验会展示 fallback 提示。"
      />
    );
  }

  return null;
}
