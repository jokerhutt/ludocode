import { qo } from "@/hooks/Queries/Definitions/queries.ts";
import { HubLayout } from "@/layouts/Hub/HubLayout.tsx";
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

  if (!userStats || !userStreak || !currentUser) {
    throw redirect({to: "/auth/login", replace: true});
  }

  return { userStats, userStreak };
}

