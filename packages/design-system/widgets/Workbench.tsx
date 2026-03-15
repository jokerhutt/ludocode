import { cn } from "@ludocode/design-system/cn-utils";
import type { ReactNode } from "react";

type WorkbenchProps = {
  children?: ReactNode;
  className?: string;
};

function WorkbenchRoot({ children, className }: WorkbenchProps) {
  return (
    <div className={cn("flex h-full", className)}>{children}</div>
  );
}

type WorkbenchPaneProps = {
  children: ReactNode;
  className?: string;
  dataTestId?: string;
};

export function Pane({ children, className, dataTestId }: WorkbenchPaneProps) {
  return (
    <div
      data-testid={dataTestId}
      className={cn(
        "flex-1 min-w-0 w-full min-h-0 bg-ludo-background grid grid-rows-[auto_1fr] lg:col-span-3",
        className,
      )}
    >
      {children}
    </div>
  );
}

type WinbarProps = {
  children: ReactNode;
  className?: string;
};

function Winbar({ children, className }: WinbarProps) {
  return (
    <div
      className={cn(
        "h-10 px-6 w-full max-h-10 min-h-10 bg-ludo-surface/70",
        className,
      )}
    >
      <div
        className={cn(
          "flex h-full text-ludo-white-bright justify-between items-center",
        )}
      >
        {children}
      </div>
    </div>
  );
}

type ContentProps = {
  children: ReactNode;
  className?: string;
  dataTestId?: string;
};

function Content({ children, className, dataTestId }: ContentProps) {
  return (
    <div
      data-testid={dataTestId}
      className={cn(
        "flex pl-4 pr-0 py-3 overflow-y-auto [scrollbar-gutter:stable] overflow-x-hidden min-h-0 h-full bg-ludo-background gap-2 text-ludo-white-bright flex-col w-full",
        className,
      )}
    >
      {children}
    </div>
  );
}

const WorkbenchPane = Object.assign(Pane, {
  Winbar,
  Content,
});

type WorkbenchComponent = React.FC<WorkbenchProps> & {
  Pane: typeof WorkbenchPane;
};

export const Workbench = Object.assign(WorkbenchRoot, {
  Pane: WorkbenchPane,
}) as WorkbenchComponent;
