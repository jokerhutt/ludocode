import { useStatsContext } from "@/features/stats/context/StatsContext.tsx";
import { CommitIcon } from "@ludocode/design-system/primitives/custom-icon.tsx";
import { FireIcon } from "@heroicons/react/24/solid";
import { CoinsDialog } from "@/features/stats/components/coins/CoinsDialog.tsx";
import { StreakStatsDialog } from "@/features/stats/components/streak/StreakStatsDialog.tsx";
import { useQuery } from "@tanstack/react-query";
import { qo } from "@/queries/definitions/queries.ts";
import { cn } from "@ludocode/design-system/cn-utils.ts";
import { ZapIcon } from "lucide-react";
import { XpDialog } from "@/features/stats/components/xp/XpDialog.tsx";

type StatsGroupProps = { groupClassName?: string; buttonClassName?: string };

export function StatsGroup({
  groupClassName,
  buttonClassName,
}: StatsGroupProps) {
  const { data: pastWeekStreak } = useQuery(qo.streakPastWeek());
  const { coins, userStreak, userXp } = useStatsContext();
  const { current } = userStreak;

  return (
    <div className={cn("flex items-center gap-1.5", groupClassName)}>
      <CoinsDialog coins={coins}>
        <button
          type="button"
          className={cn(
            "flex items-center gap-1.5 px-2 py-1.5 rounded-full transition-all",
            "bg-ludo-surface-dim hover:bg-ludo-surface hover:cursor-pointer",
            "border border-transparent hover:border-white/30",
            buttonClassName,
          )}
        >
          <CommitIcon className="h-4 w-4 text-ludo-white-bright" />
          <span className="text-ludo-white-bright text-sm font-semibold tabular-nums">
            {coins}
          </span>
        </button>
      </CoinsDialog>

      <XpDialog>
        <button
          type="button"
          className={cn(
            "flex items-center gap-1.5 py-1.5 px-2 rounded-full transition-all",
            "bg-ludo-surface-dim hover:bg-ludo-surface hover:cursor-pointer",
            "border border-transparent hover:border-ludo-accent-muted/30",
            buttonClassName,
          )}
        >
          <ZapIcon className="h-4 w-4 fill-ludo-accent-muted text-ludo-accent-muted" />
          <span className="text-ludo-white-bright text-sm font-semibold tabular-nums">
            {userXp}
          </span>
        </button>
      </XpDialog>

      <StreakStatsDialog
        pastWeekStreak={pastWeekStreak ?? []}
        streak={userStreak}
      >
        <button
          type="button"
          className={cn(
            "flex items-center gap-1.5 py-1.5 px-2 rounded-full transition-all",
            "bg-ludo-surface-dim hover:bg-ludo-surface hover:cursor-pointer",
            "border border-transparent hover:border-orange-400/30",
            buttonClassName,
          )}
        >
          <FireIcon className="h-4 w-4 text-orange-400" />
          <span className="text-ludo-white-bright text-sm font-semibold tabular-nums">
            {current}
          </span>
        </button>
      </StreakStatsDialog>
    </div>
  );
}
