import { adminNavigation } from "@/constants/adminNavigation.tsx";
import { router } from "@/main.tsx";
import type { LudoCourse } from "@ludocode/types";

type CourseCardProps = { course: LudoCourse };

export function CourseCard({ course }: CourseCardProps) {
  return (
    <div
      key={course.id}
      onClick={() =>
        router.navigate(adminNavigation.curriculum.toCourse(course.id))
      }
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

      <div className="flex gap-6 text-sm text-ludo-white">
        <div>
          <span className="opacity-60">Language</span>
          <p className="text-ludo-white-bright font-medium">
            {course.language?.name ?? "—"}
          </p>
        </div>
      </div>
    </div>
  );
}
