import { NextRequest, NextResponse } from "next/server";
import { parse, validate } from "@tma.js/init-data-node";

import { telegramAuthRequestSchema } from "@/schemas/telegram";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { initDataRaw } = telegramAuthRequestSchema.parse(body);
    const botToken = process.env.TELEGRAM_BOT_TOKEN;

    if (botToken) {
      validate(initDataRaw, botToken);
    }

    const parsed = parse(initDataRaw);
    const user = parsed.user
      ? {
          id: parsed.user.id,
          firstName: parsed.user.firstName,
          lastName: parsed.user.lastName,
          username: parsed.user.username,
          languageCode: parsed.user.languageCode,
          isPremium: parsed.user.isPremium,
          allowsWriteToPm: parsed.user.allowsWriteToPm,
          photoUrl: parsed.user.photoUrl,
        }
      : null;

    return NextResponse.json({
      ok: true,
      verified: Boolean(botToken),
      warning: botToken
        ? null
        : "TELEGRAM_BOT_TOKEN 未配置，当前仅解析 initData 供本地 demo 预览。",
      user,
      authDate: parsed.authDate ? String(parsed.authDate) : null,
      startParam: parsed.startParam ?? null,
      hashPresent: initDataRaw.includes("hash="),
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        verified: false,
        user: null,
        authDate: null,
        startParam: null,
        hashPresent: false,
        error:
          error instanceof Error ? error.message : "Invalid Telegram init data",
      },
      {
        status: 401,
      },
    );
  }
}
