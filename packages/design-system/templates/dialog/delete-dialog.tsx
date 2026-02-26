import {
  type DestructiveActionConfirmation,
  WarningDialog,
} from "@ludocode/design-system/templates/dialog/WarningDialog";
import type { ReactNode } from "react";

type DeleteDialogProps = {
  targetName: string;
  destructiveConfirmation?: DestructiveActionConfirmation;
  description?: string;
  triggerClassName?: string;
  canDelete?: boolean;
  onClick: () => void;
  children: ReactNode;
};

export function DeleteDialog({
  onClick,
  canDelete = true,
  targetName,
  description,
  triggerClassName = "w-full",
  destructiveConfirmation,
  children,
}: DeleteDialogProps) {
  const title = `Are you sure you want to delete ${targetName}?`;

  return (
    <WarningDialog
      onClick={onClick}
      title={title}
      triggerClassName={triggerClassName}
      description={description}
      destructiveConfirmation={destructiveConfirmation}
      subtitle="This action is irreversible"
      buttonText="Delete"
    >
      {children}
    </WarningDialog>
  );
}
