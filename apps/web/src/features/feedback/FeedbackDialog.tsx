import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { mutations } from "@/queries/definitions/mutations.ts";
import { LudoDialog } from "@ludocode/design-system/widgets/ludo-dialog.tsx";
import {
  DialogDescription,
  DialogTitle,
} from "@ludocode/external/ui/dialog.tsx";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button.tsx";
import { Textarea } from "@ludocode/external/ui/textarea.tsx";
import type { ReactNode } from "react";
import type { FeedbackType } from "@ludocode/types";

type FeedbackDialogProps = {
  children?: ReactNode;
  trigger?: ReactNode;
  entityId?: string;
  feedbackType?: FeedbackType;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export function FeedbackDialog({
  children,
  trigger,
  entityId,
  feedbackType = "GENERAL",
  open: controlledOpen,
  onOpenChange: onControlledOpenChange,
}: FeedbackDialogProps) {
  const [content, setContent] = useState("");
  const [internalOpen, setInternalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const dialogTrigger = trigger ?? children;

  const mutation = useMutation({
    ...mutations.submitFeedback(),
    onSuccess: () => {
      setSubmitted(true);
      setTimeout(() => {
        handleOpenChange(false);
      }, 1500);
    },
  });

  const handleSubmit = () => {
    if (!content.trim() || mutation.isPending) return;
    mutation.mutate({
      content: content.trim(),
      ...(entityId ? { entityId } : {}),
      feedbackType: feedbackType,
    });
  };

  const handleOpenChange = (next: boolean) => {
    if (!isControlled) {
      setInternalOpen(next);
    }
    onControlledOpenChange?.(next);

    if (!next) {
      setTimeout(() => {
        setContent("");
        setSubmitted(false);
      }, 300);
    }
  };

  return (
    <LudoDialog
      trigger={dialogTrigger}
      open={open}
      onOpenChange={handleOpenChange}
    >
      {submitted ? (
        <>
          <DialogTitle className="text-ludo-white-bright">
            Thank you!
          </DialogTitle>
          <DialogDescription className="text-ludo-white">
            Your feedback has been submitted.
          </DialogDescription>
        </>
      ) : (
        <>
          <DialogTitle className="text-ludo-white-bright mb-4">
            {feedbackType == "EXERCISE"
              ? "Issue with this exercise?"
              : "Got feedback or ideas?"}
          </DialogTitle>

          <Textarea
            className="min-h-24 bg-ludo-background text-ludo-white-bright border-ludo-border focus-visible:border-ludo-accent focus-visible:ring-ludo-accent/50 resize-none"
            placeholder="Write your feedback here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            maxLength={2000}
          />

          <LudoButton
            className="w-full h-10"
            variant="alt"
            disabled={!content.trim() || mutation.isPending}
            isLoading={mutation.isPending}
            onClick={handleSubmit}
          >
            Submit
          </LudoButton>

          {mutation.isError && (
            <p className="text-xs text-red-400">
              Something went wrong. Please try again.
            </p>
          )}
        </>
      )}
    </LudoDialog>
  );
}
