"use client";

import { useQuery } from "@tanstack/react-query";

import { apiGet } from "@/lib/api-client";
import type { RewardsSnapshot } from "@/types/rewards";

export function useRewardsQuery() {
  return useQuery({
    queryKey: ["rewards"],
    queryFn: () => apiGet<RewardsSnapshot>("/api/rewards"),
  });
}
