import { useGoogleLogin } from "@react-oauth/google";
import { useQueryClient } from "@tanstack/react-query";
import { GOOGLE_LOGIN } from "../../../constants/api/pathConstants.ts";
import { qk } from "../Definitions/qk.ts";
import { router } from "../../../routes/router";
import type { LoginUserResponse } from "@/types/User/LoginUserResponse.ts";
import { ludoPost } from "../Fetcher/ludoPost.ts";
import { routes } from "@/constants/router/routes.ts";
import { ludoNavigation } from "@/routes/navigator/ludoNavigation.tsx";
export function useGoogleAuthEntry() {
  const queryClient = useQueryClient();

  return useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeResponse) => {
      console.log(codeResponse);

      console.log("Calling post");

      const { user, userCoins, userStreak }: LoginUserResponse = await ludoPost(
        GOOGLE_LOGIN,
        { code: codeResponse.code },
        true
      );

      queryClient.setQueryData(qk.user(user.id), user);
      queryClient.setQueryData(qk.currentUser(), user);
      queryClient.setQueryData(qk.userCoins(user.id), userCoins);
      queryClient.setQueryData(qk.streak(user.id), userStreak);

      if (!user.hasOnboarded) {
        router.navigate({ to: routes.onboarding.start, replace: true });
      } else {
        router.navigate(ludoNavigation.hub.module.toCurrent());
      }
    },
    onError: (err) => console.error("Google login failed", err),
  });
}
