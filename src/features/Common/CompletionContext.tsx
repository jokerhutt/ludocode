import type { CompletionState } from "@/Types/Exercise/LessonCompletionResponse";
import { createContext, useContext } from "react";

export const CompletionContext = createContext<CompletionState | null>(null);

export function useCompletionContext() {
  const ctx = useContext(CompletionContext);
  if (!ctx)
    throw new Error("useStatsContext must be used inside a Stats.Provider");
  return ctx;
}
