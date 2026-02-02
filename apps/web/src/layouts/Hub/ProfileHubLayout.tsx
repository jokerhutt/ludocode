import { Outlet } from "@tanstack/react-router";

export function ProfileHubLayout() {
  return (
    <div className="layout-grid scrollable col-span-full text-ludoAltText relative px-8 lg:px-0 py-2">
      <div className="hidden lg:block lg:col-span-3" />
      <Outlet />
      <div className="hidden lg:block lg:col-span-3" />
    </div>
  );
}
