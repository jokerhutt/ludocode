import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Sparkles } from "lucide-react";
import ChatBotWindow from "@ludocode/design-system/widgets/chatbot/ChatbotWindow.tsx";
import { buildSystemPromptForExercise } from "@ludocode/design-system/widgets/chatbot/chatbotSystemPrompts";
import { useLessonExercise } from "@/features/lesson/context/useLessonContext.tsx";
import { ChatBotProvider } from "@/features/ai/context/ChatBotContext.tsx";
import { useUserPreferencesContext } from "@/features/user/context/useUserPreferenceContext.tsx";
import { useFeatureEnabledCheck } from "@/features/auth/hooks/useFeatureEnabledCheck";
import { qo } from "@/queries/definitions/queries";
import { LessonChatPanelFrame } from "./LessonChatPanelFrame";

type LessonAiDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  animated?: boolean;
};

export function LessonAiDrawer({
  open,
  onOpenChange,
  animated = true,
}: LessonAiDrawerProps) {
  const { currentExercise } = useLessonExercise();
  const { aiEnabled } = useUserPreferencesContext();
  const aiFeature = useFeatureEnabledCheck({ feature: "isAIEnabled" });
  const { data: credits } = useQuery(qo.credits());

  const systemPrompt = useMemo(
    () => buildSystemPromptForExercise(currentExercise),
    [currentExercise],
  );

  if (!aiEnabled || !aiFeature.enabled) return null;

  return (
    <ChatBotProvider
      credits={credits ?? 0}
      sessionId={currentExercise.id ?? null}
      type="LESSON"
    >
      <LessonChatPanelFrame
        open={open}
        onOpenChange={onOpenChange}
        title="AI Chat"
        Icon={Sparkles}
        animated={animated}
        desktopPanelClassName="top-14 right-11 bottom-26 h-auto"
      >
        <div className="h-full w-full px-4 py-3">
          <ChatBotWindow
            systemPrompt={systemPrompt}
            className="h-full w-full max-h-full min-h-0 min-w-0 bg-ludo-background"
            inputClassName="rounded-none border-0 px-0 py-3"
          />
        </div>
      </LessonChatPanelFrame>
    </ChatBotProvider>
  );
}
