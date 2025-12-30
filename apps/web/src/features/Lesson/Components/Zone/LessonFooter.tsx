import { useLessonContext } from "@/features/Lesson/Context/useLessonContext.tsx";
import { FooterShell } from "../../../../../../../packages/design-system/zones/footer-shell.tsx";
import { useHotkeys } from "@/hooks/UI/useHotkeys.tsx";
import { cn } from "../../../../../../../packages/design-system/cn-utils.ts";
import { LudoButton } from "../../../../../../../packages/design-system/primitives/ludo-button.tsx";
import { useState } from "react";

export type ExercisePhase = "DEFAULT" | "CORRECT" | "INCORRECT";

export function LessonFooter() {
  const { handleExerciseButtonClick, canSubmit, phase, currentExercise } =
    useLessonContext();

  const { exerciseType } = currentExercise;
  const [isLoading, setIsLoading] = useState(false);

  useHotkeys({
    EXECUTE_ACTION: handleExerciseButtonClick,
  });

  function trySubmit() {
    if (!canSubmit || isLoading) return;

    if (phase !== "DEFAULT" || exerciseType == "INFO") {
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
      className={cn("bg-transparent border-t-ludoGrayLight lg:border-t z-20")}
    >
      <div
        className={`flex w-full justify-center lg:justify-end py-4 px-8 lg:px-0 items-center col-start-1 lg:col-start-4 col-end-13 lg:col-end-10`}
      >
        <LudoButton
          variant="alt"
          disabled={!canSubmit}
          isLoading={isLoading}
          className="w-full lg:w-1/3 text-lg font-bold h-full lg:h-2/3"
          onClick={() => trySubmit()}
        >
          <p>{text}</p>
        </LudoButton>
      </div>
    </FooterShell>
  );
}
