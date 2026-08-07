import { ProjectHubPage } from "@/features/project/hub/ProjectHubPage.tsx";
import { PROJECT_PAGE_SIZE } from "@/features/project/hub/content.ts";
import { qo } from "@/queries/definitions/queries.ts";
import type { QueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import z from "zod";

export const Route = createFileRoute("/app/_hub/projects")({
  staticData: { headerTitle: "Projects" },
  validateSearch: z.object({
    page: z.coerce.number().int().min(0).default(0),
  }),
  loaderDeps: ({ search }) => ({ page: search.page }),
  loader: async ({ context, deps }) =>
    projectHubLoader(context.queryClient, deps.page),
  component: ProjectHubPage,
});

async function projectHubLoader(queryClient: QueryClient, page: number) {
  const currentUser = await queryClient.ensureQueryData(qo.currentUser());
  const packet = await queryClient.ensureQueryData(
    qo.userProjects(currentUser.id, page, PROJECT_PAGE_SIZE),
  );

  const lastPage = Math.max(0, packet.totalPages - 1);
  if (lastPage !== page) {
    await queryClient.ensureQueryData(
      qo.userProjects(currentUser.id, lastPage, PROJECT_PAGE_SIZE),
    );
  }
}
