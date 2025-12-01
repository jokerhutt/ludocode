import { qo } from "@/hooks/Queries/Definitions/queries";
import { redirect } from "@tanstack/react-router";
import type { QueryClient } from "@tanstack/react-query";
import { routes } from "@/constants/router/routes";

export async function projectHubLoader(queryClient: QueryClient) {
  const projectsPacket = await queryClient.ensureQueryData(qo.allProjects());

  return { projectsPacket };
}

export async function projectLoader(
  params: { projectId: string },
  queryClient: QueryClient
) {
  const { projectId } = params;

  if (!projectId) {
    throw redirect({ to: routes.hub.projectHub, replace: true });
  }

  const projects = await queryClient.ensureQueryData(qo.allProjects());

  const project = projects.projects.find(
    (project) => project.projectId == projectId
  );

  return { project };
}
