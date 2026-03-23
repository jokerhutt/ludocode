import { cn } from "@ludocode/design-system/cn-utils";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@ludocode/external/ui/dialog";
import type { ReactNode } from "react";
import { useState } from "react";

type LudoDialogProps = {
  children: ReactNode;
  trigger?: ReactNode;
  asChild?: boolean;
  className?: string;
  triggerClassName?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export function LudoDialog({
  children,
  trigger,
  asChild = true,
  className,
  triggerClassName,
  open,
  onOpenChange,
}: LudoDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = open !== undefined;
  const actualOpen = isControlled ? open : internalOpen;

  const handleOpenChange = (next: boolean) => {
    if (!isControlled) setInternalOpen(next);
    onOpenChange?.(next);
  };

  return (
    <Dialog open={actualOpen} onOpenChange={handleOpenChange}>
      {trigger ? (
        <DialogTrigger asChild={asChild} className={triggerClassName}>
          {trigger}
        </DialogTrigger>
      ) : null}

      <DialogContent
        showCloseButton={false}
        className={cn(
          "bg-ludo-surface border-2 border-ludo-accent text-center",
          className,
        )}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
}

type DialogWrapperProps = {
  children: ReactNode;
  className?: string;
};

export function DialogWrapper({ children, className }: DialogWrapperProps) {
  return (
    <DialogContent
      onClick={(e) => e.stopPropagation()}
      showCloseButton={false}
      className={cn(
        "bg-ludo-surface border-2 border-ludo-accent text-center",
        className,
      )}
    >
      {children}
    </DialogContent>
  );
}
