import { getRouteApi, useParams } from "@tanstack/react-router";
import {
  steps,
  type StageKey,
} from "../../features/Onboarding/Templates/OnboardingSteps.ts";
import {
  OnboardingContext,
  type OnboardingContextType,
} from "@/features/Onboarding/Context/OnboardingContext.tsx";
import { useOnboardingFlow } from "@/features/Onboarding/Hook/useOnboardingFlow.tsx";
import { OnboardingFooter } from "@/features/Onboarding/Components/Zone/OnboardingFooter.tsx";
import { onboardingContent } from "../../constants/mocks/onboardingMocks.ts";
import { MainGridWrapper } from "../../../../../packages/design-system/layouts/grid/main-grid-wrapper.tsx";
import { LessonHeader } from "@/features/Lesson/Components/Zone/LessonHeader.tsx";
import { MainContentWrapper } from "../../../../../packages/design-system/layouts/grid/main-content-wrapper.tsx";

export function OnboardingLayout() {
  const routeApi = getRouteApi("/_app/onboarding/$stage");
  const { stage } = useParams({ from: routeApi.id }) as {
    stage: StageKey;
  };

  const content = onboardingContent;
  const contextValue: OnboardingContextType = {
    content: content,
    hook: useOnboardingFlow({ stage }),
  };

  const { current, total } = contextValue.hook.position;
  const Step = steps[stage];

  return (
    <OnboardingContext.Provider value={contextValue}>
      <MainGridWrapper gridRows="FULL">
        <LessonHeader total={total} position={current} />
        <MainContentWrapper>
          <div className="grid col-span-full grid-cols-12">
            <div className="col-start-2 col-end-12 lg:col-start-3 lg:col-end-11 py-6 min-w-0">
              <Step />
            </div>
          </div>
        </MainContentWrapper>
        <OnboardingFooter />
      </MainGridWrapper>
    </OnboardingContext.Provider>
  );
}
