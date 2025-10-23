import { Outlet } from "@tanstack/react-router";
import { GlobalFooter } from "../components/Molecules/Footer/GlobalFooter";
import { MainGridWrapper } from "./LayoutWrappers/MainGridWrapper";
import { DesktopHeader } from "./DesktopHeader";
import { useUserStats } from "../Hooks/Queries/useUserStats";
import { StatsContext } from "../features/Common/StatsContext";

export function SiteLayout() {
  const state = useUserStats({});

  return (
    <StatsContext.Provider value={state}>
      <MainGridWrapper gridRows={"SITE"}>
        <DesktopHeader />
        <Outlet />
        <GlobalFooter />
      </MainGridWrapper>
    </StatsContext.Provider>
  );
}
