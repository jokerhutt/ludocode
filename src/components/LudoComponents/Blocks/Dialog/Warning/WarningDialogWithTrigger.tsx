
import { ActionButton } from "@/components/LudoComponents/Atoms/Button/ActionButton";
import { DialogWrapper } from "../DialogWrapper";
import { Dialog, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import type { ReactNode } from "react";

type DeleteDialogWithTriggerProps = {
  title: string;
  buttonText: string;
  subtitle?: string;
  canClick: boolean;
  onClick: () => void;
  children: ReactNode;
};

export function WarningDialogWithTrigger({
  onClick,
  canClick,
  title,
  buttonText,
  subtitle,
  children,
}: DeleteDialogWithTriggerProps) {
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
