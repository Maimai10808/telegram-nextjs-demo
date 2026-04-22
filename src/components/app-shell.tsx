import type { PropsWithChildren } from "react";

import { BottomTabBar } from "@/components/bottom-tab-bar";

export function AppShell({ children }: PropsWithChildren) {
  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col">
      <div className="tg-safe-bottom flex-1 px-4 py-4">{children}</div>
      <BottomTabBar />
    </div>
  );
}
