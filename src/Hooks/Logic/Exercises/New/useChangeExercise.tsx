import type { ExerciseAttempt, ExerciseSubmission } from "@/Types/Exercise/LessonSubmissionTypes";
import { useEffect } from "react";
import { findLastAttempt } from "../exerciseHelpers";

type Args = { initializeInputs: (attempt: ExerciseAttempt | null) => void; currentExerciseId: string; submissions: ExerciseSubmission[] };

export function useChangeExercise({ initializeInputs, currentExerciseId, submissions }: Args) {
  useEffect(() => {
    const lastAttempt = findLastAttempt(submissions, currentExerciseId);
    initializeInputs(lastAttempt)
  }, [currentExerciseId]);
}
