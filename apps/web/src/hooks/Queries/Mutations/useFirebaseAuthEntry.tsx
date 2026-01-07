import { useQueryClient } from "@tanstack/react-query";
import { qk } from "@/hooks/Queries/Definitions/qk.ts";
import type { LoginUserResponse } from "@ludocode/types/User/LoginUserResponse.ts";
import { ludoPost } from "@/hooks/Queries/Fetcher/ludoPost.ts";
import { ludoNavigation } from "@/constants/ludoNavigation.tsx";
import { auth } from "@/constants/auth/firebase";
import { qo } from "@/hooks/Queries/Definitions/queries.ts";
import { useRouter } from "@tanstack/react-router";
import { toast } from "react-toastify";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { FIREBASE_AUTH } from "@/constants/api/pathConstants";

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

export function useFirebaseAuthEntry() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return async (provider: AuthProviderMode) => {
    try {
      const firebaseProvider = getFirebaseProvider(provider);
      const result = await signInWithPopup(auth, firebaseProvider);

      const idToken = await result.user.getIdToken();

      const { user, userCoins, userStreak }: LoginUserResponse = await ludoPost(
        FIREBASE_AUTH,
        {},
        true,
        {
          Authorization: `Bearer ${idToken}`,
        }
      );

      queryClient.setQueryData(qk.user(user.id), user);
      queryClient.setQueryData(qk.currentUser(), user);
      queryClient.setQueryData(qk.userCoins(user.id), userCoins);
      queryClient.setQueryData(qk.streak(user.id), userStreak);

      if (!user.hasOnboarded) {
        router.navigate(ludoNavigation.onboarding.start());
      } else {
        const currentCourseId = await queryClient.ensureQueryData(
          qo.currentCourseId()
        );
        const currentCourseProgress = await queryClient.ensureQueryData(
          qo.courseProgress(currentCourseId)
        );
        const { courseId, moduleId } = currentCourseProgress;
        router.navigate(ludoNavigation.hub.module.toModule(courseId, moduleId));
      }
    } catch (err: any) {
      let errorMsg = "Something went wrong!";
      toast.error(errorMsg, {
        position: "top-center",
        style: {
          background: "#dc2626",
          color: "#ffffff",
          fontWeight: 600,
        },
      });
    }
  };
}
