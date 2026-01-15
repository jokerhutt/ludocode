import { OnboardingLayout } from "@/layouts/Onboarding/OnboardingLayout.tsx";
import { stepOrder } from "@/features/Onboarding/Steps/OnboardingSteps";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { firstInvalidStep } from "@/features/Onboarding/Util/validators";
import type { OnboardingDraft } from "@/features/Onboarding/Hook/useOnboardingDraft";
import { qk } from "@/hooks/Queries/Definitions/qk";
import type { StageKey } from "@ludocode/types";

export const Route = createFileRoute("/_app/onboarding/$stage")({
  parseParams: (p) => ({
    stage: (stepOrder.includes(p.stage as StageKey)
      ? p.stage
      : "name") as StageKey,
  }),

  beforeLoad: ({ params, context }) => {
    const draft =
      context.queryClient.getQueryData<OnboardingDraft>(qk.onboardingDraft()) ??
      {};

    const invalid = firstInvalidStep(draft);

    if (invalid && invalid !== params.stage) {
      throw redirect({
        to: "/onboarding/$stage",
        params: { stage: invalid },
        replace: true,
      });
    }
  },

  component: OnboardingLayout,
});
