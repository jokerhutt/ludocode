import React, { type ReactNode } from "react";
import { cn } from "../cn-utils";
import { type LessonStatus } from "@ludocode/types";
import { LudoButton } from "../primitives/ludo-button";
import { CompletionRibbon } from "../primitives/ribbon";
import { LockIcon } from "../primitives/custom-icon";

type LudoPathProps = { children: ReactNode; className?: string };

function LudoPathRoot({ children, className }: LudoPathProps) {
  return (
    <div
      className={cn(
        "w-60 flex flex-col lg:gap-8 items-center lg:px-0 min-w-0",
        className,
      )}
    >
      {children}
    </div>
  );
}

type RowProps = {
  children: ReactNode;
  index: number;
};

function Row({ children, index }: RowProps) {
  const position = index % 2 === 0 ? "flex-row-reverse" : "flex-row";

  return (
    <div className={cn("w-full min-w-0 relative flex items-center", position)}>
      {children}
    </div>
  );
}
type PathButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  state: LessonStatus;
  dataTestId?: string;
  isCurrent?: boolean;
};

const Button = React.forwardRef<HTMLButtonElement, PathButtonProps>(
  ({ dataTestId, state, isCurrent, className, ...props }, ref) => {
    const isLocked = state === "LOCKED";

    return (
      <LudoButton
        data-testid={dataTestId}
        ref={ref}
        selected={isCurrent}
        clickable={false}
        className={cn("relative w-20 hover:cursor-pointer h-20", className)}
        {...props}
      >
        <div className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none">
          <CompletionRibbon lessonState={state} />
        </div>
        {isLocked && <LockIcon className="text-ludo-background h-10 w-10" />}
      </LudoButton>
    );
  },
);

type LudoPathComponent = React.FC<LudoPathProps> & {
  Row: typeof Row;
  Button: typeof Button;
};

export const LudoPath = Object.assign(LudoPathRoot, {
  Row,
  Button,
}) as LudoPathComponent;
