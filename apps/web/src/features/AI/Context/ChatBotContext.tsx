import { createContext, useContext, type ReactNode } from "react";
import { useChat, type UseChatHelpers } from "@ai-sdk/react";
import {
  TextStreamChatTransport,
  type UIDataTypes,
  type UIMessage,
  type UITools,
} from "ai";
import { SUBMIT_AI_PROMPT } from "@/constants/api/pathConstants.ts";
import type { ChatBotChatType } from "@ludocode/design-system/widgets/chatbot/ChatbotConversation";
import { useQueryClient } from "@tanstack/react-query";
import { qk } from "@/hooks/Queries/Definitions/qk";

const ChatBotContext = createContext<ChatBotContextValue | null>(null);

type ChatBotContextProps = {
  children: ReactNode;
  credits: number;
  targetId: string | null;
  type: ChatBotChatType;
};

type ChatBotContextValue = {
  chat: UseChatHelpers<UIMessage<any, UIDataTypes, UITools>>;
  credits: number;
};

export function ChatBotProvider({
  children,
  targetId,
  credits,
  type,
}: ChatBotContextProps) {
  const queryClient = useQueryClient();

  const chat = useChat({
    transport: new TextStreamChatTransport({
      api: SUBMIT_AI_PROMPT,
      credentials: "include",
    }),
    onData() {
      queryClient.invalidateQueries({ queryKey: qk.credits() });
    },
    id: `chatbot-${type}-${targetId}`,
  });

  const value = {
    chat,
    credits,
  };

  return (
    <ChatBotContext.Provider value={value}>{children}</ChatBotContext.Provider>
  );
}

export function useChatbot() {
  const ctx = useContext(ChatBotContext);
  if (!ctx) throw new Error("useChatbot must be inside <ChatbotProvider>");
  return ctx;
}
