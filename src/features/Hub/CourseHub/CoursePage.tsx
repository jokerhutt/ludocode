import { useChangeCourse } from "@/hooks/Queries/Mutations/useChangeCourse.tsx";
import { CourseCard } from "./UI/CourseCard.tsx";
import type { LudoCourse } from "@/types/Catalog/LudoCourse.ts";
import { CourseCardGrid } from "./UI/CourseCardGrid.tsx";
import type { IconName } from "@/components/design-system/atoms/hero-icon/custom-icon.tsx";
import { useLoaderData } from "@tanstack/react-router";
import { DefaultHero } from "@/components/design-system/blocks/hero/default-hero.tsx";

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
    <div className="layout-grid col-span-full">
      <div className="main-col-wide flex flex-col gap-6 py-6 px-8 lg:px-0 justify-start h-full min-w-0">
        <DefaultHero
          title="Courses"
          subtitle="Here you will find your courses"
        />
        <CourseCardGrid>
          {allCourses.map((course: LudoCourse) => (
            <CourseCard
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
