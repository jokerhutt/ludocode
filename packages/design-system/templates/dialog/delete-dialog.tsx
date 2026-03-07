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
  asChild?: boolean;
  onClick: () => void;
  children: ReactNode;
};

export function DeleteDialog({
  onClick,
  targetName,
  description,
  triggerClassName = "w-full",
  asChild = false,
  destructiveConfirmation,
  children,
}: DeleteDialogProps) {
  const title = `Are you sure you want to delete ${targetName}?`;

  return (
    <WarningDialog
      onClick={onClick}
      asChild={asChild}
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
