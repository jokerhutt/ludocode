import { DialogWrapper } from "@ludocode/design-system/widgets/ludo-dialog";
import {
  Dialog,
  DialogTitle,
  DialogTrigger,
} from "@ludocode/external/ui/dialog";
import { CommitIcon } from "@ludocode/design-system/primitives/custom-icon";
import type { ReactNode } from "react";

type CoinsDialogProps = { children: ReactNode; coins: number };

export function CoinsDialog({ children, coins }: CoinsDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogWrapper className="max-w-sm">
        <div className="flex flex-col items-center gap-4 py-2">
          <div className="w-14 h-14 rounded-full bg-pythonYellow/15 flex items-center justify-center">
            <CommitIcon className="h-7 w-7 text-pythonYellow" />
          </div>
          <DialogTitle className="text-white font-bold text-xl">
            Your Commits
          </DialogTitle>
        </div>
        <div className="bg-ludo-background/50 rounded-xl p-4 flex items-center justify-between">
          <span className="text-white/50 text-sm">Total earned</span>
          <span className="text-pythonYellow text-2xl font-bold tabular-nums">
            {coins}
          </span>
        </div>
        <p className="text-white/30 text-xs text-center">
          Earn commits by completing lessons and mastering exercises.
        </p>
      </DialogWrapper>
    </Dialog>
  );
}
