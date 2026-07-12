import { Progress } from "@ludocode/external/ui/progress";
import {
  formatShortDateRange,
  getDateRangeProgress,
  toDate,
} from "@ludocode/util/date/dateUtils";
import { CalendarDays } from "lucide-react";

type LeaderboardPeriodHeaderProps = {
  startDate: number;
  endDate: number;
};

export function LeaderboardPeriodHeader({
  startDate,
  endDate,
}: LeaderboardPeriodHeaderProps) {
  const start = toDate(startDate);
  const end = toDate(endDate);
  const progress = getDateRangeProgress(start, end);

  return (
    <section className="shrink-0 rounded-xl border border-ludo-border bg-ludo-surface-dim p-3 lg:p-4">
      <div className="flex flex-col gap-1.5 lg:flex-row lg:items-center lg:justify-between lg:gap-3">
        <h1 className="text-lg font-bold text-ludo-white-bright lg:text-xl">
          Weekly Leaderboard
        </h1>
        <div className="flex items-center gap-1.5 text-xs text-ludo-white-dim lg:gap-2 lg:text-xs">
          <CalendarDays className="size-3.5 text-ludo-accent-muted lg:size-4" />
          <span>{formatShortDateRange(start, end)}</span>
        </div>
      </div>

      <div className="mt-2.5 lg:mt-4">
        <Progress
          className="h-2 border border-ludo-border bg-ludo-background/60"
          value={progress}
        />
      </div>
    </section>
  );
}
