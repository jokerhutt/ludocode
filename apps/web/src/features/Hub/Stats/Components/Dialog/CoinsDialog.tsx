import { DialogWrapper } from "../../../../../../../../packages/design-system/widgets/ludo-dialog.tsx";
import { Dialog, DialogTitle, DialogTrigger } from "../../../../../../../../packages/external/ui/dialog.tsx";
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
        <hr/>
        <div className="flex flex-col">
          <p className="text-white text-start">Total: {coins}</p>
        </div>
      </DialogWrapper>
    </Dialog>
  );
}
