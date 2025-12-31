import { CopyIcon, RefreshCcwIcon } from "lucide-react";
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

type ChatBotInputProps = {
  handleSubmit: (message: PromptInputMessage) => void;
};

export function ChatBotInput({ handleSubmit }: ChatBotInputProps) {
  const [input, setInput] = useState("");

  const clearInputAndSubmit = (message: PromptInputMessage) => {
    setInput("");
    handleSubmit(message);
  };

  return (
    <PromptInput
      onSubmit={clearInputAndSubmit}
      className="mt-4 px-4"
      globalDrop
      multiple
    >
      <PromptInputBody>
        <PromptInputTextarea
          placeholder="Ask your question here."
          onChange={(e: any) => setInput(e.target.value)}
          value={input}
        />
      </PromptInputBody>
      <PromptInputFooter>
        <PromptInputTools />
        <PromptInputSubmit disabled={!input && !status} />
      </PromptInputFooter>
    </PromptInput>
  );
}

type ChatbotMessageActionsProps = { text: string };

export function ChatbotMessageActions({ text }: ChatbotMessageActionsProps) {
  return (
    <MessageActions>
      <MessageAction label="Retry">
        <RefreshCcwIcon className="size-3" />
      </MessageAction>
      <MessageAction
        onClick={() => navigator.clipboard.writeText(text)}
        label="Copy"
      >
        <CopyIcon className="size-3" />
      </MessageAction>
    </MessageActions>
  );
}
