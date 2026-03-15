import { BlockRenderer } from "@ludocode/design-system/widgets/exercise/BlockRenderer";
import { Workbench } from "@ludocode/design-system/widgets/Workbench";
import type { LudoExercise } from "@ludocode/types";
import { cn } from "@ludocode/design-system/cn-utils";
import { ChatBotProvider } from "@/features/ai/context/ChatBotContext";
import { ChatBotAccordion } from "@ludocode/design-system/widgets/chatbot/ChatbotAccordion";
import ChatBotWindow from "@ludocode/design-system/widgets/chatbot/ChatbotWindow";
import { useFeatureEnabledCheck } from "@/features/auth/hooks/useFeatureEnabledCheck";
import { useUserPreferencesContext } from "@/features/user/context/useUserPreferenceContext";
import { useIsMobile } from "@ludocode/hooks";
import { useSuspenseQuery } from "@tanstack/react-query";
import { qo } from "@/queries/definitions/queries";

type GuidedExerciseTreePaneProps = {
  showBlockOutput?: boolean;
  currentExercise: LudoExercise;
  systemPrompt: string;
  className?: string;
};

export function GuidedExerciseTreePane({
  showBlockOutput = true,
  currentExercise,
  systemPrompt,
  className,
}: GuidedExerciseTreePaneProps) {
  const isMobile = useIsMobile({});
  const { aiEnabled } = useUserPreferencesContext();
  const aiFeature = useFeatureEnabledCheck({ feature: "isAIEnabled" });
  const { data: chatbotCredits } = useSuspenseQuery(qo.credits());
  return (
    <Workbench.Pane
      dataTestId="guided-project-aside-left"
      className={cn("lg:border-r-2 border-r-ludo-surface", className)}
    >
      <Workbench.Pane.Winbar className="hidden lg:block">
        <p className="text-sm font-medium tracking-wide">Instructions</p>
      </Workbench.Pane.Winbar>
      <Workbench.Pane.Content>
        <div className="flex flex-col pl-2 gap-4 items-start lg:items-center">
          {currentExercise.blocks.map((block, index) => (
            <BlockRenderer
              lessonType="GUIDED"
              key={index}
              block={block}
              showOutput={showBlockOutput}
              mobile={false}
            />
          ))}
        </div>
      </Workbench.Pane.Content>
      {!isMobile && aiEnabled && aiFeature.enabled && (
        <div className="min-h-0 min-w-0 w-full h-full flex flex-col justify-end">
          <ChatBotProvider
            sessionId={currentExercise.id}
            credits={chatbotCredits}
            type="LESSON"
          >
            <ChatBotAccordion>
              <ChatBotWindow systemPrompt={systemPrompt} />
            </ChatBotAccordion>
          </ChatBotProvider>
        </div>
      )}
    </Workbench.Pane>
  );
}
