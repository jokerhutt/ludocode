import { cn } from "@ludocode/design-system/cn-utils.ts";
import type { DailyGoalMet } from "@ludocode/types/User/UserStreak.ts";
import { FireIcon } from "@heroicons/react/24/solid";

type WeeklyStreakGroupProps = {
  history: DailyGoalMet[];
  className?: string;
  showDates?: boolean;
  title?: string;
  innerClassName?: string;
};

export function WeeklyStreakGroup({
  history,
  className,
  title,
  showDates = true,
  innerClassName,
}: WeeklyStreakGroupProps) {
  const dates = ["M", "T", "W", "T", "F", "S", "S"];

  return (
    <div
      className={cn("w-full flex text-ludo-white flex-col gap-2", className)}
    >
      {title && (
        <h3 className="text-ludo-white-dim text-xs font-semibold uppercase tracking-widest">
          {title}
        </h3>
      )}
      <div
        className={cn(
          "w-full flex justify-between gap-2 bg-ludo-background rounded-xl p-3",
          innerClassName,
        )}
      >
        {history.map((day, index) => (
          <div key={index} className="flex flex-col items-center gap-1.5">
            <div
              className={cn(
                "rounded-sm lg:rounded-lg h-6 w-6 lg:h-9 lg:w-9 flex items-center justify-center transition-colors",
                day.met ? "bg-orange-400/15" : "bg-white/5",
              )}
            >
              {day.met && <FireIcon className="text-orange-400 h-4 w-4" />}
            </div>
            {showDates && (
              <p
                className={cn(
                  "text-[10px] font-medium",
                  day.met ? "text-orange-400/70" : "text-ludo-white-bright/25",
                )}
              >
                {dates[index]}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
