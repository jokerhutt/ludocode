import { CommunityPage } from "@/features/community/CommunityPage";
import { qo } from "@/queries/definitions/queries.ts";
import type { QueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import z from "zod";

export const Route = createFileRoute("/app/_hub/community/")({
  staticData: { headerTitle: "Community" },
  validateSearch: z.object({
    page: z.coerce.number().int().min(0).default(0),
  }),
  loaderDeps: ({ search }) => ({ page: search.page }),
  loader: async ({ context, deps }) =>
    communityLoader(context.queryClient, deps.page),
  component: CommunityPage,
});

async function communityLoader(queryClient: QueryClient, page: number) {
  await queryClient.ensureQueryData(qo.communityProjects(page, 12));
}
