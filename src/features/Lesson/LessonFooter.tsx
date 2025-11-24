import { DefaultFooter } from "../../components/Molecules/Footer/DefaultFooter.tsx";
import type { ExerciseAttempt } from "../../Types/Exercise/LessonSubmissionTypes.ts";
import { LessonSubmitButton } from "../Exercise/LessonSubmitButton.tsx";

type LessonFooterProps = {
  canSubmit: boolean;
  commit: (info?: boolean) => void;
  stage: () => void;
  staged: ExerciseAttempt | null;
  isInfo: boolean;
};

export type ExercisePhase = "DEFAULT" | "CORRECT" | "INCORRECT";

export function LessonFooter({
  staged,
  canSubmit,
  stage,
  commit,
  isInfo,
}: LessonFooterProps) {
  const hasStaged = staged != null;

  const handleSubmit = () => {
    if (!canSubmit) return;
    isInfo ? commit(true) : hasStaged ? commit() : stage();
  };

  const phase: ExercisePhase = !hasStaged
    ? "DEFAULT"
    : staged.isCorrect
    ? "CORRECT"
    : "INCORRECT";

  return (
    <DefaultFooter phase={phase}>
      <div
        className={`flex w-full justify-between py-2 px-6 items-center col-start-2 col-end-12 lg:col-start-1 lg:col-end-12`}
      >
        <div></div>
        <LessonSubmitButton
          phase={phase}
          submitAnswer={handleSubmit}
          canSubmit={canSubmit}
        />
      </div>
    </DefaultFooter>
  );
}
