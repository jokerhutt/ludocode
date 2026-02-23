import { createFileRoute, redirect } from "@tanstack/react-router";
import { qo } from "@/hooks/Queries/Definitions/queries.ts";
import type { QueryClient } from "@tanstack/react-query";
import { AdminHubLayout } from "@/layouts/Hub/AdminHubLayout";

export const Route = createFileRoute("/_app/hub")({
  loader: async ({ context }) => hubLoader(context.queryClient),
  component: AdminHubLayout,
});

async function hubLoader(queryClient: QueryClient) {
  const currentUser = await queryClient.ensureQueryData(qo.currentUser());

  if (!currentUser) {
    throw redirect({ to: "/auth", replace: true });
  }
}
