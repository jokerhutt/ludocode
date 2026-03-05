import { createContext, useContext } from "react";
import type { useExerciseResponse } from "@/features/lesson/hooks/useExercise.tsx";

export const LessonContext = createContext<useExerciseResponse | null>(null);

export function useLessonContext() {
  const ctx = useContext(LessonContext);
  if (!ctx)
    throw new Error("useLesson must be used inside a LessonContext.Provider");
  return ctx;
}
