import { CopyIcon } from "lucide-react";
import {
  PromptInput,
  PromptInputBody,
  PromptInputFooter,
  type PromptInputMessage,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
} from "@ludocode/external/ai-elements/prompt-input";
import { useState } from "react";
import {
  MessageAction,
  MessageActions,
} from "@ludocode/external/ai-elements/message";
import { ChatbotCreditsTab } from "./ChatbotCreditsTab";
import { useChatbot } from "../../../../apps/web/src/features/ai/context/ChatBotContext";

type ChatBotInputProps = {
  handleSubmit: (message: PromptInputMessage) => void;
};

export function ChatBotInput({ handleSubmit }: ChatBotInputProps) {
  const [input, setInput] = useState("");
  const { credits } = useChatbot();

  const creditsEmpty = credits <= 0;

  const clearInputAndSubmit = (message: PromptInputMessage) => {
    setInput("");
    handleSubmit(message);
  };

  return (
    <PromptInput
      onSubmit={clearInputAndSubmit}
      className="mt-4 min-w-0"
      globalDrop
      multiple
    >
      <ChatbotCreditsTab credits={credits} />
      <PromptInputBody className="min-w-0">
        <PromptInputTextarea
          placeholder="Ask your question here."
          onChange={(e: any) => setInput(e.target.value)}
          value={input}
        />
      </PromptInputBody>
      <PromptInputFooter className="py-1">
        <PromptInputTools />
        <PromptInputSubmit
          className="bg-ludo-accent hover:bg-ludo-accent/80 text-ludo-white-bright rounded-md transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          disabled={(!input && !status) || creditsEmpty}
        />
      </PromptInputFooter>
    </PromptInput>
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
