import type {
  LessonEvaluationValue,
  LessonExerciseValue,
  LessonSubmissionValue,
} from "@/features/lesson/hooks/useLesson";
import { createContext, useContext } from "react";

export const LessonExerciseContext = createContext<LessonExerciseValue | null>(
  null,
);
export const LessonEvaluationContext =
  createContext<LessonEvaluationValue | null>(null);
export const LessonSubmissionContext =
  createContext<LessonSubmissionValue | null>(null);

export function useLessonExercise() {
  const ctx = useContext(LessonExerciseContext);
  if (!ctx) {
    throw new Error(
      "useLessonExercise must be used inside a LessonExerciseContext.Provider",
    );
  }

  return ctx;
}

export function useLessonEvaluation() {
  const ctx = useContext(LessonEvaluationContext);
  if (!ctx) {
    throw new Error(
      "useLessonEvaluation must be used inside a LessonEvaluationContext.Provider",
    );
  }

  return ctx;
}

export function useLessonSubmission() {
  const ctx = useContext(LessonSubmissionContext);
  if (!ctx) {
    throw new Error(
      "useLessonSubmission must be used inside a LessonSubmissionContext.Provider",
    );
  }

  return ctx;
}
