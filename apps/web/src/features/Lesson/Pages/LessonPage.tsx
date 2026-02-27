import { ExerciseMedia } from "@/features/Lesson/Components/Media/ExerciseMedia.tsx";
import { useLessonContext } from "@/features/Lesson/Context/useLessonContext.tsx";
import { ExerciseInstruction } from "@/features/Lesson/Components/Prompt/ExerciseInstruction.tsx";
import type { ExerciseType } from "@ludocode/types/Exercise/ExerciseType.ts";
import { ExerciseInteraction } from "@/features/Lesson/Templates/ExerciseInteraction.tsx";
import { useExerciseBodyData } from "@/features/Lesson/Hooks/useExerciseBodyData.tsx";
import { FloatingChatbotWindow } from "@ludocode/design-system/widgets/chatbot/FloatingChatbotWindow.tsx";
import { useSuspenseQuery } from "@tanstack/react-query";
import { qo } from "@/hooks/Queries/Definitions/queries.ts";
import { useUserPreferencesContext } from "@/hooks/Context/useUserPreferenceContext";
import { AnimatePresence, motion } from "motion/react";

export type OptionLayout = "ROW" | "COLUMN";
export type SelectionMode = "APPEND" | "REPLACE";

export type ExerciseInteractionConfig = {
  showAnswerField: boolean;
  optionLayout: OptionLayout;
  selectionMode: SelectionMode;
  withGaps: boolean;
};

export const configByType: Record<ExerciseType, ExerciseInteractionConfig> = {
  CLOZE: {
    showAnswerField: true,
    optionLayout: "ROW",
    selectionMode: "APPEND",
    withGaps: true,
  },
  TRIVIA: {
    showAnswerField: false,
    optionLayout: "COLUMN",
    selectionMode: "REPLACE",
    withGaps: false,
  },
  ANALYZE: {
    showAnswerField: true,
    optionLayout: "COLUMN",
    selectionMode: "REPLACE",
    withGaps: false,
  },
  INFO: {
    showAnswerField: false,
    optionLayout: "COLUMN",
    selectionMode: "REPLACE",
    withGaps: false,
  },
};

export function LessonPage() {
  const { inputState, currentExercise } = useLessonContext();
  const { aiEnabled } = useUserPreferencesContext();
  const body = useExerciseBodyData(currentExercise, inputState);
  const { data: credits } = useSuspenseQuery(qo.credits());

  return (
    <>
      <div className="col-span-0 hidden lg:block lg:col-span-3 h-full min-h-0">
        {aiEnabled && (
          <FloatingChatbotWindow
            credits={credits}
            chatType="LESSON"
            targetId={currentExercise.id ?? null}
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
            className="col-span-full lg:col-span-6 flex flex-col gap-8 px-8 lg:px-0 py-8 items-stretch justify-center h-full min-w-0"
          >
            <div className="flex flex-col gap-4 items-center">
              <ExerciseInstruction currentExercise={currentExercise} />

              {currentExercise.exerciseMedia && (
                <ExerciseMedia media={currentExercise.exerciseMedia} />
              )}
            </div>

            <ExerciseInteraction
              config={configByType[currentExercise.exerciseType]}
              body={body}
            />
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
}
