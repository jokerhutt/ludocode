import {
  type DestructiveActionConfirmation,
  WarningDialog,
} from "@ludocode/design-system/templates/dialog/WarningDialog";
import type { ReactNode } from "react";

type DeleteDialogProps = {
  targetName: string;
  destructiveConfirmation?: DestructiveActionConfirmation;
  canDelete?: boolean;
  onClick: () => void;
  children: ReactNode;
};

export function DeleteDialog({
  onClick,
  canDelete = true,
  targetName,
  destructiveConfirmation,
  children,
}: DeleteDialogProps) {
  const title = `Are you sure you want to delete ${targetName}?`;

  return (
    <WarningDialog
      onClick={onClick}
      title={title}
      destructiveConfirmation={destructiveConfirmation}
      subtitle="This action is irreversible"
      buttonText="Delete"
    >
      {children}
    </WarningDialog>
  );
}
