import React, { type ReactNode } from "react";
import { cn } from "../cn-utils";
import { type LessonStatus } from "@ludocode/types";
import { LudoButton } from "../primitives/ludo-button";
import { CompletionRibbon } from "../primitives/ribbon";
import { LockIcon } from "../primitives/custom-icon";
import { ArrowRightIcon } from "lucide-react";

type LudoPathProps = { children: ReactNode; className?: string };

function LudoPathRoot({ children, className }: LudoPathProps) {
  return (
    <div
      className={cn(
        "w-60 flex flex-col gap-4 lg:gap-8 items-center lg:px-0 min-w-0",
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
  className?: string;
  fullSpan?: boolean;
};

function Row({ children, index, className, fullSpan = false }: RowProps) {
  const position = index % 2 === 0 ? "flex-row-reverse" : "flex-row";

  return (
    <div
      className={cn(
        "w-full min-w-0 relative flex items-center",
        fullSpan ? "justify-center" : position,
        className,
      )}
    >
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

type GuidedButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  state: LessonStatus;
  title: string;
  dataTestId?: string;
  isCurrent?: boolean;
};

const GuidedButton = React.forwardRef<HTMLButtonElement, GuidedButtonProps>(
  ({ dataTestId, state, title, isCurrent, className, ...props }, ref) => {
    const isLocked = state === "LOCKED";

    return (
      <LudoButton
        data-testid={dataTestId}
        ref={ref}
        selected={isCurrent}
        clickable={false}
        className={cn(
          "relative w-full hover:cursor-pointer mt-4 h-20 px-3",
          className,
        )}
        {...props}
      >
        <div className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none">
          <CompletionRibbon lessonState={state} />
        </div>

        <div className="flex flex-col  justify-start items-start gap-2 text-ludo-background">
          <span className="rounded-md bg-ludo-white/80 px-1.5 py-0.5 text-[10px] font-bold leading-none tracking-wide">
            GUIDED
          </span>
          <span className="max-w-[70%] truncate text-right text-xs font-semibold leading-none">
            {title}
          </span>
        </div>

        {isLocked && <LockIcon className="text-ludo-background h-10 w-10" />}
      </LudoButton>
    );
  },
);

type NextButtonProps = {
  dataTestId?: string;
  className?: string;
  title?: string;
  onClick?: () => void;
};

const NextButton = React.forwardRef<HTMLButtonElement, NextButtonProps>(
  ({ dataTestId, className, title, onClick, ...props }, ref) => {
    return (
      <LudoButton
        data-testid={dataTestId}
        ref={ref}
        variant="default"
        onClick={() => onClick?.()}
        className={cn(
          "relative w-full hover:cursor-pointer h-16 gap-3 flex items-center justify-center",
          className,
        )}
        {...props}
      >
        <span className="font-semibold tracking-wide">{title ?? "Next"}</span>
        <ArrowRightIcon className="h-5 w-5 shrink-0" />
      </LudoButton>
    );
  },
);

type LudoPathComponent = React.FC<LudoPathProps> & {
  Row: typeof Row;
  Button: typeof Button;
  GuidedButton: typeof GuidedButton;
  NextButton: typeof NextButton;
};

export const LudoPath = Object.assign(LudoPathRoot, {
  Row,
  NextButton,
  Button,
  GuidedButton,
}) as LudoPathComponent;
