import { qo } from "@/queries/definitions/queries.ts";
import { ProjectLayout } from "@/layouts/Project/ProjectLayout.tsx";
import type { QueryClient } from "@tanstack/react-query";
import { createFileRoute, notFound, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/_desktopguard/project/$projectId")({
  loader: async ({ params, context }) =>
    projectLoader(params, context.queryClient),
  component: ProjectLayout,
});

async function projectLoader(
  params: { projectId: string },
  queryClient: QueryClient
) {
  const { projectId } = params;

  //TODO add a custom redirect
  if (!projectId) {
    throw redirect({ to: "/projects", replace: true });
  }

  const projects = await queryClient.ensureQueryData(qo.allProjects());

  const project = projects.projects.find(
    (project) => project.projectId == projectId
  );

  if (!project) {
    throw notFound();
  }

  return { project };
}
