import { LanguagesHubPage } from "@/features/languages-hub/LanguagesHubPage.tsx";
import { qo } from "@/queries/definitions/queries";
import type { QueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/hub/languages")({
  loader: async ({ context }) => languagesHubLoader(context.queryClient),
  component: LanguagesHubPage,
});

async function languagesHubLoader(qc: QueryClient) {
  await qc.ensureQueryData(qo.languages());
}
