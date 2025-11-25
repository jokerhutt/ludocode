import { Outlet, useMatch, useMatchRoute } from "@tanstack/react-router";
import { ModuleHeader } from "../../features/Module/Header/MobileModuleHeader.tsx";
import { MainContentWrapper } from "../Grids/MainContentWrapper.tsx";
import { SubGridWrapper } from "../Grids/SubGridWrapper.tsx";

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
