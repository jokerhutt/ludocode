import { DialogWrapper } from "@ludocode/design-system/widgets/ludo-dialog.tsx";
import {
  Dialog,
  DialogTitle,
  DialogTrigger,
} from "@ludocode/external/ui/dialog.tsx";
import { CommitIcon } from "@ludocode/design-system/primitives/custom-icon.tsx";
import type { ReactNode } from "react";

type CoinsDialogProps = { children: ReactNode; coins: number };

export function CoinsDialog({ children, coins }: CoinsDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogWrapper className="max-w-sm">
        <div className="flex flex-col items-center gap-4 py-2">
          <div className="w-14 h-14 rounded-full bg-white/15 flex items-center justify-center">
            <CommitIcon className="h-7 w-7 text-ludo-white-bright" />
          </div>
          <DialogTitle className="text-ludo-white-bright font-bold text-xl">
            Your Commits
          </DialogTitle>
        </div>
        <div className="bg-ludo-background rounded-xl p-4 flex items-center justify-between">
          <span className="text-ludo-white-dim text-sm">Total earned</span>
          <span className="text-ludo-white-bright text-2xl font-bold tabular-nums">
            {coins}
          </span>
        </div>
        <p className="text-ludo-white-dim text-xs text-center">
          Earn commits by completing lessons and mastering exercises.
        </p>
      </DialogWrapper>
    </Dialog>
  );
}
