import { Logo } from "../../components/Brand/Logo";
import { CommonHeader } from "../../components/Header/CommonHeader";
import type { IconName } from "../../components/HeroIcons/CustomIcon";
import { CourseCard } from "./CourseCard";

export type CourseType = {
  name: string;
  description: string;
  iconName: IconName;
  courseBg: string;
};

export function CoursePage() {
  const courses: CourseType[] = [
    {
      name: "Python",
      description: "something",
      iconName: "Python",
      courseBg: "/Images/CourseBg/pythonbg.png",
    },
    {
      name: "Swift",
      description: "something",
      iconName: "Swift",
      courseBg: "/Images/CourseBg/pythonbg.png",
    },
  ];

  return (
    <div className="grid grid-cols-12 grid-rows-[auto_1fr_auto] min-h-screen">
      <CommonHeader>
        <div className="col-span-1 flex items-center justify-center lg:col-span-2"></div>

        <div className="col-span-10 lg:col-span-8 flex items-center justify-center">
          <h1 className="text-white text-2xl font-bold">Courses</h1>
        </div>

        <div className="col-span-1 lg:col-span-2"></div>
      </CommonHeader>

      <div className="grid col-span-full grid-cols-12">
        <div className="col-span-1 lg:col-span-2" />

        <div className="col-span-10 lg:col-span-8 flex flex-col gap-8 py-16 items-stretch justify-start h-full min-w-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
