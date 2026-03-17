import type { ProjectSnapshot } from "@ludocode/types/Project/ProjectSnapshot.ts";
import { createContext, useContext } from "react";

export type GuidedExerciseValue = {
  reviewSubmissionSnapshot: ProjectSnapshot | null;
  workingSnapshot: ProjectSnapshot | null;
  setWorkingSnapshot: (snapshot: ProjectSnapshot) => void;
  resetSnapshot: ProjectSnapshot | null;
};

export const GuidedExerciseContext = createContext<GuidedExerciseValue | null>(
  null,
);

export function useGuidedExercise() {
  const ctx = useContext(GuidedExerciseContext);
  if (!ctx) {
    throw new Error(
      "useGuidedExercise must be used inside a GuidedExerciseContext.Provider",
    );
  }

  return ctx;
}
