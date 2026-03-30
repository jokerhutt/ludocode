import { adminNavigation } from "@/constants/adminNavigation.tsx";
import { router } from "@/main.tsx";
import type { CourseStatus, LudoCourse } from "@ludocode/types";
import { DeleteCourseButton } from "./DeleteCourseButton";
import { useChangeCourseStatus } from "../hooks/useToggleCourseVisibility";
import { CourseStatusBadge } from "@/features/curriculum/components/CourseStatusBadge";
import { Archive, Globe } from "lucide-react";

type CourseCardProps = {
  course: LudoCourse;
};

export function CourseCard({ course }: CourseCardProps) {
  const courseStatus: CourseStatus = course.courseStatus ?? "DRAFT";
  const changeCourseStatus = useChangeCourseStatus({ courseId: course.id });

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

        <div className="flex items-center gap-2">
          <CourseStatusBadge status={courseStatus} />
          <span className="text-xs text-ludo-white opacity-70">
            {course.courseType}
          </span>
        </div>
      </div>

      <div className="flex justify-between gap-6 text-sm text-ludo-white">
        <div>
          <span className="opacity-60">Language</span>
          <p className="text-ludo-white-bright font-medium">
            {course.codeLanguage ?? "—"}
          </p>
        </div>
        <div
          className="flex items-end gap-3"
          onClick={(e) => e.stopPropagation()}
        >
          {courseStatus === "DRAFT" && (
            <>
              <button
                type="button"
                disabled={changeCourseStatus.isPending}
                onClick={() =>
                  changeCourseStatus.mutate({ value: "PUBLISHED" })
                }
                className="flex items-center gap-1.5 rounded-md border border-emerald-500/40 bg-transparent px-3 py-1.5 text-xs font-medium text-emerald-400 transition hover:bg-emerald-500/10 disabled:opacity-50"
              >
                <Globe className="h-3.5 w-3.5" />
                Publish
              </button>
              <DeleteCourseButton
                courseId={course.id}
                courseName={course.title}
              />
            </>
          )}

          {courseStatus === "PUBLISHED" && (
            <button
              type="button"
              disabled={changeCourseStatus.isPending}
              onClick={() => changeCourseStatus.mutate({ value: "ARCHIVED" })}
              className="flex items-center gap-1.5 rounded-md border border-zinc-500/40 bg-transparent px-3 py-1.5 text-xs font-medium text-zinc-400 transition hover:bg-zinc-500/10 disabled:opacity-50"
            >
              <Archive className="h-3.5 w-3.5" />
              Archive
            </button>
          )}

          {courseStatus === "ARCHIVED" && (
            <button
              type="button"
              disabled={changeCourseStatus.isPending}
              onClick={() => changeCourseStatus.mutate({ value: "PUBLISHED" })}
              className="flex items-center gap-1.5 rounded-md border border-emerald-500/40 bg-transparent px-3 py-1.5 text-xs font-medium text-emerald-400 transition hover:bg-emerald-500/10 disabled:opacity-50"
            >
              <Globe className="h-3.5 w-3.5" />
              Publish
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
