import { api } from "@/constants/api/api";
import { ludoPost } from "@ludocode/api/fetcher";
import type { LoginUserResponse } from "@ludocode/types";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { qk } from "../Definitions/qk";
import { ludoNavigation } from "@/constants/ludoNavigation";
import { qo } from "../Definitions/queries";

export function useFinalizeLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return async (idToken: string) => {
    const { user, userCoins, userStreak }: LoginUserResponse = await ludoPost(
      api.auth.firebase,
      {},
      true,
      { Authorization: `Bearer ${idToken}` }
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
      router.navigate(
        ludoNavigation.hub.module.toModule(
          currentCourseProgress.courseId,
          currentCourseProgress.moduleId,
          true
        )
      );
    }
  };
}