import type { OnboardingFormContent } from "@/types/Onboarding/OnboardingCourse";
import { createContext, useContext } from "react";
import type { UseOnboardingFlowReturn } from "@/hooks/Flows/Onboarding/useOnboardingFlow";

export type OnboardingContextType = {
  content: OnboardingFormContent;
  hook: UseOnboardingFlowReturn;
};

export const OnboardingContext = createContext<OnboardingContextType | null>(
  null
);

export function useOnboardingContext() {
  const ctx = useContext(OnboardingContext);
  if (!ctx)
    throw new Error("useOnboarding must be used inside a OnboardingContext.Provider");
  return ctx;
}
