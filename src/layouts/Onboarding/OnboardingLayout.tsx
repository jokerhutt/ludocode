import { getRouteApi, Outlet, useParams } from "@tanstack/react-router";
import { type StageKey } from "@/types/Onboarding/OnboardingSteps";
import {
  OnboardingContext,
  type OnboardingContextType,
} from "@/hooks/Context/Onboarding/OnboardingContext";
import { useOnboardingFlow } from "@/hooks/Flows/Onboarding/useOnboardingFlow";
import { OnboardingFooter } from "../../features/Onboarding/Footer/OnboardingFooter";
import { onboardingContent } from "../../constants/mocks/onboardingMocks";
import { MainGridWrapper } from "@/components/design-system/layouts/grid/main-grid-wrapper.tsx";
import { HeaderWithProgress } from "@/components/design-system/blocks/header/header-with-progress.tsx";
import { MainContentWrapper } from "@/components/design-system/layouts/grid/main-content-wrapper.tsx";

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

  //TODO check this subgrid? Do i need?
  return (
    <OnboardingContext.Provider value={contextValue}>
      <MainGridWrapper gridRows="FULL">
        <HeaderWithProgress total={total} position={current} />
        <MainContentWrapper>
          <div className="grid col-span-full grid-cols-12">
            <div className="col-start-2 col-end-12 lg:col-start-3 lg:col-end-11 py-6 min-w-0">
              <Outlet />
            </div>
          </div>
        </MainContentWrapper>
        <OnboardingFooter />
      </MainGridWrapper>
    </OnboardingContext.Provider>
  );
}
