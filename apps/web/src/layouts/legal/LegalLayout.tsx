import { Gutter } from "@ludocode/design-system/layouts/grid/gutter";
import { Outlet } from "@tanstack/react-router";

export function LegalLayout() {
  return (
    <>
      <Gutter span={3} />
      <div className="flex col-span-6 overflow-y-auto [scrollbar-gutter:stable] flex-col items-center justify-start h-full">
        <Outlet />
      </div>
      <Gutter span={3} />
    </>
  );
}
