import * as Select from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "../cn-utils";

type LudoSelectProps = {
  value: string;
  setValue: (v: string) => void;
  title?: string;
  variant?: "default" | "dark";
  children: React.ReactNode;
  containerClassName?: string;
  error?: string;
};

export function LudoSelect({
  value,
  setValue,
  title,
  variant = "default",
  children,
  containerClassName,
  error,
}: LudoSelectProps) {
  const variantStyle =
    variant == "default" ? "bg-ludo-surface" : "bg-ludo-background";

  return (
    <div
      className={cn(
        "w-full text-ludo-white flex flex-col gap-2",
        containerClassName,
      )}
    >
      {title && <p className="text-sm">{title}</p>}

      <Select.Root value={value} onValueChange={setValue}>
        <Select.Trigger
          className={cn(
            "h-12 w-full rounded-md px-3",
            "text-ludo-white-bright",
            "border border-transparent",
            "flex items-center justify-between",
            error && "border-red-400",
            variantStyle,
          )}
        >
          <Select.Value placeholder="Select…" />
          <Select.Icon>
            <ChevronDown className="h-4 w-4 text-ludoGray" />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content
            side="bottom"
            align="start"
            avoidCollisions={false}
            position="popper"
            sideOffset={4}
            className={cn(
              "z-50 rounded-md overflow-hidden rounded-md",
              "border-4 p-2 border-ludo-accent",
              "shadow-lg",
              variantStyle,
            )}
          >
            <Select.Viewport className="p-1 max-h-50 overflow-y-auto">
              {children}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>

      {error && <p className="text-red-400 text-xs">{error}</p>}
    </div>
  );
}

type LudoSelectItemProps = {
  value: string;
  children: React.ReactNode;
};

export function LudoSelectItem({ value, children }: LudoSelectItemProps) {
  return (
    <Select.Item
      value={value}
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded-sm px-8 py-2 text-sm",
        "text-ludo-white-bright outline-none",
        "data-[highlighted]:bg-ludo-accent-muted/20",
        "data-[state=checked]:bg-ludo-accent-muted/30",
      )}
    >
      <Select.ItemIndicator className="absolute left-2">
        <Check className="h-4 w-4" />
      </Select.ItemIndicator>

      <Select.ItemText>{children}</Select.ItemText>
    </Select.Item>
  );
}
