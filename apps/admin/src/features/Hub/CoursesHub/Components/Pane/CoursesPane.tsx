import type { LudoCourse } from "@ludocode/types";
import { CourseCard } from "../Card/CourseCard.tsx";
import { cn } from "@ludocode/design-system/cn-utils.ts";

type CoursesPaneProps = {className?: string; courses: LudoCourse[]};

export function CoursesPane({className, courses}: CoursesPaneProps) {
  return (
    <div className={cn("col-span-8 flex flex-col gap-6", className)}>
      <h2 className="text-lg text-ludoAltText font-semibold tracking-wide">
        Courses
      </h2>

      {courses.length === 0 && (
        <div className="text-ludoAltText text-sm opacity-60">
          No courses created yet.
        </div>
      )}

      {courses.map((course) => (
        <CourseCard course={course} />
      ))}
    </div>
  );
}
