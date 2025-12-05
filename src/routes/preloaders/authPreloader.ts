import { DEMO_LOGIN } from "@/constants/api/pathConstants";
import { routes } from "@/constants/router/routes";
import { qo } from "@/hooks/Queries/Definitions/queries";
import type { QueryClient } from "@tanstack/react-query";
import { redirect } from "@tanstack/react-router";
import { redirectToAuth } from "../redirects/redirects";
import { router } from "../router";

export async function demoAuthPreloader(queryClient: QueryClient) {
  await fetch(DEMO_LOGIN, {
    method: "GET",
    credentials: "include",
  });
  await queryClient.invalidateQueries();
  await queryClient.ensureQueryData(qo.currentUser());

  throw redirect({ to: routes.hub.courses });
}

export async function appPreloader(
  location: { pathname: string },
  queryClient: QueryClient
) {
  await queryClient.ensureQueryData(qo.activeFeatures());

  const user = await queryClient
    .ensureQueryData(qo.currentUser())
    .catch(() => null);
  if (!user) redirectToAuth();

  const isOnboarding = location.pathname.startsWith(routes.onboarding.base);

  if (!isOnboarding && !!user && !user.hasOnboarded) {
    router.navigate({ to: routes.onboarding.start, replace: true });
  }
}
