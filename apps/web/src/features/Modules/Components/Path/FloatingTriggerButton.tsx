import { cn } from "@ludocode/design-system/cn-utils";
import { ChevronUpIcon, LayoutListIcon } from "lucide-react";

type FloatingTriggerButtonProps = {
    position?: number;
    title: string;
    chevron?: boolean;
    onClick?: () => void;
};

export function FloatingTriggerButton({position, title, onClick, chevron}: FloatingTriggerButtonProps) {
  return (
    <button
      type="button"
      onClick={() => onClick?.()}
      className={cn(
        "fixed bottom-24 right-4 z-40 lg:hidden",
        "flex items-center gap-2 px-4 py-2.5 rounded-full",
        "bg-ludo-accent text-white shadow-lg shadow-ludo-accent/25",
        "hover:cursor-pointer active:scale-95 transition-transform",
      )}
    >
      <LayoutListIcon className="w-4 h-4" />
      <span className="text-sm font-semibold">
          {position} {title}
      </span>
      {chevron && <ChevronUpIcon className="w-3.5 h-3.5 opacity-60" />}
    </button>
  );
}
