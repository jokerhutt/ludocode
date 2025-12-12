import type { CompletionState } from "@/types/Completion/LessonCompletionResponse.ts";
import { createContext, useContext } from "react";

export const CompletionContext = createContext<CompletionState | null>(null);

export function useCompletionContext() {
  const ctx = useContext(CompletionContext);
  if (!ctx)
    throw new Error("useCompletionContext must be used inside a CompletionContext.Provider");
  return ctx;
}
