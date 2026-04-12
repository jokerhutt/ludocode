import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";
import { RotateCcwIcon } from "lucide-react";
import { cn } from "@ludocode/design-system/cn-utils";
import { SolutionHintDialog } from "./SolutionHintDialog";
import { testIds } from "@ludocode/util/test-ids";

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
  runOnly: () => void;
  runOrAdvance: () => void;
  runnerEnabled: boolean;
  isComplete: boolean;
  isIncorrect: boolean;
  solutionHint?: SolutionHint | null;
};

export function GuidedLessonActions({
  canGoBack,
  onGoBack,
  canReset,
  onReset,
  isRunning,
  runnerEnabled,
  runOnly,
  runOrAdvance,
  isComplete,
  isIncorrect,
  solutionHint,
}: GuidedLessonActionsProps) {
  const submitDisabled = isRunning || (!isComplete && !runnerEnabled);
  const runDisabled = !runnerEnabled || isComplete;
  const submitLabel =
    isComplete && !isRunning
      ? "CONTINUE"
      : isIncorrect && !isRunning
        ? "RETRY"
        : "SUBMIT";

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
          className="h-10 px-4 hidden lg:flex"
        >
          <RotateCcwIcon className="h-4 w-4" />
        </LudoButton>
      </div>
      <div className="h-10 flex items-center gap-2">
        <div className="hidden lg:block">
          {solutionHint && <SolutionHintDialog {...solutionHint} />}
        </div>
        <LudoButton
          onClick={runOnly}
          variant={isRunning ? "default" : "alt"}
          shadow={false}
          disabled={runDisabled}
          className={cn("h-10 py-0.5 lg:px-4 min-w-20 lg:min-w-24")}
        >
          {isRunning ? "STOP" : "RUN"}
        </LudoButton>
        <LudoButton
          data-testid={testIds.guided.runCodeButton}
          onClick={runOrAdvance}
          variant={isRunning ? "default" : "alt"}
          shadow={false}
          disabled={submitDisabled}
          className={cn("h-10 py-0.5 lg:px-4 min-w-24 lg:min-w-34")}
        >
          <span data-testid={testIds.guided.runCodeButtonText}>
            {submitLabel}
          </span>
        </LudoButton>
      </div>
    </>
  );
}
