import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";
import { AnimatedBadge, Badge } from "@ludocode/design-system/primitives/badge";
import type { CourseStats, LudoCourse } from "@ludocode/types";
import { type IconName } from "@ludocode/design-system/primitives/custom-icon";
import { cn } from "@ludocode/design-system/cn-utils";
import { LockClosedIcon } from "@heroicons/react/24/solid";

type BadgeCardListProps = {
  allCourses: LudoCourse[];
  allCourseStats: CourseStats[];
  clickable?: boolean;
};

export function BadgeListCard({
  allCourses,
  allCourseStats,
}: BadgeCardListProps) {
  const completedCourseIds = new Set(
    allCourseStats
      .filter((stat) => stat.completedLessons === stat.totalLessons)
      .map((stat) => stat.id),
  );

  const coursesWithStatus = allCourses.map((course) => ({
    ...course,
    completed: completedCourseIds.has(course.id),
    stats: allCourseStats.find((s) => s.id === course.id),
  }));

  const earnedCount = coursesWithStatus.filter((c) => c.completed).length;

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex items-center justify-between">
        <p className="text-xs text-ludo-white-dim">
          {earnedCount} / {allCourses.length} earned
        </p>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
        {coursesWithStatus.map((course) => (
          <div
            key={course.id}
            className={cn(
              "group relative flex flex-col items-center gap-2 rounded-lg p-3 transition-all duration-200",
              course.completed
                ? "bg-ludo-accent/10 hover:bg-ludo-surface-hover"
                : "bg-white/3 opacity-40",
            )}
          >
            {course.completed ? (
              <div className="relative">
                <Badge icon={course.language?.iconName as IconName} />
              </div>
            ) : (
              <div className="h-10 w-10 bg-ludo-background rounded-lg flex items-center justify-center ring-1 ring-white/5">
                <LockClosedIcon className="h-4 w-4 text-ludo-white-bright/20" />
              </div>
            )}
            <p
              className={cn(
                "text-[10px] text-center leading-tight line-clamp-2",
                course.completed
                  ? "text-ludo-white-bright/80"
                  : "text-ludo-white-bright/25",
              )}
            >
              {course.title}
            </p>
          </div>
        ))}
      </div>
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
