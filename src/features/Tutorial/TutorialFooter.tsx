import { LessonFooter } from "../../components/Footer/LessonFooter";
import { SubmitButton } from "../Exercise/SubmitButton";

type TutorialFooterProps = {
  canSubmit: boolean;
  submitAnswer: () => void;
};

export function TutorialFooter({
  canSubmit,
  submitAnswer,
}: TutorialFooterProps) {
  return (
    <LessonFooter>
      <div className="flex w-full justify-between py-2 items-center col-start-2 col-end-12 lg:col-start-3 lg:col-end-11">
        <div></div>
        <SubmitButton submitAnswer={submitAnswer} canSubmit={canSubmit} />
      </div>
    </LessonFooter>
  );
}
