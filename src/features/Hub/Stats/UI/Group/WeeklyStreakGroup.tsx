import { cn } from "@/components/cn-utils.ts";
import type { DailyGoalMet } from "@/types/User/UserStreak.ts";
import { HeroIcon } from "@/components/design-system/atoms/hero-icon/hero-icon.tsx";

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
      className={cn("w-full flex text-ludoAltText flex-col gap-4", className)}
    >
      {title && <h3 className="text-start">{title}</h3>}
      <div
        className={cn(
          "w-full flex gap-4 bg-ludoGrayLight rounded-lg",
          innerClassName
        )}
      >
        {history.map((day, index) => (
          <div className="flex flex-col gap-1">
            <div className="rounded-sm h-7 w-7 bg-ludoGrayDark p-1 flex items-center justify-center">
              {day.met && (
                <HeroIcon
                  iconName="FireIcon"
                  solid
                  className="text-orange-400 h-4 w-4"
                />
              )}
            </div>
            {showDates && <p className="text-center">{dates[index]}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
