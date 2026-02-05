import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";
import { AnimatedBadge, Badge } from "@ludocode/design-system/primitives/badge";
import type { CourseStats, LudoCourse } from "@ludocode/types";
import type { IconName } from "@ludocode/design-system/primitives/custom-icon";
import { cn } from "@ludocode/design-system/cn-utils";

type BadgeCardListProps = {
  allCourses: LudoCourse[];
  allCourseStats: CourseStats[];
  clickable?: boolean;
};

export function BadgeListCard({
  allCourses,
  allCourseStats,
  clickable = true,
}: BadgeCardListProps) {
  const completedCourseIds = new Set(
    allCourseStats
      .filter((stat) => stat.completedLessons === stat.totalLessons)
      .map((stat) => stat.id),
  );

  const completedCourses = allCourses.filter((course) =>
    completedCourseIds.has(course.id),
  );

  return (
    <div className={cn("flex w-full")}>
      <LudoButton
        clickable={clickable}
        className="flex items-center justify-start px-4 py-4 h-auto gap-2"
      >
        {completedCourses.map((course) => (
          <Badge icon={course.title as IconName} />
        ))}
      </LudoButton>
    </div>
  );
}

type BadgeSingleCardProps = {
  animated?: boolean;
  icon: IconName;
  clickable?: boolean;
};

export function BadgeSingleCard({
  icon,
  animated,
  clickable,
}: BadgeSingleCardProps) {
  return (
    <LudoButton
      clickable={clickable}
      className="flex w-auto items-center justify-start px-4 py-4 h-auto gap-2"
    >
      {animated ? <Badge icon={icon} /> : <AnimatedBadge icon={icon} />}
    </LudoButton>
  );
}
