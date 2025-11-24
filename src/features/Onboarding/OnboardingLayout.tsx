import { MainContentWrapper } from "@/Layouts/Grids/MainContentWrapper";
import { MainGridWrapper } from "@/Layouts/Grids/MainGridWrapper";
import { LessonHeader } from "../Lesson/LessonHeader";
import { Outlet, useParams } from "@tanstack/react-router";
import { type StageKey } from "@/Types/Onboarding/OnboardingSteps";
import {
  OnboardingContext,
  type OnboardingContextType,
} from "./OnboardingContext";
import { useOnboardingFlow } from "./useOnboardingFlow";
import { onboardingStageRoute } from "@/routes/router";
import { OnboardingFooter } from "./OnboardingFooter";
import { onboardingContent } from "./onboardingMocks";

export function OnboardingLayout() {
  const { stage } = useParams({ from: onboardingStageRoute.id }) as {
    stage: StageKey;
  };

  const content = onboardingContent;
  const contextValue: OnboardingContextType = {
    content: content,
    hook: useOnboardingFlow({ stage }),
  };

  const { current, total } = contextValue.hook.position;

  return (
    <OnboardingContext.Provider value={contextValue}>
      <MainGridWrapper gridRows="FULL">
        <LessonHeader total={total} position={current} />
        <MainContentWrapper>
          <div className="grid col-span-full grid-cols-12">
            <div className="col-start-2 col-end-11 lg:col-start-3 lg:col-end-11 py-6 min-w-0">
              <Outlet />
            </div>
          </div>
        </MainContentWrapper>
        <OnboardingFooter />
      </MainGridWrapper>
    </OnboardingContext.Provider>
  );
}
