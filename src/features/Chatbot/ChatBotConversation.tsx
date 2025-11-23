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
import { ChatMessageActions } from "@/components/Molecules/Chatbot/ChatMessageActions";
import type { ChatMessage } from "@/Types/AI/AIMessagePart";
import { Loader } from "lucide-react";

type ChatBotConversationProps = { messages: ChatMessage[] };

export function ChatBotConversation({ messages }: ChatBotConversationProps) {
  return (
    <Conversation>
      <ConversationContent>
        {messages.map((message) => (
          <div key={message.id}>
            {message.parts.map((part, i) => {
              switch (part.type) {
                case "text":
                  return (
                    <Message key={`${message.id}-${i}`} from={message.role}>
                      <MessageContent className="group-[.is-user]:bg-ludoGrayLight">
                        <MessageResponse
                          shikiTheme={[
                            "catppuccin-macchiato",
                            "catppuccin-macchiato",
                          ]}
                          parseIncompleteMarkdown
                          className="text-white chatbot-content"
                        >
                          {part.text}
                        </MessageResponse>
                      </MessageContent>
                      {message.role === "assistant" &&
                        i === messages.length - 1 && (
                          <ChatMessageActions text={part.text} />
                        )}
                    </Message>
                  );
                default:
                  return null;
              }
            })}
          </div>
        ))}
        {status === "submitted" && <Loader />}
      </ConversationContent>
      <ConversationScrollButton />
    </Conversation>
  );
}
