import type { RenderHookResult } from "@testing-library/react";
import type { StageKey } from "@ludocode/types";
import { stepOrder } from "@/features/Onboarding/Steps/OnboardingSteps";
import type { OnboardingDraft } from "@/features/Onboarding/Hook/useOnboardingDraft";
import { firstInvalidStep } from "@/features/Onboarding/Util/validators";
import type { QueryClient } from "@tanstack/react-query";
import { qk } from "@/hooks/Queries/Definitions/qk";

export interface OnboardingNavigationCapture {
  to: string;
  params?: any;
  search?: any;
  state?: any;
  replace?: boolean;
}

export function simulateOnboardingBeforeLoad(
  queryClient: QueryClient,
  targetStage: StageKey,
  navigateFn: (nav: OnboardingNavigationCapture) => void,
) {
  const draft =
    queryClient.getQueryData<OnboardingDraft>(qk.onboardingDraft()) ?? {};
  const invalid = firstInvalidStep(draft);

  if (!invalid) return;

  const currentIdx = stepOrder.indexOf(targetStage);
  const invalidIdx = stepOrder.indexOf(invalid);

  if (currentIdx > invalidIdx) {
    navigateFn({
      to: "/onboarding/$stage",
      params: { stage: invalid },
      replace: true,
    });
  }
}

export function createOnboardingRouterMock(
  rerender: RenderHookResult<any, any>["rerender"],
  getCurrentStage: () => StageKey,
  setCurrentStage: (stage: StageKey) => void,
) {
  const navigations: OnboardingNavigationCapture[] = [];

  const mockImplementation = (navOptions: any) => {
    // Capture navigation
    const capture: OnboardingNavigationCapture = {
      to: navOptions.to,
      params: navOptions.params,
      search: navOptions.search,
      state: navOptions.state,
      replace: navOptions.replace,
    };

    navigations.push(capture);

    // If navigating to onboarding stage, update the stage and rerender
    if (navOptions.to === "/onboarding/$stage" && navOptions.params?.stage) {
      const newStage = navOptions.params.stage as StageKey;
      setCurrentStage(newStage);
      rerender({ stage: newStage });
    }
  };

  return {
    mockImplementation,
    navigations,
    getLastNavigation: () => navigations[navigations.length - 1],
    getNavigationTo: (routeTo: string) =>
      navigations.find((nav) => nav.to === routeTo),
    clear: () => {
      navigations.length = 0;
    },
  };
}
