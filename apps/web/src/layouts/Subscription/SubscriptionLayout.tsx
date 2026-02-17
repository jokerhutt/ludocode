import { MainGridWrapper } from "@ludocode/design-system/layouts/grid/main-grid-wrapper";
import { Outlet } from "@tanstack/react-router";
import { Suspense } from "react";

export function SubscriptionLayout() {
  return (
    <MainGridWrapper className="py-12" gridRows={"ONE"}>
      <Suspense fallback={<div className="col-span-full" />}>
        <Outlet />
      </Suspense>
    </MainGridWrapper>
  );
}
