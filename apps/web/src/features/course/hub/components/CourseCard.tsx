import { qo } from "@/queries/definitions/queries.ts";
import { cn } from "@ludocode/design-system/cn-utils.ts";
import {
  CustomIcon,
  stringToCustomIcon,
} from "@ludocode/design-system/primitives/custom-icon.tsx";
import { ProgressSummary } from "@ludocode/design-system/primitives/progress-summary.tsx";
import { useSuspenseQuery } from "@tanstack/react-query";

type CourseCardProps = {
  courseId: string;
  title: string;
  onClick?: () => void;
  showProgress?: boolean;
  opaque?: boolean;
  iconName?: string;
};

export function CourseCard({
  courseId,
  title,
  onClick,
  opaque = true,
  showProgress = true,
  iconName,
}: CourseCardProps) {
  const { data: stats } = useSuspenseQuery(qo.courseStats(courseId));
  const { completedLessons, totalLessons } = stats;

  const Component = onClick ? "button" : "div";

  const colorStyle = opaque ? "bg-ludo-surface-dim" : "bg-ludo-surface";

  return (
    <Component
      {...(onClick && { type: "button", onClick })}
      className={cn(
        "rounded-xl bg-ludo-surface-dim p-4 flex flex-col gap-3 text-left transition-colors",
        onClick && "hover:bg-ludo-surface-hover hover:cursor-pointer",
        colorStyle,
      )}
    >
      <div className="flex w-full justify-between gap-2">
        <div className="flex flex-col">
          <p className="text-ludo-white-dim text-xs font-semibold uppercase tracking-widest">
            Course
          </p>
          <h2 className="text-ludo-white-bright text-lg font-bold leading-tight mt-0.5 truncate">
            {title}
          </h2>
        </div>
        {iconName && (
          <div className="h-8 w-8 rounded-lg bg-ludo-background/60 flex items-center justify-center">
            <CustomIcon
              iconName={stringToCustomIcon(iconName)}
              color="white"
              className="h-4"
            />
          </div>
        )}
      </div>

      {showProgress && (
        <ProgressSummary
          className="w-full"
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
