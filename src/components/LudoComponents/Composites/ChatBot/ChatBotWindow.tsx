"use client";
import { type PromptInputMessage } from "@/components/ai-elements/prompt-input";
import { useAutoScrollDown } from "@/Hooks/UI/useAutoScrollDown";
import { ChatBotConversation } from "./ChatBotConversation";
import { ChatBotInput } from "./ChatBotInput";
import { cn } from "@/components/utils";
import { useChatbot } from "@/Hooks/Context/ChatBot/ChatBotContext";
type ChatBotProps = {
  className?: string;
  type: ChatBotChatType;
  targetId: string | null;
};

export type ChatBotChatType = "LESSON" | "PROJECT";

const ChatBotWindow = ({ targetId, type, className }: ChatBotProps) => {
  const { messages, sendMessage, status } = useChatbot();

  const handleSubmit = (message: PromptInputMessage) => {
    sendMessage({
      role: "user",
      parts: [{ type: "text", text: message.text }],
      metadata: {
        chatType: type,
        targetId: targetId,
      },
    });
  };

  const { scrollRef } = useAutoScrollDown({ messages });

  return (
    <div
      className={cn(
        "min-h-0 w-full text-white mx-auto relative h-90 max-h-90",
        className
      )}
    >
      <div className="flex flex-col h-full">
        <div ref={scrollRef} className="flex-1 min-h-0 overflow-y-auto">
          <ChatBotConversation messages={messages} />
        </div>

        <ChatBotInput handleSubmit={handleSubmit} />
      </div>
    </div>
  );
};
export default ChatBotWindow;
