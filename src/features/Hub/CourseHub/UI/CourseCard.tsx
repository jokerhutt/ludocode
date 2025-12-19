import {
  CustomIcon,
  type IconName,
} from "@/components/design-system/atoms/hero-icon/custom-icon.tsx";
import { LudoButton } from "@/components/design/primitives/LudoButton";
import type { LudoCourse } from "@/types/Catalog/LudoCourse";

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
    <LudoButton onClick={() => onClick()} className="w-full h-20">
      <div className="w-full flex items-center px-4 py-2 justify-center">
        <div className="w-full ">
          <h1 className="text-white font-bold text-xl">{title}</h1>
        </div>
      </div>
    </LudoButton>
  );
}
