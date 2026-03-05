import { useChangeCourse } from "@/queries/mutations/useChangeCourse.tsx";
import { CourseCard } from "@/features/course/hub/components/CourseCard.tsx";
import { useLoaderData } from "@tanstack/react-router";
import { Hero } from "@ludocode/design-system/zones/hero.tsx";
import type { IconName } from "@ludocode/design-system/primitives/custom-icon.tsx";
import type { LudoCourse } from "@ludocode/types";

export type CourseType = {
  name: string;
  description: string;
  iconName: IconName;
  courseBg: string;
};

export function CoursePage() {
  const { allCourses } = useLoaderData({ from: "/_app/_hub/courses" });
  const changeCourseMutation = useChangeCourse();


  const handleSelectCourse = (courseId: string) => {
    if (changeCourseMutation.isPending) return;
    changeCourseMutation.mutate({ newCourseId: courseId });
  };

  return (
    <div className="layout-grid col-span-full scrollable py-6 px-8 lg:px-0">
      <div className="col-span-1 hidden lg:block" />
      <div className="col-span-full lg:col-span-10 flex flex-col gap-6 justify-start min-w-0">
        <Hero
          title="Library"
          subtitle="Browse all available courses and pick your next adventure"
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {allCourses.map((course: LudoCourse) => (
            <CourseCard
              key={course.id}
              onClick={() => handleSelectCourse(course.id)}
              title={course.title}
              courseId={course.id}
            />
          ))}
        </div>
      </div>
      <div className="col-span-1 hidden lg:block" />
    </div>
  );
}
