import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type HollowSlotGroupProps = {
  className?: string;
  children: ReactNode;
};

export function HollowSlotGroup({ children, className }: HollowSlotGroupProps) {
  return (
    <div className={cn("flex gap-4 text-white items-center", className)}>
      {children}
    </div>
  );
}
