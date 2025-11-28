import { HeroIcon } from "@/components/Atoms/Icons/HeroIcon";
import type { DailyGoalMet } from "@/Types/Progress/UserStreak";
import { FlameIcon } from "lucide-react";

type StreakWeeklyWidgetProps = { history: DailyGoalMet[] };

export function StreakWeeklyWidget({ history }: StreakWeeklyWidgetProps) {
  const dates = ["M", "T", "W", "T", "F", "S", "S"];

  return (
    <div className="w-full flex text-ludoAltText flex-col gap-4">
      <h3 className="text-start">Weekly Stats</h3>
      <div className="w-full flex gap-4 bg-ludoGrayLight rounded-lg">
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
            <p className="">{dates[index]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
