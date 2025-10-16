import { Outlet } from "@tanstack/react-router";
import { LessonFooter } from "../components/Footer/LessonFooter";
import { GlobalFooter } from "../components/Footer/GlobalFooter";

export function SiteLayout() {
  return (
    <div className="grid h-dvh grid-rows-[1fr_auto]">
      <Outlet/>
      <GlobalFooter />
    </div>
  );
}
