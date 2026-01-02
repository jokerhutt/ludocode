import { createFileRoute, redirect } from "@tanstack/react-router";
import { qo } from "@/hooks/Queries/Definitions/queries.ts";
import type { QueryClient } from "@tanstack/react-query";
export const Route = createFileRoute("/_app")({
  beforeLoad: async ({ context }) => appPreloader(context.queryClient),
});

async function appPreloader(queryClient: QueryClient) {
  const user = await queryClient
    .ensureQueryData(qo.currentUser())
    .catch(() => null);
  if (!user) {
    throw redirect({ to: "/auth", replace: true });
  }
}
