import type { useExerciseInputResponse } from "@/features/lesson/hooks/normal/useExerciseInput";
import { createContext, useContext } from "react";

export const ExerciseInputContext =
  createContext<useExerciseInputResponse | null>(null);

export function useExerciseInputContext() {
  const ctx = useContext(ExerciseInputContext);
  if (!ctx) {
    throw new Error(
      "useExerciseInputContext must be used inside an ExerciseInputProvider",
    );
  }

  return ctx;
}
