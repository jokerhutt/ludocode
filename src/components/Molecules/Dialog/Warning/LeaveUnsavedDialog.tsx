import type { ReactNode } from "react";
import { WarningDialogWithTrigger } from "./WarningDialogWithTrigger";
import { DialogTrigger } from "@/components/ui/dialog";
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
    <WarningDialogWithTrigger
      onClick={onClick}
      canClick={true}
      title={title}
      subtitle={subtitle}
      buttonText={buttonText}
    >
      <DialogTrigger>{children}</DialogTrigger>
    </WarningDialogWithTrigger>
  );
}
