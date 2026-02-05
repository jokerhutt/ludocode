import { CourseProgressBar } from "@/features/Hub/Components/Group/CourseProgressBar";
import { qo } from "@/hooks/Queries/Definitions/queries";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";
import type { LudoCourse } from "@ludocode/types";
import { useSuspenseQuery } from "@tanstack/react-query";

// import type { IconName } from "@/components/design-system/primitives/custom-icon";

type CourseCardProps = {
  course: LudoCourse;
  onClick: () => void;
  enrolled: boolean;
};

export function CourseCard({ course, onClick, enrolled }: CourseCardProps) {
  const { title } = course;

  const { data: stats } = useSuspenseQuery(qo.courseStats(course.id));
  const { completedLessons, totalLessons } = stats;
  const statsValue =
    (completedLessons != 0 ? totalLessons / completedLessons : 0) * 100;

  return (
    <LudoButton onClick={() => onClick()} className="w-full h-24">
      <div className="w-full h-full flex flex-col gap-1 items-start px-4 justify-center">
        <p className="text-ludo-accent-muted text-sm">COURSE</p>
        <div className="w-full flex gap-4 justify-start">
          <h1 className="text-white font-bold text-xl">{title}</h1>
        </div>
        <div className="w-full flex gap-4 justify-start">
          {enrolled && <CourseProgressBar value={statsValue} />}
        </div>
      </div>
    </LudoButton>
  );
}
