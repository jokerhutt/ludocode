import type { OnboardingFormContent } from "@ludocode/types/Onboarding/OnboardingCourse.ts";
import { createContext, useContext } from "react";
import type { UseOnboardingFlowReturn } from "@/features/Onboarding/Hook/useOnboardingFlow.tsx";
import type { LudoUser } from "@ludocode/types";
import type { UseOnboardingDraftReturn } from "../Hook/useOnboardingDraft";

export type OnboardingContextType = {
  content: OnboardingFormContent;
  flow: UseOnboardingFlowReturn;
  draftApi: UseOnboardingDraftReturn;
  currentUser: LudoUser;
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
