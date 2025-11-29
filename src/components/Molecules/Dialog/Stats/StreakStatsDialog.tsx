import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogWrapper } from "../DialogWrapper";
import type { ReactNode } from "react";
import type { DailyGoalMet, UserStreak } from "@/Types/Progress/UserStreak";
import { StreakWeeklyWidget } from "../../Group/StreakWeeklyWidget";

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
        <StreakWeeklyWidget history={pastWeekStreak} />
      </DialogWrapper>
    </Dialog>
  );
}
