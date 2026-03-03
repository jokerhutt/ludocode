import { createFileRoute, redirect } from "@tanstack/react-router";
import { qo } from "@/hooks/Queries/Definitions/queries.ts";
import type { QueryClient } from "@tanstack/react-query";
import { ludoGet } from "@ludocode/api/fetcher";
import { adminApi } from "@/constants/api/adminApi";
export const Route = createFileRoute("/_app")({
  beforeLoad: async ({ context }) => appPreloader(context.queryClient),
});

type Status = { ok: boolean };

async function appPreloader(queryClient: QueryClient) {
  const user = await queryClient
    .ensureQueryData(qo.currentUser())
    .catch(() => null);

  const status = await ludoGet<Status>(adminApi.auth.checkAdmin, true).catch(
    () => null,
  );

  if (!user || !status?.ok) {
    throw redirect({ to: "/auth", replace: true });
  }
}
