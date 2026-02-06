import { createFileRoute } from "@tanstack/react-router";
import { qo } from "@/hooks/Queries/Definitions/queries.ts";
import type { QueryClient } from "@tanstack/react-query";
import { BuilderHubPage } from "@/features/BuilderHub/Pages/BuilderHubPage";

export const Route = createFileRoute("/_app/_hub/builder")({
  loader: async ({ context }) => builderHubLoader(context.queryClient),
  component: BuilderHubPage,
});

async function builderHubLoader(qc: QueryClient) {
  await qc.ensureQueryData(qo.allCourses());
}
