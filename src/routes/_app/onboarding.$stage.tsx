import { OnboardingLayout } from "@/layouts/Onboarding/OnboardingLayout";
import { stepOrder, type StageKey } from "@/types/Onboarding/OnboardingSteps";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/onboarding/$stage")({
  parseParams: (p) => ({
    stage: (stepOrder.includes(p.stage as StageKey)
      ? p.stage
      : "course") as StageKey,
  }),
  component: OnboardingLayout,
});
