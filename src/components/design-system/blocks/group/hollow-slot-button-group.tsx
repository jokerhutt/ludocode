import { cn } from "@/components/cn-utils.ts";
import type { ReactNode } from "react";

type HollowSlotButtonGroupProps = {
  className?: string;
  children: ReactNode;
};

export function HollowSlotButtonGroup({
  children,
  className,
}: HollowSlotButtonGroupProps) {
  return (
    <div className={cn("flex gap-4 text-white items-center", className)}>
      {children}
    </div>
  );
}
