import type {UIDataTypes, UIMessage, UITools} from "ai";
import {
    Conversation,
    ConversationContent,
    ConversationScrollButton
} from "../../../external/ai-elements/conversation.tsx";
import {Message, MessageContent, MessageResponse} from "../../../external/ai-elements/message.tsx";
import {Loader} from "lucide-react";
import { ChatbotMessageActions } from "./ChatbotInput";

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