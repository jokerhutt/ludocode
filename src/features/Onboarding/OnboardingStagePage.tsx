import { onboardingStageRoute } from "@/routes/router";
import { steps, type StageKey } from "@/types/Onboarding/OnboardingSteps";

export function OnboardingStagePage() {
  const { stage } = onboardingStageRoute.useParams() as { stage: StageKey };
  const Step = steps[stage];
  return <Step />;
}