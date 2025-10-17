import { createContext, useContext } from "react";
import type { useExerciseStateReturn } from "../../Hooks/Exercises/useExerciseState";

export const LessonContext = createContext<useExerciseStateReturn | null>(null);

export function useLessonContext() {
  const ctx = useContext(LessonContext);
  if (!ctx) throw new Error("useLesson must be used inside a LessonContext.Provider");
  return ctx;
}