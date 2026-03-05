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
        <span
          className={cn(
            "font-medium",
            empty
              ? "text-ludo-white-bright/30"
              : low
                ? "text-amber-400"
                : "text-ludo-white-bright/60",
          )}
        >
          {empty
            ? "No messages"
            : `${credits} ${credits === 1 ? "message" : "messages"}`}
        </span>
      </div>
      {!empty && (
        <span className="text-[10px] text-ludo-white-bright/25 tracking-wide uppercase">
          remaining
        </span>
      )}
    </div>
  );
}
