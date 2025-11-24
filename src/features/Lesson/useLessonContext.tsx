import { createContext, useContext } from "react";
import type { ExerciseFlowResponse } from "../../Hooks/Logic/Exercises/useExerciseFlow";

export const LessonContext = createContext<ExerciseFlowResponse | null>(null);

export function useLessonContext() {
  const ctx = useContext(LessonContext);
  if (!ctx) throw new Error("useLesson must be used inside a LessonContext.Provider");
  return ctx;
}