import type { ReactNode } from "react";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";
import { LudoDialog } from "@ludocode/design-system/widgets/ludo-dialog";
import { DialogDescription, DialogTitle } from "@ludocode/external/ui/dialog";

type WarningDialogProps = {
  title: string;
  buttonText: string;
  subtitle?: string;
  onClick: () => void;
  children: ReactNode;
};

export function WarningDialog({
  children,
  title,
  subtitle,
  onClick,
  buttonText,
}: WarningDialogProps) {
  return (
    <LudoDialog asChild={false} trigger={children}>
      <DialogTitle className="text-white">{title}</DialogTitle>
      {subtitle && (
        <DialogDescription className="text-white code font-bold">
          {subtitle}
        </DialogDescription>
      )}

      <LudoButton
        className="w-full h-10"
        variant="alt"
        onClick={() => onClick()}
      >
        {buttonText}
      </LudoButton>
    </LudoDialog>
  );
}
