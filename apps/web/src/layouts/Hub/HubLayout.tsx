import { Outlet, useMatches } from "@tanstack/react-router";

import { StatsContext } from "@/features/Hub/Stats/Context/StatsContext.tsx";
import { useSuspenseQuery } from "@tanstack/react-query";
import { qo } from "@/hooks/Queries/Definitions/queries.ts";
import { MainGridWrapper } from "@ludocode/design-system/layouts/grid/main-grid-wrapper.tsx";
import { HubHeader } from "@/features/Hub/Components/Zone/HubHeader.tsx";
import { NavigationFooter } from "@/features/Hub/Components/Zone/NavigationFooter.tsx";
import { CurrentCourseContext } from "@/features/Hub/Context/CurrentCourseContext.tsx";
import { Suspense } from "react";

export function HubLayout() {
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
    qo.courseProgress(currentCourseId),
  );


  const { coins } = coinPacket;

  return (
    <CurrentCourseContext.Provider value={courseProgress}>
      <StatsContext.Provider value={{ coins: coins, userStreak: streakPacket }}>
          <MainGridWrapper gridRows={"SITE"}>
            <HubHeader title={title} />
            <Suspense fallback={<div className="col-span-full" />}>
              <Outlet />
            </Suspense>
            <NavigationFooter />
          </MainGridWrapper>
      </StatsContext.Provider>
    </CurrentCourseContext.Provider>
  );
}
