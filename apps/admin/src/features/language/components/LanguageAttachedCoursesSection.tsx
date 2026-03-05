import type { LudoCourse } from "@ludocode/types";

type LanguageAttachedCoursesSectionProps = { attachedCourses: LudoCourse[] };

export function LanguageAttachedCoursesSection({
  attachedCourses,
}: LanguageAttachedCoursesSectionProps) {
  return (
    <>
      {attachedCourses.map((course) => (
        <div className="flex flex-col text-sm">
          <p>•{course.title}</p>
        </div>
      ))}
    </>
  );
}
