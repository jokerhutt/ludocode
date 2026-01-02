import { useGoogleLogin } from "@react-oauth/google";
import { useQueryClient } from "@tanstack/react-query";
import { GOOGLE_LOGIN } from "../../../constants/api/pathConstants.ts";
import { qk } from "../Definitions/qk.ts";
import type { LoginUserResponse } from "../../../../../../packages/types/User/LoginUserResponse.ts";
import { ludoPost } from "../Fetcher/ludoPost.ts";
import { useRouter } from "@tanstack/react-router";
import { adminNavigation } from "@/constants/adminNavigation.tsx";
export function useAdminGoogleAuthEntry() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeResponse) => {
      console.log(codeResponse);

      const { user }: LoginUserResponse = await ludoPost(
        GOOGLE_LOGIN,
        { code: codeResponse.code },
        true
      );

      queryClient.setQueryData(qk.user(user.id), user);
      queryClient.setQueryData(qk.currentUser(), user);

      router.navigate(adminNavigation.builder.toBuilderHub());
    },
    onError: (err) => console.error("Google login failed", err),
  });
}
