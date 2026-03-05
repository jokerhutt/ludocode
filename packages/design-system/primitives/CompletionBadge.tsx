import { CheckIcon } from "lucide-react";
import { cn } from "../cn-utils";

type CompletionBadgeProps = {
  isComplete?: boolean;
  isActive?: boolean;
  value: number;
  className?: string;
};

export function CompletionBadge({
  isComplete,
  isActive,
  value,
  className,
}: CompletionBadgeProps) {
  return (
    <span
      className={cn(
        "shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors",
        isComplete
          ? "bg-green-500/20 text-green-400"
          : isActive
            ? "bg-ludo-accent text-ludo-white-bright"
            : "bg-ludo-surface text-ludo-white-dim group-hover:text-ludo-white-hover",
        className,
      )}
    >
      {isComplete ? <CheckIcon className="w-3.5 h-3.5" /> : value}
    </span>
  );
}
