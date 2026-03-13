import { cn } from "@ludocode/design-system/cn-utils";
import { BlockRenderer } from "@ludocode/design-system/widgets/exercise/BlockRenderer";
import { Workbench } from "@ludocode/design-system/widgets/Workbench";
import { useLessonContext } from "./context/useLessonContext";
import { useUserPreferencesContext } from "../user/context/useUserPreferenceContext";
import { useFeatureEnabledCheck } from "../auth/hooks/useFeatureEnabledCheck";
import { ChatBotProvider } from "../ai/context/ChatBotContext";
import { ChatBotAccordion } from "@ludocode/design-system/widgets/chatbot/ChatbotAccordion";
import ChatBotWindow from "@ludocode/design-system/widgets/chatbot/ChatbotWindow";

type GuidedExercisePage = {};

export function GuidedExercisePage({}: GuidedExercisePage) {
  const { currentExercise, phase } = useLessonContext();
  const showOutput = phase === "CORRECT" || phase === "SUBMITTED";
  const { aiEnabled } = useUserPreferencesContext();
  const aiFeature = useFeatureEnabledCheck({ feature: "isAIEnabled" });
  return (
    <div className="grid col-span-full min-h-0 grid-cols-12">
      <Workbench.Pane
        dataTestId="guided-project-aside-left"
        className={cn("border-r-2 border-r-ludo-surface", "lg:col-span-3")}
      >
        <Workbench.Pane.Content>
          <div className="flex flex-col gap-4 items-center">
            {currentExercise.blocks.map((block, index) => (
              <BlockRenderer
                key={index}
                block={block}
                showOutput={showOutput}
                mobile={false}
              />
            ))}
          </div>
        </Workbench.Pane.Content>
        {aiEnabled && aiFeature.enabled && (
          <div className="min-h-0 min-w-0 w-full h-full flex flex-col justify-end">
            <ChatBotProvider
              credits={100}
              sessionId={"01"}
              type="PROJECT"
            >
              <ChatBotAccordion>
                <ChatBotWindow
                  systemPrompt={""}
                />
              </ChatBotAccordion>
            </ChatBotProvider>
          </div>
        )}
      </Workbench.Pane>
    </div>
  );
}
