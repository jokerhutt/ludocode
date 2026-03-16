import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";
import { RotateCcwIcon } from "lucide-react";
import type { ExercisePhase } from "../zones/LessonFooter";
import { cn } from "@ludocode/design-system/cn-utils";
import { SolutionHintDialog } from "./SolutionHintDialog";

type SolutionHint = {
  currentCode: string;
  solution: string;
  languageId: string;
  onApplySolution: () => void;
};

type GuidedLessonActionsProps = {
  canGoBack: boolean;
  onGoBack: () => void;
  canReset: boolean;
  onReset: () => void;
  isRunning: boolean;
  runOrAdvance: () => void;
  runnerEnabled: boolean;
  phase: ExercisePhase;
  solutionHint?: SolutionHint | null;
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
  solutionHint,
}: GuidedLessonActionsProps) {
  const runButtonDisabled = phase === "DEFAULT" && !runnerEnabled;
  const actionLabel =
    phase === "CORRECT" && !isRunning
      ? "CONTINUE"
      : isRunning
        ? "STOP"
        : "SUBMIT ⌘+⏎";

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
      <div className="h-10 flex items-center gap-2">
        {solutionHint && <SolutionHintDialog {...solutionHint} />}
        <LudoButton
          data-testid="guided-run-code-button"
          onClick={runOrAdvance}
          variant={isRunning ? "default" : "alt"}
          shadow={false}
          disabled={runButtonDisabled}
          className={cn("h-10 py-0.5 px-4 min-w-34", phase !== "DEFAULT" && "")}
        >
          {actionLabel}
        </LudoButton>
      </div>
    </>
  );
}
