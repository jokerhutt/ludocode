import { LessonFooter } from "../../components/Molecules/Footer/LessonFooter.tsx";
import type { ExerciseAttempt } from "../../Types/Exercise/LessonSubmissionTypes";
import { SubmitButton } from "../Exercise/SubmitButton";

type TutorialFooterProps = {
  canSubmit: boolean;
  commit: (info?: boolean) => void;
  stage: () => void;
  staged: ExerciseAttempt | null;
  isInfo: boolean;
};

export type ExercisePhase = "DEFAULT" | "CORRECT" | "INCORRECT"


export function TutorialFooter({
  staged,
  canSubmit,
  stage,
  commit,
  isInfo
}: TutorialFooterProps) {

  const hasStaged = staged != null;

  const handleSubmit = () => {
    if (!canSubmit) return;
    isInfo ? commit(true) : hasStaged ? commit() : stage();
  };

  const phase : ExercisePhase = !hasStaged ? "DEFAULT" : staged.isCorrect ? "CORRECT" : "INCORRECT"


  return (
    <LessonFooter phase={phase}>
      <div className={`flex w-full justify-between py-2 items-center col-start-2 col-end-12 lg:col-start-3 lg:col-end-11`}>
        <div></div>
        <SubmitButton phase={phase} submitAnswer={handleSubmit} canSubmit={canSubmit} />
      </div>
    </LessonFooter>
  );
}
