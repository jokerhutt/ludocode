import type { ReactNode } from "react";

type LeaderboardListProps = {children: ReactNode};

export function LeaderboardList({children}: LeaderboardListProps) {
  return (
        <div className="w-full h-full flex flex-col gap-4">
            {children}
        </div>
  );
}