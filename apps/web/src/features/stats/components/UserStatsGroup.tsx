import { FireIcon } from "@heroicons/react/24/solid";
import { StatsCard } from "./StatsCard.tsx";
import { CommitIcon } from "@ludocode/design-system/primitives/custom-icon.tsx";
import { useStatsContext } from "@/features/stats/context/StatsContext.tsx";

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
