import { CopyIcon } from "lucide-react";
import { cn } from "@ludocode/design-system/cn-utils";
import { type PromptInputMessage } from "@ludocode/external/ai-elements/prompt-input";
import { useState, type KeyboardEvent } from "react";
import {
  MessageAction,
  MessageActions,
} from "@ludocode/external/ai-elements/message";
import { ChatbotCreditsTab } from "./ChatbotCreditsTab";
import { useChatbot } from "../../../../apps/web/src/features/ai/context/ChatBotContext";
import { Textarea } from "@ludocode/external/ui/textarea";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";

type ChatBotInputProps = {
  handleSubmit: (message: PromptInputMessage) => void;
  className?: string;
};

export function ChatBotInput({ handleSubmit, className }: ChatBotInputProps) {
  const [input, setInput] = useState("");
  const { credits } = useChatbot();

  const creditsEmpty = credits <= 0;

  const clearInputAndSubmit = (message: PromptInputMessage) => {
    setInput("");
    handleSubmit(message);
  };

  const handleSend = () => {
    const text = input.trim();
    if (!text || creditsEmpty) return;

    clearInputAndSubmit({ text, files: [] });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key !== "Enter" || e.shiftKey) return;
    e.preventDefault();
    handleSend();
  };

  return (
    <div className={cn("min-w-0 w-full max-w-none px-0 py-3", className)}>
      <ChatbotCreditsTab credits={credits} />
      <div className="w-full min-w-0">
        <Textarea
          placeholder="Ask your question here."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="min-h-20 resize-none border-ludo-border bg-ludo-background text-ludo-white-bright focus-visible:border-ludo-border focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
          maxLength={2000}
        />
      </div>

      <div className="mt-2 flex items-center justify-end">
        <LudoButton
          variant="alt"
          className="h-8 px-4"
          onClick={handleSend}
          disabled={!input.trim() || creditsEmpty}
        >
          Send
        </LudoButton>
      </div>
    </div>
  );
}

type ChatbotMessageActionsProps = { text: string };

export function ChatbotMessageActions({ text }: ChatbotMessageActionsProps) {
  return (
    <MessageActions>
      <MessageAction
        onClick={() => navigator.clipboard.writeText(text)}
        label="Copy"
      >
        <CopyIcon className="size-3" />
      </MessageAction>
    </MessageActions>
  );
}
