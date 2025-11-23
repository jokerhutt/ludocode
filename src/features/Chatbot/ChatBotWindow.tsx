"use client";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {
  Message,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputActionAddAttachments,
  PromptInputActionMenu,
  PromptInputActionMenuContent,
  PromptInputActionMenuTrigger,
  PromptInputAttachment,
  PromptInputAttachments,
  PromptInputBody,
  PromptInputHeader,
  type PromptInputMessage,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputFooter,
  PromptInputTools,
} from "@/components/ai-elements/prompt-input";
import { useState } from "react";
import { Loader } from "@/components/ai-elements/loader";
import { useAIStream } from "@/Hooks/Logic/AI/useAIStream";
import { AI_STREAM_PROMPT } from "@/constants/pathConstants";
import { ChatMessageActions } from "@/components/Molecules/Chatbot/ChatMessageActions";
import { useAutoScrollDown } from "@/Hooks/UI/useAutoScrollDown";
import { ChatBotConversation } from "./ChatBotConversation";
import { ChatBotInput } from "./ChatBotInput";
type ChatBotProps = {
  currentFile: string | null;
};

const ChatBotWindow = ({ currentFile }: ChatBotProps) => {

  const [url, setUrl] = useState<string | null>(null);

  const { messages, addUserMessage } = useAIStream(url);
  const { scrollRef } = useAutoScrollDown({ messages });

  const handleSubmit = (message: PromptInputMessage) => {
    addUserMessage(message.text);
    setUrl(AI_STREAM_PROMPT(message.text, currentFile));
  };

  return (
    <div className="min-h-0 w-full text-white mx-auto p-6 relative h-full">
      <div className="flex flex-col h-full">
        <div ref={scrollRef} className="flex-1 min-h-0 overflow-y-auto">
          <ChatBotConversation messages={messages}/>
        </div>

        <ChatBotInput handleSubmit={handleSubmit}/>
      </div>
    </div>
  );
};
export default ChatBotWindow;
