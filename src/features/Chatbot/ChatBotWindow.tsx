"use client";
import { type PromptInputMessage } from "@/components/ai-elements/prompt-input";
import { useState } from "react";
import { useAIStream } from "@/Hooks/Logic/AI/useAIStream";
import {
  AI_LESSON_STREAM_PROMPT,
  AI_PROJECT_STREAM_PROMPT,
} from "@/constants/pathConstants";
import { useAutoScrollDown } from "@/Hooks/UI/useAutoScrollDown";
import { ChatBotConversation } from "./ChatBotConversation";
import { ChatBotInput } from "./ChatBotInput";
import { cn } from "@/lib/utils";
type ChatBotProps = {
  className?: string;
  type: ChatBotChatType
  targetId: string | null;
};


export type ChatBotChatType = "LESSON" | "PROJECT"

const ChatBotWindow = ({ targetId, type, className }: ChatBotProps) => {
  const [url, setUrl] = useState<string | null>(null);

  const { messages, addUserMessage } = useAIStream(url);
  const { scrollRef } = useAutoScrollDown({ messages });

  const handleSubmit = (message: PromptInputMessage) => {
    addUserMessage(message.text);
    switch (type) {
      case "LESSON":
        if (targetId != null) {
          setUrl(AI_LESSON_STREAM_PROMPT(message.text, targetId));
        }
      break;
      case "PROJECT":
        setUrl(AI_PROJECT_STREAM_PROMPT(message.text, targetId));
      break;
    }
    
  };

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
