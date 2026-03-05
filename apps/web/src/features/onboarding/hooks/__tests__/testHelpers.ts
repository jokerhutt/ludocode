import type { RenderHookResult } from "@testing-library/react";
import type { StageKey } from "@ludocode/types";
import { stepOrder } from "@/features/onboarding/steps/OnboardingSteps";
import { firstInvalidStep } from "@/features/onboarding/util/validators";
import { useOnboardingDraftStore } from "@/features/onboarding/store/OnboardingDraft";

export interface OnboardingNavigationCapture {
  to: string;
  params?: any;
  search?: any;
  state?: any;
  replace?: boolean;
}

export function simulateOnboardingBeforeLoad(
  targetStage: StageKey,
  navigateFn: (nav: OnboardingNavigationCapture) => void,
) {
  // zustand draft (not query client)
  const draft = useOnboardingDraftStore.getState().draft;
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
  _: () => StageKey,
  setCurrentStage: (stage: StageKey) => void,
) {
  const navigations: OnboardingNavigationCapture[] = [];

  const mockImplementation = (navOptions: any) => {
    const capture: OnboardingNavigationCapture = {
      to: navOptions.to,
      params: navOptions.params,
      search: navOptions.search,
      state: navOptions.state,
      replace: navOptions.replace,
    };

    navigations.push(capture);

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