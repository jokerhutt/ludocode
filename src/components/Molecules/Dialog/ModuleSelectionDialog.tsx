import {
  Dialog,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import { DialogWrapper } from "./DialogWrapper";
import { Button } from "@/components/ui/button";
import type { ReactNode } from "react";

type ModuleSelectionDialogProps = { children: ReactNode };

export function ModuleSelectionDialog({
  children,
}: ModuleSelectionDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogWrapper>
        <DialogTitle className="text-white">Title</DialogTitle>
        <DialogDescription className="text-white code font-bold">
          Placeholder
        </DialogDescription>
      </DialogWrapper>
    </Dialog>
  );
}
