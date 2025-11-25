import {
  Dialog,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import { DialogWrapper } from "./DialogWrapper";
import type { ReactNode } from "react";
import type { LudoCourse } from "@/Types/Catalog/LudoCourse";
import type { LudoModule } from "@/Types/Catalog/LudoModule";

type SelectModuleDialogProps = {
  children: ReactNode;
  activeCourse: LudoCourse;
  modules: LudoModule[];
};

export function SelectModuleDialog({
  children,
  activeCourse,
  modules,
}: SelectModuleDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogWrapper>
        <DialogTitle className="text-white">{activeCourse.title}</DialogTitle>
      </DialogWrapper>
    </Dialog>
  );
}
