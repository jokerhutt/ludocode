
import { ChatBotProvider } from "@/Hooks/Context/ChatBot/ChatBotContext";
import { useHotkeys } from "@/Hooks/UI/useHotkeys";
import { cn } from "@/lib/utils";
import { useState } from "react";
import ChatBotWindow, { type ChatBotChatType } from "../../Composites/ChatBot/ChatBotWindow";

type FloatingChatBotWindowProps = {
  chatType: ChatBotChatType;
  targetId: string | null;
  outerClassName?: string;
};

export function FloatingChatBotWindow({
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
