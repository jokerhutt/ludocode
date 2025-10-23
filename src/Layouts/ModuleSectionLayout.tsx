import { Outlet } from "@tanstack/react-router";
import { ModuleHeader } from "../features/Module/Header/ModuleHeader.tsx";
import { MainContentWrapper } from "./LayoutWrappers/MainContentWrapper";
import { SubGridWrapper } from "./LayoutWrappers/SubGridWrapper";

type ModuleSectionLayoutProps = {};

export function ModuleSectionLayout({}: ModuleSectionLayoutProps) {
  return (
    <SubGridWrapper>
      <ModuleHeader />
      <MainContentWrapper>
        <Outlet />
      </MainContentWrapper>
    </SubGridWrapper>
  );
}
