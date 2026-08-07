import { qo } from "@/queries/definitions/queries.ts";
import {
  CustomIcon,
  stringToCustomIcon,
} from "@ludocode/design-system/primitives/custom-icon.tsx";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button.tsx";
import { ProgressSummary } from "@ludocode/design-system/primitives/progress-summary.tsx";
import type { LudoCourse } from "@ludocode/types";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowRightIcon } from "lucide-react";
import { CourseWatermark } from "./CatalogCourseCard.tsx";

type FeaturedCourseCardProps = {
  course: LudoCourse;
  onContinue: () => void;
};

export function FeaturedCourseCard({
  course,
  onContinue,
}: FeaturedCourseCardProps) {
  const { data: stats } = useSuspenseQuery(qo.courseStats(course.id));
  const { completedLessons, totalLessons } = stats;

  const iconName = stringToCustomIcon(course.courseIcon);
  const isStarted = completedLessons > 0;

  return (
    <section className="group relative overflow-hidden rounded-xl border border-ludo-accent-muted/40 bg-ludo-surface p-5 shadow-[0_7px_0_#262E57] lg:p-6">
      <CourseWatermark
        iconName={iconName}
        className="-bottom-10 right-8 opacity-[0.08]"
      />

      <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-8">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-ludo-background shadow-[0_4px_0_#1a1e30]">
          <CustomIcon iconName={iconName} color="white" className="h-8" />
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-ludo-accent-muted">
            {isStarted ? "Continue learning" : "Your current course"}
          </p>
          <h2 className="truncate text-2xl font-bold leading-tight text-ludo-white-bright">
            {course.title}
          </h2>
          {course.description && (
            <p className="line-clamp-2 text-sm leading-relaxed text-ludo-white">
              {course.description}
            </p>
          )}
        </div>

        <div className="flex w-full shrink-0 flex-col gap-3 lg:w-60">
          <ProgressSummary
            className="w-full"
            variant="col"
            detailed
            name="lessons"
            total={totalLessons}
            current={completedLessons}
          />
          <LudoButton variant="alt" onClick={onContinue} className="h-11">
            <span className="font-semibold tracking-wide">
              {isStarted ? "Continue" : "Start"}
            </span>
            <ArrowRightIcon className="h-5 w-5 shrink-0" />
          </LudoButton>
        </div>
      </div>
    </section>
  );
}
