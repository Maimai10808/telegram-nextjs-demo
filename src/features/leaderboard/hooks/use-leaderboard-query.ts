"use client";

import { useQuery } from "@tanstack/react-query";

import { apiGet } from "@/lib/api-client";
import type { LeaderboardResponse } from "@/types/leaderboard";

export function useLeaderboardQuery() {
  return useQuery({
    queryKey: ["leaderboard"],
    queryFn: () => apiGet<LeaderboardResponse>("/api/leaderboard"),
  });
}
