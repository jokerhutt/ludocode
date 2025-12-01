import { cn } from "@/components/cn-utils.ts";
import type { ReactNode } from "react";

type EditorTabGroupProps = { children: ReactNode; className?: string };

export function EditorTabGroup({ children, className }: EditorTabGroupProps) {
  return (
    <div className={cn("flex h-full gap-4 pt-2 px-6 items-center", className)}>
      {children}
    </div>
  );
}
