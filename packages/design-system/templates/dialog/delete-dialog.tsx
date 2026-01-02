import { WarningDialog } from "@ludocode/design-system/templates/dialog/WarningDialog";
import type { ReactNode } from "react";

type DeleteDialogProps = {
  targetName: string;
  canDelete: boolean;
  onClick: () => void;
  children: ReactNode;
};

export function DeleteDialog({
  onClick,
  targetName,
  children,
}: DeleteDialogProps) {
  const title = `Are you sure you want to delete ${targetName}?`;

  return (
    <WarningDialog
      onClick={onClick}
      title={title}
      subtitle="This action is irreversible"
      buttonText="Delete"
    >
      {children}
    </WarningDialog>
  );
}
