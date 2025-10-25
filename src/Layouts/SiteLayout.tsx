import { Outlet } from "@tanstack/react-router";
import { GlobalFooter } from "../components/Molecules/Footer/GlobalFooter";
import { MainGridWrapper } from "./LayoutWrappers/MainGridWrapper";
import { DesktopHeader } from "./DesktopHeader";
import { StatsContext } from "../features/Common/StatsContext";
import { siteRoute } from "../routes/router";

export function SiteLayout() {

const { userStats } = siteRoute.useLoaderData()

  return (
    <StatsContext.Provider value={userStats}>
      <MainGridWrapper gridRows={"SITE"}>
        <DesktopHeader />
        <Outlet />
        <GlobalFooter />
      </MainGridWrapper>
    </StatsContext.Provider>
  );
}
