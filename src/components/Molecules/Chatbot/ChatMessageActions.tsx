import {
  MessageAction,
  MessageActions,
} from "@/components/ai-elements/message";
import { CopyIcon, RefreshCcwIcon } from "lucide-react";

type ChatMessageActionsProps = { text: string };

export function ChatMessageActions({ text }: ChatMessageActionsProps) {
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
