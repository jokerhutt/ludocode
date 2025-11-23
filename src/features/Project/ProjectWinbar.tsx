import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type ProjectWinbarProps = { children: ReactNode; className?: string };

export function ProjectWinbar({ children, className }: ProjectWinbarProps) {
  return (
    <div
      className={cn(
        "h-10 px-6 w-full max-h-10 min-h-10 bg-ludoGrayLight/70",
        className
      )}
    >
      {children}
    </div>
  );
}
