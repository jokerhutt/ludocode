import { DialogContent } from "@/components/external/ui/dialog";
import type { ReactNode } from "react";
import { cn } from "@/components/cn-utils.ts";

type DialogWrapperProps = {
  children: ReactNode;
  className?: string;
};

export function DialogWrapper({ children, className }: DialogWrapperProps) {
  return (
    <DialogContent
      onClick={(e) => e.stopPropagation()}
      showCloseButton={false}
      className={cn("bg-ludoGrayLight text-center", className)}
    >
      {children}
    </DialogContent>
  );
}
