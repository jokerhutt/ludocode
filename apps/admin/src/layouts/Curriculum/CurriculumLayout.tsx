import { MainGridWrapper } from "@ludocode/design-system/layouts/grid/main-grid-wrapper";
import { HeaderWithBar } from "@ludocode/design-system/zones/header-shell";
import { Outlet } from "@tanstack/react-router";
import { Suspense } from "react";

type CurriculumLayoutProps = {};

export function CurriculumLayout({}: CurriculumLayoutProps) {
  return (
    <MainGridWrapper className="max-h-dvh min-h-0" gridRows={"ONE"}>
      <Suspense fallback={<div />}>
        <div className="layout-grid col-span-full h-full min-h-0 py-6 px-8 lg:px-0">
          <div className="col-span-1 lg:bg-ludo-background" />
          <Outlet />
          <div className="col-span-1 lg:bg-ludo-background"/>
        </div>
      </Suspense>
    </MainGridWrapper>
  );
}
