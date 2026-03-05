import { FireIcon } from "@heroicons/react/24/solid";
import { StatsCard } from "./StatsCard.tsx";
import { CommitIcon } from "@ludocode/design-system/primitives/custom-icon.tsx";
import { useStatsContext } from "@/features/stats/context/StatsContext.tsx";
import { CoinsDialog } from "./coins/CoinsDialog.tsx";
import { StreakStatsDialog } from "./streak/StreakStatsDialog.tsx";
import { useSuspenseQuery } from "@tanstack/react-query";
import { qo } from "@/queries/definitions/queries.ts";

export function UserStatsGroup() {
  const statsContext = useStatsContext();
  const { data: pastWeekStreak } = useSuspenseQuery(qo.streakPastWeek());
  const { coins, userStreak } = statsContext;
  const { current } = userStreak;

  return (
    <div className="w-full flex justify-between gap-4">
      <StreakStatsDialog
        streak={userStreak}
        pastWeekStreak={pastWeekStreak}
      >
        <div className="w-full flex">
          <StatsCard text="Day Streak" score={current}>
            <FireIcon className="h-6 text-orange-400" />
          </StatsCard>
        </div>
      </StreakStatsDialog>
      <CoinsDialog coins={coins}>
        <div className="w-full flex">
          <StatsCard text="Commits" score={coins}>
            <CommitIcon className="h-6 text-pythonYellow" />
          </StatsCard>
        </div>
      </CoinsDialog>
    </div>
  );
}
