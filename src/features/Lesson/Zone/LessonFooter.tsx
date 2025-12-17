import { useLessonContext } from "@/features/Lesson/Context/useLessonContext.tsx";
import { AppFooter } from "@/components/design-system/blocks/footer/app-footer.tsx";
import { useHotkeys } from "@/hooks/UI/useHotkeys.tsx";
import { cn } from "@/components/cn-utils";
import { LudoButton } from "@/components/design/primitives/LudoButton.tsx";

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

  const text =
    phase == "DEFAULT"
      ? "CHECK"
      : phase == "CORRECT"
        ? "CONTINUE"
        : "TRY AGAIN";

  return (
    <AppFooter
      className={cn("bg-transparent border-t-ludoGrayLight lg:border-t z-20")}
    >
      <div
        className={`flex w-full justify-center lg:justify-end py-4 px-8 lg:px-0 items-center col-start-1 lg:col-start-4 col-end-13 lg:col-end-10`}
      >
        <LudoButton
          variant="alt"
          disabled={!canSubmit}
          className="w-full lg:w-1/3 text-lg font-bold h-full lg:h-2/3"
          onClick={() => trySubmit()}
        >
          <p>{text}</p>
        </LudoButton>
      </div>
    </AppFooter>
  );
}
