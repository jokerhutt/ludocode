import { useState, type ReactNode } from "react";
import { DialogTitle } from "@ludocode/external/ui/dialog";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";
import { LudoDialog } from "@ludocode/design-system/widgets/ludo-dialog";
import { Textarea } from "@ludocode/external/ui/textarea";

type DescriptionDialogProps = {
  itemDescription: string;
  onSubmit: (oldDescription: string, newDescription: string) => void;
  children: ReactNode;
  itemCategory: string;
};

export function DescriptionDialog({
  itemDescription,
  children,
  itemCategory,
  onSubmit,
}: DescriptionDialogProps) {
  const oldDescription = itemDescription;
  const [textBuffer, setTextBuffer] = useState<string>(itemDescription);
  const [open, setOpen] = useState(false);

  const trimmed = textBuffer.trim();
  const isBlank = trimmed.length === 0;

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) setTextBuffer(itemDescription);
    setOpen(nextOpen);
  };

  return (
    <LudoDialog
      asChild={false}
      open={open}
      onOpenChange={handleOpenChange}
      trigger={children}
    >
      <DialogTitle className="text-ludo-white-bright">
        Describe {itemCategory}
      </DialogTitle>
      <Textarea
        className="min-h-24 resize-none text-ludo-white"
        value={textBuffer}
        maxLength={280}
        placeholder={`What is this ${itemCategory} about?`}
        onChange={(e) => setTextBuffer(e.target.value)}
      />
      <LudoButton
        variant="alt"
        className="w-full h-10"
        disabled={isBlank}
        clickable={!isBlank}
        onClick={() => {
          if (isBlank) return;
          onSubmit(oldDescription, trimmed);
          setOpen(false);
        }}
      >
        <p>Save</p>
      </LudoButton>
    </LudoDialog>
  );
}
