import { Outlet } from "@tanstack/react-router";
import { ModuleHeader } from "../features/Module/Header/ModuleHeader";

type ModuleSectionLayoutProps = {};

export function ModuleSectionLayout({}: ModuleSectionLayoutProps) {
  return (
    <div className="grid grid-rows-[auto_1fr] min-h-0">
      <ModuleHeader />
      <main className="min-h-0 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}