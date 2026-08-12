import type { ReactElement, ReactNode } from "react";
import { PopoverArrow, PopoverTrigger } from "@radix-ui/react-popover";
import { Popover, PopoverContent } from "@ludocode/external/ui/popover";
import { cn } from "../cn-utils";

export type BasePopoverProps = {
  trigger: ReactElement;
  children: ReactNode;
  className?: string;
};

export function LudoPopover({
  children,
  trigger,
  className,
}: BasePopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent
        align={"center"}
        side="bottom"
        sideOffset={10}
        collisionPadding={16}
        className={cn(
          "relative flex w-72 flex-col rounded-xl p-3",
          "bg-ludo-surface border border-white/10 shadow-lg shadow-black/30",
          className,
        )}
      >
        <PopoverArrow className="fill-ludo-surface" width={14} height={7} />
        {children}
      </PopoverContent>
    </Popover>
  );
}
