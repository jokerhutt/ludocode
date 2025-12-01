import { Outlet, useMatches } from "@tanstack/react-router";

import { StatsContext } from "@/hooks/Context/Stats/StatsContext";
import { useSuspenseQuery } from "@tanstack/react-query";
import { qo } from "@/hooks/Queries/Definitions/queries";
import { MainGridWrapper } from "@/components/design-system/layouts/grid/main-grid-wrapper.tsx";
import { AppHeader } from "@/components/design-system/blocks/header/app-header.tsx";
import { NavigationFooter } from "@/components/design-system/blocks/footer/navigation-footer.tsx";

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
