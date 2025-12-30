import { BuilderHubPage } from "@/features/Hub/BuilderHub/Pages/BuilderHubPage.tsx";
import { qo } from "@/hooks/Queries/Definitions/queries.ts";
import type { QueryClient } from "@tanstack/react-query";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/_hub/builder")({
  staticData: { headerTitle: "Builder " },
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