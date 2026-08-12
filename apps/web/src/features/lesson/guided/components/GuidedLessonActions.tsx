import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";
import {
  ArrowRightIcon,
  ChevronLeftIcon,
  PlayIcon,
  RotateCcwIcon,
  SquareIcon,
} from "lucide-react";
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

  const SubmitIcon = isComplete && !isRunning ? ArrowRightIcon : null;

  return (
    <>
      <div className="flex gap-2 items-center">
        <LudoButton
          type="button"
          variant="default"
          shadow={false}
          disabled={!canGoBack}
          onClick={onGoBack}
          aria-label="Previous exercise"
          className="h-11 lg:h-10 w-11 lg:w-auto lg:px-4 lg:gap-2 text-sm font-bold"
        >
          <ChevronLeftIcon className="h-4 w-4" strokeWidth={2.5} />
          <span className="hidden lg:inline">BACK</span>
        </LudoButton>

        <LudoButton
          type="button"
          variant="default"
          shadow={false}
          disabled={!canReset}
          onClick={onReset}
          aria-label="Reset code"
          className="h-10 w-10 px-0 hidden lg:flex"
        >
          <RotateCcwIcon className="h-4 w-4" />
        </LudoButton>
      </div>

      <div className="flex flex-1 items-center justify-end gap-2 lg:flex-none">
        <div className="hidden lg:block">
          {solutionHint && <SolutionHintDialog {...solutionHint} />}
        </div>

        <LudoButton
          onClick={runOnly}
          variant="default"
          disabled={runDisabled}
          className={cn(
            "h-11 lg:h-10 w-auto px-4 lg:px-5 gap-2 text-sm font-bold",
          )}
        >
          {isRunning ? (
            <SquareIcon className="h-3.5 w-3.5 fill-current" />
          ) : (
            <PlayIcon className="h-3.5 w-3.5 fill-current" />
          )}
          <span>{isRunning ? "STOP" : "RUN"}</span>
        </LudoButton>

        <LudoButton
          data-testid={testIds.guided.runCodeButton}
          onClick={runOrAdvance}
          variant="alt"
          disabled={submitDisabled}
          className={cn(
            "h-11 lg:h-10 flex-1 lg:flex-none min-w-28 lg:min-w-36 lg:w-auto px-4 lg:px-5 gap-2 text-sm font-bold",
          )}
        >
          <span data-testid={testIds.guided.runCodeButtonText}>
            {submitLabel}
          </span>
          {SubmitIcon && <SubmitIcon className="h-4 w-4" strokeWidth={2.5} />}
        </LudoButton>
      </div>
    </>
  );
}
