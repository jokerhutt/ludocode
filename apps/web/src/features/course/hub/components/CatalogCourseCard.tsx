import { qo } from "@/queries/definitions/queries.ts";
import { cn } from "@ludocode/design-system/cn-utils.ts";
import {
  CustomIcon,
  stringToCustomIcon,
} from "@ludocode/design-system/primitives/custom-icon.tsx";
import { ProgressSummary } from "@ludocode/design-system/primitives/progress-summary.tsx";
import type { LudoCourse } from "@ludocode/types";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowRightIcon } from "lucide-react";

type CatalogCourseCardProps = {
  course: LudoCourse;
  isCurrent?: boolean;
  isEnrolled?: boolean;
  onClick: () => void;
};

export function CatalogCourseCard({
  course,
  isCurrent = false,
  isEnrolled = false,
  onClick,
}: CatalogCourseCardProps) {
  const { data: stats } = useSuspenseQuery(qo.courseStats(course.id));
  const { completedLessons, totalLessons } = stats;

  const isComplete = totalLessons > 0 && completedLessons === totalLessons;
  const iconName = stringToCustomIcon(course.courseIcon);
  const typeLabel =
    course.courseType === "SKILL_PATH" ? "Skill path" : "Course";

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative flex min-h-52 flex-col gap-3 overflow-hidden rounded-xl border bg-ludo-surface-dim p-4 text-left",
        "shadow-[0_7px_0_#262E57] transition-transform duration-100",
        "hover:-translate-y-0.5 hover:cursor-pointer hover:bg-ludo-surface-hover active:translate-y-1 active:shadow-none",
        isCurrent ? "border-ludo-accent-muted/50" : "border-ludo-border",
      )}
    >
      <CourseWatermark iconName={iconName} />

      <div className="relative flex w-full items-start justify-between gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-ludo-background/60 ring-1 ring-white/5">
          <CustomIcon iconName={iconName} color="white" className="h-5" />
        </div>
        <StatusPill
          isCurrent={isCurrent}
          isComplete={isComplete}
          isEnrolled={isEnrolled}
        />
      </div>

      <div className="relative flex min-w-0 flex-col gap-1">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-ludo-white-dim">
          {typeLabel}
        </p>
        <h2 className="truncate text-lg font-bold leading-tight text-ludo-white-bright">
          {course.title}
        </h2>
        {course.description && (
          <p className="line-clamp-2 text-xs leading-relaxed text-ludo-white">
            {course.description}
          </p>
        )}
      </div>

      <div className="relative mt-auto w-full">
        {isEnrolled ? (
          <ProgressSummary
            className="w-full"
            variant="col"
            detailed
            name="lessons"
            total={totalLessons}
            current={completedLessons}
          />
        ) : (
          <div className="flex items-center justify-between border-t border-white/5 pt-3">
            <span className="text-xs text-ludo-white-dim">
              {totalLessons} lessons
            </span>
            <span className="flex items-center gap-1.5 text-xs font-semibold text-ludo-accent-muted">
              Start
              <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
            </span>
          </div>
        )}
      </div>
    </button>
  );
}

type StatusPillProps = {
  isCurrent: boolean;
  isComplete: boolean;
  isEnrolled: boolean;
};

function StatusPill({ isCurrent, isComplete, isEnrolled }: StatusPillProps) {
  const pill = isCurrent
    ? { label: "Current", style: "bg-ludo-accent text-ludo-white-bright" }
    : isComplete
      ? { label: "Complete", style: "bg-ludo-success/15 text-ludo-success" }
      : isEnrolled
        ? {
            label: "In progress",
            style: "bg-ludo-accent/20 text-ludo-accent-muted",
          }
        : { label: "New", style: "bg-white/5 text-ludo-white-dim" };

  return (
    <span
      className={cn(
        "rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider",
        pill.style,
      )}
    >
      {pill.label}
    </span>
  );
}

export function CourseWatermark({
  iconName,
  className,
}: {
  iconName: ReturnType<typeof stringToCustomIcon>;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute -bottom-7 -right-7 opacity-[0.06] transition-transform duration-300 group-hover:scale-110",
        className,
      )}
    >
      <CustomIcon iconName={iconName} color="white" className="h-32 w-32" />
    </span>
  );
}
