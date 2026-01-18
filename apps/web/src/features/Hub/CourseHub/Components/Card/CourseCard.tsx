import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";
import type { LudoCourse } from "@ludocode/types";

// import type { IconName } from "@/components/design-system/primitives/custom-icon";

type CourseCardProps = {
  course: LudoCourse;
  onClick: () => void;
};

export function CourseCard({ course, onClick }: CourseCardProps) {
  const { title } = course;

  // const courseIcons: Record<string, IconName> = {
  //   Python: "Python",
  //   Swift: "Swift",
  //   CSharp: "CSharp",
  //   Golang: "Golang",
  //   Lua: "Lua",
  // };

  return (
    <LudoButton onClick={() => onClick()} className="w-full h-20">
      <div className="w-full flex flex-col items-start px-4 py-2 justify-center">
        <p className="text-ludoLightPurple text-sm">COURSE</p>
        <div className="w-full flex justify-start">
          <h1 className="text-white font-bold text-xl">{title}</h1>
        </div>
      </div>
    </LudoButton>
  );
}
