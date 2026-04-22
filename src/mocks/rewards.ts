import type { RewardsSnapshot } from "@/types/rewards";

export const rewardsSnapshot: RewardsSnapshot = {
  inviteCode: "TONFAST88",
  inviteCount: 12,
  totalPoints: 2480,
  pendingBoost: 180,
  rules: [
    "Each verified invite gives 100 points.",
    "First on-chain wallet connection gives 50 points.",
    "Daily streak check-in adds a 1.1x boost to points earned that day.",
    "Top 10 leaderboard users receive an extra weekly rewards multiplier.",
  ],
};
