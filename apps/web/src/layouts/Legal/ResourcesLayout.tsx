import { ludoNavigation } from "@/constants/ludoNavigation";
import { qo } from "@/hooks/Queries/Definitions/queries";
import { router } from "@/main";
import { MainGridWrapper } from "@ludocode/design-system/layouts/grid/main-grid-wrapper";
import { LudoHeader } from "@ludocode/design-system/zones/ludo-header";
import { useQuery } from "@tanstack/react-query";
import { Outlet } from "@tanstack/react-router";
import { Suspense } from "react";

export function ResourcesLayout() {
  const { data: currentUser } = useQuery(qo.currentUser());

  const handleLogoClick = () => {
    if (currentUser) {
      router.navigate(ludoNavigation.app.index());
    } else {
      router.navigate(ludoNavigation.auth.login());
    }
  };

  return (
    <MainGridWrapper gridRows="FULL" className="grid-rows-[auto_1fr]">
      <LudoHeader.Shell>
        <Suspense fallback={<div />}>
          <div className="col-span-full px-6 lg:px-18 flex items-center justify-between">
            <h1
              onClick={() => handleLogoClick()}
              className="text-2xl font-bold hover:cursor-pointer text-ludo-white-bright"
            >
              Ludocode
            </h1>
            <div className="flex justify-end gap-4 items-center"></div>
          </div>
        </Suspense>
      </LudoHeader.Shell>
      <Suspense fallback={<div className="col-span-full" />}>
        <div className="col-span-full min-h-0 overflow-y-auto">
          <Outlet />
        </div>
      </Suspense>
    </MainGridWrapper>
  );
}
