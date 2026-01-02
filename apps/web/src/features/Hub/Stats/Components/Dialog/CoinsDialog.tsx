import { DialogWrapper } from "@ludocode/design-system/widgets/ludo-dialog";
import {
  Dialog,
  DialogTitle,
  DialogTrigger,
} from "@ludocode/external/ui/dialog";
import type { ReactNode } from "react";

type CoinsDialogProps = { children: ReactNode; coins: number };

export function CoinsDialog({ children, coins }: CoinsDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogWrapper>
        <DialogTitle className="text-white text-start code font-bold text-xl">
          Your Commits
        </DialogTitle>
        <hr />
        <div className="flex flex-col">
          <p className="text-white text-start">Total: {coins}</p>
        </div>
      </DialogWrapper>
    </Dialog>
  );
}
