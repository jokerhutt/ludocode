import { OnboardingLayout } from "@/layouts/Onboarding/OnboardingLayout.tsx";
import { stepOrder } from "@/features/Onboarding/Steps/OnboardingSteps";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { firstInvalidStep } from "@/features/Onboarding/Util/validators";
import type { StageKey } from "@ludocode/types";
import { useOnboardingDraftStore } from "@/features/Onboarding/Store/OnboardingDraft";

export const Route = createFileRoute("/_app/onboarding/$stage")({
  parseParams: (p) => ({
    stage: (stepOrder.includes(p.stage as StageKey)
      ? p.stage
      : "name") as StageKey,
  }),

  beforeLoad: ({ params }) => {
    const draft = useOnboardingDraftStore.getState().draft;

    const invalid = firstInvalidStep(draft);
    if (!invalid) return;

    const currentIdx = stepOrder.indexOf(params.stage as StageKey);
    const invalidIdx = stepOrder.indexOf(invalid);

    if (currentIdx > invalidIdx) {
      throw redirect({
        to: "/onboarding/$stage",
        params: { stage: invalid },
        replace: true,
      });
    }
  },

  component: OnboardingLayout,
});
