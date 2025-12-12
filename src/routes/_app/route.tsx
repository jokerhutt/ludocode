import { qo } from "@/hooks/Queries/Definitions/queries";
import { fetchCurrentUserFromCookie } from "@/server/auth";
import type { QueryClient } from "@tanstack/react-query";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { getRequestHeaders } from "@tanstack/react-start/server";

export const Route = createFileRoute("/_app")({
  beforeLoad: async ({ location, context }) =>
    appPreloader(location, context.queryClient),
});

async function appPreloader(
  location: { pathname: string },
  queryClient: QueryClient
) {
  console.log("[beforeLoad] running");

  const headers = getRequestHeaders();
  const cookie = headers.get("cookie") ?? "";
  const user = await fetchCurrentUserFromCookie(cookie);

  if (!user) {
    console.log("[beforeLoad] NO USER");
    throw redirect({ to: "/auth" });
  }

  console.log("User is: " + JSON.stringify(user));

  queryClient.setQueryData(qo.currentUser().queryKey, user);

  if (!location.pathname.startsWith("/onboarding") && !user.hasOnboarded) {
    throw redirect({
      to: "/onboarding/$stage",
      params: { stage: "career" },
    });
  }

  console.log("OK?");

  return { user };
}
