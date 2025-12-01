import { DialogTrigger } from "@radix-ui/react-dialog";
import type { ReactNode } from "react";
import { WarningDialog } from "@/components/design-system/blocks/dialog/warning-dialog.tsx";

type DeleteDialogProps = {
  targetName: string;
  canDelete: boolean;
  onClick: () => void;
  children: ReactNode;
};

export function DeleteDialog({
  onClick,
  canDelete,
  targetName,
  children,
}: DeleteDialogProps) {
  const title = `Are you sure you want to delete ${targetName}?`;

  return (
    <WarningDialog
      onClick={onClick}
      canClick={canDelete}
      title={title}
      subtitle="This action is irreversible"
      buttonText="Delete"
    >
      <DialogTrigger>{children}</DialogTrigger>
    </WarningDialog>
  );
}
