import { LanguageHeader } from "@/features/Language/Components/Zone/LanguageHeader";
import { MainGridWrapper } from "@ludocode/design-system/layouts/grid/main-grid-wrapper";
import { Outlet } from "@tanstack/react-router";
import { Suspense } from "react";

type LanguageLayoutProps = {};

export function LanguageLayout({}: LanguageLayoutProps) {
  return (
    <MainGridWrapper gridRows={"SITE"}>
      <LanguageHeader />
      <Suspense fallback={<div />}>
        <Outlet />
      </Suspense>
    </MainGridWrapper>
  );
}
