import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/external/ui/dialog.tsx";
import type { ReactNode } from "react";
import { cn } from "@/components/cn-utils.ts";

type DialogWrapperProps = {
  children: ReactNode;
  trigger: ReactNode;
  asChild?: boolean;
  className?: string;
};

export function LudoDialog({
  children,
  asChild = true,
  trigger,
  className,
}: DialogWrapperProps) {
  return (
    <Dialog>
      <DialogTrigger asChild={asChild} onClick={(e) => e.stopPropagation()}>
        {trigger}
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className={cn(
          "bg-ludoGrayLight border-2 border-ludoLightPurple text-center",
          className
        )}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
}
