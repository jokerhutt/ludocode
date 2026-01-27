import { useChangeCourse } from "@/hooks/Queries/Mutations/useChangeCourse.tsx";
import { CourseCard } from "@/features/Hub/CourseHub/Components/Card/CourseCard.tsx";
import { CourseCardGrid } from "@/features/Hub/CourseHub/Components/Group/CourseCardGrid.tsx";
import { useLoaderData } from "@tanstack/react-router";
import { Hero } from "@ludocode/design-system/zones/hero";
import type { IconName } from "@ludocode/design-system/primitives/custom-icon";
import type { LudoCourse } from "@ludocode/types";
import { useSuspenseQuery } from "@tanstack/react-query";
import { qo } from "@/hooks/Queries/Definitions/queries";
import { useMemo } from "react";

export type CourseType = {
  name: string;
  description: string;
  iconName: IconName;
  courseBg: string;
};

export function CoursePage() {
  const { allCourses } = useLoaderData({ from: "/_app/_hub/courses" });
  const changeCourseMutation = useChangeCourse();

  const { data: enrolledIds } = useSuspenseQuery(qo.enrolled());
  const enrolledSet = useMemo(() => new Set(enrolledIds), [enrolledIds]);

  const handleSelectCourse = (courseId: string) => {
    if (changeCourseMutation.isPending) return;
    changeCourseMutation.mutate({ newCourseId: courseId });
  };

  return (
    <div className="layout-grid col-span-full">
      <div className="main-col-wide flex flex-col gap-6 py-6 px-8 lg:px-0 justify-start h-full min-w-0">
        <Hero title="Courses" subtitle="Here you will find your courses" />
        <CourseCardGrid>
          {allCourses.map((course: LudoCourse) => (
            <CourseCard
              enrolled={enrolledSet.has(course.id)}
              key={course.id}
              onClick={() => handleSelectCourse(course.id)}
              course={course}
            />
          ))}
        </CourseCardGrid>
      </div>
    </div>
  );
}
