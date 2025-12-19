import { useState, type ReactNode } from "react";
import { Input } from "@/components/external/ui/input.tsx";
import { DialogTitle } from "@/components/external/ui/dialog.tsx";
import { LudoDialog } from "../primitives/LudoDialog";
import { LudoButton } from "../primitives/LudoButton";

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
    <LudoDialog open={open} onOpenChange={setOpen} trigger={children}>
      <DialogTitle className="text-white">Rename {itemCategory}</DialogTitle>
      <Input
        className="text-ludoAltText"
        value={textBuffer}
        onChange={(e) => setTextBuffer(e.target.value)}
      />
      <LudoButton
      variant="alt"
      className="w-full h-10"
      onClick={() => {
        onSubmit(oldPath, textBuffer);
        setOpen(false);
      }}
      
      >
        <p>Save</p>
      </LudoButton>
    </LudoDialog>
  );
}
