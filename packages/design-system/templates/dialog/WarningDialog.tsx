import { useState, type ReactNode } from "react";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";
import { LudoDialog } from "@ludocode/design-system/widgets/ludo-dialog";
import { DialogDescription, DialogTitle } from "@ludocode/external/ui/dialog";
import { Input } from "@ludocode/external/ui/input";
import { LudoInput } from "@ludocode/design-system/primitives/input";

export type DestructiveActionConfirmation = {
  confirmationText: string;
  confirmationValue: string;
};

type WarningDialogProps = {
  title: string;
  buttonText: string;
  subtitle?: string;
  onClick: () => void;
  description?: string;
  triggerClassName?: string;
  asChild?: boolean;
  destructiveConfirmation?: DestructiveActionConfirmation;
  children: ReactNode;
};

export function WarningDialog({
  children,
  title,
  subtitle,
  description,
  asChild = false,
  triggerClassName,
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
    <LudoDialog
      asChild={asChild}
      trigger={children}
      triggerClassName={triggerClassName}
    >
      <DialogTitle className="text-ludo-white-bright">{title}</DialogTitle>
      {subtitle && (
        <DialogDescription className="text-ludo-white code font-bold">
          {subtitle}
        </DialogDescription>
      )}

      {description && (
        <DialogDescription className="text-ludo-white code font-bold">
          {description}
        </DialogDescription>
      )}

      {destructiveConfirmation && (
        <>
          <DialogDescription className="text-ludo-white code font-bold">
            type
            <span className="text-ludo-danger">
              {" "}
              {destructiveConfirmation.confirmationValue}{" "}
            </span>
            to confirm
          </DialogDescription>
          <LudoInput
            className="text-ludo-white"
            variant="dark"
            setValue={setConfirmationValue}
            value={confirmationValue}
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
