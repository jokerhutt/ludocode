import { api } from "@/constants/api/api.ts";
import { ludoPost } from "@ludocode/api/fetcher.ts";
import type { LoginUserResponse } from "@ludocode/types";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { qk } from "@/queries/definitions/qk.ts";
import { ludoNavigation } from "@/constants/ludoNavigation.tsx";
import { qo } from "@/queries/definitions/queries.ts";

export function useFinalizeLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return async (idToken: string) => {
    const { user, userCoins, userStreak, userXp }: LoginUserResponse = await ludoPost(
      api.auth.firebase,
      {},
      true,
      { Authorization: `Bearer ${idToken}` },
    );

    queryClient.setQueryData(qk.user(user.id), user);
    queryClient.setQueryData(qk.currentUser(), user);
    queryClient.setQueryData(qk.userCoins(user.id), userCoins);
    queryClient.setQueryData(qk.xp(user.id), userXp)
    queryClient.setQueryData(qk.streak(user.id), userStreak);

    if (!user.hasOnboarded) {
      queryClient.setQueryData(qk.onboardingDraft(), {
        username: user.displayName?.trim() || undefined,
      });

      router.navigate(ludoNavigation.onboarding.start());
    } else {
      const currentCourseId = await queryClient.ensureQueryData(
        qo.currentCourseId(),
      );
      const currentCourseProgress = await queryClient.ensureQueryData(
        qo.courseProgress(currentCourseId),
      );
      router.navigate(
        ludoNavigation.hub.module.toModule(
          currentCourseProgress.courseId,
          currentCourseProgress.moduleId,
          true,
        ),
      );
    }
  };
}
