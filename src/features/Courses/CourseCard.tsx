import { CustomIcon, type IconName } from "../../components/HeroIcons/CustomIcon";
import type { LudoCourse } from "../../Types/Catalog/LudoCourse";

type CourseCardProps = {
  course: LudoCourse;
  onClick: () => void;
};

export function CourseCard({ course, onClick }: CourseCardProps) {
  const { title } = course;


  const courseIcons: Record<string, IconName> = {
    Python: "Python",
    Swift: "Swift",
  };

  return (
    <button
      onClick={() => onClick()}
      className="flex active:translate-y-[10px] active:shadow-none hover:cursor-pointer shadow-buttonShadow items-center w-full rounded-2xl bg-ludoGrayLight justify-center"
    >
      <div className="w-full flex items-center p-4 justify-center">
        <div className="w-full"></div>
        <CustomIcon iconName={courseIcons[title]} className="h-10" />
      </div>
    </button>
  );
}
