import { qo } from "@/queries/definitions/queries.ts";
import { HubLayout } from "@/layouts/hub/HubLayout.tsx";
import type { QueryClient } from "@tanstack/react-query";
import {createFileRoute, redirect} from "@tanstack/react-router";

export const Route = createFileRoute("/_app/_hub")({
  loader: async ({ context }) => hubLoader(context.queryClient),
  component: HubLayout,
});

async function hubLoader(queryClient: QueryClient) {
  const currentUser = await queryClient.ensureQueryData(qo.currentUser());
  const userStats = await queryClient.ensureQueryData(qo.coins(currentUser.id));
  const userStreak = await queryClient.ensureQueryData(
    qo.streak(currentUser.id)
  );

  const currentCourseId = await queryClient.ensureQueryData(qo.currentCourseId())
  await queryClient.ensureQueryData(qo.courseProgress(currentCourseId))



  if (!userStats || !userStreak || !currentUser) {
    throw redirect({to: "/auth/login", replace: true});
  }

  return { userStats, userStreak };
}

