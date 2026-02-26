import { qo } from "@/hooks/Queries/Definitions/queries";
import { cn } from "@ludocode/design-system/cn-utils";
import {ProgressSummary} from "@ludocode/design-system/primitives/ProgressSummary"
import { useSuspenseQuery } from "@tanstack/react-query";

type CourseCardProps = {
  courseId: string;
  title: string;
  onClick?: () => void;
  showProgress?: boolean;
};

export function CourseCard({
  courseId,
  title,
  onClick,
  showProgress = true,
}: CourseCardProps) {
  const { data: stats } = useSuspenseQuery(qo.courseStats(courseId));
  const { completedLessons, totalLessons } = stats;

  const Component = onClick ? "button" : "div";

  return (
    <Component
      {...(onClick && { type: "button", onClick })}
      className={cn("rounded-xl bg-ludo-surface/50 p-4 flex flex-col gap-3 text-left transition-colors", onClick && "hover:bg-ludo-surface/70 hover:cursor-pointer")}
    >
      <div>
        <p className="text-white/40 text-xs font-semibold uppercase tracking-widest">
          Course
        </p>
        <h2 className="text-white text-lg font-bold leading-tight mt-0.5 truncate">
          {title}
        </h2>
      </div>

      {showProgress && (
        <ProgressSummary
          variant="col"
          detailed
          name="lessons"
          total={totalLessons}
          current={completedLessons}
        />
      )}
    </Component>
  );
}
