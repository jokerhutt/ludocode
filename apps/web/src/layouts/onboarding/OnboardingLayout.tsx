import { getRouteApi, useParams } from "@tanstack/react-router";
import { steps } from "@/features/onboarding/steps/OnboardingSteps";
import {
  OnboardingContext,
  type OnboardingContextType,
} from "@/features/onboarding/context/OnboardingContext.tsx";
import { useOnboardingFlow } from "@/features/onboarding/hooks/useOnboardingFlow.tsx";
import { OnboardingFooter } from "@/features/onboarding/zone/OnboardingFooter.tsx";
import { MainGridWrapper } from "@ludocode/design-system/layouts/grid/main-grid-wrapper.tsx";
import { MainContentWrapper } from "@ludocode/design-system/layouts/grid/main-content-wrapper.tsx";
import { useSuspenseQuery } from "@tanstack/react-query";
import { qo } from "@/queries/definitions/queries";
import type { StageKey } from "@ludocode/types";
import { OnboardingHeader } from "@/features/onboarding/zone/OnboardingHeader.tsx";
import { useOnboardingDraftStore } from "@/features/onboarding/store/OnboardingDraft";
import { useRef } from "react";

export function OnboardingLayout() {
  const routeApi = getRouteApi("/_app/onboarding/$stage");
  const { stage } = useParams({ from: routeApi.id }) as {
    stage: StageKey;
  };

  const { data: currentUser } = useSuspenseQuery(qo.currentUser());
  const { data: courses } = useSuspenseQuery(qo.allCourses());

  const activeCourses = courses.filter(
    (course) => course.courseStatus === "PUBLISHED",
  );

  const { data: careers } = useSuspenseQuery(qo.allCareers());

  const draft = useOnboardingDraftStore((s) => s.draft);
  const setDraft = useOnboardingDraftStore((s) => s.setDraft);

  const hydratedRef = useRef(false);

  if (!hydratedRef.current) {
    if (!draft.username && currentUser.displayName) {
      setDraft({ username: currentUser.displayName });
    }
    hydratedRef.current = true;
  }

  const flow = useOnboardingFlow({ stage });

  const contextValue: OnboardingContextType = {
    currentUser,
    courses: activeCourses,
    careers,
    flow,
  };

  const { current, total } = flow.position;
  const Step = steps[stage];

  return (
    <OnboardingContext.Provider value={contextValue}>
      <MainGridWrapper gridRows="FULL">
        <OnboardingHeader total={total} position={current} />
        <MainContentWrapper>
          <div className="relative grid col-span-full grid-cols-12 h-full">
            <div className="col-start-2 col-end-12 lg:col-start-3 lg:col-end-11 min-w-0 flex items-center justify-center">
              <Step />
            </div>
          </div>
        </MainContentWrapper>
        <OnboardingFooter />
      </MainGridWrapper>
    </OnboardingContext.Provider>
  );
}
