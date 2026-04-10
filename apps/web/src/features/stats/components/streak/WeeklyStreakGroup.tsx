import { ActivityGraph } from "@ludocode/design-system/widgets/activity-graph";
import type { DailyGoalMet } from "@ludocode/types/User/UserStreak.ts";

type WeeklyStreakGroupProps = {
  history: DailyGoalMet[];
  className?: string;
  title?: string;
};

export function WeeklyStreakGroup({
  history,
  className,
  title,
}: WeeklyStreakGroupProps) {
  const cells = history.map((day) => ({
    active: day.met,
    date: day.date,
    count: day.met ? 1 : 0,
  }));

  return <ActivityGraph cells={cells} title={title} className={className} />;
}
