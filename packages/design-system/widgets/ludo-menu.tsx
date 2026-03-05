import type { ReactNode } from "react";
import { cn } from "../cn-utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@ludocode/external/ui/popover";
import { Slot } from "@radix-ui/react-slot";
import { PopoverClose } from "@radix-ui/react-popover";

type LudoMenuRootProps = {
  children: ReactNode;
  modal?: boolean;
  className?: string;
};

function Root({ children, modal = true, className }: LudoMenuRootProps) {
  return (
    <div
      className={cn("shrink-0", className)}
      onClick={(e) => e.stopPropagation()}
    >
      <Popover modal={modal}>{children}</Popover>
    </div>
  );
}

type TriggerProps = {
  children: ReactNode;
};

function Trigger({ children }: TriggerProps) {
  return <PopoverTrigger asChild>{children}</PopoverTrigger>;
}

type ContentProps = {
  children: ReactNode;
  align?: "start" | "center" | "end";
  className?: string;
};

function Content({ children, align = "end", className }: ContentProps) {
  return (
    <PopoverContent
      onClick={(e) => e.stopPropagation()}
      align={align}
      className={cn(
        "text-ludo-white-bright hover:cursor-default flex flex-col gap-0.5 p-1.5",
        "bg-ludo-surface border border-white/10 rounded-lg shadow-lg shadow-black/30",
        "w-40",
        className,
      )}
    >
      {children}
    </PopoverContent>
  );
}

type ItemProps = {
  children: React.ReactNode;
  onSelect?: () => void;
  disabled?: boolean;
  destructive?: boolean;
  dataTestId?: string;
  className?: string;
  asChild?: boolean;
  closeOnSelect?: boolean;
};

function Item({
  children,
  onSelect,
  disabled,
  dataTestId,
  destructive,
  className,
  closeOnSelect = true,
  asChild = false,
}: ItemProps) {
  const Comp: any = asChild ? Slot : "button";

  const content = (
    <Comp
      data-testid={dataTestId}
      type={asChild ? undefined : "button"}
      disabled={disabled}
      onClick={() => {
        if (!disabled) onSelect?.();
      }}
      className={cn(
        "flex w-full items-center justify-between gap-8 px-2 py-1 rounded-lg transition-colors",
        disabled ? "opacity-60 cursor-not-allowed" : "hover:cursor-pointer",
        destructive ? "hover:bg-red-500/10" : "hover:bg-ludo-accent-muted/50",
        className,
      )}
    >
      {children}
    </Comp>
  );

  if (!closeOnSelect) return content;

  return <PopoverClose asChild>{content}</PopoverClose>;
}

type RowProps = {
  children: ReactNode;
  className?: string;
};

function Row({ children, className }: RowProps) {
  return (
    <div className={cn("flex gap-4 items-center min-w-0", className)}>
      {children}
    </div>
  );
}

type LabelProps = {
  children: ReactNode;
  className?: string;
};

function Label({ children, className }: LabelProps) {
  return <p className={cn("text-sm truncate", className)}>{children}</p>;
}

type IconProps = {
  children: ReactNode;
  className?: string;
};

function Icon({ children, className }: IconProps) {
  return <span className={cn("shrink-0", className)}>{children}</span>;
}

function Divider({ className }: { className?: string }) {
  return <div className={cn("h-px bg-white/10 mx-1 my-0.5", className)} />;
}

export const LudoMenu = Object.assign(Root, {
  Trigger,
  Content,
  Item,
  Row,
  Label,
  Icon,
  Divider,
});
