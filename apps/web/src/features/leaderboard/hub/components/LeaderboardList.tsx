import type { ReactNode } from "react";

type LeaderboardListProps = {children: ReactNode;};

export function LeaderboardList({children}: LeaderboardListProps) {
  return (
        <div className="scrollable flex-1 w-full flex flex-col gap-4 [scrollbar-gutter:stable]">
            {children}
        </div>
  );
}
