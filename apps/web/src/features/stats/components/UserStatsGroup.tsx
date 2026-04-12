import { FireIcon } from "@heroicons/react/24/solid";
import { StatsCard } from "./StatsCard.tsx";
import { useStatsContext } from "@/features/stats/context/StatsContext.tsx";
import { StreakStatsDialog } from "./streak/StreakStatsDialog.tsx";
import { useSuspenseQuery } from "@tanstack/react-query";
import { qo } from "@/queries/definitions/queries.ts";
import { MiniActivityGraph } from "@ludocode/design-system/widgets/activity-graph";
import { ZapIcon } from "lucide-react";
import { XpDialog } from "./xp/XpDialog.tsx";
import { MiniXpChart } from "./xp/MiniXpChart.tsx";

export function UserStatsGroup() {
  const statsContext = useStatsContext();
  const { data: pastWeekStreak } = useSuspenseQuery(qo.streakPastWeek());
  const { userStreak, userXp } = statsContext;
  const { current } = userStreak;

  const streakCells = pastWeekStreak.map((day) => ({
    active: day.met,
    date: day.date,
    count: day.met ? 1 : 0,
  }));

  return (
    <div className="w-full flex flex-col lg:flex-row gap-4">
      <StreakStatsDialog streak={userStreak} pastWeekStreak={pastWeekStreak}>
        <div className="flex flex-2">
          <StatsCard
            text="Day Streak"
            score={current}
            graph={
              streakCells.length ? (
                <MiniActivityGraph cells={streakCells} color="orange" />
              ) : undefined
            }
          >
            <FireIcon className="h-6 text-orange-400" />
          </StatsCard>
        </div>
      </StreakStatsDialog>

      <XpDialog>
        <div className="flex flex-2">
          <StatsCard
            text="XP"
            score={userXp}
            graph={
              <div className="w-full h-full">
                <MiniXpChart />
              </div>
            }
          >
            <ZapIcon className="h-5 fill-ludo-accent-muted text-ludo-accent-muted" />
          </StatsCard>
        </div>
      </XpDialog>

    </div>
  );
}
