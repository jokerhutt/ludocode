import { cn } from "@ludocode/design-system/cn-utils.ts";
import type { ReactNode } from "react";

type EditorTabGroupProps = { children: ReactNode; className?: string };

export function EditorTabGroup({ children, className }: EditorTabGroupProps) {
  return (
    <div className={cn("flex w-full h-full gap-1 items-end", className)}>
      {children}
    </div>
  );
}
