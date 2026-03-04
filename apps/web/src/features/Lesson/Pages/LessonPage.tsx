import { useLessonContext } from "@/features/Lesson/Context/useLessonContext.tsx";
import { ExerciseInteraction } from "@/features/Lesson/Templates/ExerciseInteraction.tsx";
import { useExerciseBodyData } from "@/features/Lesson/Hooks/useExerciseBodyData.tsx";
import { FloatingChatbotWindow } from "@ludocode/design-system/widgets/chatbot/FloatingChatbotWindow.tsx";
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
import type { LudoExercise } from "@ludocode/types/Exercise/LudoExercise.ts";

function getExerciseOutput(exercise: LudoExercise): string | null {
  for (const block of exercise.blocks) {
    if (block.type === "code" && block.output) return block.output;
  }
  if (exercise.interaction?.type === "CLOZE" && exercise.interaction.output) {
    return exercise.interaction.output;
  }
  return null;
}

export function LessonPage() {
  const { inputState, currentExercise, phase } = useLessonContext();
  const { aiEnabled } = useUserPreferencesContext();
  const aiFeature = useFeatureEnabledCheck({ feature: "isAIEnabled" });
  const body = useExerciseBodyData(currentExercise, inputState);
  const { data: credits } = useSuspenseQuery(qo.credits());

  const output = useMemo(
    () => getExerciseOutput(currentExercise),
    [currentExercise],
  );

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

  const showOutput = phase === "CORRECT" && output !== null;

  return (
    <>
      <div className="col-span-0 hidden lg:block lg:col-span-3  h-full min-h-0">
        {aiEnabled && aiFeature.enabled && (
          <FloatingChatbotWindow
            credits={credits}
            sessionId={currentExercise.id ?? null}
            systemPrompt={systemPrompt}
            promptWrapper={promptWrapper}
            outerClassName="pl-6 pr-10"
          />
        )}
      </div>

      {currentExercise && (
        <AnimatePresence mode="wait">
          <motion.div
            key={currentExercise.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="col-span-full lg:col-span-6 flex flex-col gap-8 px-8 lg:px-0 py-8 items-stretch justify-center h-full min-w-0 2xl:max-w-2xl 2xl:mx-auto w-full"
          >
            <div className="flex flex-col gap-4 items-center">
              {currentExercise.blocks.map((block, index) => (
                <BlockRenderer key={index} block={block} />
              ))}
            </div>

            <ExerciseInteraction body={body} />
          </motion.div>
        </AnimatePresence>
      )}

      <div className="col-span-0 hidden lg:col-span-3 lg:flex items-center justify-start h-full min-h-0 pl-6">
        <AnimatePresence>
          {showOutput && (
            <motion.div
              key="output-panel"
              initial={{ opacity: 0, x: 24, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 24, scale: 0.96 }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.15,
              }}
              className="w-full h-1/2 max-w-xs"
            >
              <div className="rounded-xl h-full overflow-hidden border border-ludo-surface shadow-lg">
                {/* Header */}
                <div className="h-9 px-4 flex items-center gap-2 bg-ludo-surface">
                  <div className="h-2 w-2 rounded-full bg-emerald-400/80 animate-pulse" />
                  <span className="text-[11px] text-white/40 tracking-wide select-none uppercase">
                    Output
                  </span>
                </div>
                {/* Body */}
                <div className="bg-ludo-background px-5 py-4">
                  <pre className="font-mono text-sm text-emerald-300 whitespace-pre-wrap wrap-break-word leading-relaxed">
                    {output}
                  </pre>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
