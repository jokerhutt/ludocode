import { useChangeCourse } from "@/hooks/Queries/Mutations/useChangeCourse.tsx";
import { CourseCard } from "@/features/Courses/Components/CourseCard";
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
      <div className="col-span-1" />
      <div className="col-span-10 flex flex-col gap-6 py-6 justify-start h-full min-w-0">
        <Hero
          title="Library"
          subtitle="Here you will find all available courses"
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {allCourses.map((course: LudoCourse) => (
            <CourseCard
              showProgress={enrolledSet.has(course.id)}
              key={course.id}
              onClick={() => handleSelectCourse(course.id)}
              title={course.title}
              courseId={course.id}
            />
          ))}
        </div>
      </div>
      <div className="col-span-1" />
    </div>
  );
}
