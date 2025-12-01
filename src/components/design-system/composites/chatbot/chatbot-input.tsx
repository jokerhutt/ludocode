import { useState } from "react";
import {
  PromptInput,
  PromptInputBody,
  type PromptInputMessage,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputFooter,
  PromptInputTools,
} from "@/components/external/ai-elements/prompt-input";
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
          onChange={(e) => setInput(e.target.value)}
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
