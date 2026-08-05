import { MainGridWrapper } from "@ludocode/design-system/layouts/grid/main-grid-wrapper";
import { LudoHeader } from "@ludocode/design-system/zones/ludo-header";
import { Outlet } from "@tanstack/react-router";
import { Suspense } from "react";
import { ResourcesHeader } from "./ResourcesHeader";

export function ResourcesLayout() {
  return (
    <MainGridWrapper gridRows="FULL" className="grid-rows-[auto_1fr]">
      <LudoHeader.Shell>
        <Suspense fallback={<div />}>
          <ResourcesHeader />
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
