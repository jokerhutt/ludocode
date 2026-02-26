import { cn } from "@ludocode/design-system/cn-utils";
import type { ReactNode } from "react";

type EditorTabProps = {
  children: ReactNode;
  className?: string;
  isActive?: boolean;
};

export function EditorTab({
  children,
  className,
  isActive = true,
}: EditorTabProps) {
  const style = cn(
    "px-4 py-1.5 text-sm font-medium rounded-t-md  w-auto flex justify-center items-center gap-2 transition-colors select-none",
    isActive
      ? "bg-ludo-background text-white border-t border-x border-ludo-accent-muted/40"
      : "bg-transparent text-white/50 hover:text-white/80 hover:bg-white/5 hover:cursor-pointer",
    className,
  );

  return (
    <div className={style}>
      {children}
      {isActive && <span className="bg-ludo-background" />}
    </div>
  );
}
