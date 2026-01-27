import { FireIcon } from "@heroicons/react/24/solid";
import { StatsCard } from "../Card/StatsCard";
import { CommitIcon } from "@ludocode/design-system/primitives/custom-icon";
import { useStatsContext } from "@/features/Hub/Stats/Context/StatsContext";

export function UserStatsGroup() {
  const statsContext = useStatsContext();
  const { coins, userStreak } = statsContext;
  const { current } = userStreak;

  return (
    <div className="w-full flex justify-between gap-4">
      <StatsCard text="Day Streak" score={current}>
        <FireIcon className="h-6 text-orange-400" />
      </StatsCard>
      <StatsCard text="Commits" score={coins}>
        <CommitIcon className="h-6 text-pythonYellow" />
      </StatsCard>
    </div>
  );
}
