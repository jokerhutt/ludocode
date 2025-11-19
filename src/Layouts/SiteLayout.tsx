import { Outlet } from "@tanstack/react-router";
import { DefaultMobileFooter } from "../components/Molecules/Footer/DefaultMobileFooter";
import { MainGridWrapper } from "./LayoutWrappers/MainGridWrapper";
import { DesktopHeader } from "./DesktopHeader";
import { StatsContext } from "../features/Common/StatsContext";
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
        <DefaultMobileFooter />
      </MainGridWrapper>
    </StatsContext.Provider>
  );
}
