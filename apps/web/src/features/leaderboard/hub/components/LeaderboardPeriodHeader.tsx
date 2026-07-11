import { Progress } from "@ludocode/external/ui/progress";
import { formatShortDateRange, getDateRangeProgress, toDate } from "@ludocode/util/date/dateUtils";
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
        <div>
          <p className="hidden text-xs font-bold uppercase tracking-wider text-ludo-accent-muted lg:block">
            Current round
          </p>
          <h1
            id="leaderboard-period-title"
            className="text-lg font-bold text-ludo-white-bright lg:text-xl"
          >
            Weekly Leaderboard
          </h1>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] text-ludo-white-dim lg:gap-2 lg:text-xs">
          <CalendarDays className="size-3.5 text-ludo-accent-muted lg:size-4" />
          <span>{formatShortDateRange(start, end)}</span>
        </div>
      </div>

      <div className="mt-2.5 lg:mt-4">
        <div className="mb-1 flex justify-between text-[11px] font-medium text-ludo-white-dim lg:mb-1.5 lg:text-xs">
          <span>Week progress</span>
          <span className="text-ludo-accent-muted tabular-nums">
            {Math.round(progress)}%
          </span>
        </div>
        <Progress
          className="h-2 border border-ludo-border bg-ludo-background/60"
          value={progress}
        />
      </div>
    </section>
  );
}
