import { cn } from "@ludocode/design-system/cn-utils";
import { Button } from "@ludocode/external/ui/button";
import type { ReactNode } from "react";

type HollowSlotButtonProps = {
  children: ReactNode;
  active?: boolean;
  dataTestId?: string;
  onClick?: () => void;
  className?: string;
};

export function HollowSlotButton({
  children,
  active = false,
  onClick,
  dataTestId,
  className,
}: HollowSlotButtonProps) {
  return (
    <Button
      data-testid={dataTestId}
      onClick={onClick}
      className={cn(
        "flex items-center text-white justify-center  gap-2",
        "bg-ludo-surface hover:cursor-pointer hover:bg-ludo-background",
        "focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none",
        active && "bg-ludo-background/80 border border-ludo-accent",
        className,
      )}
    >
      {children}
    </Button>
  );
}
