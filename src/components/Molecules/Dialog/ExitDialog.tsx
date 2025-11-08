import { ActionButton } from "@/components/Atoms/Button/ActionButton";
import { WideButton } from "@/components/Atoms/Button/WideButton";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ludoNavigation } from "@/routes/ludoNavigation";
import { router } from "@/routes/router";
import { DialogDescription } from "@radix-ui/react-dialog";
import { DialogWrapper } from "./DialogWrapper";

type ExitDialogProps = { open: boolean; close: () => void };

export function ExitDialog({ open, close }: ExitDialogProps) {
  const navigateToModule = () =>
    router.navigate(ludoNavigation.module.toCurrent());

  return (
    <Dialog open={open} onOpenChange={() => close()}>
      <DialogWrapper>
        <DialogTitle className="text-white">
          Are you sure you want to exit?
        </DialogTitle>
        <DialogDescription className="text-white code font-bold">
          All progress in this lesson will be lost
        </DialogDescription>
        <ActionButton
          onClick={() => navigateToModule()}
          active={true}
          orientation="center"
          text="Yes"
        />
      </DialogWrapper>
    </Dialog>
  );
}
