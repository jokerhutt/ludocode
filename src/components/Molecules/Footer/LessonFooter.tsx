import type { ExerciseAttempt } from "../../../Types/Exercise/LessonSubmissionTypes.ts";
import { LessonSubmitButton } from "../../../features/Exercise/LessonSubmitButton.tsx";
import { AppFooter } from "./AppFooter.tsx";

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

  const feedbackStyle =
    phase == "DEFAULT"
      ? "border-t-2 border-t-ludoGrayLight"
      : phase == "CORRECT"
      ? " border-t-2 border-t-green-300"
      : "border-t-2 border-t-red-600";

  return (
    <AppFooter className={feedbackStyle}>
      <div
        className={`flex w-full justify-between py-2 px-4 lg:px-0 items-center col-start-1 col-end-13 lg:col-end-12`}
      >
        <div></div>
        <LessonSubmitButton
          phase={phase}
          submitAnswer={handleSubmit}
          canSubmit={canSubmit}
        />
      </div>
    </AppFooter>
  );
}
