import { useLessonContext } from "@/features/Lesson/Context/useLessonContext.tsx";
import { ExerciseInteraction } from "@/features/Lesson/Templates/ExerciseInteraction.tsx";
import { useExerciseBodyData } from "@/features/Lesson/Hooks/useExerciseBodyData.tsx";
import { LessonChatbotPanel } from "@/features/Lesson/Components/Zone/LessonChatbotPanel.tsx";
import { BlockRenderer } from "@ludocode/design-system/widgets/exercise/BlockRenderer";
import {
  buildSystemPromptForExercise,
  buildClozeUserMessage,
  buildSelectUserMessage,
} from "@ludocode/design-system/widgets/chatbot/chatbotSystemPrompts";

import { useSuspenseQuery } from "@tanstack/react-query";
import { qo } from "@/hooks/Queries/Definitions/queries.ts";
import { useUserPreferencesContext } from "@/hooks/Context/useUserPreferenceContext";
import { AnimatePresence, motion } from "motion/react";
import { useFeatureEnabledCheck } from "@/hooks/Guard/useFeatureEnabledCheck";
import { useCallback, useMemo } from "react";
import { useIsMobile } from "@ludocode/hooks";

export function LessonPage() {
  const { inputState, currentExercise, phase } = useLessonContext();
  const { aiEnabled } = useUserPreferencesContext();
  const aiFeature = useFeatureEnabledCheck({ feature: "isAIEnabled" });
  const body = useExerciseBodyData(currentExercise, inputState);
  const { data: credits } = useSuspenseQuery(qo.credits());
  const isMobile = useIsMobile({});

  const interactionOutput = useMemo(() => {
    const interaction = currentExercise.interaction;
    if (interaction?.type === "CLOZE") return interaction.output ?? null;
    return null;
  }, [currentExercise]);

  const systemPrompt = useMemo(
    () => buildSystemPromptForExercise(currentExercise),
    [currentExercise],
  );

  const promptWrapper = useCallback((): string | undefined => {
    const type = currentExercise.interaction?.type;
    if (type === "CLOZE") {
      return buildClozeUserMessage(
        currentExercise,
        inputState.currentExerciseInputs,
      );
    }
    if (type === "SELECT") {
      const selected = inputState.currentExerciseInputs[0]?.value || undefined;
      return buildSelectUserMessage(currentExercise, selected);
    }
    return undefined;
  }, [currentExercise, inputState.currentExerciseInputs]);

  const showOutput = phase === "CORRECT";

  return (
    <>
      {currentExercise && (
        <AnimatePresence mode="wait">
          <motion.div
            key={currentExercise.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="col-span-full lg:col-start-4 lg:col-span-6 flex flex-col gap-8 px-8 lg:px-0 py-8 items-stretch justify-center h-full min-w-0 w-full"
          >
            <div className="flex flex-col gap-4 items-center">
              {currentExercise.blocks.map((block, index) => (
                <div className="max-w-xl">
                  <BlockRenderer
                    key={index}
                    block={block}
                    showOutput={showOutput}
                    mobile={isMobile}
                  />
                </div>
              ))}
            </div>
              <ExerciseInteraction
                body={body}
                output={interactionOutput}
                showOutput={showOutput}
                mobileOutput={isMobile}
              />
          </motion.div>
        </AnimatePresence>
      )}

      <div className="hidden lg:block lg:col-start-10 lg:col-span-3 h-full min-h-0 overflow-hidden">
        {aiEnabled && aiFeature.enabled && (
          <LessonChatbotPanel
            credits={credits}
            sessionId={currentExercise.id ?? null}
            systemPrompt={systemPrompt}
            promptWrapper={promptWrapper}
          />
        )}
      </div>
    </>
  );
}
