import { Outlet } from "@tanstack/react-router";
import { GlobalFooter } from "../components/Footer/GlobalFooter";

export function SiteLayout() {
  return (
    <div className="grid h-dvh grid-rows-[1fr_auto]">
      <Outlet/>
      <GlobalFooter />
    </div>
  );
}
