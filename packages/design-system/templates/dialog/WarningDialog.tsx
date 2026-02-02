import { useState, type ReactNode } from "react";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";
import { LudoDialog } from "@ludocode/design-system/widgets/ludo-dialog";
import { DialogDescription, DialogTitle } from "@ludocode/external/ui/dialog";
import { Input } from "@ludocode/external/ui/input";

export type DestructiveActionConfirmation = {
  confirmationText: string;
  confirmationValue: string;
};

type WarningDialogProps = {
  title: string;
  buttonText: string;
  subtitle?: string;
  onClick: () => void;
  destructiveConfirmation?: DestructiveActionConfirmation;
  children: ReactNode;
};

export function WarningDialog({
  children,
  title,
  subtitle,
  onClick,
  buttonText,
  destructiveConfirmation,
}: WarningDialogProps) {
  const [confirmationValue, setConfirmationValue] = useState("");

  const canClick =
    !destructiveConfirmation ||
    confirmationValue == destructiveConfirmation.confirmationValue;
  const handleClick = () => {
    if (!canClick) return;
    onClick();
  };

  return (
    <LudoDialog asChild={false} trigger={children}>
      <DialogTitle className="text-white">{title}</DialogTitle>
      {subtitle && (
        <DialogDescription className="text-white code font-bold">
          {subtitle}
        </DialogDescription>
      )}

      {destructiveConfirmation && (
        <>
          <DialogDescription className="text-white code font-bold">
            type
            <span className="text-ludo-danger">
              {destructiveConfirmation.confirmationValue}
            </span>
            to confirm
          </DialogDescription>
          <Input
            className="text-ludoAltText"
            onChange={(e) => setConfirmationValue(e.target.value)}
          />
        </>
      )}

      <LudoButton
        className="w-full h-10"
        variant="danger"
        disabled={!canClick}
        onClick={() => handleClick()}
      >
        {buttonText}
      </LudoButton>
    </LudoDialog>
  );
}
