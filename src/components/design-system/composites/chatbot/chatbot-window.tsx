"use client";
import { type PromptInputMessage } from "@/components/external/ai-elements/prompt-input";
import { useAutoScrollDown } from "@/hooks/UI/useAutoScrollDown";
import { ChatBotConversation } from "./chatbot-conversation.tsx";
import { ChatBotInput } from "./chatbot-input.tsx";
import { cn } from "@/components/cn-utils.ts";
import { useChatbot } from "@/hooks/Context/ChatBot/ChatBotContext";
type ChatBotProps = {
  className?: string;
  type: ChatBotChatType;
  targetId: string | null;
};

export type ChatBotChatType = "LESSON" | "PROJECT";

const ChatBotWindow = ({ targetId, type, className }: ChatBotProps) => {
  const { messages, sendMessage} = useChatbot();

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
