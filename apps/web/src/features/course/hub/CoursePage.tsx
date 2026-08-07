import { Gutter } from "@ludocode/design-system/layouts/grid/gutter";
import { useChangeCourse } from "@/queries/mutations/userMutations";
import { CatalogCourseCard } from "@/features/course/hub/components/CatalogCourseCard.tsx";
import { CatalogHeader } from "@/features/course/hub/components/CatalogHeader.tsx";
import { FeaturedCourseCard } from "@/features/course/hub/components/FeaturedCourseCard.tsx";
import { useLoaderData } from "@tanstack/react-router";
import type { LudoCourse } from "@ludocode/types";
import { qo } from "@/queries/definitions/queries.ts";
import { useSuspenseQuery } from "@tanstack/react-query";

export function CoursePage() {
  const { availableCourses, enrolled } = useLoaderData({
    from: "/app/_hub/courses",
  });
  const changeCourseMutation = useChangeCourse();
  const { data: currentCourseId } = useSuspenseQuery(qo.currentCourseId());

  const enrolledSet = new Set<string>(enrolled);

  const currentCourse = availableCourses.find(
    (course: LudoCourse) => course.id === currentCourseId,
  );
  const otherCourses = availableCourses.filter(
    (course: LudoCourse) => course.id !== currentCourseId,
  );

  const handleSelectCourse = (courseId: string) => {
    if (changeCourseMutation.isPending) return;
    changeCourseMutation.mutate({ newCourseId: courseId });
  };

  return (
    <div className="layout-grid col-span-full scrollable py-6 px-8 lg:px-0">
      <Gutter desktopOnly />
      <div className="col-span-full lg:col-span-10 flex flex-col gap-6 justify-start min-w-0 pb-6">
        <CatalogHeader />

        {currentCourse && (
          <FeaturedCourseCard
            course={currentCourse}
            onContinue={() => handleSelectCourse(currentCourse.id)}
          />
        )}

        {otherCourses.length > 0 && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <h2 className="shrink-0 text-xs font-semibold uppercase tracking-widest text-ludo-white-dim">
                {currentCourse ? "More courses" : "All courses"}
              </h2>
              <div className="h-px flex-1 bg-ludo-surface" />
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {otherCourses.map((course: LudoCourse) => (
                <CatalogCourseCard
                  key={course.id}
                  course={course}
                  isEnrolled={enrolledSet.has(course.id)}
                  onClick={() => handleSelectCourse(course.id)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      <Gutter desktopOnly />
    </div>
  );
}
