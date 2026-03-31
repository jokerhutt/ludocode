import { qo } from "@/queries/definitions/queries.ts";
import { qk } from "@/queries/definitions/qk.ts";
import { ProjectLayout } from "@/layouts/project/ProjectLayout.tsx";
import type { QueryClient } from "@tanstack/react-query";
import { createFileRoute, notFound } from "@tanstack/react-router";
import type { ProjectSnapshot } from "@ludocode/types";

export const Route = createFileRoute("/project/$authorId/$projectId")({
  beforeLoad: async ({ params, context }) => {
    const { projectId } = params;
    await context.queryClient.removeQueries({
      queryKey: qk.project(projectId),
    });

    await context.queryClient.ensureQueryData(qo.project(projectId));
  },
  loader: async ({ params, context }) =>
    projectLoader(params, context.queryClient),
  component: ProjectLayout,
});

async function projectLoader(
  params: { projectId: string },
  queryClient: QueryClient,
) {
  const { projectId } = params;
  const project : ProjectSnapshot | undefined = queryClient.getQueryData(qk.project(projectId));

  if (!project) {
    throw notFound();
  }

  return { project };
}
