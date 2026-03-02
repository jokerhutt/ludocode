import { getRouteApi, useParams } from "@tanstack/react-router";
import { steps } from "@/features/Onboarding/Steps/OnboardingSteps";
import {
  OnboardingContext,
  type OnboardingContextType,
} from "@/features/Onboarding/Context/OnboardingContext.tsx";
import { useOnboardingFlow } from "@/features/Onboarding/Hook/useOnboardingFlow.tsx";
import { OnboardingFooter } from "@/features/Onboarding/Components/Zone/OnboardingFooter.tsx";
import { MainGridWrapper } from "@ludocode/design-system/layouts/grid/main-grid-wrapper.tsx";
import { MainContentWrapper } from "@ludocode/design-system/layouts/grid/main-content-wrapper.tsx";
import { useSuspenseQuery } from "@tanstack/react-query";
import { qo } from "@/hooks/Queries/Definitions/queries";
import type { StageKey } from "@ludocode/types";
import { OnboardingHeader } from "@/features/Onboarding/Components/Zone/OnboardingHeader";
import { useOnboardingDraftStore } from "@/features/Onboarding/Store/OnboardingDraft";
import { useRef } from "react";

export function OnboardingLayout() {
  const routeApi = getRouteApi("/_app/onboarding/$stage");
  const { stage } = useParams({ from: routeApi.id }) as {
    stage: StageKey;
  };

  const { data: currentUser } = useSuspenseQuery(qo.currentUser());
  const { data: courses } = useSuspenseQuery(qo.allCourses());
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
    courses,
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
          <div className="relative grid col-span-full grid-cols-12">
            <div className="col-start-2 col-end-12 lg:col-start-3 lg:col-end-11 py-10 min-w-0">
              <Step />
            </div>
          </div>
        </MainContentWrapper>
        <OnboardingFooter />
      </MainGridWrapper>
    </OnboardingContext.Provider>
  );
}
