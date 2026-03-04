import { useHotkeys } from "@ludocode/hooks";
import { useState } from "react";
import { ChatBotProvider } from "../../../../apps/web/src/features/AI/Context/ChatBotContext";
import { cn } from "@ludocode/design-system/cn-utils";
import ChatBotWindow from "@ludocode/design-system/widgets/chatbot/ChatbotWindow";

type FloatingChatBotWindowProps = {
  sessionId: string | null;
  systemPrompt: string;
  promptWrapper?: () => string | undefined;
  credits: number;
  disabled?: boolean;
  outerClassName?: string;
};

export function FloatingChatbotWindow({
  outerClassName,
  sessionId,
  systemPrompt,
  promptWrapper,
  credits,
  disabled,
}: FloatingChatBotWindowProps) {
  const [isOpen, setIsOpen] = useState(true);
  const toggleIsOpen = () => setIsOpen((open) => !open);
  const isVisibleStyle = isOpen ? "" : "hidden";

  useHotkeys({
    TOGGLE_WINDOW: toggleIsOpen,
  });

  return (
    <ChatBotProvider credits={credits} sessionId={sessionId} type="LESSON">
      <div
        className={cn("h-full w-full py-6 ", isVisibleStyle, outerClassName)}
      >
        <div className="h-full min-h-0 flex flex-col border-2 border-ludo-surface rounded-md">
          <div className="h-10 border-b border-b-ludo-background w-full text-white rounded-t-md flex items-center justify-between px-4 bg-ludo-surface">
            <p>Ludo Tutor (⌘+k)</p>
          </div>
          <ChatBotWindow
            systemPrompt={systemPrompt}
            promptWrapper={promptWrapper}
            className="h-full bg-ludo-background pb-4 rounded-md max-h-full"
          />
        </div>
      </div>
    </ChatBotProvider>
  );
}
