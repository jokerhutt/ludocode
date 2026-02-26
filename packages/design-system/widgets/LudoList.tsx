import { cn } from "@ludocode/design-system/cn-utils";
import { CompletionBadge } from "@ludocode/design-system/primitives/CompletionBadge";
import {
  ProgressSummary,
  ProgressSummaryProps,
} from "@ludocode/design-system/primitives/ProgressSummary";
import { ReactNode } from "react";

type LudoListProps = { children?: ReactNode; className?: string };

function LudoListRoot({ children, className }: LudoListProps) {
  return <div className={cn("flex flex-col gap-2", className)}>{children}</div>;
}

function Header({ children }: { children?: ReactNode }) {
  return (
    <p className="text-white/40 text-xs font-semibold uppercase tracking-widest px-1 mb-2">
      {children}
    </p>
  );
}

function Content({ children, className }: { children?: ReactNode; className?: string }) {
  return <div className={cn("flex flex-col gap-1", className)}>{children}</div>;
}

type ItemProps = {
  title: string;
  position?: number;
  onClick?: () => void;
  isActive?: boolean;
  isComplete?: boolean;
  progress?: ProgressSummaryProps;
};

function Item({
  title,
  progress,
  position,
  onClick,
  isActive,
  isComplete,
}: ItemProps) {
  const Component = onClick ? "button" : "div";

  return (
    <Component
      {...(onClick && { type: "button", onClick })}
      className={cn(
        "w-full flex relative items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150",
        "text-left group",
        onClick && "hover:cursor-pointer",
        isActive
          ? "bg-ludo-accent/15 ring-1 ring-ludo-accent/50"
          : onClick && "hover:bg-ludo-surface/30",
      )}
    >
      {position && (
        <CompletionBadge
          value={position}
          isComplete={isComplete}
          isActive={isActive}
        />
      )}

      <div className="flex flex-col min-w-0 flex-1">
        <span
          className={cn(
            "text-sm font-medium truncate transition-colors",
            isActive ? "text-white" : "text-white/60 group-hover:text-white/90",
          )}
        >
          {title}
        </span>

        {progress && (
          <ProgressSummary
            current={progress.current}
            total={progress.total}
            detailed={progress.detailed}
          />
        )}
      </div>

      {isActive && (
        <span className="shrink-0 absolute top-4 right-3 w-1.5 h-1.5 rounded-full bg-ludo-accent" />
      )}
    </Component>
  );
}

export const LudoList = Object.assign(LudoListRoot, {
  Header,
  Content,
  Item,
});
