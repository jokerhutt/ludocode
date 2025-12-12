import { Outlet, useMatches } from "@tanstack/react-router";

import { StatsContext } from "@/hooks/Context/Stats/StatsContext";
import { useSuspenseQuery } from "@tanstack/react-query";
import { qo } from "@/hooks/Queries/Definitions/queries";
import { MainGridWrapper } from "@/components/design-system/layouts/grid/main-grid-wrapper.tsx";
import { AppHeader } from "@/components/design-system/blocks/header/app-header.tsx";
import { NavigationFooter } from "@/components/design-system/blocks/footer/navigation-footer.tsx";
import { CurrentCourseContext } from "@/hooks/Context/Progress/CurrentCourseContext";
import { useEffect } from "react";

export function HubLayout() {
  useEffect(() => {
    console.log("mounted hub");

    return () => {
      console.log("unmounted hub");
    };
  }, []);
  const matches = useMatches();
  const active = matches[matches.length - 1];
  const title =
    (active?.staticData as { headerTitle?: string })?.headerTitle ?? "LudoCode";

  const { data: currentUser } = useSuspenseQuery(qo.currentUser());
  const currentUserId = currentUser.id;
  const { data: coinPacket } = useSuspenseQuery(qo.coins(currentUserId));
  const { data: streakPacket } = useSuspenseQuery(qo.streak(currentUserId));

  const { data: currentCourseId } = useSuspenseQuery(qo.currentCourseId());
  const { data: courseProgress } = useSuspenseQuery(
    qo.courseProgress(currentCourseId)
  );

  const { coins } = coinPacket;

  return (
    <CurrentCourseContext.Provider value={courseProgress}>
      <StatsContext.Provider value={{ coins: coins, userStreak: streakPacket }}>
        <MainGridWrapper gridRows={"SITE"}>
          <AppHeader title={title} />
          <Outlet />
          <NavigationFooter />
        </MainGridWrapper>
      </StatsContext.Provider>
    </CurrentCourseContext.Provider>
  );
}
