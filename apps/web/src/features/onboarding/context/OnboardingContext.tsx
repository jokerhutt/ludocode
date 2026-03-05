import { createContext, useContext } from "react";
import type { UseOnboardingFlowReturn } from "@/features/onboarding/hooks/useOnboardingFlow.tsx";
import type { LudoCareer, LudoCourse, LudoUser } from "@ludocode/types";

export type OnboardingContextType = {
  currentUser: LudoUser;
  courses: LudoCourse[];
  careers: LudoCareer[];
  flow: UseOnboardingFlowReturn;
};

export const OnboardingContext = createContext<OnboardingContextType | null>(
  null
);

export function useOnboardingContext() {
  const ctx = useContext(OnboardingContext);
  if (!ctx)
    throw new Error(
      "useOnboarding must be used inside a OnboardingContext.Provider"
    );
  return ctx;
}
