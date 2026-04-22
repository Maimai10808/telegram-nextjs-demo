"use client";

import { Skeleton } from "antd-mobile";

import { useLeaderboardQuery } from "@/features/leaderboard/hooks/use-leaderboard-query";

export function LeaderboardList() {
  const query = useLeaderboardQuery();

  if (query.isLoading) {
    return (
      <section className="panel rounded-[28px] p-4">
        <Skeleton animated style={{ "--width": "100%", "--height": "160px" }} />
      </section>
    );
  }

  return (
    <section className="panel rounded-[28px] p-4">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-sky-200/55">
            Weekly Board
          </p>
          <h1 className="mt-2 text-xl font-semibold text-white">Leaderboard</h1>
        </div>
        <p className="text-xs text-slate-400">
          Updated{" "}
          {query.data
            ? new Date(query.data.refreshedAt).toLocaleTimeString("zh-CN")
            : "--"}
        </p>
      </div>

      <div className="mt-4 space-y-3">
        {query.data?.entries.map((entry) => (
          <div
            key={entry.rank}
            className="rounded-2xl border border-white/10 bg-black/10 p-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs text-slate-500">Rank #{entry.rank}</div>
                <div className="mt-1 text-base font-semibold text-white">
                  {entry.username}
                </div>
              </div>
              <div className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-200">
                +{entry.pnl} USDT
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-300">
              <div>Invite Count: {entry.inviteCount}</div>
              <div>Win Rate: {entry.winRate}%</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
