import { useGoogleLogin } from "@react-oauth/google";
import { useQueryClient } from "@tanstack/react-query";
import { GOOGLE_LOGIN } from "../../../constants/pathConstants.ts";
import { qk } from "../../../constants/qk";
import { router } from "../../../routes/router";
import type { LoginUserResponse } from "../../../Types/User/LoginUserResponse.ts";
import { ludoPost } from "../Fetcher/ludoPost.ts";

export function useGoogleAuthEntry() {
  const queryClient = useQueryClient();

  return useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeResponse) => {
      console.log(codeResponse);

      const {user, userStats}: LoginUserResponse = await ludoPost(
        GOOGLE_LOGIN,
        { code: codeResponse.code },
        true
      )

      queryClient.setQueryData(qk.user(user.id), user);
      queryClient.setQueryData(qk.currentUser(), user);
      queryClient.setQueryData(qk.userStats(userStats.id), userStats)

      router.navigate({ to: "/" });
    },
    onError: (err) => console.error("Google login failed", err),
  });
}
