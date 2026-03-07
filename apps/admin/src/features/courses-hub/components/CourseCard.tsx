import { adminNavigation } from "@/constants/adminNavigation.tsx";
import { router } from "@/main.tsx";
import type { LudoCourse } from "@ludocode/types";
import { Switch } from "@ludocode/external/ui/switch";
import { DeleteCourseButton } from "./DeleteCourseButton";
import { useToggleCourseVisibility } from "../hooks/useToggleCourseVisibility";

type CourseCardProps = {
  course: LudoCourse;
  coursesLength: number;
  visibleCoursesCount: number;
};

export function CourseCard({
  course,
  coursesLength,
  visibleCoursesCount,
}: CourseCardProps) {
  const isVisible = course.isVisible !== false;
  const isOnlyVisibleCourse = isVisible && visibleCoursesCount <= 1;
  const toggleVisibility = useToggleCourseVisibility({ courseId: course.id });

  const handleToggle = (checked: boolean) => {
    if (toggleVisibility.isPending) return;
    toggleVisibility.mutate({ value: checked });
  };

  return (
    <div
      key={course.id}
      onClick={(e) => {
        if (e.currentTarget !== e.target) return;
        router.navigate(adminNavigation.curriculum.toCourse(course.id));
      }}
      className="
                  bg-ludo-surface
                  hover:bg-ludo-surface/70
                  transition
                  border border-ludo-accent-muted/20
                  rounded-lg
                  p-6
                  cursor-pointer
                  flex
                  flex-col
                  gap-3
                "
    >
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-bold text-ludo-white-bright">
          {course.title}
        </h3>

        <span className="text-xs text-ludo-white opacity-70">
          {course.courseType}
        </span>
      </div>

      <div className="flex justify-between gap-6 text-sm text-ludo-white">
        <div>
          <span className="opacity-60">Language</span>
          <p className="text-ludo-white-bright font-medium">
            {course.language?.name ?? "—"}
          </p>
        </div>
        <div className="flex items-end gap-3">
          <div
            className="flex items-center gap-2 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="text-xs opacity-60">
              {isVisible ? "Visible" : "Hidden"}
            </span>
            <Switch
              checked={isVisible}
              onCheckedChange={handleToggle}
              disabled={isOnlyVisibleCourse || toggleVisibility.isPending}
              className="data-[state=checked]:bg-ludo-accent data-[state=unchecked]:bg-ludo-surface-dim"
            />
          </div>
          {coursesLength > 1 && (
            <DeleteCourseButton
              courseId={course.id}
              courseName={course.title}
            />
          )}
        </div>
      </div>
    </div>
  );
}
