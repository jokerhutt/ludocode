import { cn } from "@ludocode/design-system/cn-utils.ts";
import {
  useLessonEvaluation,
  useLessonExercise,
  useLessonSubmission,
} from "@/features/lesson/context/useLessonContext.tsx";
import { useExerciseHistory } from "@/features/lesson/hooks/useExerciseHistory.tsx";

export function LessonFeedbackDrawer() {
  const { currentExercise } = useLessonExercise();
  const { submissionHistory } = useLessonSubmission();
  const { isIncorrect, incorrectFeedbackMessage } = useLessonEvaluation();
  const { correctAttempt } = useExerciseHistory({
    currentExercise,
    submissionHistory,
  });

  const isCorrect =
    currentExercise.interaction != null && correctAttempt?.isCorrect === true;
  const isVisible = isCorrect || isIncorrect;
  const border = isCorrect
    ? "border-ludo-correct"
    : "border-ludo-incorrect";
  const text = isCorrect
    ? "Great work!"
    : (incorrectFeedbackMessage ?? "Not quite!");

  return (
    <div
      className={cn(
        "pointer-events-none fixed bottom-0 left-0 right-0 z-10",
        isVisible
          ? "translate-y-0 transition-transform duration-200 ease-out"
          : "translate-y-full",
      )}
    >
      <div
        className={cn(
          "mx-auto lg:h-26 h-30 max-w-screen bg-ludo-background border-t-4",
          border,
        )}
      >
        <div className="py-3 px-8 text-ludo-white-bright">
          <h3 className="lg:text-lg font-medium">{text}</h3>
        </div>
      </div>
    </div>
  );
}
