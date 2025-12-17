import { LockIcon } from "../../design-system/atoms/hero-icon/custom-icon";
import { CompletionRibbon } from "../../design-system/atoms/ribbon/completion-ribbon";
import { LudoButton } from "../primitives/LudoButton.tsx";
import { cn } from "@/components/cn-utils";
import React from "react";
import type { LessonCompletion } from "./types";

type PathButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  lessonState: LessonCompletion;
  isCurrent?: boolean;
};

export const PathButton = React.forwardRef<HTMLButtonElement, PathButtonProps>(
  ({ lessonState, isCurrent, className, ...props }, ref) => {
    const isLocked = lessonState === "LOCKED";

    return (
      <LudoButton
        ref={ref}
        selected={isCurrent}
        className={cn("relative overflow-hidden", className)}
        {...props}
      >
        <CompletionRibbon lessonState={lessonState} />
        {isLocked && <LockIcon className="text-ludoGrayDark h-10 w-10" />}
      </LudoButton>
    );
  }
);
