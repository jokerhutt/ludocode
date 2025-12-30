import { SyncingPage } from "@/features/Completion/Pages/SyncingPage.tsx";
import { qo } from "@/hooks/Queries/Definitions/queries.ts";
import type { QueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/sync/$lessonId")({
  loader: async ({ context }) => syncLoader(context.queryClient),
  component: SyncingPage,
});

async function syncLoader(queryClient: QueryClient) {
  const currentUser = await queryClient.ensureQueryData(qo.currentUser());
  await queryClient.ensureQueryData(qo.coins(currentUser.id));
  const userStreak = await queryClient.ensureQueryData(
    qo.streak(currentUser.id)
  );
  const oldStreak = userStreak.current;
  return { oldStreak };
}
