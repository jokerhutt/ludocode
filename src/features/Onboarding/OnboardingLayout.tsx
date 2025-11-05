import { MainContentWrapper } from "@/Layouts/LayoutWrappers/MainContentWrapper";
import { MainGridWrapper } from "@/Layouts/LayoutWrappers/MainGridWrapper";
import { TutorialHeader } from "../Tutorial/TutorialHeader";
import { Outlet, useParams } from "@tanstack/react-router";
import type { OnboardingFormContent } from "@/Types/Onboarding/OnboardingCourse";
import { stepOrder, type StageKey } from "@/Types/Onboarding/OnboardingSteps";
import {
  OnboardingContext,
  type OnboardingContextType,
} from "./OnboardingContext";
import {
  useOnboardingFlow,
  type UseOnboardingFlowReturn,
} from "./useOnboardingFlow";
import { onboardingRoute, onboardingStageRoute } from "@/routes/router";
import { useEffect } from "react";
import { OnboardingFooter } from "./OnboardingFooter";

const onboardingContent: OnboardingFormContent = {
  courseContent: [
    {
      courseId: "1",
      title: "Python",
      description: "Python is a simple programming language",
    },
    {
      courseId: "2",
      title: "Swift",
      description: "Swift is by apple",
    },
  ],
  careerContent: [
    {
      courseId: "1",
      title: "Data science",
      careerType: "Data Science",
      description: "Data scientists",
      topPath: "Python",
    },
    {
      courseId: "2",
      title: "IOS Developer",
      careerType: "IOS DEVELOPER",
      description: "Ios Developer",
      topPath: "Swift",
    },
  ],
};

export function OnboardingLayout() {


  const { stage } = useParams({ from: onboardingStageRoute.id }) as {
    stage: StageKey;
  };
  
  const content = onboardingContent;
  const contextValue: OnboardingContextType = {
    content: content,
    hook: useOnboardingFlow({ stage }),
  };

  return (
    <OnboardingContext.Provider value={contextValue}>
      <MainGridWrapper gridRows="FULL">
        <TutorialHeader total={stepOrder.length} position={1} />
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
