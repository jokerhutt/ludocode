import { Outlet } from "@tanstack/react-router";
import { NavigationFooter } from "../../components/Molecules/Footer/NavigationFooter";
import { MainGridWrapper } from "../Grids/MainGridWrapper";
import { DesktopHeader } from "../../components/Molecules/Header/DesktopHeader";
import { StatsContext } from "../../features/Common/StatsContext";
import { useSuspenseQuery } from "@tanstack/react-query";
import { qo } from "@/Hooks/Queries/Definitions/queries";

export function SiteLayout() {
  const { data: currentUser } = useSuspenseQuery(qo.currentUser());
  const currentUserId = currentUser.id;
  const { data: coinPacket } = useSuspenseQuery(qo.coins(currentUserId));
  const { data: streakPacket } = useSuspenseQuery(qo.streak(currentUserId));
  const { current } = streakPacket;
  const { coins } = coinPacket;

  return (
    <StatsContext.Provider value={{ coins: coins, streak: current }}>
      <MainGridWrapper gridRows={"SITE"}>
        <DesktopHeader />
        <Outlet />
        <NavigationFooter />
      </MainGridWrapper>
    </StatsContext.Provider>
  );
}
