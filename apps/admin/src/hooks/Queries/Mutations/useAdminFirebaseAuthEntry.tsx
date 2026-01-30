import { useQueryClient } from "@tanstack/react-query";
import { qk } from "@/hooks/Queries/Definitions/qk.ts";
import type { LoginUserResponse } from "@ludocode//types/User/LoginUserResponse.ts";
import { useRouter } from "@tanstack/react-router";
import { adminNavigation } from "@/constants/adminNavigation.tsx";
import { ludoPost } from "@ludocode/api/fetcher";
import { adminApi } from "@/constants/api/adminApi";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "@/constants/auth/firebase";

export type AuthProviderMode = "GOOGLE" | "GITHUB" | "EMAIL";

function getFirebaseProvider(mode: AuthProviderMode) {
  switch (mode) {
    case "GOOGLE":
      return new GoogleAuthProvider();
    case "GITHUB":
      return new GithubAuthProvider();
    case "EMAIL":
      throw new Error("EMAIL does not use popup auth");
    default:
      throw new Error("Unsupported auth provider");
  }
}

export function useAdminFirebaseAuthEntry() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return async (provider: AuthProviderMode) => {
    try {
      const firebaseProvider = getFirebaseProvider(provider);
      const result = await signInWithPopup(auth, firebaseProvider);

      const idToken = await result.user.getIdToken();

      const { user }: LoginUserResponse = await ludoPost(
        adminApi.auth.firebase,
        {},
        true,
        {
          Authorization: `Bearer ${idToken}`,
        }
      );

      queryClient.setQueryData(qk.user(user.id), user);
      queryClient.setQueryData(qk.currentUser(), user);

      router.navigate(adminNavigation.builder.toBuilderHub());
    } catch (err: any) {
      console.log(err);
    }
  };
}
