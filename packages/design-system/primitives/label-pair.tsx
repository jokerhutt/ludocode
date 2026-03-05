import { cn } from "@ludocode/design-system/cn-utils";
import type { ReactNode } from "react";

type LabelPair = {
  className?: string;
  children: ReactNode;
};

export function LabelPair({ children, className }: LabelPair) {
  return (
    <div
      className={cn(
        "flex gap-4 text-ludo-white-bright items-center",
        className,
      )}
    >
      {children}
    </div>
  );
}
