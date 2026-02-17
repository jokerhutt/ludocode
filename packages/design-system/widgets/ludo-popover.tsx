import type { ReactElement, ReactNode } from "react";
import { PopoverArrow, PopoverTrigger } from "@radix-ui/react-popover";
import { Popover, PopoverContent } from "@ludocode/external/ui/popover";

export type BasePopoverProps = {
  trigger: ReactElement;
  children: ReactNode;
};

export function LudoPopover({ children, trigger }: BasePopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent
        align={"center"}
        side="bottom"
        className="rounded-xl relative mx-10 flex justify-between pt-3 min-w-80 flex-row mt-2 bg-ludo-background border-2 border-ludo-accent"
      >
        <PopoverArrow
          className="fill-ludo-surface stroke-ludo-accent"
          width={12}
          height={6}
        />
        {children}
      </PopoverContent>
    </Popover>
  );
}
