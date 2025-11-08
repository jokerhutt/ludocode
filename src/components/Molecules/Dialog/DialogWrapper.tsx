import { DialogContent } from "@/components/ui/dialog";
import type { ReactNode } from "react";

type DialogWrapperProps = { children: ReactNode };

export function DialogWrapper({ children }: DialogWrapperProps) {
  return (
    <DialogContent
      showCloseButton={false}
      className="bg-ludoGrayLight text-center"
    >
      {children}
    </DialogContent>
  );
}
