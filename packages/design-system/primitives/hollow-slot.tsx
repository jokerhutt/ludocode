import { cn } from "@ludocode/design-system/cn-utils";
import { Button } from "@ludocode/external/ui/button";
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
        "bg-ludo-background hover:cursor-pointer hover:bg-ludo-background/50",
        active && "border-2 border-ludo-accent-muted",
        className
      )}
    >
      {children}
    </Button>
  );
}
