import { Outlet } from "@tanstack/react-router";
import { DefaultMobileFooter } from "../components/Molecules/Footer/DefaultMobileFooter";
import { MainGridWrapper } from "./LayoutWrappers/MainGridWrapper";
import { DesktopHeader } from "./DesktopHeader";
import { StatsContext } from "../features/Common/StatsContext";
import { siteRoute } from "../routes/router";

export function SiteLayout() {
  const { userStats } = siteRoute.useLoaderData();

  return (
    <StatsContext.Provider value={userStats}>
      <MainGridWrapper gridRows={"SITE"}>
        <DesktopHeader />
        <Outlet />
        <DefaultMobileFooter />
      </MainGridWrapper>
    </StatsContext.Provider>
  );
}
