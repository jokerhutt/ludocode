import { Logo } from "../../components/Brand/Logo";
import { CommonHeader } from "../../components/Header/CommonHeader";
import { CourseCard } from "./CourseCard";

export type CourseType = {
  name: string;
  description: string;
  imgSrc: string;
  courseBg: string;
};

export function HomePage() {
  const courses: CourseType[] = [
    {
      name: "Python",
      description: "something",
      imgSrc:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/500px-JavaScript-logo.png",
      courseBg: "/Images/CourseBg/pythonbg.png",
    },
  ];

  return (
    <div className="grid grid-cols-12 grid-rows-[auto_1fr_auto] min-h-screen">
      <CommonHeader>
        <div className="col-span-1 flex items-center justify-center lg:col-span-2">
        </div>

        <div className="col-span-10 lg:col-span-8 flex items-center justify-center">
          <h1 className="text-white text-2xl font-bold">Courses</h1>
        </div>

        <div className="col-span-1 lg:col-span-2"></div>
      </CommonHeader>

      <div className="grid col-span-full grid-cols-12">
        <div className="col-span-1 lg:col-span-2" />

        <div className="col-span-10 lg:col-span-8 flex flex-col gap-8 py-16 items-stretch justify-start h-full min-w-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {courses.map((course) => (
              <CourseCard course={course} />
            ))}
          </div>
        </div>

        <div className="col-span-1 lg:col-span-2" />
      </div>
    </div>
  );
}
