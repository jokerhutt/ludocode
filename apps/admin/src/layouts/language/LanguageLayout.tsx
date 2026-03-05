import { LanguageHeader } from "@/features/language/zones/LanguageHeader.tsx";
import { MainGridWrapper } from "@ludocode/design-system/layouts/grid/main-grid-wrapper";
import { Outlet } from "@tanstack/react-router";
import { Suspense } from "react";

type LanguageLayoutProps = {};

export function LanguageLayout({}: LanguageLayoutProps) {
  return (
    <MainGridWrapper gridRows={"SITE"}>
      <LanguageHeader />
      <Suspense fallback={<div />}>
        <div className="layout-grid col-span-full scrollable py-6 px-8 lg:px-0">
          <div className="col-span-1 lg:bg-ludo-background lg:col-span-2"></div>
          <Outlet />
          <div className="col-span-1 lg:bg-ludo-background lg:col-span-2"></div>
        </div>
      </Suspense>
    </MainGridWrapper>
  );
}
