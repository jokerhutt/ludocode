import { cn } from "@ludocode/design-system/cn-utils";

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
        "mb-2 flex items-center justify-between rounded-md border border-ludo-border bg-ludo-surface px-2 py-1.5 text-xs text-ludo-white-dim",
        className,
      )}
    >
      <span
        className={cn(
          "font-medium",
          empty
            ? "text-ludo-white-bright/30"
            : low
              ? "text-ludo-amber-alt"
              : "text-ludo-white-bright/75",
        )}
      >
        {empty
          ? "No messages remaining"
          : `${credits} ${credits === 1 ? "message" : "messages"} remaining`}
      </span>
    </div>
  );
}
