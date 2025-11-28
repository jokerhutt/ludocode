import { Dialog, DialogHeader } from "@/components/ui/dialog";
import { DialogWrapper } from "../DialogWrapper";
import type { ReactNode } from "react";
import { DialogTrigger } from "@radix-ui/react-dialog";

type CoinsDialogProps = { children: ReactNode; coins: number };

export function CoinsDialog({ children, coins }: CoinsDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogWrapper>
        <DialogHeader className="text-white code font-bold text-xl">
          Your Commits
        </DialogHeader>
        <div className="flex flex-col">
          <p className="text-white text-start">Total: {coins}</p>
        </div>
      </DialogWrapper>
    </Dialog>
  );
}
