import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";
import { Badge } from "@ludocode/design-system/primitives/badge";
import type { CourseStats, LudoCourse } from "@ludocode/types";
import type { IconName } from "@ludocode/design-system/primitives/custom-icon";

type BadgeCardProps = {
  allCourses: LudoCourse[];
  allCourseStats: CourseStats[];
};

export function BadgeCard({ allCourses, allCourseStats }: BadgeCardProps) {
  const completedCourseIds = new Set(
    allCourseStats
      .filter((stat) => stat.completedLessons === stat.totalLessons)
      .map((stat) => stat.id),
  );

  const completedCourses = allCourses.filter((course) =>
    completedCourseIds.has(course.id),
  );

  return (
    <div className="w-full flex">
      <LudoButton className="flex items-center justify-start px-4 py-4 h-auto gap-2">
        {completedCourses.map((course) => (
          <Badge icon={course.title as IconName} />
        ))}
      </LudoButton>
    </div>
  );
}
