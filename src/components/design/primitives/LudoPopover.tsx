import { Popover, PopoverContent } from "@/components/external/ui/popover.tsx";
import type { ReactElement, ReactNode } from "react";
import { PopoverArrow, PopoverTrigger } from "@radix-ui/react-popover";
import { useIsMobile } from "@/hooks/Guard/useIsMobile.tsx";

export type BasePopoverProps = {
  trigger: ReactElement;
  children: ReactNode;
};

export function LudoPopover({ children, trigger }: BasePopoverProps) {
  const isMobile = useIsMobile();

  return (
    <Popover>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent
        align={isMobile ? "end" : "center"}
        side="bottom"
        className="rounded-xl relative mx-10 flex justify-between pt-3 min-w-90 flex-row mt-2 bg-ludoGrayLight border-ludoLightPurple"
      >
        <PopoverArrow
          className="fill-ludoGrayLight stroke-ludoLightPurple"
          width={12}
          height={6}
        />
        {children}
      </PopoverContent>
    </Popover>
  );
}
