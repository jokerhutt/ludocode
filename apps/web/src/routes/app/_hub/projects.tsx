import { ProjectHubPage } from "@/features/project/hub/ProjectHubPage.tsx";
import { qo } from "@/queries/definitions/queries.ts";
import type { QueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import z from "zod";

export const Route = createFileRoute("/app/_hub/projects")({
  staticData: { headerTitle: "project" },
  validateSearch: z.object({
    page: z.coerce.number().int().min(0).default(0),
  }),
  loaderDeps: ({ search }) => ({ page: search.page }),
  loader: async ({ context, deps }) =>
    projectHubLoader(context.queryClient, deps.page),
  component: ProjectHubPage,
});

async function projectHubLoader(queryClient: QueryClient, page: number) {
  const currentUser = await queryClient.ensureQueryData(qo.currentUser())
  await queryClient.ensureQueryData(qo.userProjects(currentUser.id, page, 10));
}
