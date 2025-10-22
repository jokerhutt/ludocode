import { useLoaderData } from "@tanstack/react-router";
import type { IconName } from "../../components/HeroIcons/CustomIcon";
import { useChangeCourse } from "../../Hooks/Queries/Mutations/useChangeCourse";
import { useAllCourses } from "../../Hooks/Queries/useAllCourses";
import { CourseCard } from "./CourseCard";
import { courseRoute } from "../../routes/router";
import type { LudoCourse } from "../../Types/Catalog/LudoCourse";

export type CourseType = {
  name: string;
  description: string;
  iconName: IconName;
  courseBg: string;
};

export function CoursePage() {

  const { allCourses } = useLoaderData({ from: courseRoute.id });

  const changeCourseMutation = useChangeCourse()

  const handleSelectCourse = (courseId: string) => {
    changeCourseMutation.mutate(
      {newCourseId: courseId},
    )
  }

  if (allCourses) return (
    <div className="grid col-span-full grid-cols-12">
      <div className="col-span-1 lg:col-span-2" />

      <div className="col-span-10 lg:col-span-8 flex flex-col gap-8 py-16 items-stretch justify-start h-full min-w-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {allCourses.map((course: LudoCourse) => (
            <CourseCard key={course.id} onClick={() => handleSelectCourse(course.id)} course={course} />
          ))}
        </div>
      </div>

      <div className="col-span-1 lg:col-span-2" />
    </div>
  );
}
