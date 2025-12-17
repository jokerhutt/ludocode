import { DialogWrapper } from "@/components/design-system/blocks/dialog/dialog-wrapper.tsx";
import { useState, type ReactNode } from "react";
import { Input } from "@/components/external/ui/input.tsx";
import { Dialog, DialogTitle } from "@/components/external/ui/dialog.tsx";
import { ActionButton } from "@/components/design-system/atoms/button/action-button.tsx";
import { LudoDialog } from "../primitives/LudoDialog";

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
  const [open, setOpen] = useState(false);

  return (
    <LudoDialog trigger={children}>
      <DialogTitle className="text-white">Rename {itemCategory}</DialogTitle>
      <Input
        className="text-ludoAltText"
        value={textBuffer}
        onChange={(e) => setTextBuffer(e.target.value)}
      />
      <ActionButton
        onClick={() => {
          onSubmit(oldPath, textBuffer);
          setOpen(false);
        }}
        active={true}
        orientation="center"
        text="Save"
      />
    </LudoDialog>
  );
}
