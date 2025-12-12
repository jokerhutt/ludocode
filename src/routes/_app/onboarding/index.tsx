import { OnboardingLayout } from "@/layouts/Onboarding/OnboardingLayout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/onboarding/")({
  component: OnboardingLayout,
});
