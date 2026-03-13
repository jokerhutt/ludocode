import { cn } from "@ludocode/design-system/cn-utils";
import { X } from "lucide-react";

type GuidedProjectFeedbackPopoverProps = {
  incorrectFeedbackMessage: string | null;
  onDismissIncorrectFeedback: () => void;
  showCorrectFeedback: boolean;
  showIncorrectFeedback: boolean;
};

export function GuidedProjectFeedbackPopover({
  incorrectFeedbackMessage,
  onDismissIncorrectFeedback,
  showCorrectFeedback,
  showIncorrectFeedback,
}: GuidedProjectFeedbackPopoverProps) {
  return (
    <div
      className={cn(
        "absolute z-10 bottom-22 right-10 min-w-56 max-w-120 rounded-md border bg-ludo-background px-3 py-2",
        showCorrectFeedback ? "border-ludo-correct" : "border-ludo-incorrect",
      )}
    >
      <div className="flex items-center gap-3">
        <p className="text-sm text-ludo-white-bright">
          {showCorrectFeedback
            ? "Great work!"
            : (incorrectFeedbackMessage ?? "Not quite!")}
        </p>
        {showIncorrectFeedback && (
          <button
            type="button"
            onClick={onDismissIncorrectFeedback}
            className="rounded p-1 text-ludo-white/70 hover:text-ludo-white hover:bg-ludo-background"
            aria-label="Close feedback"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
