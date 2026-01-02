import type { UIDataTypes, UIMessage, UITools } from "ai";
import {
  Message,
  MessageContent,
  MessageResponse,
} from "@ludocode/external/ai-elements/message";
import { Loader } from "lucide-react";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@ludocode/external/ai-elements/conversation";
import { ChatbotMessageActions } from "@ludocode/design-system/widgets/chatbot/ChatbotInput";

export type ChatBotChatType = "LESSON" | "PROJECT";

type ChatBotConversationProps = {
  messages: UIMessage<unknown, UIDataTypes, UITools>[];
};

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
                          <ChatbotMessageActions text={part.text} />
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
