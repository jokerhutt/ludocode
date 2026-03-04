import { createContext, useContext, type ReactNode } from "react";
import { useChat, type UseChatHelpers } from "@ai-sdk/react";
import {
  TextStreamChatTransport,
  type UIDataTypes,
  type UIMessage,
  type UITools,
} from "ai";
import type { ChatBotChatType } from "@ludocode/design-system/widgets/chatbot/ChatbotConversation";
import { useQueryClient } from "@tanstack/react-query";
import { qk } from "@/hooks/Queries/Definitions/qk";
import { api } from "@/constants/api/api";

const ChatBotContext = createContext<ChatBotContextValue | null>(null);

type ChatBotContextProps = {
  children: ReactNode;
  credits: number;
  sessionId: string | null;
  type: ChatBotChatType;
};

type ChatBotContextValue = {
  chat: UseChatHelpers<UIMessage<any, UIDataTypes, UITools>>;
  credits: number;
};

export function ChatBotProvider({
  children,
  sessionId,
  credits,
  type,
}: ChatBotContextProps) {
  const queryClient = useQueryClient();

  const chat = useChat({
    transport: new TextStreamChatTransport({
      api: api.ai.completions,
      credentials: "include",
    }),
    onFinish() {
      queryClient.invalidateQueries({ queryKey: qk.credits() });
    },
    id: `chatbot-${type}-${sessionId}`,
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
