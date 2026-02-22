import { qo } from "@/hooks/Queries/Definitions/queries.ts";
import type { QueryClient } from "@tanstack/react-query";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_app")({
  beforeLoad: async ({ location, context }) =>
    appPreloader(location, context.queryClient),
});

async function appPreloader(
  location: { pathname: string },
  queryClient: QueryClient
) {
  await queryClient.ensureQueryData(qo.activeFeatures());

  const user = await queryClient
    .ensureQueryData(qo.currentUser())
    .catch(() => null);
  if (!user) {
    throw redirect({ to: "/auth/login", replace: true });
  }

  const isOnboarding = location.pathname.startsWith("/onboarding");

  if (!isOnboarding && !user.hasOnboarded) {
    console.log("Navigaten");
    throw redirect({
      to: "/onboarding/$stage",
      params: { stage: "name" },
      replace: true,
    });
  }
}
