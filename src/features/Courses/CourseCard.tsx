import { CustomIcon, PythonIcon } from "../../components/HeroIcons/CustomIcon";
import { router } from "../../routes/router";
import type { CourseType } from "./CoursePage";

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

  const {name, iconName} = course;

  return (
    <button onClick={() => goToCourse()} className="flex hover:cursor-pointer shadow-buttonShadow items-center w-full rounded-2xl bg-ludoGrayLight justify-center">
      <div className="w-full flex items-center p-4 justify-center">
        <div className="w-full"></div>
        <CustomIcon iconName={iconName} className="h-10"/>
      </div>
    </button>
  );
}
