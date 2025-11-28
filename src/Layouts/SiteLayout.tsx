import { Outlet, useMatches } from "@tanstack/react-router";
import { NavigationFooter } from "../components/Molecules/Footer/NavigationFooter";
import { MainGridWrapper } from "./Grids/MainGridWrapper";
import { AppHeader } from "../components/Molecules/Header/AppHeader";
import { StatsContext } from "../features/Common/StatsContext";
import { useSuspenseQuery } from "@tanstack/react-query";
import { qo } from "@/Hooks/Queries/Definitions/queries";

export function SiteLayout() {
  const { data: currentUser } = useSuspenseQuery(qo.currentUser());
  const currentUserId = currentUser.id;
  const { data: coinPacket } = useSuspenseQuery(qo.coins(currentUserId));
  const { data: streakPacket } = useSuspenseQuery(qo.streak(currentUserId));
  const { coins } = coinPacket;

  const matches = useMatches();
  const active = matches[matches.length - 1];
  const title =
    (active?.staticData as { headerTitle?: string })?.headerTitle ?? "LudoCode";

  return (
    <StatsContext.Provider value={{ coins: coins, userStreak: streakPacket }}>
      <MainGridWrapper gridRows={"SITE"}>
        <AppHeader title={title} />
        <Outlet />
        <NavigationFooter />
      </MainGridWrapper>
    </StatsContext.Provider>
  );
}
