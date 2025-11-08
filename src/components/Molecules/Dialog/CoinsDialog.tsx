import { Dialog, DialogHeader } from "@/components/ui/dialog";
import { DialogWrapper } from "./DialogWrapper";

type CoinsDialogProps = {open: boolean, close: () => void};

export function CoinsDialog({open, close}: CoinsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={() => close()}>
        <DialogWrapper>
            <DialogHeader className="text-white code font-bold text-xl">Your Commits</DialogHeader>
        </DialogWrapper>
    </Dialog>
  );
}