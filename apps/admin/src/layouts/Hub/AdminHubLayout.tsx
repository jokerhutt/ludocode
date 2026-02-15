import { Outlet } from "@tanstack/react-router";

import { useSuspenseQuery } from "@tanstack/react-query";
import { qo } from "@/hooks/Queries/Definitions/queries.ts";
import { MainGridWrapper } from "@ludocode/design-system/layouts/grid/main-grid-wrapper.tsx";
import { Suspense } from "react";
import { AdminHubHeader } from "./AdminHubHeader";
import { AdminHubFooter } from "./AdminHubFooter";


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
