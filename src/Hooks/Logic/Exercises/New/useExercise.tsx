import type { LudoLesson } from "@/Types/Catalog/LudoLesson";
import type { LudoExercise } from "@/Types/Exercise/LudoExercise";
import { useExerciseInput } from "./useExerciseInput";
import { useChangeExercise } from "./useChangeExercise";
import { useStagedAttempt } from "./useStagedAttempt";
import { useCommittedSubmissions } from "./useCommittedSubmissions";

type Args = { exercises: LudoExercise[]; lesson: LudoLesson; position: number };

export function useExercise({ exercises, lesson, position }: Args) {
  const index = position - 1;
  const currentExercise = exercises[index];
  const currentExerciseId = currentExercise.id;
  const lessonId = lesson.id;

  const exerciseInput = useExerciseInput({ currentExercise });
  const { currentExerciseInputs, clearExerciseInputs, initializeInputs } = exerciseInput;


  const stagedAttempt = useStagedAttempt({
    currentExerciseInputs,
    currentExercise,
  });
  const { clearStaged, currentlyStagedAttempt } = stagedAttempt;

  const { commitStagedAttemptIntoSubmissions } = useCommittedSubmissions({
    currentExercise,
    position,
    exercises,
    clearExerciseInputs,
    clearStaged,
    lessonId,
  });

  useChangeExercise({ initializeInputs, currentExerciseId, submissions: [] });
}
