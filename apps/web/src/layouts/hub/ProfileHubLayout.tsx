import { Gutter } from "@ludocode/design-system/layouts/grid/gutter";
import { Outlet } from "@tanstack/react-router";

export function ProfileHubLayout() {
  return (
    <div className="layout-grid scrollable col-span-full text-ludo-white relative px-8 lg:px-0">
      <Gutter span={3} desktopOnly />
      <Outlet />
      <Gutter span={3} desktopOnly />
    </div>
  );
}
