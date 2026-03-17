import { useLessonContext } from "@/features/lesson/context/useLessonContext.tsx";
import { ExerciseInteraction } from "@/features/lesson/components/ExerciseInteraction.tsx";
import { useExerciseBodyData } from "@/features/lesson/hooks/useExerciseBodyData.tsx";
import { useExerciseHistory } from "@/features/lesson/hooks/useExerciseHistory.tsx";
import { useExerciseInputs } from "@/features/lesson/hooks/useExerciseInputs.tsx";
import { LessonChatbotPanel } from "@/features/lesson/zones/LessonChatbotPanel.tsx";
import { BlockRenderer } from "@ludocode/design-system/widgets/exercise/BlockRenderer.tsx";
import {
  buildSystemPromptForExercise,
  buildClozeUserMessage,
  buildSelectUserMessage,
} from "@ludocode/design-system/widgets/chatbot/chatbotSystemPrompts.ts";
import { useSuspenseQuery } from "@tanstack/react-query";
import { qo } from "@/queries/definitions/queries.ts";
import { useUserPreferencesContext } from "@/features/user/context/useUserPreferenceContext.tsx";
import { AnimatePresence, motion } from "motion/react";
import { useFeatureEnabledCheck } from "@/features/auth/hooks/useFeatureEnabledCheck.tsx";
import { useCallback, useMemo } from "react";
import { useIsMobile } from "@ludocode/hooks";

export function ExercisePage() {
  const {
    currentExercise,
    submissionHistory,
    isComplete,
    dismissIncorrectFeedback,
    setCanSubmit,
    setAttemptFactory,
  } = useLessonContext();
  const { aiEnabled } = useUserPreferencesContext();
  const aiFeature = useFeatureEnabledCheck({ feature: "isAIEnabled" });
  const { correctInputs } = useExerciseHistory({
    currentExercise,
    submissionHistory,
  });
  const inputState = useExerciseInputs({
    currentExercise,
    correctInputs,
    onInputInteraction: dismissIncorrectFeedback,
    setCanSubmit,
    setAttemptFactory,
  });
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

  const showOutput = isComplete;

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
                <BlockRenderer
                  key={index}
                  block={block}
                  showOutput={showOutput}
                  mobile={isMobile}
                />
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
