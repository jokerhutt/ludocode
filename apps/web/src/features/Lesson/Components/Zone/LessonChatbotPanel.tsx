import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChatBotProvider } from "@/features/AI/Context/ChatBotContext";
import ChatBotWindow from "@ludocode/design-system/widgets/chatbot/ChatbotWindow";
import { HeroIcon } from "@ludocode/design-system/primitives/hero-icon";
import { useHotkeys } from "@ludocode/hooks";

type LessonChatbotPanelProps = {
  sessionId: string | null;
  systemPrompt: string;
  promptWrapper?: () => string | undefined;
  credits: number;
};

export function LessonChatbotPanel({
  sessionId,
  systemPrompt,
  promptWrapper,
  credits,
}: LessonChatbotPanelProps) {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen((v) => !v);

  useHotkeys({ TOGGLE_WINDOW: toggle });

  return (
    <ChatBotProvider credits={credits} sessionId={sessionId} type="LESSON">
      {/* ml-auto keeps the strip anchored to the right edge as width shrinks */}
      <motion.div
        initial={false}
        animate={{ width: isOpen ? "90%" : "44px" }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
        className="ml-auto h-full flex flex-col border-l border-ludo-border bg-ludo-background overflow-hidden"
      >
        {/* Header — button always at left of strip, always visible */}
        <div className="shrink-0 flex items-center gap-3 px-2 py-2.5 border-b border-ludo-border">
          <button
            onClick={toggle}
            className="rounded-md p-1.5 hover:bg-ludo-surface transition-colors shrink-0 cursor-pointer"
            aria-label={isOpen ? "Collapse AI panel" : "Open AI panel"}
          >
            <HeroIcon
              iconName={isOpen ? "ChevronRightIcon" : "ChevronLeftIcon"}
              className="h-4 w-4 text-white/50"
            />
          </button>
          {isOpen && (
            <div className="flex items-center gap-2 min-w-0">
              <HeroIcon
                iconName="SparklesIcon"
                className="h-3.5 w-3.5 text-ludo-accent-muted shrink-0"
              />
              <span className="text-sm font-medium text-white/80 truncate">
                Ludo Tutor
              </span>
            </div>
          )}
        </div>

        {/* Collapsible content */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="panel-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex flex-col flex-1 min-h-0 overflow-hidden"
            >
              <ChatBotWindow
                systemPrompt={systemPrompt}
                promptWrapper={promptWrapper}
                className="flex-1 bg-ludo-background pb-4 h-full max-h-full"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </ChatBotProvider>
  );
}
