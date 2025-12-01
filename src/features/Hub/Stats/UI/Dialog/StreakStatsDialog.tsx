import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/external/ui/dialog.tsx";
import { DialogWrapper } from "@/components/design-system/blocks/dialog/dialog-wrapper.tsx";
import type { ReactNode } from "react";
import type { DailyGoalMet, UserStreak } from "@/types/User/UserStreak.ts";
import { WeeklyStreakGroup } from "@/features/Hub/Stats/UI/Group/WeeklyStreakGroup.tsx";

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
