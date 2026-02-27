import { useLessonContext } from "@/features/Lesson/Context/useLessonContext.tsx";
import { useState } from "react";
import { useHotkeys } from "@ludocode/hooks";
import { cn } from "@ludocode/design-system/cn-utils.ts";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button.tsx";
import { FooterShell } from "@ludocode/design-system/zones/footer-shell";

export type ExercisePhase = "DEFAULT" | "CORRECT" | "INCORRECT";

export function LessonFooter() {
  const { handleExerciseButtonClick, canSubmit, phase, currentExercise } =
    useLessonContext();

  const isInfo = !currentExercise.interaction;
  const [isLoading, setIsLoading] = useState(false);

  useHotkeys({
    EXECUTE_ACTION: handleExerciseButtonClick,
  });

  function trySubmit() {
    if (!canSubmit || isLoading) return;

    if (phase !== "DEFAULT" || isInfo) {
      handleExerciseButtonClick();
    } else {
      setIsLoading(true);

      setTimeout(() => {
        handleExerciseButtonClick();
        setIsLoading(false);
      }, 200);
    }
  }

  const text =
    phase == "DEFAULT"
      ? "CHECK"
      : phase == "CORRECT"
        ? "CONTINUE"
        : "TRY AGAIN";

  return (
    <FooterShell
      className={cn("bg-transparent border-t-ludo-surface lg:border-t z-20")}
    >
      <div
        className={`flex w-full justify-center lg:justify-end py-4 px-8 lg:px-0 items-center col-start-1 lg:col-start-4 col-end-13 lg:col-end-10`}
      >
        <LudoButton
          data-testid={`lesson-submit-button`}
          variant="alt"
          disabled={!canSubmit}
          isLoading={isLoading}
          className="w-full lg:w-1/3 text-lg font-bold h-full lg:h-2/3"
          onClick={() => trySubmit()}
        >
          <p data-testid={`lesson-submit-text`}>{text}</p>
        </LudoButton>
      </div>
    </FooterShell>
  );
}
