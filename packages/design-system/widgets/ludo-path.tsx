import React, { type ReactNode } from "react";
import { cn } from "../cn-utils";
import { type LessonStatus } from "@ludocode/types";
import { LudoButton } from "../primitives/ludo-button";
import { CompletionRibbon } from "../primitives/ribbon";
import { LockIcon } from "../primitives/custom-icon";
import { ArrowRightIcon, PlayIcon, StarIcon } from "lucide-react";

type LudoPathProps = { children: ReactNode; className?: string };

function LudoPathRoot({ children, className }: LudoPathProps) {
  return (
    <div
      className={cn(
        "relative w-full max-w-72 lg:max-w-80 flex flex-col items-center min-w-0",
        className,
      )}
    >
      {children}
    </div>
  );
}

export type PathRail = "none" | "dim" | "lit";

type RowProps = {
  children: ReactNode;
  index: number;
  className?: string;
  fullSpan?: boolean;
  label?: ReactNode;
  railAbove?: PathRail;
  railBelow?: PathRail;
};

const railColor = (state: PathRail) =>
  state === "lit" ? "bg-ludo-accent-muted" : "bg-ludo-surface";

function Row({
  children,
  index,
  className,
  fullSpan = false,
  label,
  railAbove = "none",
  railBelow = "none",
}: RowProps) {
  const rail = (
    <>
      {railAbove !== "none" && (
        <span
          aria-hidden
          className={cn(
            "absolute left-1/2 top-0 h-1/2 w-0.5 -translate-x-1/2",
            railColor(railAbove),
          )}
        />
      )}
      {railBelow !== "none" && (
        <span
          aria-hidden
          className={cn(
            "absolute left-1/2 top-1/2 bottom-0 w-0.5 -translate-x-1/2",
            railColor(railBelow),
          )}
        />
      )}
    </>
  );

  if (fullSpan) {
    return (
      <div
        className={cn(
          "relative z-10 w-full min-w-0 flex items-center justify-center py-2 lg:py-3",
          className,
        )}
      >
        {rail}
        {children}
      </div>
    );
  }

  const nodeOnRight = index % 2 === 0;

  const stubState: PathRail =
    railAbove === "lit" || railBelow === "lit" ? "lit" : "dim";

  const node = (
    <div
      className={cn(
        "relative flex w-1/2 min-w-0 items-center",
        nodeOnRight ? "justify-start pl-2" : "justify-end pr-2",
      )}
    >
      <span
        aria-hidden
        className={cn(
          "absolute top-1/2 h-0.5 w-2 -translate-y-1/2",
          railColor(stubState),
          nodeOnRight ? "left-0" : "right-0",
        )}
      />
      {children}
    </div>
  );

  const side = (
    <div
      className={cn(
        "flex w-1/2 min-w-0 items-center",
        nodeOnRight ? "justify-end pr-3 text-right" : "justify-start pl-3",
      )}
    >
      {label}
    </div>
  );

  return (
    <div
      className={cn(
        "relative z-10 w-full min-w-0 flex items-center py-2 lg:py-3",
        className,
      )}
    >
      {rail}
      {nodeOnRight ? side : node}
      {nodeOnRight ? node : side}
    </div>
  );
}

type LabelProps = {
  step: number;
  title: string;
  state: LessonStatus;
  isCurrent?: boolean;
};

function Label({ step, title, state, isCurrent = false }: LabelProps) {
  const tone =
    state === "LOCKED"
      ? "text-ludo-white-disabled"
      : isCurrent
        ? "text-ludo-white-bright"
        : "text-ludo-white";

  return (
    <div className="flex min-w-0 flex-col gap-0.5">
      <span
        className={cn(
          "text-[10px] font-semibold uppercase tracking-widest tabular-nums",
          isCurrent ? "text-ludo-accent-muted" : "text-ludo-white-dim",
        )}
      >
        {isCurrent ? "Current" : String(step).padStart(2, "0")}
      </span>
      <span
        className={cn("line-clamp-2 text-xs font-semibold leading-snug", tone)}
      >
        {title}
      </span>
    </div>
  );
}

const currentOutline = "ring-2 ring-ludo-accent-muted";

const pathIcon =
  "h-10 w-10 shrink-0 transition-[filter] duration-100 group-data-[state=open]:drop-shadow-none";

const raisedIcon =
  "drop-shadow-[0_2px_0_color-mix(in_srgb,var(--color-ludo-surface)_55%,black)]";

const carvedIcon =
  "drop-shadow-[0_1px_0_color-mix(in_srgb,var(--color-ludo-surface)_80%,white)]";

function PathStateIcon({ state }: { state: LessonStatus }) {
  if (state === "LOCKED") {
    return (
      <LockIcon className={cn(pathIcon, carvedIcon, "text-ludo-background")} />
    );
  }

  const Icon = state === "DEFAULT" ? PlayIcon : StarIcon;

  return (
    <Icon
      className={cn(
        pathIcon,
        raisedIcon,
        "fill-current text-ludo-accent-muted",
      )}
    />
  );
}

type PathButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  state: LessonStatus;
  dataTestId?: string;
  isCurrent?: boolean;
};

const Button = React.forwardRef<HTMLButtonElement, PathButtonProps>(
  ({ dataTestId, state, isCurrent, className, ...props }, ref) => {
    return (
      <LudoButton
        data-testid={dataTestId}
        ref={ref}
        selected={isCurrent}
        clickable={false}
        className={cn(
          "group relative w-20 hover:cursor-pointer h-20 shrink-0",
          isCurrent && currentOutline,
          className,
        )}
        {...props}
      >
        <div className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none">
          <CompletionRibbon lessonState={state} />
        </div>
        <PathStateIcon state={state} />
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
    return (
      <LudoButton
        data-testid={dataTestId}
        ref={ref}
        selected={isCurrent}
        clickable={false}
        className={cn(
          "group relative w-full flex-col gap-1 justify-center items-center hover:cursor-pointer my-4 h-20 px-4",
          isCurrent && currentOutline,
          className,
        )}
        {...props}
      >
        <div className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none">
          <CompletionRibbon lessonState={state} />
        </div>

        <p className="text-[10px] font-semibold uppercase tracking-widest text-ludo-accent-muted">
          {isCurrent ? "Guided project · now" : "Guided project"}
        </p>
        <p
          className={cn(
            "line-clamp-2 text-sm font-semibold leading-snug",
            state === "LOCKED"
              ? "text-ludo-white-dim"
              : "text-ludo-white-bright",
          )}
        >
          {title}
        </p>
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
          "relative w-full hover:cursor-pointer h-16 gap-3 flex items-center justify-center px-4",
          className,
        )}
        {...props}
      >
        <span className="truncate font-semibold tracking-wide">
          {title ?? "Next"}
        </span>
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
  Label: typeof Label;
};

export const LudoPath = Object.assign(LudoPathRoot, {
  Row,
  NextButton,
  Button,
  GuidedButton,
  Label,
}) as LudoPathComponent;
