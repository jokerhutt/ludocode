import { RP_PROJECT_HUB } from "@/constants/router/routes";
import { qo } from "@/Hooks/Queries/Definitions/queries";
import { redirect } from "@tanstack/react-router";
import type { QueryClient } from "@tanstack/react-query";

export async function playgroundLoader(queryClient: QueryClient) {
  const projectsPacket = await queryClient.ensureQueryData(qo.allProjects());

  return { projectsPacket };
}

export async function projectLoader(
  params: { projectId: string },
  queryClient: QueryClient
) {
  const { projectId } = params;

  if (!projectId) {
    throw redirect({ to: RP_PROJECT_HUB, replace: true });
  }

  const projects = await queryClient.ensureQueryData(qo.allProjects());

  const project = projects.projects.find(
    (project) => project.projectId == projectId
  );

  return { project };
}
