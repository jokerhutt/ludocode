import { useLessonContext } from "@/hooks/Context/Lesson/useLessonContext.tsx";
import { AppFooter } from "@/components/design-system/blocks/footer/app-footer.tsx";
import { useHotkeys } from "@/hooks/UI/useHotkeys.tsx";
import { SubmitLessonButton } from "@/features/Exercise/UI/Button/SubmitLessonButton.tsx";

export type ExercisePhase = "DEFAULT" | "CORRECT" | "INCORRECT";

export function LessonFooter() {
  const { handleExerciseButtonClick, canSubmit, phase } = useLessonContext();

  useHotkeys({
    EXECUTE_ACTION: handleExerciseButtonClick,
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
        <SubmitLessonButton
          phase={phase}
          submitAnswer={handleExerciseButtonClick}
          canSubmit={canSubmit}
        />
      </div>
    </AppFooter>
  );
}
