import { useGoogleLogin } from "@react-oauth/google";
import { useQueryClient } from "@tanstack/react-query";
import { GOOGLE_LOGIN } from "../../../constants/pathConstants.ts";
import { qk } from "../../../constants/qk";
import type { LudoUser } from "../../../Types/User/LudoUser";
import { router } from "../../../routes/router";

export function useGoogleAuthEntry() {
  const queryClient = useQueryClient();

  return useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeResponse) => {
      console.log(codeResponse);

      const res = await fetch(GOOGLE_LOGIN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: codeResponse.code }),
        credentials: "include",
      });

      const user: LudoUser = await res.json();
      queryClient.setQueryData(qk.user(user.id), user);
      queryClient.setQueryData(qk.currentUser(), user);

      router.navigate({ to: "/" });
    },
    onError: (err) => console.error("Google login failed", err),
  });
}
