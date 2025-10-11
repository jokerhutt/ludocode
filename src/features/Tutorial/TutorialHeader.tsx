import { CommonHeader } from "../../components/Header/CommonHeader";
import { SegmentedProgress } from "../../components/Progress/SegmentedProgress";

type TutorialHeaderProps = {
  total: number;
  position: number;
};

export function TutorialHeader({ total, position }: TutorialHeaderProps) {

  const completed = position + 1;  

  return (
    <CommonHeader>
      <div className="flex h-full items-center justify-center col-start-2 col-end-12 lg:col-start-3 lg:col-end-11">
        <SegmentedProgress total={total} completed={completed} />
      </div>
    </CommonHeader>
  );
}
