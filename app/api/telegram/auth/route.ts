import { NextRequest, NextResponse } from "next/server";
import { parse, validate } from "@tma.js/init-data-node";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const initDataRaw = body?.initDataRaw as string | undefined;

    if (!initDataRaw) {
      return NextResponse.json(
        { ok: false, error: "Missing initDataRaw" },
        { status: 400 },
      );
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;

    if (!botToken) {
      return NextResponse.json(
        { ok: false, error: "Missing TELEGRAM_BOT_TOKEN" },
        { status: 500 },
      );
    }

    validate(initDataRaw, botToken);
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
      user,
      authDate: parsed.authDate ? String(parsed.authDate) : null,
      startParam: parsed.startParam ?? null,
    });
  } catch (error) {
    console.error("Telegram auth verify failed:", error);

    return NextResponse.json(
      {
        ok: false,
        error: "Invalid Telegram init data",
      },
      { status: 401 },
    );
  }
}
