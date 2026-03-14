import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";
import { RotateCcwIcon } from "lucide-react";
import type { ExercisePhase } from "../zones/LessonFooter";
import { cn } from "@ludocode/design-system/cn-utils";

type GuidedLessonActionsProps = {
  canGoBack: boolean;
  onGoBack: () => void;
  canReset: boolean;
  onReset: () => void;
  isRunning: boolean;
  runOrAdvance: () => void;
  runnerEnabled: boolean;
  phase: ExercisePhase;
};

export function GuidedLessonActions({
  canGoBack,
  onGoBack,
  canReset,
  onReset,
  isRunning,
  runnerEnabled,
  runOrAdvance,
  phase,
}: GuidedLessonActionsProps) {
  const runButtonDisabled =
    isRunning || (phase === "DEFAULT" && !runnerEnabled);

  return (
    <>
      <div className="flex gap-4 items-center h-10">
        <LudoButton
          type="button"
          variant="default"
          shadow={false}
          disabled={!canGoBack}
          onClick={onGoBack}
          className="h-10 px-4"
        >
          BACK
        </LudoButton>

        <LudoButton
          type="button"
          variant="default"
          shadow={false}
          disabled={!canReset}
          onClick={onReset}
          className="h-10 px-4"
        >
          <RotateCcwIcon className="h-4 w-4" />
        </LudoButton>
      </div>
      <div className="h-10 flex items-center">
        <LudoButton
          data-testid="guided-run-code-button"
          onClick={runOrAdvance}
          isLoading={isRunning}
          variant="alt"
          shadow={false}
          disabled={runButtonDisabled}
          className={cn("h-10 py-0.5 px-4 min-w-34", phase !== "DEFAULT" && "")}
        >
          {phase === "CORRECT" ? "CONTINUE" : "SUBMIT ⌘+⏎"}
        </LudoButton>
      </div>
    </>
  );
}
