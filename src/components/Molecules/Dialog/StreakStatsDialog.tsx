import { Dialog, DialogHeader } from "@/components/ui/dialog";
import { DialogWrapper } from "./DialogWrapper";

type StreakStatsDialogProps = { open: boolean; close: () => void };

export function StreakStatsDialog({ open, close }: StreakStatsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={() => close()}>
      <DialogWrapper>
        <DialogHeader className="text-white code font-bold text-xl">
          Your Streak
        </DialogHeader>
      </DialogWrapper>
    </Dialog>
  );
}
