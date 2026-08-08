import { Gutter } from "@ludocode/design-system/layouts/grid/gutter";
import { useChangeCourse } from "@/queries/mutations/userMutations";
import { CatalogCourseCard } from "@/features/course/hub/components/CatalogCourseCard.tsx";
import { CatalogHeader } from "@/features/course/hub/components/CatalogHeader.tsx";
import { FeaturedCourseCard } from "@/features/course/hub/components/FeaturedCourseCard.tsx";
import { SectionHeading } from "@ludocode/design-system/zones/page-masthead.tsx";
import { useLoaderData } from "@tanstack/react-router";
import type { LudoCourse } from "@ludocode/types";
import { ludoNavigation } from "@/constants/ludoNavigation";
import { router } from "@/main";
import { useCurrentCourseContext } from "../context/CurrentCourseContext";

export function CoursePage() {
  const { availableCourses, enrolled } = useLoaderData({
    from: "/app/_hub/courses",
  });
  const changeCourseMutation = useChangeCourse();

  const courseProgress = useCurrentCourseContext();

  const enrolledSet = new Set<string>(enrolled);

  const currentCourse = availableCourses.find(
    (course: LudoCourse) => course.id === courseProgress.courseId,
  );
  const otherCourses = availableCourses.filter(
    (course: LudoCourse) => course.id !== courseProgress.courseId,
  );

  const handleSelectCourse = (courseId: string) => {
    if (changeCourseMutation.isPending) return;
    if (courseProgress.courseId === courseId) {
      router.navigate(
        ludoNavigation.hub.module.toModule(
          courseProgress.courseId,
          courseProgress.moduleId,
        ),
      );
    } else {
      changeCourseMutation.mutate({ newCourseId: courseId });
    }
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
            <SectionHeading
              label={currentCourse ? "More courses" : "All courses"}
            />

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
