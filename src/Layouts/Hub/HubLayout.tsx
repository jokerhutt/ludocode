import { Outlet, useMatches } from "@tanstack/react-router";

import { StatsContext } from "../../Hooks/Context/Stats/StatsContext";
import { useSuspenseQuery } from "@tanstack/react-query";
import { qo } from "@/Hooks/Queries/Definitions/queries";
import { MainGridWrapper } from "@/components/LudoComponents/Layouts/Grids/MainGridWrapper";
import { AppHeader } from "@/components/LudoComponents/Blocks/Header/AppHeader";
import { NavigationFooter } from "@/components/LudoComponents/Blocks/Footer/NavigationFooter";

export function HubLayout() {
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
