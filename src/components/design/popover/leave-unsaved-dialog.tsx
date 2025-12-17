import type { ReactNode } from "react";
import { WarningDialog } from "@/components/design/popover/WarningDialog.tsx";
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
      title={title}
      subtitle={subtitle}
      buttonText={buttonText}
    >
      {children}
    </WarningDialog>
  );
}
