import { cn } from "@ludocode/design-system/cn-utils";
import { MessageCircle, Sparkles } from "lucide-react";

type LessonChatTabsRailProps = {
  activePanel: "DISCUSSION" | "AI" | null;
  onDiscussToggle: () => void;
  onAiToggle: () => void;
};

export function LessonChatTabsRail({
  activePanel,
  onDiscussToggle,
  onAiToggle,
}: LessonChatTabsRailProps) {
  return (
    <aside
      className={cn(
        "hidden lg:flex fixed top-14 right-0 bottom-26 z-45 w-11 items-start justify-start border-l border-r border-ludo-border/60 bg-ludo-background",
      )}
    >
      <div className="flex flex-col items-center gap-2 pt-3">
        <button
          type="button"
          onClick={onAiToggle}
          aria-label="Toggle AI panel"
          className={cn(
            "rounded-md p-2 transition-colors hover:cursor-pointer",
            activePanel === "AI"
              ? "bg-ludo-background text-ludo-white"
              : "text-ludo-white-dim hover:bg-ludo-background/70 hover:text-ludo-white",
          )}
        >
          <Sparkles className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={onDiscussToggle}
          aria-label="Toggle discussion panel"
          className={cn(
            "rounded-md p-2 transition-colors hover:cursor-pointer",
            activePanel === "DISCUSSION"
              ? "bg-ludo-background text-ludo-white"
              : "text-ludo-white-dim hover:bg-ludo-background/70 hover:text-ludo-white",
          )}
        >
          <MessageCircle className="h-4 w-4" />
        </button>
      </div>
    </aside>
  );
}
