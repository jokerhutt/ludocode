import { createContext, useContext, type ReactNode } from "react";
import { useChat, type UseChatHelpers } from "@ai-sdk/react";
import {
  TextStreamChatTransport,
  type UIDataTypes,
  type UIMessage,
  type UITools,
} from "ai";
import { SUBMIT_AI_PROMPT } from "@/constants/api/pathConstants.ts";
import type { ChatBotChatType } from "../../../../../../packages/design-system/widgets/chatbot/ChatbotConversation.tsx";

const ChatBotContext = createContext<UseChatHelpers<
  UIMessage<any, UIDataTypes, UITools>
> | null>(null);

type ChatBotContextProps = {
  children: ReactNode;
  targetId: string | null;
  type: ChatBotChatType;
};

export function ChatBotProvider({
  children,
  targetId,
  type,
}: ChatBotContextProps) {
  const chat = useChat({
    transport: new TextStreamChatTransport({
      api: SUBMIT_AI_PROMPT,
      credentials: "include",
    }),
    id: `chatbot-${type}-${targetId}`,
  });

  return (
    <ChatBotContext.Provider value={chat}>{children}</ChatBotContext.Provider>
  );
}

export function useChatbot() {
  const ctx = useContext(ChatBotContext);
  if (!ctx) throw new Error("useChatbot must be inside <ChatbotProvider>");
  return ctx;
}
