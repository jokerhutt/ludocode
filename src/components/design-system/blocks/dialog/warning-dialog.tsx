
import { ActionButton } from "@/components/design-system/atoms/button/action-button.tsx";
import { DialogWrapper } from "./dialog-wrapper.tsx";
import { Dialog, DialogDescription, DialogTitle } from "@/components/external/ui/dialog.tsx";
import type { ReactNode } from "react";

type WarningDialogProps = {
  title: string;
  buttonText: string;
  subtitle?: string;
  canClick: boolean;
  onClick: () => void;
  children: ReactNode;
};

export function WarningDialog({
  onClick,
  canClick,
  title,
  buttonText,
  subtitle,
  children,
}: WarningDialogProps) {
  return (
    <Dialog>
      {children}
      <DialogWrapper>
        <DialogTitle className="text-white">{title}</DialogTitle>
        {subtitle && (
          <DialogDescription className="text-white code font-bold">
            {subtitle}
          </DialogDescription>
        )}

        <ActionButton
          onClick={() => onClick()}
          active={canClick}
          orientation="center"
          text={buttonText}
        />
      </DialogWrapper>
    </Dialog>
  );
}
