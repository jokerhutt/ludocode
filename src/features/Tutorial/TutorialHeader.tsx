import { CommonHeader } from "../../components/Header/CommonHeader";
import { SegmentedProgress } from "../Exercise/Progress/SegmentedProgress";

type TutorialHeaderProps = {
  userResponses: string[];
};

export function TutorialHeader({ userResponses }: TutorialHeaderProps) {
  return (
    <CommonHeader>
      <div className="flex h-full items-center justify-center col-start-2 col-end-12 lg:col-start-3 lg:col-end-11">
        <SegmentedProgress total={10} completed={5} />
      </div>
    </CommonHeader>
  );
}
