import { DialogContent } from "@/components/ui/dialog";
import type { ReactNode } from "react";
import { cn } from "@/components/utils";

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
