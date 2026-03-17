import { useLessonContext } from "@/features/lesson/context/useLessonContext.tsx";
import { useHotkeys } from "@ludocode/hooks";
import { cn } from "@ludocode/design-system/cn-utils.ts";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button.tsx";
import { FooterShell } from "@ludocode/design-system/zones/footer-shell.tsx";

export function LessonFooter() {
  const {
    handleExerciseButtonClick,
    canSubmit,
    isComplete,
    isIncorrect,
    canGoBack,
    goBack,
  } = useLessonContext();

  useHotkeys({
    EXECUTE_ACTION: handleExerciseButtonClick,
  });

  function trySubmit() {
    if (!canSubmit) return;
      handleExerciseButtonClick();
  }

  const text = isComplete ? "CONTINUE" : isIncorrect ? "TRY AGAIN" : "CHECK";

  return (
    <FooterShell
      className={cn("bg-transparent border-t-ludo-surface lg:border-t z-20")}
    >
      <div
        className={`flex w-full justify-between gap-4 pt-3 pb-6 px-8 lg:px-0 items-center col-start-1 lg:col-start-4 col-end-13 lg:col-end-10`}
      >
        <div className="flex w-1/3 lg:w-auto justify-start h-full lg:h-2/3">
          {canGoBack && (
            <LudoButton
              data-testid="lesson-back-button"
              variant="default"
              className="w-full lg:w-auto lg:px-8 text-lg font-bold h-full "
              onClick={goBack}
            >
              <p className="select-none pointer-events-none">BACK</p>
            </LudoButton>
          )}
        </div>
        <div className="w-full flex justify-end h-full lg:h-2/3">
          <LudoButton
            data-testid={`lesson-submit-button`}
            variant="alt"
            disabled={!canSubmit}
            className="w-full text-lg font-bold h-full"
            onClick={() => trySubmit()}
          >
            <p
              data-testid={`lesson-submit-text`}
              className="select-none pointer-events-none"
            >
              {text}
            </p>
          </LudoButton>
        </div>
      </div>
    </FooterShell>
  );
}
