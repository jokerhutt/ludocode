import { steps } from "@/features/Onboarding/Steps/OnboardingSteps";
import type { StageKey } from "@ludocode/types";
import { getRouteApi } from "@tanstack/react-router";

export function OnboardingStagePage() {
  const onboardingStageRoute = getRouteApi("/_app/onboarding/$stage");
  const { stage } = onboardingStageRoute.useParams() as { stage: StageKey };
  const Step = steps[stage];
  return <Step />;
}
