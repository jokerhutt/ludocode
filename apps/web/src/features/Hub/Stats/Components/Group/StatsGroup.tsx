import { useStatsContext } from "@/features/Hub/Stats/Context/StatsContext.tsx";
import { CommitIcon } from "@ludocode/design-system/primitives/custom-icon";
import { FireIcon } from "@heroicons/react/24/solid";
import { CoinsDialog } from "@/features/Hub/Stats/Components/Dialog/CoinsDialog.tsx";
import { StreakStatsDialog } from "@/features/Hub/Stats/Components/Dialog/StreakStatsDialog.tsx";
import { useQuery } from "@tanstack/react-query";
import { qo } from "@/hooks/Queries/Definitions/queries.ts";
import { cn } from "@ludocode/design-system/cn-utils";

type StatsGroupProps = { groupClassName?: string; buttonClassName?: string };

export function StatsGroup({
  groupClassName,
  buttonClassName,
}: StatsGroupProps) {
  const { data: pastWeekStreak } = useQuery(qo.streakPastWeek());
  const { coins, userStreak } = useStatsContext();
  const { current } = userStreak;

  return (
    <div className={cn("flex items-center gap-1.5", groupClassName)}>
      <CoinsDialog coins={coins}>
        <button
          type="button"
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all",
            "bg-ludo-surface/60 hover:bg-ludo-surface hover:cursor-pointer",
            "border border-transparent hover:border-white/30",
            buttonClassName,
          )}
        >
          <CommitIcon className="h-4 w-4 text-white" />
          <span className="text-white text-sm font-semibold tabular-nums">
            {coins}
          </span>
        </button>
      </CoinsDialog>

      <StreakStatsDialog
        pastWeekStreak={pastWeekStreak ?? []}
        streak={userStreak}
      >
        <button
          type="button"
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all",
            "bg-ludo-surface/60 hover:bg-ludo-surface hover:cursor-pointer",
            "border border-transparent hover:border-orange-400/30",
            buttonClassName,
          )}
        >
          <FireIcon className="h-4 w-4 text-orange-400" />
          <span className="text-white text-sm font-semibold tabular-nums">
            {current}
          </span>
        </button>
      </StreakStatsDialog>
    </div>
  );
}
