import { cn } from "@ludocode/design-system/cn-utils";
import { CheckIcon, X } from "lucide-react";
import { testIds } from "@ludocode/util/test-ids";
import { AnimatePresence, motion } from "motion/react";

type GuidedProjectFeedbackPopoverProps = {
  incorrectFeedbackMessage: string | null;
  onDismissIncorrectFeedback: () => void;
  showCorrectFeedback: boolean;
  showIncorrectFeedback: boolean;
  layout?: "floating" | "inline";
};

export function GuidedProjectFeedbackPopover({
  incorrectFeedbackMessage,
  onDismissIncorrectFeedback,
  showCorrectFeedback,
  showIncorrectFeedback,
  layout = "floating",
}: GuidedProjectFeedbackPopoverProps) {
  const isVisible = showCorrectFeedback || showIncorrectFeedback;

  return (
    <AnimatePresence initial={false}>
      {isVisible && (
        <motion.div
          key="guided-feedback"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          role="status"
          aria-live="polite"
          data-testid={
            showCorrectFeedback
              ? testIds.guided.feedbackCorrect
              : testIds.guided.feedbackIncorrect
          }
          className={cn(
            "flex items-start gap-3 rounded-xl border-2 bg-ludo-background px-3.5 py-3",
            showCorrectFeedback
              ? "border-ludo-correct"
              : "border-ludo-incorrect",
            layout === "floating"
              ? "absolute z-10 bottom-3 left-3 right-3 lg:left-auto lg:right-10 lg:bottom-24 lg:w-80"
              : "mx-4 mt-3",
          )}
        >
          <span
            className={cn(
              "mt-px flex h-6 w-6 shrink-0 items-center justify-center rounded-md",
              showCorrectFeedback
                ? "bg-ludo-success/15 text-ludo-success"
                : "bg-ludo-danger/20 text-ludo-danger",
            )}
          >
            {showCorrectFeedback ? (
              <CheckIcon className="h-3.5 w-3.5" strokeWidth={3} />
            ) : (
              <X className="h-3.5 w-3.5" strokeWidth={3} />
            )}
          </span>

          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-ludo-white-bright">
              {showCorrectFeedback ? "Great work!" : "Not quite"}
            </p>
            <p className="mt-0.5 text-xs leading-relaxed text-ludo-white">
              {showCorrectFeedback
                ? "Every check passed — keep going."
                : (incorrectFeedbackMessage ??
                  "Take another look at your code and try again.")}
            </p>
          </div>

          {showIncorrectFeedback && (
            <button
              type="button"
              onClick={onDismissIncorrectFeedback}
              className="-mr-1 -mt-1 shrink-0 rounded-md p-1.5 text-ludo-white-dim hover:cursor-pointer hover:bg-ludo-surface hover:text-ludo-white-bright transition-colors"
              aria-label="Close feedback"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
