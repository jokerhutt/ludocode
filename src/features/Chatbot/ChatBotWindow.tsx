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
type ChatBotProps = {
  currentFile: string | null;
};

const ChatBotWindow = ({ currentFile }: ChatBotProps) => {
  const [input, setInput] = useState("");
  const [url, setUrl] = useState<string | null>(null);

  const { messages, addUserMessage } = useAIStream(url);

  const clearInput = () => setInput("");

  const handleSubmit = (message: PromptInputMessage) => {
    clearInput();
    addUserMessage(message.text);
    setUrl(AI_STREAM_PROMPT(message.text, currentFile));
  };

  return (
    <div className="min-h-0 w-full text-white mx-auto p-6 relative h-full">
      <div className="flex flex-col h-full">
        <div className="flex-1 min-h-0 overflow-y-auto">
          <Conversation className="">
            <ConversationContent>
              {messages.map((message) => (
                <div key={message.id}>
                  {message.parts.map((part, i) => {
                    switch (part.type) {
                      case "text":
                        return (
                          <Message
                            key={`${message.id}-${i}`}
                            from={message.role}
                          >
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
        </div>

        <PromptInput
          onSubmit={handleSubmit}
          className="mt-4"
          globalDrop
          multiple
        >
          <PromptInputHeader>
            <PromptInputAttachments>
              {(attachment) => <PromptInputAttachment data={attachment} />}
            </PromptInputAttachments>
          </PromptInputHeader>
          <PromptInputBody>
            <PromptInputTextarea
              onChange={(e) => setInput(e.target.value)}
              value={input}
            />
          </PromptInputBody>
          <PromptInputFooter>
            <PromptInputTools>
              <PromptInputActionMenu>
                <PromptInputActionMenuTrigger />
                <PromptInputActionMenuContent>
                  <PromptInputActionAddAttachments />
                </PromptInputActionMenuContent>
              </PromptInputActionMenu>
            </PromptInputTools>
            <PromptInputSubmit disabled={!input && !status} />
          </PromptInputFooter>
        </PromptInput>
      </div>
    </div>
  );
};
export default ChatBotWindow;
