import { LanguagesHubPage } from "@/features/Hub/LanguagesHub/Pages/LanguagesHubPage";
import { qo } from "@/hooks/Queries/Definitions/queries";
import type { QueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/hub/languages")({
  loader: async ({ context }) => languagesHubLoader(context.queryClient),
  component: LanguagesHubPage,
});

async function languagesHubLoader(qc: QueryClient) {
  await qc.ensureQueryData(qo.languages());
}
