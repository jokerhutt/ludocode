import { Outlet } from "@tanstack/react-router";

import { useSuspenseQuery } from "@tanstack/react-query";
import { qo } from "@/hooks/Queries/Definitions/queries.ts";
import { MainGridWrapper } from "@ludocode/design-system/layouts/grid/main-grid-wrapper.tsx";
import { Suspense } from "react";
import { AdminHubHeader } from "@/features/BuilderHub/Components/Zone/AdminHubHeader.tsx";
import { AdminHubFooter } from "@/features/BuilderHub/Components/Zone/AdminHubFooter.tsx";

export function AdminHubLayout() {
  useSuspenseQuery(qo.currentUser());

  return (
    <MainGridWrapper gridRows={"SITE"}>
      <AdminHubHeader />
      <Suspense fallback={<div />}>
        <Outlet />
      </Suspense>
      <AdminHubFooter />
    </MainGridWrapper>
  );
}
