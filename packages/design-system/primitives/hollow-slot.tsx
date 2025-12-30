import { cn } from "@ludocode/design-system/cn-utils.ts";
import { Button } from "@ludocode/external/ui/button.tsx";
import type { ReactNode } from "react";

type HollowSlotButtonProps = {
  children: ReactNode;
  active?: boolean;
  onClick?: () => void;
  className?: string;
};

export function HollowSlotButton({
  children,
  active = false,
  onClick,
  className,
}: HollowSlotButtonProps) {
  return (
    <Button
      onClick={onClick}
      className={cn(
        "flex items-center text-white justify-center gap-2",
        "bg-ludoGrayDark hover:cursor-pointer hover:bg-ludoGrayDark/50",
        active && "border-2 border-ludoLightPurple",
        className
      )}
    >
      {children}
    </Button>
  );
}
