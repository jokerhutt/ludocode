import { createFileRoute, redirect } from "@tanstack/react-router";
import type { QueryClient } from "@tanstack/react-query";
import { qo } from "@/queries/definitions/queries";
import { LandingPage } from "@/features/landing/LandingPage";

export const Route = createFileRoute("/_resources/")({
  beforeLoad: async ({ context }) => resourcesPreloader(context.queryClient),
  component: LandingPage,
});

async function resourcesPreloader(queryClient: QueryClient) {
  const activeFeatures = await queryClient
    .ensureQueryData(qo.activeFeatures())
    .catch(() => null);

  if (activeFeatures?.authMode === "DEMO") {
    await queryClient.invalidateQueries();
  }

  const user = await queryClient
    .ensureQueryData(qo.currentUser())
    .catch(() => null);

  if (user) {
    throw redirect({ to: "/app", replace: true });
  }
}

