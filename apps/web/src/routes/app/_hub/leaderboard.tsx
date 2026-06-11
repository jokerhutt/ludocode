import { LeaderboardPage } from "@/features/leaderboard/hub/LeaderboardPage";
import { qo } from "@/queries/definitions/queries";
import type { QueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/_hub/leaderboard")({
  staticData: { headerTitle: "Leaderboard" },
  component: LeaderboardPage,
  loader: async ({context}) => leaderboardLoader(context.queryClient)

});

async function leaderboardLoader(queryClient: QueryClient) {
  await queryClient.ensureQueryData(qo.weeklyLeaderboard())
}
