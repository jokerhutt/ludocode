import { cn } from "@ludocode/design-system/cn-utils";
import { ChevronUpIcon, LayoutListIcon, type LucideIcon } from "lucide-react";

type FloatingTriggerButtonProps = {
  position?: number;
  title?: string;
  chevron?: boolean;
  onClick?: () => void;
  side?: "left" | "right";
  variant?: "accent" | "surface";
  icon?: LucideIcon;
  label?: string;
};

export function FloatingMobileTrigger({
  position,
  title,
  onClick,
  chevron,
  side = "right",
  variant = "accent",
  icon: Icon = LayoutListIcon,
  label,
}: FloatingTriggerButtonProps) {
  const iconOnly = !title;

  return (
    <button
      type="button"
      aria-label={label}
      onClick={() => onClick?.()}
      className={cn(
        "fixed bottom-24 z-40 lg:hidden",
        side === "right" ? "right-4" : "left-4",
        "flex items-center gap-2 rounded-full",
        iconOnly ? "p-2.5" : "px-4 py-2.5",
        variant === "accent"
          ? "bg-ludo-accent text-ludo-white-bright shadow-lg shadow-ludo-accent/25"
          : "bg-ludo-surface text-ludo-white ring-1 ring-white/10 shadow-lg shadow-black/25",
        "hover:cursor-pointer active:scale-95 transition-transform",
      )}
    >
      <Icon className={iconOnly ? "w-5 h-5" : "w-4 h-4"} />
      {title && (
        <span className="text-sm font-semibold">
          {position} {title}
        </span>
      )}
      {chevron && <ChevronUpIcon className="w-3.5 h-3.5 opacity-60" />}
    </button>
  );
}
