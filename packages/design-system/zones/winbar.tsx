import { cn } from "@ludocode/design-system/cn-utils";
import type { ReactNode } from "react";

type Winbar = { children: ReactNode; className?: string };

export function Winbar({ children, className }: Winbar) {
  return (
    <div
      className={cn(
        "h-10 px-6 w-full max-h-10 min-h-10 bg-ludo-surface/70",
        className
      )}
    >
      {children}
    </div>
  );
}
