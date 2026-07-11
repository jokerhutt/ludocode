import { Progress } from "@ludocode/external/ui/progress";
import {
  formatShortDate,
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
    <section className="shrink-0 rounded-xl border border-ludo-border bg-ludo-surface-dim p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-ludo-accent-muted">
            Current round 
          </p>
          <h1
            id="leaderboard-period-title"
            className="text-xl font-bold text-ludo-white-bright"
          >
            Weekly Leaderboard
          </h1>
        </div>

        <div className="flex items-center gap-2 text-xs text-ludo-white-dim">
          <CalendarDays className="size-4 text-ludo-accent-muted" />
          <span>
            <time dateTime={start.toISOString()}>{formatShortDate(start)}</time>
            <span> — </span>
            <time dateTime={end.toISOString()}>{formatShortDate(end)}</time>
          </span>
        </div>
      </div>

      <div className="mt-4">
        <div className="mb-1.5 flex justify-between text-xs font-medium text-ludo-white-dim">
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
