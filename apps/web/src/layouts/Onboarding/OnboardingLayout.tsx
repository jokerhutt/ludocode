import { getRouteApi, useParams } from "@tanstack/react-router";
import { steps } from "@/features/Onboarding/Steps/OnboardingSteps";
import {
  OnboardingContext,
  type OnboardingContextType,
} from "@/features/Onboarding/Context/OnboardingContext.tsx";
import { useOnboardingFlow } from "@/features/Onboarding/Hook/useOnboardingFlow.tsx";
import { OnboardingFooter } from "@/features/Onboarding/Components/Zone/OnboardingFooter.tsx";
import { onboardingContent } from "@/constants/mocks/onboardingMocks.ts";
import { MainGridWrapper } from "@ludocode/design-system/layouts/grid/main-grid-wrapper.tsx";
import { MainContentWrapper } from "@ludocode/design-system/layouts/grid/main-content-wrapper.tsx";
import { useSuspenseQuery } from "@tanstack/react-query";
import { qo } from "@/hooks/Queries/Definitions/queries";
import { useOnboardingDraft } from "@/features/Onboarding/Hook/useOnboardingDraft";
import { useEffect } from "react";
import type { StageKey } from "@ludocode/types";
import { OnboardingHeader } from "@/features/Onboarding/Components/Zone/OnboardingHeader";

export function OnboardingLayout() {
  const routeApi = getRouteApi("/_app/onboarding/$stage");
  const { stage } = useParams({ from: routeApi.id }) as {
    stage: StageKey;
  };

  const { data: currentUser } = useSuspenseQuery(qo.currentUser());

  const draftApi = useOnboardingDraft();
  const flow = useOnboardingFlow({ stage });

  useEffect(() => {
    if (draftApi.draft.username === undefined && currentUser.displayName) {
      draftApi.setDraft({ username: currentUser.displayName });
    }
  }, [currentUser.displayName, draftApi.draft.username]);

  const content = onboardingContent;
  const contextValue: OnboardingContextType = {
    content: content,
    flow: flow,
    draftApi: draftApi,
    currentUser: currentUser,
  };

  const { current, total } = contextValue.flow.position;
  const Step = steps[stage];

  return (
    <OnboardingContext.Provider value={contextValue}>
      <MainGridWrapper gridRows="FULL">
        <OnboardingHeader total={total} position={current} />
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
