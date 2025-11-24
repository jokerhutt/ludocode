import ChatBotWindow, {
  type ChatBotChatType,
} from "@/features/Chatbot/ChatBotWindow";
import { ChatBotProvider } from "@/features/Common/ChatbotContext";
import { cn } from "@/lib/utils";

type FloatingChatBotWindowProps = {
  chatType: ChatBotChatType;
  targetId: string | null;
  outerClassName?: string;
};

export function FloatingChatBotWindow({
  outerClassName,
  targetId,
  chatType,
}: FloatingChatBotWindowProps) {
  return (
    <div className={cn("h-full w-full py-6 ", outerClassName)}>
      <ChatBotProvider targetId={targetId} type="LESSON">
        <div className="h-full min-h-0 flex flex-col border-2 border-ludoGrayLight rounded-lg">
          <div className="h-10 border-b border-b-ludoGrayDark w-full text-white rounded-t-md flex items-center justify-between px-4 bg-ludoGrayLight">
            <p>Ludo Tutor</p>
          </div>
          <ChatBotWindow
            type={chatType}
            className="h-full bg-ludoGrayDark pb-4 rounded-xl max-h-full"
            targetId={targetId}
          />
        </div>
      </ChatBotProvider>
    </div>
  );
}
