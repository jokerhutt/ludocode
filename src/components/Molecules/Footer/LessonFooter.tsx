import { useLessonContext } from "@/features/Lesson/useLessonContext.tsx";
import { LessonSubmitButton } from "../../../features/Exercise/LessonSubmitButton.tsx";
import { AppFooter } from "./AppFooter.tsx";
import { useHotkeys } from "@/Hooks/UI/useHotkeys.tsx";

export type ExercisePhase = "DEFAULT" | "CORRECT" | "INCORRECT";

export function LessonFooter() {
  const {
    submissionBuffer: staged,
    currentExercise,
    canSubmit,
    submitAttemptBuffer: stage,
    phase,
    commitAttempt: commit,
  } = useLessonContext();

  const hasStaged = staged != null;
  const isInfo = currentExercise.exerciseType == "INFO";

  const handleSubmit = () => {
    if (!canSubmit) return;
    isInfo ? commit(true) : hasStaged ? commit() : stage();
  };

  useHotkeys({
    EXECUTE_ACTION: handleSubmit,
  });

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
