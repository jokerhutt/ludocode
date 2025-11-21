import { useLoaderData } from "@tanstack/react-router";
import type { IconName } from "../../components/Atoms/Icons/CustomIcon.tsx";
import { useChangeCourse } from "../../Hooks/Queries/Mutations/useChangeCourse";
import { CourseCard } from "./CourseCard";
import { courseRoute } from "../../routes/router";
import type { LudoCourse } from "../../Types/Catalog/LudoCourse";
import { useSuspenseQueries } from "@tanstack/react-query";
import { qo } from "../../Hooks/Queries/Definitions/queries";

export type CourseType = {
  name: string;
  description: string;
  iconName: IconName;
  courseBg: string;
};

export function CoursePage() {
  const { allCourses, enrolled } = useLoaderData({ from: courseRoute.id });

  const progressQueries = useSuspenseQueries({
    queries: enrolled.map((enrolled: string) => qo.courseProgress(enrolled)),
  });

  const progressList = progressQueries.map(
    (progressQuery) => progressQuery.data
  );

  const changeCourseMutation = useChangeCourse();

  const handleSelectCourse = (courseId: string) => {
    changeCourseMutation.mutate({ newCourseId: courseId });
  };

  return (
    <div className="grid col-span-full grid-cols-12">
      <div className="col-span-1 lg:col-span-2" />

      <div className="col-span-10 lg:col-span-8 flex flex-col gap-8 py-16 items-stretch justify-start h-full min-w-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {allCourses.map((course: LudoCourse) => (
            <CourseCard
              key={course.id}
              onClick={() => handleSelectCourse(course.id)}
              course={course}
            />
          ))}
        </div>
      </div>

      <div className="col-span-1 lg:col-span-2" />
    </div>
  );
}
