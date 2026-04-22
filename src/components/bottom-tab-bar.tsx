"use client";

import { usePathname, useRouter } from "next/navigation";
import { TabBar } from "antd-mobile";

const tabs = [
  { key: "/", title: "Home", short: "HM" },
  { key: "/trade", title: "Trade", short: "TR" },
  { key: "/leaderboard", title: "Board", short: "LB" },
  { key: "/rewards", title: "Rewards", short: "RW" },
  { key: "/profile", title: "Profile", short: "ME" },
];

export function BottomTabBar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 mx-auto max-w-md">
      <TabBar
        activeKey={pathname}
        onChange={(value) => {
          router.push(value);
        }}
        safeArea
      >
        {tabs.map((tab) => (
          <TabBar.Item
            key={tab.key}
            title={tab.title}
            icon={
              <div className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[10px] font-semibold tracking-[0.16em]">
                {tab.short}
              </div>
            }
          />
        ))}
      </TabBar>
    </div>
  );
}
