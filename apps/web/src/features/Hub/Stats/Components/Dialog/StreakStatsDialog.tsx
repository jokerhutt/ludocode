import {
  Dialog,
  DialogTitle,
  DialogTrigger,
} from "@ludocode/external/ui/dialog.tsx";
import type { ReactNode } from "react";
import type { DailyGoalMet, UserStreak } from "@ludocode/types/User/UserStreak.ts";
import { WeeklyStreakGroup } from "@/features/Hub/Stats/Components/Group/WeeklyStreakGroup.tsx";
import { DialogWrapper } from "@ludocode/design-system/widgets/ludo-dialog.tsx";

type StreakStatsDialogProps = {
  children: ReactNode;
  streak: UserStreak;
  pastWeekStreak: DailyGoalMet[];
};

export function StreakStatsDialog({
  children,
  streak,
  pastWeekStreak,
}: StreakStatsDialogProps) {
  const { current, best } = streak;

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogWrapper>
        <DialogTitle className="text-white text-start code font-bold text-xl">
          Your Streak
        </DialogTitle>
        <hr />
        <div className="w-full items-start text-white grid grid-cols-2">
          <div>
            <p className="text-start">Current: {current} days</p>
          </div>
          <p className="text-start">Best: {best} days</p>
        </div>
        <WeeklyStreakGroup title="Weekly Streak" history={pastWeekStreak} />
      </DialogWrapper>
    </Dialog>
  );
}
