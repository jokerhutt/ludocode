import { steps, type StageKey } from "@/features/Onboarding/Templates/OnboardingSteps.ts";
import { getRouteApi } from "@tanstack/react-router";

export function OnboardingStagePage() {
  const onboardingStageRoute = getRouteApi("/_app/onboarding/$stage");
  const { stage } = onboardingStageRoute.useParams() as { stage: StageKey };
  const Step = steps[stage];
  return <Step />;
}
