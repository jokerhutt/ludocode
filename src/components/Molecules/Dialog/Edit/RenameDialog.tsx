import { Dialog, DialogTitle } from "@radix-ui/react-dialog";
import { DialogWrapper } from "../DialogWrapper";
import { ActionButton } from "@/components/Atoms/Button/ActionButton";
import { useState, type ReactNode } from "react";
import { Input } from "@/components/ui/input";

type RenameDialogProps = {
  itemName: string;
  onSubmit: (oldPath: string, newPath: string) => void;
  children: ReactNode;
  itemCategory: string;
};

export function RenameDialog({
  itemName,
  children,
  itemCategory,
  onSubmit,
}: RenameDialogProps) {
  const oldPath = itemName;
  const [textBuffer, setTextBuffer] = useState<string>(itemName);

  return (
    <Dialog>
      {children}
      <DialogWrapper>
        <DialogTitle className="text-white">Rename {itemCategory}</DialogTitle>
        <Input
          className="text-ludoAltText"
          value={textBuffer}
          onChange={(e) => setTextBuffer(e.target.value)}
        />
        <ActionButton
          onClick={() => onSubmit(oldPath, textBuffer)}
          active={true}
          orientation="center"
          text="Save"
        />
      </DialogWrapper>
    </Dialog>
  );
}
