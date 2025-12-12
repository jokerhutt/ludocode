import { GOOGLE_LOGIN } from "@/constants/api/pathConstants";
import { qo } from "@/hooks/Queries/Definitions/queries";
import { ludoPost } from "@/hooks/Queries/Fetcher/ludoPost";
import type { LoginUserResponse } from "@/types/User/LoginUserResponse";
import type { QueryClient } from "@tanstack/react-query";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { useAppSession } from "../utils/session";

export const Route = createFileRoute("/_app")({
  beforeLoad: async ({ location, context }) =>
    appPreloader(location, context.queryClient, context.user),
});

async function appPreloader(
  location: { pathname: string },
  queryClient: QueryClient,
  user: any | null
) {
  console.log("User is: " + JSON.stringify(user));

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

export const googleLoginFn = createServerFn({ method: "POST" })
  .inputValidator((d: { code: string }) => d)
  .handler(async ({ data }) => {
    const { user, userCoins, userStreak }: LoginUserResponse = await ludoPost(
      GOOGLE_LOGIN,
      { code: data.code },
      true
    );
    console.log(
      "USER: " +
        JSON.stringify(user) +
        " COINS: " +
        JSON.stringify(userCoins) +
        " STREAK: " +
        JSON.stringify(userStreak)
    );
    const session = await useAppSession();
    await session.update(user);
    return { user, userCoins, userStreak };
  });
