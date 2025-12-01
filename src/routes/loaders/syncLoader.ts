import { qo } from "@/hooks/Queries/Definitions/queries";
import type { QueryClient } from "@tanstack/react-query";

export async function syncLoader(queryClient: QueryClient) {
  const currentUser = await queryClient.ensureQueryData(qo.currentUser());
  const userCoins = await queryClient.ensureQueryData(qo.coins(currentUser.id));
  const userStreak = await queryClient.ensureQueryData(
    qo.streak(currentUser.id)
  );
  const oldStreak = userStreak.current;
  return { oldStreak };
}
