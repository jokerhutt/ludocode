import { cn } from "@ludocode/design-system/cn-utils";
import { SparklesIcon } from "lucide-react";

type ChatbotCreditsTabProps = { credits: number; className?: string };

export function ChatbotCreditsTab({
  className,
  credits,
}: ChatbotCreditsTabProps) {
  const low = credits <= 5;
  const empty = credits <= 0;

  return (
    <div
      className={cn(
        "w-full py-2 px-3 text-xs bg-ludo-surface/40 border-b border-white/5 flex items-center justify-between",
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <SparklesIcon
          className={cn(
            "w-3.5 h-3.5",
            empty
              ? "text-white/20"
              : low
                ? "text-amber-400"
                : "text-ludo-accent-muted",
          )}
        />
        <span
          className={cn(
            "font-medium",
            empty ? "text-white/30" : low ? "text-amber-400" : "text-white/60",
          )}
        >
          {empty
            ? "No credits"
            : `${credits} ${credits === 1 ? "credit" : "credits"}`}
        </span>
      </div>
      {!empty && (
        <span className="text-[10px] text-white/25 tracking-wide uppercase">
          remaining
        </span>
      )}
    </div>
  );
}
