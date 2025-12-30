import {useState} from "react";
import {useHotkeys} from "../../../../apps/web/src/hooks/UI/useHotkeys.tsx";
import {ChatBotProvider} from "../../../../apps/web/src/features/AI/Context/ChatBotContext.tsx";
import {cn} from "../../cn-utils.ts";
import type {ChatBotChatType} from "packages/design-system/widgets/chatbot/ChatbotConversation.tsx";
import ChatBotWindow from "packages/design-system/widgets/chatbot/ChatbotWindow.tsx";

type FloatingChatBotWindowProps = {
    chatType: ChatBotChatType;
    targetId: string | null;
    outerClassName?: string;
};

export function FloatingChatbotWindow({
                                          outerClassName,
                                          targetId,
                                          chatType,
                                      }: FloatingChatBotWindowProps) {
    const [isOpen, setIsOpen] = useState(true);
    const toggleIsOpen = () => setIsOpen((open) => !open);
    const isVisibleStyle = isOpen ? "" : "hidden";

    useHotkeys({
        TOGGLE_WINDOW: toggleIsOpen,
    });

    return (
        <ChatBotProvider targetId={targetId} type="LESSON">
            <div
                className={cn("h-full w-full py-6 ", isVisibleStyle, outerClassName)}
            >
                <div className="h-full min-h-0 flex flex-col border-2 border-ludoGrayLight rounded-md">
                    <div className="h-10 border-b border-b-ludoGrayDark w-full text-white rounded-t-md flex items-center justify-between px-4 bg-ludoGrayLight">
                        <p>Ludo Tutor (⌘+k)</p>
                    </div>
                    <ChatBotWindow


                        type={chatType}
                        className="h-full bg-ludoGrayDark pb-4 rounded-md max-h-full"
                        targetId={targetId}
                    />
                </div>
            </div>
        </ChatBotProvider>
    );
}