import { useLoaderData } from "@tanstack/react-router";
import { useChangeCourse } from "../../../Hooks/Queries/Mutations/useChangeCourse.tsx";
import { CourseCard } from "./UI/CourseCard.tsx";
import { courseHubRoute } from "../../../routes/router.tsx";
import type { LudoCourse } from "../../../Types/Catalog/LudoCourse.ts";
import { useSuspenseQueries } from "@tanstack/react-query";
import { qo } from "../../../Hooks/Queries/Definitions/queries.ts";
import { CourseCardGrid } from "./UI/CourseCardGrid.tsx";
import type { IconName } from "@/components/LudoComponents/Atoms/Icons/CustomIcon.tsx";

export type CourseType = {
  name: string;
  description: string;
  iconName: IconName;
  courseBg: string;
};

export function CoursePage() {
  const { allCourses, enrolled } = useLoaderData({ from: courseHubRoute.id });

  const progressQueries = useSuspenseQueries({
    queries: enrolled.map((enrolled: string) => qo.courseProgress(enrolled)),
  });

  const progressList = progressQueries.map(
    (progressQuery) => progressQuery.data
  );

  const changeCourseMutation = useChangeCourse();

  const handleSelectCourse = (courseId: string) => {
    if (changeCourseMutation.isPending) return;
    changeCourseMutation.mutate({ newCourseId: courseId });
  };

  return (
    <div className="grid col-span-full grid-cols-12">
      <div className="col-span-1 lg:col-span-2" />

      <div className="col-span-10 lg:col-span-8 flex flex-col gap-8 py-16 items-stretch justify-start h-full min-w-0">
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

      <div className="col-span-1 lg:col-span-2" />
    </div>
  );
}
