import type { ReactNode } from "react";
import { WarningDialog } from "@/components/design-system/blocks/dialog/warning-dialog.tsx";
import { DialogTrigger } from "@/components/external/ui/dialog.tsx";
type LeaveUnsavedBuilder = {
  onClick: () => void;
  children: ReactNode;
  title: string;
  subtitle?: string;
  buttonText?: string;
};

export function LeaveUnsavedDialog({
  onClick,
  children,
  title,
  subtitle,
  buttonText = "Quit",
}: LeaveUnsavedBuilder) {
  return (
    <WarningDialog
      onClick={onClick}
      canClick={true}
      title={title}
      subtitle={subtitle}
      buttonText={buttonText}
    >
      <DialogTrigger>{children}</DialogTrigger>
    </WarningDialog>
  );
}
