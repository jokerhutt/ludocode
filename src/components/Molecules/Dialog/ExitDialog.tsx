import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

type ExitDialogProps = {open: boolean, close: () => void};

export function ExitDialog({open, close}: ExitDialogProps) {
  return (
    <Dialog open={open} onOpenChange={() => close()}>
        <DialogContent >
            <DialogTitle>Are you sure you want to exit?</DialogTitle>
        </DialogContent>
    </Dialog>
  );
}