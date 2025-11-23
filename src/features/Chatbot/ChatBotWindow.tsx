"use client";
import { type PromptInputMessage } from "@/components/ai-elements/prompt-input";
import { useState } from "react";
import { useAIStream } from "@/Hooks/Logic/AI/useAIStream";
import { AI_PROJECT_STREAM_PROMPT } from "@/constants/pathConstants";
import { useAutoScrollDown } from "@/Hooks/UI/useAutoScrollDown";
import { ChatBotConversation } from "./ChatBotConversation";
import { ChatBotInput } from "./ChatBotInput";
import { cn } from "@/lib/utils";
type ChatBotProps = {
  className?: string;
  currentFile: string | null;
};

const ChatBotWindow = ({ currentFile, className }: ChatBotProps) => {
  const [url, setUrl] = useState<string | null>(null);

  const { messages, addUserMessage } = useAIStream(url);
  const { scrollRef } = useAutoScrollDown({ messages });

  const handleSubmit = (message: PromptInputMessage) => {
    addUserMessage(message.text);
    setUrl(AI_PROJECT_STREAM_PROMPT(message.text, currentFile));
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
