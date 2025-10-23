import { LessonFooter } from "../../components/Molecules/Footer/LessonFooter.tsx";
import type { ExerciseAttempt } from "../../Types/Exercise/LessonSubmissionTypes";
import { SubmitButton } from "../Exercise/SubmitButton";

type TutorialFooterProps = {
  canSubmit: boolean;
  commit: () => void;
  stage: () => void;
  staged: ExerciseAttempt | null;
};

export type ExercisePhase = "DEFAULT" | "CORRECT" | "INCORRECT"


export function TutorialFooter({
  staged,
  canSubmit,
  stage,
  commit,
}: TutorialFooterProps) {

  const hasStaged = staged != null;

  const handleSubmit = () => {
    if (!canSubmit) return;
    hasStaged ? commit() : stage();
  };

  const phase : ExercisePhase = !hasStaged ? "DEFAULT" : staged.isCorrect ? "CORRECT" : "INCORRECT"

  const style = !hasStaged ? "" : staged.isCorrect ? " border-t border-t-green-300" : "border-t border-t-red-600"

  return (
    <LessonFooter phase={phase}>
      <div className={`flex w-full justify-between ${style} py-2 items-center col-start-2 col-end-12 lg:col-start-3 lg:col-end-11`}>
        <div></div>
        <SubmitButton phase={phase} submitAnswer={handleSubmit} canSubmit={canSubmit} />
      </div>
    </LessonFooter>
  );
}
