import { stepOrder } from "@/features/Onboarding/Steps/OnboardingSteps";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { firstInvalidStep } from "@/features/Onboarding/Util/validators";
import type { OnboardingDraft } from "@/features/Onboarding/Hook/useOnboardingDraft";
import { qk } from "@/hooks/Queries/Definitions/qk";
import type { StageKey } from "@ludocode/types";
import { OnboardingLayout } from "./-components/OnboardingLayout";

export const Route = createFileRoute("/_app/onboarding/$stage")({
  parseParams: (p) => ({
    stage: (stepOrder.includes(p.stage as StageKey)
      ? p.stage
      : "name") as StageKey,
  }),

  beforeLoad: ({ params, context }) => {
    console.log("CHILD beforeLoad");
    const draft =
      context.queryClient.getQueryData<OnboardingDraft>(qk.onboardingDraft()) ??
      {};

    console.log(JSON.stringify(draft));

    const invalid = firstInvalidStep(draft);
    if (!invalid) return;

    const currentIdx = stepOrder.indexOf(params.stage as StageKey);
    const invalidIdx = stepOrder.indexOf(invalid);

    if (currentIdx > invalidIdx) {
      console.log(
        "INVALID INDEX: " +
          "CURRENT: " +
          currentIdx +
          " INVALID: " +
          invalidIdx,
      );
      throw redirect({
        to: "/onboarding/$stage",
        params: { stage: invalid },
        replace: true,
      });
    }
  },

  component: OnboardingLayout,
});
