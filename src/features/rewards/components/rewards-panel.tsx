"use client";

import { Button, Skeleton, Toast } from "antd-mobile";

import { useRewardsQuery } from "@/features/rewards/hooks/use-rewards-query";

export function RewardsPanel() {
  const query = useRewardsQuery();

  const copyInviteCode = async () => {
    if (!query.data?.inviteCode) {
      return;
    }

    try {
      await navigator.clipboard.writeText(query.data.inviteCode);
      Toast.show({
        content: "邀请码已复制",
      });
    } catch {
      Toast.show({
        content: "复制失败，请手动复制",
      });
    }
  };

  if (query.isLoading) {
    return (
      <section className="panel rounded-[28px] p-4">
        <Skeleton animated style={{ "--width": "100%", "--height": "220px" }} />
      </section>
    );
  }

  if (!query.data) {
    return null;
  }

  return (
    <section className="panel rounded-[28px] p-4">
      <p className="text-xs uppercase tracking-[0.24em] text-sky-200/55">
        Invite Rewards
      </p>
      <h1 className="mt-2 text-xl font-semibold text-white">Growth Loop</h1>

      <div className="mt-4 rounded-[24px] border border-sky-300/10 bg-sky-300/5 p-4">
        <div className="text-xs text-slate-400">Invite Code</div>
        <div className="mt-2 font-mono text-2xl font-semibold text-white">
          {query.data.inviteCode}
        </div>
        <Button className="mt-4" block color="primary" onClick={copyInviteCode}>
          Copy Invite Code
        </Button>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3">
        <div className="rounded-2xl border border-white/10 bg-black/10 p-3">
          <div className="text-xs text-slate-500">Invites</div>
          <div className="mt-2 text-lg font-semibold text-white">
            {query.data.inviteCount}
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/10 p-3">
          <div className="text-xs text-slate-500">Points</div>
          <div className="mt-2 text-lg font-semibold text-white">
            {query.data.totalPoints}
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/10 p-3">
          <div className="text-xs text-slate-500">Pending</div>
          <div className="mt-2 text-lg font-semibold text-white">
            +{query.data.pendingBoost}
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-white/10 bg-black/10 p-4">
        <div className="text-sm font-semibold text-white">Point Rules</div>
        <div className="mt-3 space-y-3 text-sm text-slate-300">
          {query.data.rules.map((rule) => (
            <div key={rule} className="rounded-xl border border-white/5 bg-white/5 p-3">
              {rule}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
