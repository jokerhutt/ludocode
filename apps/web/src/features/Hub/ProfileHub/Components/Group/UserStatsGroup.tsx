import { FireIcon } from "@heroicons/react/24/solid";
import { StatsCard } from "../Card/StatsCard";
import { CommitIcon } from "@ludocode/design-system/primitives/custom-icon";

type UserStatsGroupProps = { streak: number; commits: number };

export function UserStatsGroup({ streak, commits }: UserStatsGroupProps) {
  return (
    <div className="w-full flex justify-between gap-4">
      <StatsCard text="Day Streak" score={streak}>
        <FireIcon className="h-6 text-orange-400" />
      </StatsCard>
      <StatsCard text="Commits" score={commits}>
        <CommitIcon className="h-6 text-pythonYellow" />
      </StatsCard>
    </div>
  );
}
