import { qo } from "@/queries/definitions/queries.ts";
import { ProjectLayout } from "@/layouts/project/ProjectLayout.tsx";
import type { QueryClient } from "@tanstack/react-query";
import { createFileRoute, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/_desktopguard/project/$authorId/$projectId")({
  loader: async ({ params, context }) =>
    projectLoader(params, context.queryClient),
  component: ProjectLayout,
});

async function projectLoader(
  params: { projectId: string },
  queryClient: QueryClient,
) {
  const { projectId } = params;
  const project = await queryClient.ensureQueryData(qo.project(projectId));

  if (!project) {
    throw notFound();
  }

  return {project}
}
