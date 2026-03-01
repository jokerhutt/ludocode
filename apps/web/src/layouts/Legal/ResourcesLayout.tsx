import { ludoNavigation } from "@/constants/ludoNavigation";
import { qo } from "@/hooks/Queries/Definitions/queries";
import { router } from "@/main";
import { MainGridWrapper } from "@ludocode/design-system/layouts/grid/main-grid-wrapper";
import { FooterShell } from "@ludocode/design-system/zones/footer-shell";
import { HeaderShell } from "@ludocode/design-system/zones/header-shell";
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
    <MainGridWrapper gridRows={"SITE"}>
      <HeaderShell>
        <Suspense fallback={<div />}>
          <div className="col-start-2 col-end-12 flex items-center justify-between">
            <h1
              onClick={() => handleLogoClick()}
              className="text-2xl font-bold hover:cursor-pointer text-white"
            >
              Ludocode
            </h1>
            <div className="flex justify-end gap-4 items-center"></div>
          </div>
        </Suspense>
      </HeaderShell>
      <Suspense fallback={<div className="col-span-full" />}>
        <div className="col-span-full min-h-0 overflow-y-auto">
          <Outlet />
        </div>
      </Suspense>
      <FooterShell className="lg:hidden">
        <div></div>
      </FooterShell>
    </MainGridWrapper>
  );
}
