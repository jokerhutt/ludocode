import { ProjectHubPage } from "@/features/Project/hub/ProjectHubPage.tsx";
import { qo } from "@/hooks/Queries/Definitions/queries.ts";
import type { QueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/_hub/projects")({
  staticData: { headerTitle: "Project" },
  loader: async ({ context }) => projectHubLoader(context.queryClient),
  component: ProjectHubPage,
});



async function projectHubLoader(qc: QueryClient) {
  await qc.ensureQueryData(qo.allProjects());
}
