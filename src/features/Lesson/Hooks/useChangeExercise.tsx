import type {
  ExerciseAttempt,
  ExerciseSubmission,
} from "@/types/Exercise/LessonSubmissions.ts";
import { useEffect } from "react";
import { findLastAttempt } from "../Util/lookupUtil.ts";

type Args = {
  initializeInputs: (attempt: ExerciseAttempt | null) => void;
  currentExerciseId: string;
  submissions: ExerciseSubmission[];
};

export function useChangeExercise({
  initializeInputs,
  currentExerciseId,
  submissions,
}: Args) {
  useEffect(() => {
    const lastAttempt = findLastAttempt(submissions, currentExerciseId);
    initializeInputs(lastAttempt);
  }, [currentExerciseId]);
}
