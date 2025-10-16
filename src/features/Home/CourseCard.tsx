import { PythonIcon } from "../../components/HeroIcons/CustomIcon";
import { router } from "../../routes/router";
import type { CourseType } from "./HomePage";

type CourseCardProps = {
  course: CourseType;
};

export function CourseCard({ course }: CourseCardProps) {
  const goToCourse = () => {
    router.navigate({
      to: `/course/$courseName/unit/$position`,
      params: { courseName: course.name, position: 1 },
    });
  };

  return (
    <div onClick={() => goToCourse()} className="flex hover:cursor-pointer items-center w-full rounded-2xl bg-ludoGrayLight justify-center">
      <div className="w-full flex items-center p-4 justify-center">
        <div className="w-full"></div>
        <PythonIcon className="h-10"/>
      </div>
    </div>
  );
}
