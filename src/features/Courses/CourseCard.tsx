import { CustomIcon, PythonIcon, type IconName } from "../../components/HeroIcons/CustomIcon";
import { ludoNavigation } from "../../routes/ludoNavigation";
import { router } from "../../routes/router";
import type { LudoCourse } from "../../Types/Catalog/LudoCourse";
import type { CourseType } from "./CoursePage";

type CourseCardProps = {
  course: LudoCourse;
};

export function CourseCard({ course }: CourseCardProps) {
  const { title } = course;

  const goToCourse = () => {
    router.navigate(ludoNavigation.module(course.id, 1));
  };

  const courseIcons: Record<string, IconName> = {
    Python: "Python",
    Swift: "Swift",
  };

  return (
    <button
      onClick={() => goToCourse()}
      className="flex active:translate-y-[10px] active:shadow-none hover:cursor-pointer shadow-buttonShadow items-center w-full rounded-2xl bg-ludoGrayLight justify-center"
    >
      <div className="w-full flex items-center p-4 justify-center">
        <div className="w-full"></div>
        <CustomIcon iconName={courseIcons[title]} className="h-10" />
      </div>
    </button>
  );
}
