import { cn } from "@ludocode/design-system/cn-utils.js";
import type { PromptInputMessage } from "../../../external/ai-elements/prompt-input.tsx";
import { ChatBotConversation } from "./ChatbotConversation";
import { ChatBotInput } from "./ChatbotInput";
import { useAutoScrollDown } from "@ludocode/hooks";
import { useChatbot } from "../../../../apps/web/src/features/AI/Context/ChatBotContext.js";

type ChatBotProps = {
  className?: string;
  systemPrompt: string;
  promptWrapper?: () => string | undefined;
};

const ChatBotWindow = ({
  systemPrompt,
  promptWrapper,
  className,
}: ChatBotProps) => {
  const { chat } = useChatbot();
  const { messages, sendMessage } = chat;

  const handleSubmit = (message: PromptInputMessage) => {
    sendMessage({
      role: "user",
      parts: [{ type: "text", text: message.text }],
      metadata: {
        systemPrompt,
        promptWrapper: promptWrapper?.(),
      },
    });
  };

  const { scrollRef } = useAutoScrollDown({ messages });

  return (
    <div
      className={cn(
        "min-h-0 min-w-0 w-full text-ludo-white-bright mx-auto relative h-90 max-h-90",
        className,
      )}
    >
      <div className="flex flex-col min-w-0 h-full">
        <div ref={scrollRef} className="flex-1 min-h-0 min-w-0 overflow-y-auto">
          <ChatBotConversation messages={messages} />
        </div>

        <ChatBotInput handleSubmit={handleSubmit} />
      </div>
    </div>
  );
};
export default ChatBotWindow;
