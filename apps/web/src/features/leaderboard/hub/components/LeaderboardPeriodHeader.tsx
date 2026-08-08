import { Progress } from "@ludocode/external/ui/progress";
import { PageMasthead } from "@ludocode/design-system/zones/page-masthead.tsx";
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
    <PageMasthead
      className="shrink-0"
      eyebrow="Weekly ranking"
      title="Leaderboard"
      subtitle="Earn XP this week to climb the leaderboard"
    >
      <div className="flex w-full flex-col gap-2 rounded-lg border border-ludo-border bg-ludo-surface-dim px-4 py-3 lg:w-60">
        <div className="flex items-center gap-2">
          <CalendarDays className="size-3.5 shrink-0 text-ludo-accent-muted" />
          <span className="truncate text-xs text-ludo-white">
            {formatShortDateRange(start, end)}
          </span>
        </div>
        <Progress className="h-1.5 bg-ludo-background" value={progress} />
      </div>
    </PageMasthead>
  );
}
