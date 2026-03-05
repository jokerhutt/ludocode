import {
  Dialog,
  DialogTitle,
  DialogTrigger,
} from "@ludocode/external/ui/dialog.tsx";
import type { ReactNode } from "react";
import type {
  DailyGoalMet,
  UserStreak,
} from "@ludocode/types/User/UserStreak.ts";
import { WeeklyStreakGroup } from "@/features/stats/components/streak/WeeklyStreakGroup.tsx";
import { DialogWrapper } from "@ludocode/design-system/widgets/ludo-dialog.tsx";
import { FireIcon } from "@heroicons/react/24/solid";

type StreakStatsDialogProps = {
  children: ReactNode;
  streak: UserStreak;
  asChild?: boolean;
  pastWeekStreak: DailyGoalMet[];
};

export function StreakStatsDialog({
  children,
  streak,
  asChild = true,
  pastWeekStreak,
}: StreakStatsDialogProps) {
  const { current, best } = streak;

  return (
    <Dialog>
      <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
      <DialogWrapper>
        <div className="flex flex-col items-center gap-4 py-2">
          <div className="w-14 h-14 rounded-full bg-orange-400/15 flex items-center justify-center">
            <FireIcon className="h-7 w-7 text-orange-400" />
          </div>
          <DialogTitle className="text-ludo-white-bright font-bold text-xl">
            Your Streak
          </DialogTitle>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-ludo-background rounded-xl p-4 flex flex-col items-center gap-1">
            <span className="text-orange-400 text-2xl font-bold tabular-nums">
              {current}
            </span>
            <span className="text-ludo-white-dim text-xs font-medium">
              Current
            </span>
          </div>
          <div className="bg-ludo-background rounded-xl p-4 flex flex-col items-center gap-1">
            <span className="text-ludo-accent text-2xl font-bold tabular-nums">
              {best}
            </span>
            <span className="text-ludo-white-dim text-xs font-medium">
              Best
            </span>
          </div>
        </div>

        <WeeklyStreakGroup history={pastWeekStreak} />

        <p className="text-ludo-white-bright/30 text-xs text-center">
          Complete a lesson each day to keep your streak alive!
        </p>
      </DialogWrapper>
    </Dialog>
  );
}
