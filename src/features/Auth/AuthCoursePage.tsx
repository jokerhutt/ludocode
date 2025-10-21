import { useAllCourses } from "../../Hooks/Queries/useAllCourses";
import { MainContentWrapper } from "../../Layouts/LayoutWrappers/MainContentWrapper";
import { MainGridWrapper } from "../../Layouts/LayoutWrappers/MainGridWrapper";
import { CourseCard } from "../Courses/CourseCard";

type AuthCoursePageProps = {};

export function AuthCoursePage({}: AuthCoursePageProps) {

  const {data: courses} = useAllCourses()

  if (courses) return (
    <MainGridWrapper gridRows="ONE">
      <MainContentWrapper>
        <div className="grid col-span-full grid-cols-12">
          <div className="col-span-10 lg:col-span-8 flex flex-col gap-8 py-16 items-stretch justify-start h-full min-w-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {courses.map((course) => (
                <CourseCard course={course} />
              ))}
            </div>
          </div>
        </div>
      </MainContentWrapper>
    </MainGridWrapper>
  );
}
