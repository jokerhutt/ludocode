import { Outlet, useMatches } from "@tanstack/react-router";

import { StatsContext } from "@/features/stats/context/StatsContext.tsx";
import { useSuspenseQuery } from "@tanstack/react-query";
import { qo } from "@/queries/definitions/queries.ts";
import { MainGridWrapper } from "@ludocode/design-system/layouts/grid/main-grid-wrapper.tsx";
import { HubHeader } from "@/features/hub/zones/HubHeader.tsx";
import { HubFooter } from "@/features/hub/zones/HubFooter.tsx";
import { CurrentCourseContext } from "@/features/course/context/CurrentCourseContext.tsx";
import { Suspense } from "react";
import { SubscriptionContext } from "@/features/subscription/context/SubscriptionContext.tsx";

export function HubLayout() {
  const matches = useMatches();
  const active = matches[matches.length - 1];
  const title =
    (active?.staticData as { headerTitle?: string })?.headerTitle ?? "LudoCode";

  const { data: currentUser } = useSuspenseQuery(qo.currentUser());
  const currentUserId = currentUser.id;
  const { data: coinPacket } = useSuspenseQuery(qo.coins(currentUserId));
  const { data: streakPacket } = useSuspenseQuery(qo.streak(currentUserId));
  const { data: xpPacket } = useSuspenseQuery(qo.xp(currentUserId));
  const {xp} = xpPacket;

  const { data: subscription } = useSuspenseQuery(qo.subscription());

  const { data: currentCourseId } = useSuspenseQuery(qo.currentCourseId());
  const { data: courseProgress } = useSuspenseQuery(
    qo.courseProgress(currentCourseId),
  );

  const { coins } = coinPacket;

  return (
    <CurrentCourseContext.Provider value={courseProgress}>
      <StatsContext.Provider value={{ coins: coins, userStreak: streakPacket, userXp: xp }}>
        <SubscriptionContext.Provider value={subscription}>
          <MainGridWrapper gridRows={"SITE"}>
            <HubHeader title={title} />
            <Suspense fallback={<div className="col-span-full" />}>
              <Outlet />
            </Suspense>
            <HubFooter />
          </MainGridWrapper>
        </SubscriptionContext.Provider>
      </StatsContext.Provider>
    </CurrentCourseContext.Provider>
  );
}
