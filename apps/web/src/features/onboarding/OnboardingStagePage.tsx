import { steps } from "@/features/onboarding/steps/OnboardingSteps.ts";
import type { StageKey } from "@ludocode/types";
import { getRouteApi } from "@tanstack/react-router";

export function OnboardingStagePage() {
  const onboardingStageRoute = getRouteApi("/app/onboarding/$stage");
  const { stage } = onboardingStageRoute.useParams() as { stage: StageKey };
  const Step = steps[stage];
  return <Step />;
}
