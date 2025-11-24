import { CommonHeader } from "../../components/Molecules/Header/CommonHeader";
import { SegmentedProgress } from "../../components/Molecules/Progress/SegmentedProgress";
import { ExitButton } from "@/components/Atoms/Button/ExitButton";

type LessonHeaderProps = {
  total: number;
  position: number;
  onExit?: () => void;
};

export function LessonHeader({ total, position, onExit }: LessonHeaderProps) {
  const completed = position + 1;

  return (
    <CommonHeader className="px-4" device="Both">
      <div className="col-start-1 col-end-2 flex items-center h-full">
        <ExitButton onClick={() => onExit?.()} />
      </div>
      <div className="flex items-center justify-center col-start-2 col-end-12 lg:col-start-4 lg:col-end-10">
        <SegmentedProgress total={total} completed={completed} />
      </div>
    </CommonHeader>
  );
}
