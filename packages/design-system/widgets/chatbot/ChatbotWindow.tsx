import {useChatbot} from "../../../../apps/web/src/features/AI/Context/ChatBotContext.tsx";
import type {PromptInputMessage} from "../../../external/ai-elements/prompt-input.tsx";
import {useAutoScrollDown} from "../../../../apps/web/src/hooks/UI/useAutoScrollDown.tsx";
import {cn} from "../../cn-utils.ts";
import { ChatBotConversation, type ChatBotChatType } from "./ChatbotConversation";
import { ChatBotInput } from "./ChatbotInput";


type ChatBotProps = {
    className?: string;
    type: ChatBotChatType;
    targetId: string | null;
};

const ChatBotWindow = ({ targetId, type, className }: ChatBotProps) => {
    const { messages, sendMessage} = useChatbot();

    const handleSubmit = (message: PromptInputMessage) => {
        sendMessage({
            role: "user",
            parts: [{ type: "text", text: message.text }],
            metadata: {
                chatType: type,
                targetId: targetId,
            },
        });
    };

    const { scrollRef } = useAutoScrollDown({ messages });

    return (
        <div
            className={cn(
                "min-h-0 w-full text-white mx-auto relative h-90 max-h-90",
                className
            )}
        >
            <div className="flex flex-col h-full">
                <div ref={scrollRef} className="flex-1 min-h-0 overflow-y-auto">
                    <ChatBotConversation messages={messages} />
                </div>

                <ChatBotInput handleSubmit={handleSubmit} />
            </div>
        </div>
    );
};
export default ChatBotWindow;