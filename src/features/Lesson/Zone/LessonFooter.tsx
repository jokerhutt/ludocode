import { useLessonContext } from "@/features/Lesson/Context/useLessonContext.tsx";
import { AppFooter } from "@/components/design-system/blocks/footer/app-footer.tsx";
import { useHotkeys } from "@/hooks/UI/useHotkeys.tsx";
import { cn } from "@/components/cn-utils";
import { LudoButton } from "@/components/design/LudoButton";

export type ExercisePhase = "DEFAULT" | "CORRECT" | "INCORRECT";

export function LessonFooter() {
  const { handleExerciseButtonClick, canSubmit, phase } = useLessonContext();

  useHotkeys({
    EXECUTE_ACTION: handleExerciseButtonClick,
  });

  const trySubmit = () => {
    if (!canSubmit) return;
    handleExerciseButtonClick();
  };

  return (
    <AppFooter className={cn("bg-transparent")}>
      <div
        className={`flex w-full justify-center pt-2 pb-4 px-4 lg:px-0 items-center col-start-1 col-end-13 lg:col-end-12`}
      >
        <LudoButton
          withRing={false}
          className="w-full"
          onClick={() => trySubmit()}
        >
          <p>CHECK</p>
        </LudoButton>
      </div>
    </AppFooter>
  );
}
