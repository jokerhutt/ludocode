import type { OnboardingFormContent } from "@/Types/Onboarding/OnboardingCourse";
import { createContext, useContext } from "react";
import type { UseOnboardingFlowReturn } from "./useOnboardingFlow";

export type OnboardingContextType = {content: OnboardingFormContent, hook: UseOnboardingFlowReturn}

export const OnboardingContext = createContext<OnboardingContextType | null>(null);

export function useOnboardingContext() {
  const ctx = useContext(OnboardingContext);
  if (!ctx) throw new Error("useLesson must be used inside a LessonContext.Provider");
  return ctx;
}
