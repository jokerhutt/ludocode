import {
  useLessonEvaluation,
  useLessonExercise,
  useLessonSubmission,
} from "@/features/lesson/context/useLessonContext.tsx";
import { useExerciseInputContext } from "@/features/lesson/context/useExerciseInputContext.tsx";
import { ExerciseInteraction } from "@/features/lesson/components/ExerciseInteraction.tsx";
import { useExerciseBodyData } from "@/features/lesson/hooks/normal/useExerciseBodyData";
import { useExerciseHistory } from "@/features/lesson/hooks/useExerciseHistory.tsx";
import { hasExerciseOutput } from "@/features/lesson/util/exerciseOutputUtil.ts";
import { BlockRenderer } from "@ludocode/design-system/widgets/exercise/BlockRenderer.tsx";
import { AnimatePresence, motion } from "motion/react";
import { useMemo } from "react";
import { useIsMobile } from "@ludocode/hooks";

export function ExercisePage() {
  const { currentExercise } = useLessonExercise();
  const { isOutputVisible } = useLessonEvaluation();
  const { submissionHistory } = useLessonSubmission();
  const inputState = useExerciseInputContext();
  const body = useExerciseBodyData(currentExercise, inputState);
  const isMobile = useIsMobile({});
  const { isComplete } = useExerciseHistory({
    currentExercise,
    submissionHistory,
  });

  const interactionOutput = useMemo(() => {
    const interaction = currentExercise.interaction;
    if (interaction?.type === "CLOZE") return interaction.output ?? null;
    return null;
  }, [currentExercise]);

  const showOutput =
    hasExerciseOutput(currentExercise) && (isComplete || isOutputVisible);

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
    </>
  );
}
