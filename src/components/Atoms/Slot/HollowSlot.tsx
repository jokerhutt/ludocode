import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type HollowSlotProps = {
  children: ReactNode;
  active?: boolean;
  onClick?: () => void;
  className?: string;
};

export function HollowSlot({
  children,
  active = false,
  onClick,
  className,
}: HollowSlotProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "flex items-center justify-center gap-2 px-3 py-2 rounded-lg",
        "bg-ludoGrayDark hover:cursor-pointer hover:bg-ludoGrayDark/50",
        active && "border-2 border-ludoLightPurple",
        className
      )}
    >
      {children}
    </div>
  );
}