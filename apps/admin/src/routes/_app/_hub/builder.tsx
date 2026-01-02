import { createFileRoute, redirect } from "@tanstack/react-router";
import { qo } from "@/hooks/Queries/Definitions/queries.ts";
import type { QueryClient } from "@tanstack/react-query";
import { BuilderHubPage } from "@/features/BuilderHub/Pages/BuilderHubPage";

export const Route = createFileRoute("/_app/_hub/builder")({
  loader: async ({ location, context }) =>
    builderHubLoader(location, context.queryClient),
  component: BuilderHubPage,
});

async function builderHubLoader(
  _location: { pathname: string },
  qc: QueryClient
) {
  const user = await qc.ensureQueryData(qo.currentUser());
  if (!user) {
    throw redirect({ to: "/auth" });
  }

  await qc.ensureQueryData(qo.allCourses());
}
