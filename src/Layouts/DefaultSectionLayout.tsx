import { Outlet } from "@tanstack/react-router";
import { DefaultHeader } from "../components/Header/DefaultHeader";

export function DefaultSectionLayout() {
  return (
    <div className="grid grid-rows-[auto_1fr] min-h-0">
      <DefaultHeader />
      <main className="min-h-0 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}