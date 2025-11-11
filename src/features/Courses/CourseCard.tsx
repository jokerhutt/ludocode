import {
  CustomIcon,
  type IconName,
} from "../../components/Atoms/Icons/CustomIcon.tsx";
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
    CSharp: "CSharp",
    Golang: "Golang",
    Lua: "Lua",
  };

  return (
    <button
      onClick={() => onClick()}
      className="flex active:shadow-none active:translate-y-2 hover:cursor-pointer shadow-buttonShadow items-center w-full rounded-2xl bg-ludoGrayLight justify-center"
    >
      <div className="w-full flex items-center px-4 py-2 justify-center">
        <div className="w-full">
          <h1 className="text-white font-bold text-xl">{title}</h1>
        </div>

        <CustomIcon iconName={courseIcons[title]} className="h-8" />
      </div>
    </button>
  );
}
