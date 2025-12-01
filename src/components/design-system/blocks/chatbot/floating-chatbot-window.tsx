import { ChatBotProvider } from "@/hooks/Context/ChatBot/ChatBotContext";
import { useHotkeys } from "@/hooks/UI/useHotkeys";
import { cn } from "@/components/cn-utils.ts";
import { useState } from "react";
import ChatBotWindow, {
  type ChatBotChatType,
} from "@/components/design-system/composites/chatbot/chatbot-window.tsx";

type FloatingChatBotWindowProps = {
  chatType: ChatBotChatType;
  targetId: string | null;
  outerClassName?: string;
};

export function FloatingChatbotWindow({
  outerClassName,
  targetId,
  chatType,
}: FloatingChatBotWindowProps) {
  const [isOpen, setIsOpen] = useState(true);
  const toggleIsOpen = () => setIsOpen((open) => !open);
  const isVisibleStyle = isOpen ? "" : "hidden";

  useHotkeys({
    TOGGLE_WINDOW: toggleIsOpen,
  });

  return (
    <ChatBotProvider targetId={targetId} type="LESSON">
      <div
        className={cn("h-full w-full py-6 ", isVisibleStyle, outerClassName)}
      >
        <div className="h-full min-h-0 flex flex-col border-2 border-ludoGrayLight rounded-lg">
          <div className="h-10 border-b border-b-ludoGrayDark w-full text-white rounded-t-md flex items-center justify-between px-4 bg-ludoGrayLight">
            <p>Ludo Tutor (⌘+k)</p>
          </div>
          <ChatBotWindow
            type={chatType}
            className="h-full bg-ludoGrayDark pb-4 rounded-xl max-h-full"
            targetId={targetId}
          />
        </div>
      </div>
    </ChatBotProvider>
  );
}
