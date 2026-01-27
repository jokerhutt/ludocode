import {
  CustomIcon,
  type IconName,
} from "@ludocode/design-system/primitives/custom-icon";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";
import { Progress } from "@ludocode/external/ui/progress";
import type { CourseStats } from "@ludocode/types";

type CurrentCourseCardProps = {
  courseName: string;
  courseStats: CourseStats;
};

export function CurrentCourseCard({
  courseName,
  courseStats,
}: CurrentCourseCardProps) {
  const { completedLessons, totalLessons } = courseStats;
  const value =
    (completedLessons != 0 ? totalLessons / completedLessons : 0) * 100;

  return (
    <div className="w-full flex">
      <LudoButton className="flex items-start px-4 py-2 h-auto gap-2 flex-col">
        <div className="w-full flex gap-4 items-center">
          <CustomIcon
            iconName={courseName as IconName}
            color="white"
            className="h-5"
          />
          <p className="text-lg">{courseName}</p>
        </div>
        <div className="w-full gap-4 flex items-center">
          <Progress value={value} />
          <p>{value}%</p>
        </div>
      </LudoButton>
    </div>
  );
}
