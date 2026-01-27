import { LudoDialog } from "@ludocode/design-system/widgets/ludo-dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import type { ReactNode } from "react";

type EditProfileDialogProps = {
  children: ReactNode;
};

export function EditProfileDialog({ children }: EditProfileDialogProps) {
  return (
    <LudoDialog trigger={children}>
      <DialogTitle className="text-white">Edit Profile</DialogTitle>
    </LudoDialog>
  );
}
