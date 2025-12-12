import { qo } from "@/hooks/Queries/Definitions/queries";
import { router } from "@/main";
import { ludoNavigation } from "@/routes/utils/-ludoNavigation.tsx";
import type { QueryClient } from "@tanstack/react-query";
import {createFileRoute, redirect} from "@tanstack/react-router";

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
    throw redirect({to: "/auth", replace: true})
  }

  const isOnboarding = location.pathname.startsWith("/_app/onboarding");

  if (!isOnboarding && !user.hasOnboarded) {
    router.navigate(ludoNavigation.onboarding.start());
    return;
  }
}
