import {
  MessageAction,
  MessageActions,
} from "@/components/external/ai-elements/message";
import { CopyIcon, RefreshCcwIcon } from "lucide-react";

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
