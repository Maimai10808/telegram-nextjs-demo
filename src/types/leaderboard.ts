export type LeaderboardEntry = {
  rank: number;
  username: string;
  pnl: number;
  inviteCount: number;
  winRate: number;
};

export type LeaderboardResponse = {
  entries: LeaderboardEntry[];
  refreshedAt: string;
};
