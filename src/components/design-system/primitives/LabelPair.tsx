import { cn } from "@/components/cn-utils.ts";
import type { ReactNode } from "react";

type LabelPair = {
  className?: string;
  children: ReactNode;
};

export function LabelPair({ children, className }: LabelPair) {
  return (
    <div className={cn("flex gap-4 text-white items-center", className)}>
      {children}
    </div>
  );
}
