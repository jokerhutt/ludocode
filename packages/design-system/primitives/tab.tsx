import { cn } from "@ludocode/design-system/cn-utils";
import type { ReactNode } from "react";

type LudoTabGroupProps = {
  children: ReactNode;
  className?: string;
};

function Group({ children, className }: LudoTabGroupProps) {
  return (
    <div className={cn("flex w-full h-full gap-1 items-end", className)}>
      {children}
    </div>
  );
}

type LudoTabItemProps = {
  children: ReactNode;
  className?: string;
  isActive?: boolean;
  onClick?: () => void;
};

function Item({
  children,
  className,
  isActive = false,
  onClick,
}: LudoTabItemProps) {
  return (
    <div
      role="tab"
      onClick={onClick}
      className={cn(
        "px-4 py-1.5 text-sm font-medium rounded-t-md w-auto flex justify-center items-center gap-2 transition-colors select-none",
        isActive
          ? "bg-ludo-background text-white border-t border-x border-ludo-accent-muted/40"
          : "bg-transparent text-ludo-white-dim hover:text-white/80 hover:bg-white/5 hover:cursor-pointer",
        className,
      )}
    >
      {children}
    </div>
  );
}

export const LudoTab = Object.assign(
  {},
  {
    Group,
    Item,
  },
);
