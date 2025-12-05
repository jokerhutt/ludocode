import { qo } from "@/hooks/Queries/Definitions/queries";
import type { QueryClient } from "@tanstack/react-query";
import { redirectToAuth } from "../redirects/redirects";

export async function hubLoader(queryClient: QueryClient) {
  const currentUser = await queryClient.ensureQueryData(qo.currentUser());
  const userStats = await queryClient.ensureQueryData(qo.coins(currentUser.id));
  const userStreak = await queryClient.ensureQueryData(
    qo.streak(currentUser.id)
  );

  if (!userStats || !userStreak || !currentUser) redirectToAuth();

  return { userStats, userStreak };
}

export async function hubIndexLoader() {
}
